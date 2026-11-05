/**
 * OpenWay Code - Python & Web Playground Execution Engine
 * Evaluates Python 100% client-side in the browser using Skulpt with virtual filesystem support,
 * plus live HTML/CSS/JS preview bundling for web dev lessons.
 */

const PlaygroundRunner = {
  isSkulptReady: false,
  preambleLineCount: 0,

  init() {
    if (typeof Sk !== "undefined") {
      this.isSkulptReady = true;
    }
  },

  /**
   * Run Python code in-browser with full virtual filesystem support (open, read, write)
   */
  async runPython(code, virtualFiles = {}, callbacks = {}) {
    const onOutput = callbacks.onOutput || console.log;
    const onError = callbacks.onError || console.error;
    const onFileWritten = callbacks.onFileWritten || (() => {});
    let outputBuffer = "";

    const captureOutput = (text) => {
      outputBuffer += text;
      onOutput(text, "term-stdout");
    };

    if (typeof Sk === "undefined") {
      onError("⚠️ Python engine (Skulpt) is loading or unavailable. Please refresh the page.");
      return { success: false, output: "", error: "Skulpt unavailable" };
    }

    try {
      // 1. Configure Skulpt
      Sk.configure({
        output: captureOutput,
        read: (x) => {
          if (Sk.builtinFiles && Sk.builtinFiles["files"] && Sk.builtinFiles["files"][x] !== undefined) {
            return Sk.builtinFiles["files"][x];
          }
          if (virtualFiles[x] !== undefined) {
            return virtualFiles[x];
          }
          throw new Error(`FileNotFoundError: [Errno 2] No such file or directory: '${x}'`);
        },
        inputfunTakesPrompt: true,
        inputfun: (promptText) => {
          return window.prompt(promptText || "Python input:") || "";
        },
        execLimit: 6000 // 6-second timeout prevents infinite while loops
      });

      // 2. Register Javascript bridge for file writes
      Sk.builtins._js_sync_file = new Sk.builtin.func(function(filenameObj, contentObj) {
        const filename = Sk.ffi.remapToJs(filenameObj);
        const content = Sk.ffi.remapToJs(contentObj);
        virtualFiles[filename] = content;
        onFileWritten(filename, content);
      });

      // 3. Inject Virtual File System preamble so open('...', 'r') and open('...', 'w') work seamlessly
      const vfilesJson = JSON.stringify(virtualFiles);
      const preamble = `
_vfiles = ${vfilesJson}
class _VirtualFile:
    def __init__(self, filename, mode="r"):
        self.filename = str(filename)
        self.mode = mode
        if "w" in mode:
            self.content = ""
            _vfiles[self.filename] = ""
            _js_sync_file(self.filename, "")
        elif "a" in mode:
            self.content = _vfiles.get(self.filename, "")
        else:
            if self.filename not in _vfiles:
                raise FileNotFoundError("No such file: '" + self.filename + "'")
            self.content = _vfiles.get(self.filename, "")
        self.pos = 0

    def read(self, size=-1):
        if size == -1:
            res = self.content[self.pos:]
            self.pos = len(self.content)
            return res
        res = self.content[self.pos:self.pos+size]
        self.pos += len(res)
        return res

    def readline(self):
        lines = self.content[self.pos:].splitlines(True)
        if lines:
            line = lines[0]
            self.pos += len(line)
            return line
        return ""

    def readlines(self):
        lines = self.content[self.pos:].splitlines(True)
        self.pos = len(self.content)
        return lines

    def __iter__(self):
        return iter(self.content.splitlines(True))

    def write(self, s):
        text = str(s)
        self.content += text
        _vfiles[self.filename] = self.content
        _js_sync_file(self.filename, self.content)
        return len(text)

    def writelines(self, seq):
        for item in seq:
            self.write(item)

    def close(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, a, b, c):
        pass

def open(filename, mode="r"):
    return _VirtualFile(filename, mode)
`;

      const preambleLines = preamble.trim().split("\n").length + 1;
      this.preambleLineCount = preambleLines;

      // 4. Clean student code (normalize newlines, convert modern f-strings for Skulpt compatibility)
      const sanitizedCode = this.preprocessPython(code);
      const fullCode = preamble + "\n" + sanitizedCode;

      // 5. Execute with Skulpt async promise
      await Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody("<stdin>", false, fullCode, true);
      });

      if (outputBuffer.trim() === "") {
        captureOutput("(Program finished with no printed output)");
      }

      return { success: true, output: outputBuffer };
    } catch (err) {
      const friendly = this.formatPythonError(err, this.preambleLineCount);
      onError(friendly);
      return { success: false, output: outputBuffer, error: friendly };
    }
  },

  /**
   * Translates Python 3.6+ f-strings into .format() for Skulpt parser compatibility
   * Example: f"Hello {name}!" -> "Hello {}!".format(name)
   */
  preprocessPython(code) {
    if (!code) return "";
    
    // Normalize Windows CRLF to LF
    let cleaned = code.replace(/\r\n/g, "\n");

    // Convert simple f-strings like f"Total: {count}" -> "Total: {}".format(count)
    cleaned = cleaned.replace(/f(["'])((?:(?!\1).)*?)\1/g, (match, quote, inner) => {
      const expressions = [];
      const formatted = inner.replace(/\{([^}]+)\}/g, (_, expr) => {
        expressions.push(expr.trim());
        return "{}";
      });
      if (expressions.length > 0) {
        return `${quote}${formatted}${quote}.format(${expressions.join(", ")})`;
      }
      return `${quote}${inner}${quote}`;
    });

    return cleaned;
  },

  /**
   * Formats Skulpt and Python errors into friendly, pedagogical error cards
   */
  formatPythonError(err, lineOffset = 0) {
    let raw = err ? (err.toString ? err.toString() : String(err)) : "Unknown error";
    
    // Adjust line number if preamble was added
    raw = raw.replace(/line (\d+)/g, (match, numStr) => {
      const rawNum = parseInt(numStr, 10);
      const studentLine = Math.max(1, rawNum - lineOffset);
      return `line ${studentLine}`;
    });

    if (raw.includes("TimeLimitExceeded") || raw.includes("execLimit")) {
      return `⏱️ Time Limit Exceeded: Your code took too long to run!\n👉 Tip: Check for an infinite 'while' loop that never stops. Ensure the loop condition changes each iteration!`;
    }

    if (raw.includes("SyntaxError")) {
      return `❌ SyntaxError: Python spotted a grammar mistake!\n👉 Tip: Check for missing colons (:), unclosed quotes ("..."), or mismatched parentheses ( ).\nDetails: ${raw}`;
    }

    if (raw.includes("IndentationError")) {
      return `❌ IndentationError: Spaces or tabs do not match up!\n👉 Tip: In Python, blocks inside 'if', 'for', 'def', and 'with' must be indented by 4 spaces.\nDetails: ${raw}`;
    }

    if (raw.includes("NameError")) {
      return `❌ NameError: A variable or function name is unrecognized!\n👉 Tip: Check for spelling typos or make sure you created the variable before using it.\nDetails: ${raw}`;
    }

    if (raw.includes("TypeError")) {
      return `❌ TypeError: An operation was performed on incompatible data types!\n👉 Tip: Make sure you are not adding text to a number (use str(x)) or calling a non-function.\nDetails: ${raw}`;
    }

    if (raw.includes("IndexError")) {
      return `❌ IndexError: Tried to access an item out of range!\n👉 Tip: Check if the list is empty or if your index index is larger than len(list) - 1.\nDetails: ${raw}`;
    }

    if (raw.includes("KeyError")) {
      return `❌ KeyError: That dictionary key does not exist!\n👉 Tip: Check spelling or verify if the key was added to the dictionary.\nDetails: ${raw}`;
    }

    if (raw.includes("FileNotFoundError")) {
      return `❌ FileNotFoundError: Could not find that file!\n👉 Tip: Check the filename matches the tab above exactly (e.g. 'events.txt', 'stops.txt').\nDetails: ${raw}`;
    }

    return `❌ Python Error: ${raw}`;
  },

  /**
   * Bundles HTML, CSS, and JS into a standalone live web preview (Lessons 2 & 3)
   */
  bundleWebPreview(htmlContent, cssContent = "", jsContent = "") {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${cssContent}
  </style>
</head>
<body>
  ${htmlContent}
  <script>
    try {
      ${jsContent}
    } catch (err) {
      console.error("Preview Script Error:", err);
    }
  <\/script>
</body>
</html>`;
  }
};
