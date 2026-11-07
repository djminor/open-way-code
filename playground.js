/**
 * OpenWay Code — Student Playground Application Controller
 * Handles virtual filesystem, multi-file editing, laptop saving/importing,
 * in-browser Python (Skulpt) & Web preview execution, and AI Co-Pilot integration.
 */

class PlaygroundApp {
  constructor() {
    this.storageKeyFiles = 'openway_playground_files_v2';
    this.storageKeyActive = 'openway_playground_active_file_v2';
    this.storageKeyTitle = 'openway_playground_title_v2';
    this.storageKeyApiKey = 'openway_gemini_api_key';
    this.storageKeyModel = 'openway_gemini_model';
    this.storageKeyLayout = 'openway_playground_layout';
    this.storageKeyAiHistory = 'openway_playground_ai_chat_v1';

    // State
    this.projectTitle = localStorage.getItem(this.storageKeyTitle) || 'My Coding Adventure';
    this.files = this.loadInitialFiles();
    this.activeFileName = localStorage.getItem(this.storageKeyActive) || 'main.py';
    if (!this.files[this.activeFileName]) {
      this.activeFileName = Object.keys(this.files)[0] || 'main.py';
    }

    this.layoutMode = localStorage.getItem(this.storageKeyLayout) || 'side-by-side';
    this.currentOutputTab = 'terminal'; // 'terminal' | 'preview'
    this.isAiOpen = true;
    this.geminiApiKey = localStorage.getItem(this.storageKeyApiKey) || '';
    this.geminiModel = localStorage.getItem(this.storageKeyModel) || 'gemini-2.0-flash';
    this.theme = localStorage.getItem('openway_theme') || 'dark';

    this.lastOutputBuffer = '';
    this.lastErrorBuffer = '';
    this.saveDebounceTimer = null;

    // Starter Templates
    this.templates = {
      'python-starter': {
        name: '🐍 Python Interactive',
        files: {
          'main.py': `# ==========================================
# OpenWay Code Playground — Python Sandbox
# Press 'Run Code' or hit Ctrl+Enter / Cmd+Enter!
# ==========================================

print("🧭 Welcome to OpenWay Code Playground!")
player_name = input("What is your name, coder? ")

if not player_name.strip():
    player_name = "Adventurer"

print(f"Awesome to meet you, {player_name}!")
print("Here is a quick math experiment:")

numbers = [3, 7, 12, 19, 25]
print("Our list:", numbers)
print("Total sum:", sum(numbers))
print("Average:", sum(numbers) / len(numbers))

print("\\nTip: Click 'AI Co-Pilot' on the right to ask questions,")
print("or click 'Save to Laptop' to keep your files!")
`
        }
      },
      'web-app': {
        name: '🌐 Web App (HTML, CSS, JS)',
        files: {
          'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My Web Playground</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <div class="emblem">✨</div>
    <h1>Hello, World!</h1>
    <p>This web page runs live directly in your browser.</p>
    <div class="counter-box">
      <span id="counterValue">0</span>
      <button id="clickBtn">Click Me!</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
          'style.css': `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.card {
  background: #1e222d;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 36px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  max-width: 380px;
}

.emblem {
  font-size: 42px;
  margin-bottom: 12px;
}

h1 {
  margin: 0 0 10px 0;
  color: #38bdf8;
}

p {
  color: #94a3b8;
  font-size: 14px;
}

.counter-box {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

#counterValue {
  font-size: 28px;
  font-weight: 700;
  color: #4ade80;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, background 0.15s;
}

button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(1px);
}`,
          'script.js': `let count = 0;
const counter = document.getElementById('counterValue');
const btn = document.getElementById('clickBtn');

btn.addEventListener('click', () => {
  count += 1;
  counter.textContent = count;
  
  if (count === 10) {
    alert("🎉 Level 10 reached! You are an official web developer!");
  }
});`
        }
      },
      'adventure-rpg': {
        name: '🎮 Text Adventure RPG',
        files: {
          'main.py': `# ==========================================
# OpenWay Code — The Whispering Forest RPG
# An interactive text-based adventure game!
# ==========================================

def start_game():
    print("🌲 THE WHISPERING FOREST 🌲")
    print("---------------------------------")
    hero_name = input("Enter your hero's name: ")
    if not hero_name.strip():
        hero_name = "Robin"
        
    hp = 20
    inventory = ["Wooden Shield", "Bread"]
    
    print(f"\\nWelcome, {hero_name}! You start with {hp} HP.")
    print("Inventory:", inventory)
    print("\\nYou stand before two dark paths:")
    print("1) Take the winding stone stairs leading into the mountain.")
    print("2) Follow the mossy river deeper into the ancient woods.")
    
    choice = input("\\nWhat do you choose? (1 or 2): ").strip()
    
    if choice == "1":
        print("\\nYou climb the cold stone steps...")
        print("At the top, you find an ancient chest!")
        inventory.append("Sunblade Dagger")
        print("✨ You found a Sunblade Dagger! Added to inventory.")
        print(f"Final Inventory: {inventory}")
        print("🏆 Congratulations, you conquered the mountain!")
    else:
        print("\\nYou follow the babbling mossy river...")
        print("A mischievous river sprite challenges you to a riddle!")
        answer = input("Riddle: What has keys but cannot open locks? ").strip().lower()
        if "piano" in answer:
            print("🌟 'Brilliant!' shouts the sprite. She grants you 10 bonus HP!")
            hp += 10
            print(f"Your final HP is {hp}! You are crowned Forest Guardian!")
        else:
            print(f"The sprite laughs: 'The answer was a piano!' You safely return home.")
            
    print(f"\\nThanks for playing, {hero_name}!")

start_game()
`
        }
      },
      'math-art': {
        name: '📊 Math & Data Art',
        files: {
          'main.py': `# ==========================================
# OpenWay Code — Math & Data Visualizer
# Prime numbers, Fibonacci, and ASCII charts!
# ==========================================

print("=== 1. FIBONACCI GENERATOR ===")
def fibonacci(n):
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

print("First 12 Fibonacci numbers:")
print(fibonacci(12))

print("\\n=== 2. ASCII DATA BAR CHART ===")
scores = {
    "Python": 95,
    "HTML": 88,
    "CSS": 78,
    "JavaScript": 85,
    "Algorithms": 92
}

for subject, score in scores.items():
    bars = "█" * (score // 5)
    print(f"{subject:12} | {bars} ({score}%)")

print("\\n=== 3. PRIME NUMBER CHECKER ===")
def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

primes_under_50 = [x for x in range(2, 50) if is_prime(x)]
print("Primes below 50:", primes_under_50)
`
        }
      },
      'blank': {
        name: '📄 Blank Canvas',
        files: {
          'main.py': `# Write your Python code here!\nprint("Hello from a blank canvas!")\n`
        }
      }
    };

    this.initElements();
    this.applyTheme(this.theme);
    this.applyLayout(this.layoutMode);
    this.bindEvents();
    this.renderTabs();
    this.loadActiveFile();
    this.initAiChat();
  }

