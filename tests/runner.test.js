/**
 * OpenWay Code - Execution Engine & Runner Module Tests
 * Tests Python preprocessing, f-string translation, pedagogical error formatting,
 * and live web preview bundling.
 */

const PlaygroundRunner = require('../runner');

describe('PlaygroundRunner Execution Module', () => {
  describe('preprocessPython (f-string and newline normalization)', () => {
    test('returns empty string for null, undefined, or empty code', () => {
      expect(PlaygroundRunner.preprocessPython(null)).toBe('');
      expect(PlaygroundRunner.preprocessPython(undefined)).toBe('');
      expect(PlaygroundRunner.preprocessPython('')).toBe('');
    });

    test('normalizes Windows CRLF newlines to LF', () => {
      const input = 'x = 1\r\ny = 2\r\nprint(x + y)\r\n';
      const output = PlaygroundRunner.preprocessPython(input);
      expect(output).not.toContain('\r\n');
      expect(output).toContain('\n');
    });

    test('translates single-variable double-quoted f-strings to .format()', () => {
      const input = 'print(f"Hello, {name}!")';
      const output = PlaygroundRunner.preprocessPython(input);
      expect(output).toBe('print("Hello, {}!".format(name))');
    });

    test('translates single-variable single-quoted f-strings to .format()', () => {
      const input = "msg = f'Value is {val}'";
      const output = PlaygroundRunner.preprocessPython(input);
      expect(output).toBe("msg = 'Value is {}'.format(val)");
    });

    test('translates multiple-variable f-strings accurately', () => {
      const input = 'print(f"Stop {stop} at ({x}, {y})")';
      const output = PlaygroundRunner.preprocessPython(input);
      expect(output).toBe('print("Stop {} at ({}, {})".format(stop, x, y))');
    });

    test('preserves f-strings that contain no curly expressions', () => {
      const input = 'print(f"Simple string without variables")';
      const output = PlaygroundRunner.preprocessPython(input);
      expect(output).toBe('print("Simple string without variables")');
    });

    test('preserves non-f-strings untouched', () => {
      const input = 'greeting = "Hello World"\nnum = 42\n';
      const output = PlaygroundRunner.preprocessPython(input);
      expect(output).toBe(input);
    });
  });

  describe('formatPythonError (Pedagogical Error Formatting)', () => {
    test('formats SyntaxError with colon and parenthesis guidance', () => {
      const errorStr = 'SyntaxError: unexpected EOF while parsing on line 12';
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 2);
      expect(formatted).toContain('❌ SyntaxError: Python spotted a grammar mistake!');
      expect(formatted).toContain('colons (:)');
      expect(formatted).toContain('line 10');
    });

    test('formats IndentationError with 4-space indentation rule', () => {
      const errorStr = 'IndentationError: unindent does not match any outer indentation level on line 8';
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 0);
      expect(formatted).toContain('❌ IndentationError: Spaces or tabs do not match up!');
      expect(formatted).toContain('4 spaces');
    });

    test('formats NameError with spelling and initialization tips', () => {
      const errorStr = "NameError: name 'totla' is not defined on line 5";
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 0);
      expect(formatted).toContain('❌ NameError: A variable or function name is unrecognized!');
      expect(formatted).toContain('spelling typos');
    });

    test('formats TypeError with type mismatch suggestions', () => {
      const errorStr = "TypeError: unsupported operand type(s) for +: 'int' and 'str' on line 4";
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 0);
      expect(formatted).toContain('❌ TypeError: An operation was performed on incompatible data types!');
      expect(formatted).toContain('str(x)');
    });

    test('formats IndexError with boundary checking guidance', () => {
      const errorStr = 'IndexError: list index out of range on line 15';
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 5);
      expect(formatted).toContain('❌ IndexError: Tried to access an item out of range!');
      expect(formatted).toContain('len(list) - 1');
      expect(formatted).toContain('line 10');
    });

    test('formats KeyError with dictionary key guidance', () => {
      const errorStr = "KeyError: 'temperature' on line 20";
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 0);
      expect(formatted).toContain('❌ KeyError: That dictionary key does not exist!');
    });

    test('formats FileNotFoundError with virtual files matching advice', () => {
      const errorStr = "FileNotFoundError: [Errno 2] No such file: 'stops.csv' on line 3";
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 0);
      expect(formatted).toContain('❌ FileNotFoundError: Could not find that file!');
      expect(formatted).toContain('matches the tab above');
    });

    test('formats TimeLimitExceeded with infinite loop warning', () => {
      const errorStr = 'TimeLimitExceeded: execLimit reached';
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 0);
      expect(formatted).toContain('⏱️ Time Limit Exceeded: Your code took too long to run!');
      expect(formatted).toContain("infinite 'while' loop");
    });

    test('handles line offset adjustment safely without negative numbers', () => {
      const errorStr = 'Error on line 3';
      const formatted = PlaygroundRunner.formatPythonError(errorStr, 50);
      expect(formatted).toContain('line 1');
    });

    test('formats unknown errors with fallback prefix', () => {
      const errorStr = 'CustomEngineFailure: Something strange occurred';
      const formatted = PlaygroundRunner.formatPythonError(errorStr);
      expect(formatted).toBe('❌ Python Error: CustomEngineFailure: Something strange occurred');
    });
  });

  describe('bundleWebPreview (HTML/CSS/JS Sandbox Generator)', () => {
    test('generates valid HTML document wrapping HTML, CSS, and JS', () => {
      const html = '<h1>Hello Web</h1>';
      const css = 'h1 { color: blue; }';
      const js = 'console.log("preview active");';

      const preview = PlaygroundRunner.bundleWebPreview(html, css, js);
      expect(preview).toContain('<!DOCTYPE html>');
      expect(preview).toContain('<style>\n    h1 { color: blue; }\n  </style>');
      expect(preview).toContain('<h1>Hello Web</h1>');
      expect(preview).toContain('try {\n      console.log("preview active");\n    } catch (err)');
    });

    test('handles default empty CSS and JS gracefully', () => {
      const html = '<p>Simple paragraph</p>';
      const preview = PlaygroundRunner.bundleWebPreview(html);

      expect(preview).toContain('<p>Simple paragraph</p>');
      expect(preview).toContain('<style>\n    \n  </style>');
      expect(preview).toContain('try {\n      \n    } catch (err)');
    });
  });

  describe('init and Skulpt state detection', () => {
    test('init runs without error when Sk is undefined in Node test environment', () => {
      expect(() => PlaygroundRunner.init()).not.toThrow();
    });

    test('runPython reports Skulpt unavailable when running in raw Node environment without Sk', async () => {
      const result = await PlaygroundRunner.runPython('print(123)');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Skulpt unavailable');
    });
  });
});