  loadInitialFiles() {
    try {
      const saved = localStorage.getItem(this.storageKeyFiles);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load saved playground files:", e);
    }
    // Default starter
    return { ...this.templates['python-starter'].files };
  }

  saveFilesToStorage() {
    try {
      localStorage.setItem(this.storageKeyFiles, JSON.stringify(this.files));
      localStorage.setItem(this.storageKeyActive, this.activeFileName);
      localStorage.setItem(this.storageKeyTitle, this.projectTitle);
      this.showSaveIndicator("🟢 All changes saved");
    } catch (e) {
      console.warn("Storage quota or error saving files:", e);
    }
  }

  initElements() {
    // Header
    this.projectTitleInput = document.getElementById('projectTitleInput');
    this.templateSelector = document.getElementById('templateSelector');
    this.btnNewFile = document.getElementById('btnNewFile');
    this.btnImportFile = document.getElementById('btnImportFile');
    this.filePicker = document.getElementById('filePicker');
    this.btnSaveFile = document.getElementById('btnSaveFile');
    this.btnExportAll = document.getElementById('btnExportAll');
    this.btnRunCode = document.getElementById('btnRunCode');
    this.btnToggleAi = document.getElementById('btnToggleAi');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');

    // Workspace & Editor
    this.mainArea = document.getElementById('mainArea');
    this.tabsList = document.getElementById('tabsList');
    this.btnNewTabInline = document.getElementById('btnNewTabInline');
    this.codeEditor = document.getElementById('codeEditor');
    this.lineNumbers = document.getElementById('lineNumbers');
    this.cursorPosText = document.getElementById('cursorPosText');
    this.linesCountText = document.getElementById('linesCountText');
    this.activeFileLangText = document.getElementById('activeFileLangText');
    this.saveStatusText = document.getElementById('saveStatusText');
    this.btnResetStarter = document.getElementById('btnResetStarter');

    // Output & Preview
    this.tabOutputTerminal = document.getElementById('tabOutputTerminal');
    this.tabOutputPreview = document.getElementById('tabOutputPreview');
    this.btnClearConsole = document.getElementById('btnClearConsole');
    this.btnCopyOutput = document.getElementById('btnCopyOutput');
    this.btnToggleLayout = document.getElementById('btnToggleLayout');
    this.terminalWrapper = document.getElementById('terminalWrapper');
    this.terminalOutput = document.getElementById('terminalOutput');
    this.previewWrapper = document.getElementById('previewWrapper');
    this.previewFrame = document.getElementById('previewFrame');

    // AI Drawer & Chat
    this.aiDrawer = document.getElementById('aiDrawer');
    this.btnCloseAi = document.getElementById('btnCloseAi');
    this.btnAiSettings = document.getElementById('btnAiSettings');
    this.aiStatusTag = document.getElementById('aiStatusTag');
    this.aiChatStream = document.getElementById('aiChatStream');
    this.aiPromptInput = document.getElementById('aiPromptInput');
    this.btnSendAiPrompt = document.getElementById('btnSendAiPrompt');

    // AI Settings Modal
    this.aiSettingsModal = document.getElementById('aiSettingsModal');
    this.geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
    this.geminiModelSelect = document.getElementById('geminiModelSelect');
    this.btnSaveAiSettings = document.getElementById('btnSaveAiSettings');
    this.btnCloseAiSettings = document.getElementById('btnCloseAiSettings');

    // Set initial values
    if (this.projectTitleInput) this.projectTitleInput.value = this.projectTitle;
    if (this.geminiApiKeyInput) this.geminiApiKeyInput.value = this.geminiApiKey;
    if (this.geminiModelSelect) this.geminiModelSelect.value = this.geminiModel;
    this.updateAiStatusTag();
  }

  bindEvents() {
    // Project title rename
    if (this.projectTitleInput) {
      this.projectTitleInput.addEventListener('input', () => {
        this.projectTitle = this.projectTitleInput.value.trim() || 'Untitled Project';
        localStorage.setItem(this.storageKeyTitle, this.projectTitle);
        document.title = `${this.projectTitle} — OpenWay Code`;
      });
    }

    // Template Selector
    if (this.templateSelector) {
      this.templateSelector.addEventListener('change', (e) => {
        const key = e.target.value;
        if (this.templates[key]) {
          const confirmSwitch = confirm(`Load "${this.templates[key].name}" starter? This will replace current files in your playground. (Tip: Download your current files first if you want to keep them!)`);
          if (confirmSwitch) {
            this.files = { ...this.templates[key].files };
            this.activeFileName = Object.keys(this.files)[0];
            this.renderTabs();
            this.loadActiveFile();
            this.saveFilesToStorage();
            if (this.isHtmlFile(this.activeFileName)) {
              this.setOutputTab('preview');
              this.refreshWebPreview();
            } else {
              this.setOutputTab('terminal');
              this.clearTerminal();
              this.appendTerminalOutput(`Loaded ${this.templates[key].name} template! Click 'Run Code' to execute.\\n`, 'term-info');
            }
          }
        }
      });
    }

    // New File Buttons
    if (this.btnNewFile) this.btnNewFile.addEventListener('click', () => this.promptNewFile());
    if (this.btnNewTabInline) this.btnNewTabInline.addEventListener('click', () => this.promptNewFile());

    // Import from Laptop
    if (this.btnImportFile && this.filePicker) {
      this.btnImportFile.addEventListener('click', () => this.filePicker.click());
      this.filePicker.addEventListener('change', (e) => this.handleFileImport(e));
    }

    // Save to Laptop
    if (this.btnSaveFile) this.btnSaveFile.addEventListener('click', () => this.saveActiveFileToLaptop());
    if (this.btnExportAll) this.btnExportAll.addEventListener('click', () => this.exportAllFilesToLaptop());

    // Run Code
    if (this.btnRunCode) this.btnRunCode.addEventListener('click', () => this.runActiveCode());

    // AI Drawer Toggle
    if (this.btnToggleAi) this.btnToggleAi.addEventListener('click', () => this.toggleAiDrawer());
    if (this.btnCloseAi) this.btnCloseAi.addEventListener('click', () => this.toggleAiDrawer(false));

    // Theme Toggle
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.theme);
      });
    }

    // Reset starter
    if (this.btnResetStarter) {
      this.btnResetStarter.addEventListener('click', () => {
        if (confirm("Reset current file to starter template?")) {
          this.resetCurrentFile();
        }
      });
    }

    // Code Editor handling
    if (this.codeEditor) {
      this.codeEditor.addEventListener('input', () => {
        this.saveCurrentEditorState();
        this.updateLineNumbers();
        this.updateCursorPosition();
        if (this.isHtmlFile(this.activeFileName)) {
          this.refreshWebPreview();
        }
      });

      this.codeEditor.addEventListener('scroll', () => {
        if (this.lineNumbers) this.lineNumbers.scrollTop = this.codeEditor.scrollTop;
      });

      this.codeEditor.addEventListener('keyup', () => this.updateCursorPosition());
      this.codeEditor.addEventListener('click', () => this.updateCursorPosition());

      this.codeEditor.addEventListener('keydown', (e) => {
        // Tab indentation (4 spaces)
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = this.codeEditor.selectionStart;
          const end = this.codeEditor.selectionEnd;
          this.codeEditor.value = this.codeEditor.value.substring(0, start) + '    ' + this.codeEditor.value.substring(end);
          this.codeEditor.selectionStart = this.codeEditor.selectionEnd = start + 4;
          this.saveCurrentEditorState();
          this.updateLineNumbers();
          this.updateCursorPosition();
        }

        // Run shortcut: Cmd+Enter or Ctrl+Enter
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
          e.preventDefault();
          this.runActiveCode();
        }
      });
    }

    // Output tabs & controls
    if (this.tabOutputTerminal) {
      this.tabOutputTerminal.addEventListener('click', () => this.setOutputTab('terminal'));
    }
    if (this.tabOutputPreview) {
      this.tabOutputPreview.addEventListener('click', () => {
        this.setOutputTab('preview');
        this.refreshWebPreview();
      });
    }
    if (this.btnClearConsole) this.btnClearConsole.addEventListener('click', () => this.clearTerminal());
    if (this.btnCopyOutput) this.btnCopyOutput.addEventListener('click', () => this.copyOutputToClipboard());
    if (this.btnToggleLayout) this.btnToggleLayout.addEventListener('click', () => this.toggleLayoutMode());

    // AI Drawer Events
    if (this.btnAiSettings) this.btnAiSettings.addEventListener('click', () => this.toggleAiSettingsModal(true));
    if (this.btnCloseAiSettings) this.btnCloseAiSettings.addEventListener('click', () => this.toggleAiSettingsModal(false));
    if (this.aiSettingsModal) {
      this.aiSettingsModal.addEventListener('click', (e) => {
        if (e.target === this.aiSettingsModal) this.toggleAiSettingsModal(false);
      });
    }
    if (this.btnSaveAiSettings) this.btnSaveAiSettings.addEventListener('click', () => this.saveAiSettings());

    if (this.btnSendAiPrompt) this.btnSendAiPrompt.addEventListener('click', () => this.handleAiPromptSubmit());
    if (this.aiPromptInput) {
      this.aiPromptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleAiPromptSubmit();
        }
      });
    }

    // AI Chips
    document.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptType = btn.getAttribute('data-prompt-type');
        this.handleAiQuickPrompt(promptType);
      });
    });

    // Window global key shortcuts
    window.addEventListener('keydown', (e) => {
      // Toggle AI with Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        this.toggleAiDrawer();
      }
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('openway_theme', theme);
    if (this.themeToggleBtn) {
      this.themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  applyLayout(mode) {
    this.layoutMode = mode;
    localStorage.setItem(this.storageKeyLayout, mode);
    if (this.mainArea) {
      this.mainArea.classList.remove('side-by-side', 'stacked');
      this.mainArea.classList.add(mode);
    }
    if (this.btnToggleLayout) {
      this.btnToggleLayout.innerHTML = mode === 'side-by-side' ? '🗂️ Stacked' : '🪟 Side-by-Side';
    }
  }

  toggleLayoutMode() {
    const nextMode = this.layoutMode === 'side-by-side' ? 'stacked' : 'side-by-side';
    this.applyLayout(nextMode);
  }

  toggleAiDrawer(forceState) {
    const isNowOpen = forceState !== undefined ? forceState : this.aiDrawer.classList.contains('collapsed');
    this.aiDrawer.classList.toggle('collapsed', !isNowOpen);
    if (this.btnToggleAi) {
      this.btnToggleAi.classList.toggle('active', isNowOpen);
    }
    this.isAiOpen = isNowOpen;
  }

  // =========================================================================
  // Virtual Filesystem & Tab Management
  // =========================================================================

  renderTabs() {
    if (!this.tabsList) return;
    this.tabsList.innerHTML = '';

    const fileNames = Object.keys(this.files);
    fileNames.forEach(filename => {
      const pill = document.createElement('div');
      pill.className = `playground-tab-pill ${filename === this.activeFileName ? 'active' : ''}`;
      
      const fileIcon = this.getFileIcon(filename);
      pill.innerHTML = `<span>${fileIcon}</span> <span>${this.escapeHtml(filename)}</span>`;

      // Allow closing if more than 1 file
      if (fileNames.length > 1) {
        const closeSpan = document.createElement('span');
        closeSpan.className = 'tab-close-btn';
        closeSpan.innerHTML = '&times;';
        closeSpan.title = `Delete ${filename}`;
        closeSpan.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deleteFile(filename);
        });
        pill.appendChild(closeSpan);
      }

      pill.addEventListener('click', () => {
        this.switchActiveFile(filename);
      });

      this.tabsList.appendChild(pill);
    });
  }

  getFileIcon(filename) {
    if (filename.endsWith('.py')) return '🐍';
    if (filename.endsWith('.html')) return '🌐';
    if (filename.endsWith('.css')) return '🎨';
    if (filename.endsWith('.js')) return '⚡';
    if (filename.endsWith('.json')) return '📦';
    if (filename.endsWith('.csv') || filename.endsWith('.txt')) return '📄';
    return '📝';
  }

  isHtmlFile(filename) {
    return filename.endsWith('.html') || filename.endsWith('.htm');
  }

  switchActiveFile(filename) {
    if (!this.files[filename]) return;
    this.saveCurrentEditorState();
    this.activeFileName = filename;
    localStorage.setItem(this.storageKeyActive, filename);
    this.renderTabs();
    this.loadActiveFile();
  }

  loadActiveFile() {
    const content = this.files[this.activeFileName] !== undefined ? this.files[this.activeFileName] : '';
    if (this.codeEditor) {
      this.codeEditor.value = content;
      this.updateLineNumbers();
      this.updateCursorPosition();
    }
    if (this.activeFileLangText) {
      const ext = this.activeFileName.split('.').pop().toUpperCase();
      this.activeFileLangText.textContent = `${this.activeFileName} (${ext})`;
    }
    if (this.btnSaveFile) {
      this.btnSaveFile.title = `Download ${this.activeFileName} to your laptop`;
    }
  }

  saveCurrentEditorState() {
    if (!this.codeEditor) return;
    this.files[this.activeFileName] = this.codeEditor.value;

    clearTimeout(this.saveDebounceTimer);
    this.saveDebounceTimer = setTimeout(() => {
      this.saveFilesToStorage();
    }, 400);
  }

  promptNewFile() {
    const raw = prompt("Enter a filename for your new file (e.g. helper.py, data.txt, style.css):", "script.py");
    if (!raw) return;
    const name = raw.trim();
    if (!name) return;

    if (this.files[name]) {
      alert(`A file named "${name}" already exists! Switching to it.`);
      this.switchActiveFile(name);
      return;
    }

    let defaultContent = "";
    if (name.endsWith('.py')) {
      defaultContent = `# ${name}\n\ndef main():\n    print("Running ${name}...")\n\nif __name__ == "__main__":\n    main()\n`;
    } else if (name.endsWith('.html')) {
      defaultContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>New Page</title>\n</head>\n<body>\n  <h1>${name}</h1>\n</body>\n</html>\n`;
    } else if (name.endsWith('.css')) {
      defaultContent = `/* Styles for ${name} */\nbody {\n  font-family: sans-serif;\n  margin: 20px;\n}\n`;
    } else if (name.endsWith('.js')) {
      defaultContent = `// JavaScript logic for ${name}\nconsole.log("Loaded ${name}");\n`;
    }

    this.files[name] = defaultContent;
    this.activeFileName = name;
    this.saveFilesToStorage();
    this.renderTabs();
    this.loadActiveFile();
  }

  deleteFile(filename) {
    if (Object.keys(this.files).length <= 1) {
      alert("Cannot delete the only remaining file!");
      return;
    }

    if (confirm(`Are you sure you want to delete "${filename}"?`)) {
      delete this.files[filename];
      if (this.activeFileName === filename) {
        this.activeFileName = Object.keys(this.files)[0];
      }
      this.saveFilesToStorage();
      this.renderTabs();
      this.loadActiveFile();
    }
  }

  resetCurrentFile() {
    if (this.codeEditor) {
      this.codeEditor.value = `# Blank Python Canvas\nprint("Hello World!")\n`;
      this.saveCurrentEditorState();
      this.updateLineNumbers();
    }
  }

  updateLineNumbers() {
    if (!this.codeEditor || !this.lineNumbers) return;
    const lines = this.codeEditor.value.split('\n').length;
    let numStr = '';
    for (let i = 1; i <= lines; i++) {
      numStr += i + '\n';
    }
    this.lineNumbers.textContent = numStr;
    this.lineNumbers.style.minWidth = lines >= 100 ? '58px' : '46px';
    if (this.linesCountText) {
      this.linesCountText.textContent = `${lines} ${lines === 1 ? 'line' : 'lines'}`;
    }
  }

  updateCursorPosition() {
    if (!this.codeEditor || !this.cursorPosText) return;
    const text = this.codeEditor.value;
    const selStart = this.codeEditor.selectionStart;
    const sub = text.substring(0, selStart);
    const line = sub.split('\n').length;
    const col = sub.length - sub.lastIndexOf('\n');
    this.cursorPosText.textContent = `Ln ${line}, Col ${col}`;
  }

  showSaveIndicator(text) {
    if (!this.saveStatusText) return;
    this.saveStatusText.textContent = text;
    this.saveStatusText.style.opacity = '1';
    setTimeout(() => {
      if (this.saveStatusText) this.saveStatusText.style.opacity = '0.7';
    }, 1500);
  }

  // =========================================================================
  // Save to Laptop & Import Files (Local Filesystem)
  // =========================================================================

  saveActiveFileToLaptop() {
    this.saveCurrentEditorState();
    const content = this.files[this.activeFileName] || '';
    this.downloadFileBlob(this.activeFileName, content);
    this.appendTerminalOutput(`💾 Downloaded '${this.activeFileName}' to your laptop Downloads folder!\\n`, 'term-stdout');
  }

  exportAllFilesToLaptop() {
    this.saveCurrentEditorState();
    const filenames = Object.keys(this.files);

    if (filenames.length === 0) {
      alert("No files to export!");
      return;
    }

    // 1. Download each file individually
    filenames.forEach((fname, index) => {
      setTimeout(() => {
        this.downloadFileBlob(fname, this.files[fname]);
      }, index * 200); // 200ms stagger prevents browser download throttle
    });

    // 2. Also download a complete JSON bundle manifest
    const projectBundle = {
      projectTitle: this.projectTitle,
      exportDate: new Date().toISOString(),
      files: this.files
    };
    setTimeout(() => {
      const manifestName = `${this.projectTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}_bundle.json`;
      this.downloadFileBlob(manifestName, JSON.stringify(projectBundle, null, 2));
    }, filenames.length * 200 + 100);

    this.appendTerminalOutput(`📦 Exported all ${filenames.length} files + project bundle to your laptop!\\n`, 'term-stdout');
  }

  downloadFileBlob(filename, textContent) {
    let mimeType = 'text/plain;charset=utf-8';
    if (filename.endsWith('.html')) mimeType = 'text/html;charset=utf-8';
    if (filename.endsWith('.css')) mimeType = 'text/css;charset=utf-8';
    if (filename.endsWith('.js')) mimeType = 'application/javascript;charset=utf-8';
    if (filename.endsWith('.json')) mimeType = 'application/json;charset=utf-8';

    const blob = new Blob([textContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  handleFileImport(e) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    let filesImportedCount = 0;
    Array.from(fileList).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        
        // If imported a project bundle JSON
        if (file.name.endsWith('_bundle.json')) {
          try {
            const bundle = JSON.parse(content);
            if (bundle && bundle.files) {
              Object.assign(this.files, bundle.files);
              if (bundle.projectTitle) {
                this.projectTitle = bundle.projectTitle;
                if (this.projectTitleInput) this.projectTitleInput.value = this.projectTitle;
              }
              this.activeFileName = Object.keys(bundle.files)[0] || this.activeFileName;
              this.saveFilesToStorage();
              this.renderTabs();
              this.loadActiveFile();
              this.appendTerminalOutput(`📂 Imported project bundle '${file.name}' with ${Object.keys(bundle.files).length} files!\\n`, 'term-info');
              return;
            }
          } catch (err) {
            console.warn("Could not parse as bundle, importing as text:", err);
          }
        }

        // Standard file import
        this.files[file.name] = content;
        filesImportedCount++;
        this.activeFileName = file.name;
        this.saveFilesToStorage();
        this.renderTabs();
        this.loadActiveFile();
        this.appendTerminalOutput(`📂 Imported '${file.name}' (${(file.size / 1024).toFixed(1)} KB) into playground!\\n`, 'term-info');
      };
      reader.readAsText(file);
    });

    // Reset input
    this.filePicker.value = '';
  }

  // =========================================================================
  // Code Execution Engine (Python via Skulpt & Web Preview)
  // =========================================================================

  setOutputTab(tab) {
    this.currentOutputTab = tab;
    if (this.tabOutputTerminal) this.tabOutputTerminal.classList.toggle('active', tab === 'terminal');
    if (this.tabOutputPreview) this.tabOutputPreview.classList.toggle('active', tab === 'preview');

    if (this.terminalWrapper) this.terminalWrapper.style.display = tab === 'terminal' ? 'flex' : 'none';
    if (this.previewWrapper) this.previewWrapper.style.display = tab === 'preview' ? 'flex' : 'none';
  }

  clearTerminal() {
    if (this.terminalOutput) this.terminalOutput.innerHTML = '';
    this.lastOutputBuffer = '';
    this.lastErrorBuffer = '';
  }

  appendTerminalOutput(text, cssClass = 'term-stdout') {
    if (!this.terminalOutput) return;
    const span = document.createElement('span');
    span.className = cssClass;
    span.textContent = text;
    this.terminalOutput.appendChild(span);
    this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
  }

  copyOutputToClipboard() {
    if (!this.terminalOutput) return;
    const text = this.terminalOutput.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      const orig = this.btnCopyOutput.innerHTML;
      this.btnCopyOutput.innerHTML = '✓ Copied';
      setTimeout(() => { if (this.btnCopyOutput) this.btnCopyOutput.innerHTML = orig; }, 1500);
    });
  }

  refreshWebPreview() {
    if (!this.previewFrame) return;

    let html = this.files['index.html'] || this.files[this.activeFileName] || '<h1>No HTML content</h1>';
    let css = this.files['style.css'] || this.files['styles.css'] || '';
    let js = this.files['script.js'] || this.files['app.js'] || '';

    // If running another HTML file
    if (this.isHtmlFile(this.activeFileName)) {
      html = this.files[this.activeFileName];
    }

    const docBundle = PlaygroundRunner.bundleWebPreview(html, css, js);
    this.previewFrame.srcdoc = docBundle;
  }

  async runActiveCode() {
    this.saveCurrentEditorState();

    // 1. If HTML file, switch to Web Preview
    if (this.isHtmlFile(this.activeFileName)) {
      this.setOutputTab('preview');
      this.refreshWebPreview();
      return;
    }

    // 2. If CSS or JS and index.html exists, refresh preview
    if ((this.activeFileName.endsWith('.css') || this.activeFileName.endsWith('.js')) && this.files['index.html']) {
      this.setOutputTab('preview');
      this.refreshWebPreview();
      return;
    }

    // 3. Otherwise, run as Python via Skulpt
    this.setOutputTab('terminal');
    this.clearTerminal();

    const codeToRun = this.files[this.activeFileName] || '';
    this.appendTerminalOutput(`▶ Running '${this.activeFileName}' in Python 3...\\n`, 'term-info');

    const startTime = performance.now();
    this.lastOutputBuffer = '';
    this.lastErrorBuffer = '';

    const result = await PlaygroundRunner.runPython(codeToRun, this.files, {
      onOutput: (text) => {
        this.lastOutputBuffer += text;
        this.appendTerminalOutput(text, 'term-stdout');
      },
      onError: (err) => {
        this.lastErrorBuffer = err;
        this.appendTerminalOutput(err + '\\n', 'term-stderr');
      },
      onFileWritten: (filename, content) => {
        this.files[filename] = content;
        this.renderTabs();
        this.saveFilesToStorage();
        this.appendTerminalOutput(`\\n[Virtual File System: Wrote ${content.length} bytes to '${filename}']\\n`, 'term-info');
      }
    });

    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    if (result.success) {
      this.appendTerminalOutput(`\\n✨ Process finished successfully in ${elapsed}s\\n`, 'term-info');
    } else {
      this.appendTerminalOutput(`\\n⚠️ Execution ended with errors (${elapsed}s)\\n`, 'term-stderr');
    }
  }

  // =========================================================================
  // AI Co-Pilot & Pedagogical Offline/Online Engine
  // =========================================================================

  initAiChat() {
    // Check if chat stream is empty, provide welcoming opening
    if (this.aiChatStream && this.aiChatStream.children.length === 0) {
      this.renderAiMessage('assistant', `👋 **Hello young coder!** I'm your **OpenWay AI Co-Pilot**.

I'm here to help you write code, explain tricky concepts, spot bugs, and brainstorm fun project ideas.

You can click any of the **quick chips** above, or type your question below!`);
    }
  }

  updateAiStatusTag() {
    if (!this.aiStatusTag) return;
    if (this.geminiApiKey) {
      this.aiStatusTag.textContent = 'Gemini 2.0 Live';
      this.aiStatusTag.style.borderColor = '#10b981';
      this.aiStatusTag.style.color = '#34d399';
    } else {
      this.aiStatusTag.textContent = 'Offline Tutor';
      this.aiStatusTag.style.borderColor = 'rgba(168, 85, 247, 0.35)';
      this.aiStatusTag.style.color = '#c084fc';
    }
  }

  toggleAiSettingsModal(open) {
    if (!this.aiSettingsModal) return;
    this.aiSettingsModal.classList.toggle('open', open);
    if (open) {
      if (this.geminiApiKeyInput) this.geminiApiKeyInput.value = this.geminiApiKey;
      if (this.geminiModelSelect) this.geminiModelSelect.value = this.geminiModel;
    }
  }

  saveAiSettings() {
    if (this.geminiApiKeyInput) {
      this.geminiApiKey = this.geminiApiKeyInput.value.trim();
      localStorage.setItem(this.storageKeyApiKey, this.geminiApiKey);
    }
    if (this.geminiModelSelect) {
      this.geminiModel = this.geminiModelSelect.value;
      localStorage.setItem(this.storageKeyModel, this.geminiModel);
    }
    this.updateAiStatusTag();
    this.toggleAiSettingsModal(false);
    this.renderAiMessage('assistant', `⚙️ AI settings updated! Current mode: **${this.geminiApiKey ? 'Gemini Live (' + this.geminiModel + ')' : 'Built-in Offline Educational Tutor'}**.`);
  }

  renderAiMessage(role, text) {
    if (!this.aiChatStream) return;

    const msg = document.createElement('div');
    msg.className = `ai-msg ${role}`;

    // Format Markdown code blocks and bolding
    let formattedHtml = this.formatMarkdown(text);
    msg.innerHTML = formattedHtml;

    // Attach code actions (Copy & Insert)
    const codeBlocks = msg.querySelectorAll('pre code');
    codeBlocks.forEach(codeEl => {
      const rawCode = codeEl.textContent;
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'ai-code-actions';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn-ai-code-action';
      copyBtn.textContent = '📋 Copy';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(rawCode).then(() => {
          copyBtn.textContent = '✓ Copied';
          setTimeout(() => { copyBtn.textContent = '📋 Copy'; }, 1500);
        });
      });

      const insertBtn = document.createElement('button');
      insertBtn.className = 'btn-ai-code-action';
      insertBtn.textContent = '📥 Insert into Editor';
      insertBtn.addEventListener('click', () => {
        this.insertCodeIntoEditor(rawCode);
      });

      actionsDiv.appendChild(copyBtn);
      actionsDiv.appendChild(insertBtn);
      codeEl.parentElement.appendChild(actionsDiv);
    });

    this.aiChatStream.appendChild(msg);
    this.aiChatStream.scrollTop = this.aiChatStream.scrollHeight;
  }

  insertCodeIntoEditor(code) {
    if (!this.codeEditor) return;
    const start = this.codeEditor.selectionStart;
    const end = this.codeEditor.selectionEnd;
    const current = this.codeEditor.value;

    const newContent = current.substring(0, start) + '\n' + code + '\n' + current.substring(end);
    this.codeEditor.value = newContent;
    this.saveCurrentEditorState();
    this.updateLineNumbers();
    this.updateCursorPosition();
    this.showSaveIndicator("📥 Code snippet inserted!");
  }

  formatMarkdown(raw) {
    if (!raw) return '';
    let escaped = this.escapeHtml(raw);

    // Code blocks ```python ... ```
    escaped = escaped.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code class="lang-${lang}">${code.trim()}</code></pre>`;
    });

    // Inline code `...`
    escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold **text**
    escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Newlines to <br> outside <pre>
    const parts = escaped.split(/(<pre>[\s\S]*?<\/pre>)/);
    const converted = parts.map(part => {
      if (part.startsWith('<pre>')) return part;
      return part.replace(/\n/g, '<br>');
    }).join('');

    return converted;
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async handleAiQuickPrompt(promptType) {
    this.toggleAiDrawer(true);
    const currentCode = this.files[this.activeFileName] || '';

    if (promptType === 'explain') {
      const userText = `Can you explain what my code in '${this.activeFileName}' does?`;
      this.renderAiMessage('user', userText);
      await this.generateAiResponse(userText, 'explain');
    } else if (promptType === 'debug') {
      const userText = `Help me debug my code in '${this.activeFileName}'. Are there any bugs or syntax issues?`;
      this.renderAiMessage('user', userText);
      await this.generateAiResponse(userText, 'debug');
    } else if (promptType === 'ideas') {
      const userText = `What are some cool features or project ideas I can add to this project next?`;
      this.renderAiMessage('user', userText);
      await this.generateAiResponse(userText, 'ideas');
    } else if (promptType === 'tests') {
      const userText = `Can you suggest some test cases or inputs I should try to test this code?`;
      this.renderAiMessage('user', userText);
      await this.generateAiResponse(userText, 'tests');
    }
  }

  async handleAiPromptSubmit() {
    if (!this.aiPromptInput) return;
    const text = this.aiPromptInput.value.trim();
    if (!text) return;

    this.aiPromptInput.value = '';
    this.renderAiMessage('user', text);
    await this.generateAiResponse(text, 'general');
  }

  async generateAiResponse(userPrompt, intent = 'general') {
    const currentCode = this.files[this.activeFileName] || '';
    const lastError = this.lastErrorBuffer;

    // Show temporary thinking bubble
    const thinkingId = 'thinking_' + Date.now();
    const thinkingMsg = document.createElement('div');
    thinkingMsg.className = 'ai-msg assistant';
    thinkingMsg.id = thinkingId;
    thinkingMsg.innerHTML = `<em>Thinking... 🤖</em>`;
    this.aiChatStream.appendChild(thinkingMsg);
    this.aiChatStream.scrollTop = this.aiChatStream.scrollHeight;

    try {
      let replyText = '';

      // If user provided a Gemini API Key, call Gemini API
      if (this.geminiApiKey) {
        replyText = await this.callGeminiApi(userPrompt, currentCode, lastError);
      } else {
        // Built-in offline intelligent educational tutor
        replyText = this.runOfflinePedagogicalTutor(userPrompt, intent, currentCode, lastError);
      }

      // Remove thinking element and render response
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) thinkingEl.remove();

      this.renderAiMessage('assistant', replyText);
    } catch (err) {
      console.error("AI Generation error:", err);
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) thinkingEl.remove();

      // Graceful fallback to offline tutor
      const fallback = this.runOfflinePedagogicalTutor(userPrompt, intent, currentCode, lastError);
      this.renderAiMessage('assistant', `*(Gemini API request note: ${err.message || 'Connecting to offline mentor mode'})*\n\n` + fallback);
    }
  }

  // =========================================================================
  // Google Gemini API Client (Browser REST Integration)
  // =========================================================================

  async callGeminiApi(userPrompt, currentCode, lastError) {
    const model = this.geminiModel || 'gemini-2.0-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.geminiApiKey}`;

    const systemPrompt = `You are OpenWay Co-Pilot, an encouraging, patient coding tutor for middle and high school students in a community coding lab.
Guidelines:
1. Explain concepts simply and clearly with friendly, supportive language.
2. Break explanations into digestible steps.
3. When providing code fixes or new features, put them in markdown code blocks (\`\`\`python or \`\`\`html) with helpful comments.
4. Encourage the student to think through the problem and celebrate their progress!`;

    const contextText = `Active file: '${this.activeFileName}'
Current Code:
\`\`\`
${currentCode}
\`\`\`
${lastError ? `Latest execution error:\n${lastError}\n` : ''}

Student question:
${userPrompt}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\n${contextText}` }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(errorJson.error ? errorJson.error.message : `HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates && data.candidates[0];
    if (candidate && candidate.content && candidate.content.parts) {
      return candidate.content.parts.map(p => p.text).join('\n');
    }
    return "I couldn't generate a response. Please try asking again!";
  }

  // =========================================================================
  // Built-in Offline Educational Rule-Engine
  // =========================================================================

  runOfflinePedagogicalTutor(userPrompt, intent, code, lastError) {
    const trimmed = code.trim();
    const isPy = this.activeFileName.endsWith('.py');
    const isHtml = this.isHtmlFile(this.activeFileName);

    // 1. Debugging intent or existing runtime error
    if (intent === 'debug' || lastError) {
      if (lastError) {
        if (lastError.includes('SyntaxError')) {
          return `🔍 **Debugging Analysis: SyntaxError Found!**

Python spotted a grammar issue in your code.
**Most common culprits:**
1. Missing colon (\`:\`) at the end of an \`if\`, \`def\`, \`for\`, or \`while\` line.
2. Unclosed quotation marks (\`"...\` or \`'...\`).
3. Mismatched parentheses or brackets (\`(\` without \`)\`).

\`\`\`python
# Check your loops & conditions end with a colon!
if score > 10:
    print("High score!")
\`\`\`
Look at the line number reported in your terminal and check the end of that line!`;
        }
        if (lastError.includes('IndentationError')) {
          return `🔍 **Debugging Analysis: IndentationError Spotted!**

In Python, blocks of code inside an \`if\`, \`for\`, or \`def\` must be indented consistently.
**How to fix:**
- Select the indented line and press **Tab** or indent with 4 spaces.
- Make sure you don't mix tabs and spaces.

\`\`\`python
def greet():
    # Everything inside the function is indented 4 spaces
    print("Welcome!")
\`\`\``;
        }
        if (lastError.includes('NameError')) {
          return `🔍 **Debugging Analysis: NameError Spotted!**

Python encountered a variable or function name that hasn't been defined yet.
**Tips to check:**
1. Check for spelling typos (e.g. \`score\` vs \`scores\`).
2. Remember Python is case-sensitive: \`Player\` and \`player\` are different names!
3. Ensure you created the variable **before** using it on later lines.`;
        }
      }

      // Check simple heuristic bugs in Python
      if (isPy) {
        const lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if ((line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('while ') || line.startsWith('def ')) && !line.endsWith(':')) {
            return `💡 **Found a potential bug on Line ${i + 1}:**

The line \`${line}\` is missing a colon (\`:\`) at the end! In Python, all conditional and function header lines must end with \`:\`.

\`\`\`python
${line}:
\`\`\``;
          }
        }
      }

      return `✅ **Code Review: No obvious syntax mistakes detected!**

Your code structure looks clean. If the output isn't what you expected:
1. Use \`print(f"DEBUG: variable is {var}")\` to trace values during execution.
2. Make sure your conditions in \`if\` statements check the right variables.
3. If using \`input()\`, remember that \`input()\` always returns text (a string). To use numbers, convert it with \`int(input())\`!`;
    }

    // 2. Explain code intent
    if (intent === 'explain') {
      if (!trimmed) {
        return `Your active file \`${this.activeFileName}\` is currently empty! Add some code or load a template to get started.`;
      }

      if (isPy) {
        const hasDef = trimmed.includes('def ');
        const hasLoops = trimmed.includes('for ') || trimmed.includes('while ');
        const hasInput = trimmed.includes('input(');
        const hasList = trimmed.includes('[') && trimmed.includes(']');

        return `📘 **Code Breakdown for '${this.activeFileName}':**

Here is what your Python program is doing:
- **Structure:** It contains ${trimmed.split('\n').length} lines of Python code.
${hasDef ? '- 📦 **Functions:** Defines custom functions using `def` to keep code organized.' : ''}
${hasInput ? '- 🗣️ **Interactivity:** Uses `input()` to prompt the user and listen to their choices.' : ''}
${hasLoops ? '- 🔄 **Repetition:** Uses loops (`for` or `while`) to iterate over data or repeat actions.' : ''}
${hasList ? '- 📋 **Data Storage:** Uses lists `[...]` to store collections of items.' : ''}

**Tip:** Try clicking **Run Code** and see how each print statement appears in order in the terminal!`;
      }

      if (isHtml) {
        return `🌐 **Web Page Structure for '${this.activeFileName}':**

This file creates the HTML skeleton of your web app:
- Elements like \`<h1>\`, \`<p>\`, and \`<button>\` build the interactive interface.
- It links to your \`style.css\` for visual colors and layout.
- It connects to \`script.js\` for interactive click behaviors.
Click the **Live Web Preview** tab in the output pane to see your web design in action!`;
      }
    }

    // 3. Project ideas intent
    if (intent === 'ideas') {
      if (isPy) {
        return `🚀 **Exciting Project Ideas You Can Build Right Now:**

1. **🎮 Mystery Number Guessing Game:**
   Computer picks a secret number from 1 to 100, and tells the player "Higher!" or "Lower!" until they guess it.
2. **⚔️ Turn-Based Battle Arena:**
   Create a player and a monster with HP. Each turn, choose to "Attack", "Heal", or "Flee"!
3. **📜 Personalized Story Generator:**
   Ask the player for 5 words (a name, animal, place, adjective, food) and print a hilarious customized story.
4. **📊 Student Grade Calculator:**
   Let the user enter test scores, and calculate their average and letter grade (A, B, C, D)!

Want starter code for any of these? Just ask "Give me starter code for the guessing game!"`;
      } else {
        return `🎨 **Cool Features to Add to Your Web App:**

1. **🌈 Dark / Light Theme Toggle:** Add a button that swaps background and text colors.
2. **⏱️ Interactive Countdown Timer:** Build a productivity timer that counts down from 60 seconds.
3. **📝 To-Do List Tracker:** Allow adding items and clicking to cross them off.
4. **🎲 Random Quote Generator:** Click a button to display inspirational wisdom!`;
      }
    }

    // 4. Test cases intent
    if (intent === 'tests') {
      return `🧪 **Suggested Test Cases for Your Program:**

To make sure your code handles everything, try testing:
1. **Typical Input:** Normal expected values (e.g. positive numbers, standard words).
2. **Boundary Values:** Zero (\`0\`), very large numbers, or negative values.
3. **Empty Input:** Pressing Enter immediately without typing anything.
4. **Incorrect Types:** Typing letters when the program expects numbers.

Observing how your program handles surprise inputs is what makes a great software engineer!`;
    }

    // 5. General programming queries
    const q = userPrompt.toLowerCase();
    if (q.includes('guessing game') || q.includes('random')) {
      return `Here is a fun **Number Guessing Game** template:

\`\`\`python
import random

secret = random.randint(1, 50)
guesses = 0
print("🎲 I'm thinking of a number between 1 and 50!")

while True:
    guess = int(input("Enter your guess: "))
    guesses += 1
    
    if guess == secret:
        print(f"🎉 Winner! You found {secret} in {guesses} tries!")
        break
    elif guess < secret:
        print("📈 Too low! Try higher.")
    else:
        print("📉 Too high! Try lower.")
\`\`\`
Click **Insert into Editor** below to add it to your file!`;
    }

    if (q.includes('loop') || q.includes('while') || q.includes('for')) {
      return `In Python, you have two primary loops:

\`\`\`python
# 1. For loop: iterates over a list or range of numbers
for i in range(5):
    print(f"Count: {i}")

# 2. While loop: repeats as long as a condition is True
hp = 10
while hp > 0:
    print(f"Hero HP: {hp}")
    hp -= 3
\`\`\``;
    }

    if (q.includes('function') || q.includes('def')) {
      return `Here is how you write and call custom functions in Python:

\`\`\`python
def calculate_power(level, bonus):
    total = (level * 10) + bonus
    return total

hero_power = calculate_power(5, 12)
print("Hero Power Level:", hero_power)
\`\`\``;
    }

    return `🤖 **OpenWay Co-Pilot at your service!**

I am ready to help you level up your coding skills. You can ask me:
- *"How do I make a list in Python?"*
- *"Can you explain how while loops work?"*
- *"Give me starter code for a text adventure!"*
- *"Help me debug my code."*

What would you like to explore next?`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.openWayPlayground = new PlaygroundApp();
});
