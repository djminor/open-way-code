/**
 * OpenWay Code - Community Pathways to Computer Science
 * Unified 60-Minute Interactive Controller
 */

class CodingApp {
  constructor() {
    this.lessons = LESSONS_DATA;
    this.currentLessonIndex = 0;
    this.completedLessons = new Set(JSON.parse(localStorage.getItem('openway_completed_v1') || '[]'));
    this.theme = localStorage.getItem('openway_theme') || 'light';

    // Virtual filesystem store: { [lessonId]: { [fileName]: content } }
    this.filesStore = JSON.parse(localStorage.getItem('openway_files_v1') || '{}');
    this.currentActiveFile = 'main.py';
    this.activeView = 'code'; // 'code', 'preview', 'map', 'ai'

    this.initElements();
    this.applyTheme(this.theme);
    this.bindEvents();
    this.renderSidebar();

    let initialIndex = 0;
    const urlParams = new URLSearchParams(window.location.search);
    const paramLesson = parseInt(urlParams.get('lesson'), 10);
    const hashMatch = window.location.hash.match(/lesson-(\d+)/);
    
    if (!isNaN(paramLesson) && paramLesson >= 1 && paramLesson <= this.lessons.length) {
      initialIndex = paramLesson - 1;
    } else if (hashMatch) {
      const hashLesson = parseInt(hashMatch[1], 10);
      if (!isNaN(hashLesson) && hashLesson >= 1 && hashLesson <= this.lessons.length) {
        initialIndex = hashLesson - 1;
      }
    } else {
      const savedIndex = parseInt(localStorage.getItem('openway_last_index_v1') || '0', 10);
      initialIndex = isNaN(savedIndex) ? 0 : Math.min(Math.max(0, savedIndex), this.lessons.length - 1);
    }
    this.selectLesson(initialIndex);

    PlaygroundRunner.init();
  }

  initElements() {
    // Navigation & Header
    this.sidebar = document.querySelector('.sidebar');
    this.toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    this.sidebarList = document.getElementById('lessonsList');
    this.prevBtn = document.getElementById('prevLessonBtn');
    this.nextBtn = document.getElementById('nextLessonBtn');
    this.progressFill = document.getElementById('progressBarFill');
    this.progressText = document.getElementById('progressText');
    this.sidebarStats = document.getElementById('sidebarCompletedBadge');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.lokiToggleBtn = document.getElementById('lokiToggleBtn');

    // Lesson Details & Drawer
    this.lessonPane = document.getElementById('lessonPane');
    this.collapseLessonBtn = document.getElementById('collapseLessonBtn');
    this.expandInstructionsBtn = document.getElementById('expandInstructionsBtn');
    this.lessonBadge = document.getElementById('lessonBadge');
    this.lessonTitle = document.getElementById('lessonTitle');
    this.lessonSubtitle = document.getElementById('lessonSubtitle');
    this.lessonContent = document.getElementById('lessonContent');
    this.missionContent = document.getElementById('missionContent');
    this.hintsContainer = document.getElementById('hintsContainer');

    // Studio & Toolbar
    this.fileTabsContainer = document.getElementById('fileTabsContainer');
    this.runBtn = document.getElementById('runCodeBtn');
    this.checkBtn = document.getElementById('checkAnswerBtn');
    this.resetBtn = document.getElementById('resetCodeBtn');

    // Editor Area Views
    this.editorWrapper = document.getElementById('editorWrapper');
    this.previewWrapper = document.getElementById('previewWrapper');
    this.mapViewerWrapper = document.getElementById('mapViewerWrapper');
    this.aiSandboxWrapper = document.getElementById('aiSandboxWrapper');
    this.previewIframe = document.getElementById('previewIframe');

    // Code input
    this.codeEditor = document.getElementById('codeEditor');
    this.lineNumbers = document.getElementById('lineNumbers');

    // Terminal & Feedback
    this.clearTermBtn = document.getElementById('clearTermBtn');
    this.terminalOutput = document.getElementById('terminalOutput');
    this.feedbackBanner = document.getElementById('feedbackBanner');
    this.feedbackText = document.getElementById('feedbackText');

    // Loki Teacher Modal
    this.lokiOverlay = document.getElementById('lokiOverlay');
    this.closeLokiBtn = document.getElementById('closeLokiBtn');
    this.lokiBody = document.getElementById('lokiBody');

    // AI Chat Elements
    this.aiChatBody = document.getElementById('aiChatBody');
    this.aiChatInput = document.getElementById('aiChatInput');
    this.aiChatSendBtn = document.getElementById('aiChatSendBtn');
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.cycleLesson(-1));
    this.nextBtn.addEventListener('click', () => this.cycleLesson(1));

    // Drawer toggles
    if (this.toggleSidebarBtn) {
      this.toggleSidebarBtn.addEventListener('click', () => this.toggleSidebar());
    }
    if (this.collapseLessonBtn) {
      this.collapseLessonBtn.addEventListener('click', () => this.toggleLessonPane(false));
    }
    if (this.expandInstructionsBtn) {
      this.expandInstructionsBtn.addEventListener('click', () => this.toggleLessonPane(true));
    }

    this.runBtn.addEventListener('click', () => this.runCurrentCode());
    this.checkBtn.addEventListener('click', () => this.checkCurrentSolution());
    this.resetBtn.addEventListener('click', () => this.resetCurrentLesson());
    this.clearTermBtn.addEventListener('click', () => this.clearTerminal());

    this.themeToggleBtn.addEventListener('click', () => {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.theme);
    });

    // Loki Menu events
    this.lokiToggleBtn.addEventListener('click', () => this.toggleLokiModal());
    this.closeLokiBtn.addEventListener('click', () => this.toggleLokiModal(false));
    this.lokiOverlay.addEventListener('click', (e) => {
      if (e.target === this.lokiOverlay) this.toggleLokiModal(false);
    });

    // Keyboard shortcut for Loki: Alt+L or Ctrl+L
    window.addEventListener('keydown', (e) => {
      if ((e.altKey || e.ctrlKey) && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        this.toggleLokiModal();
      }
      if (e.key === 'Escape') {
        this.toggleLokiModal(false);
      }
    });

    // Code Editor handling
    this.codeEditor.addEventListener('input', () => {
      this.updateLineNumbers();
      this.saveActiveFileContent();
      if (this.isWebLesson()) {
        this.refreshWebPreview();
      }
    });

    this.codeEditor.addEventListener('scroll', () => {
      this.lineNumbers.scrollTop = this.codeEditor.scrollTop;
    });

    this.codeEditor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.codeEditor.selectionStart;
        const end = this.codeEditor.selectionEnd;
        this.codeEditor.value = this.codeEditor.value.substring(0, start) + '    ' + this.codeEditor.value.substring(end);
        this.codeEditor.selectionStart = this.codeEditor.selectionEnd = start + 4;
        this.updateLineNumbers();
        this.saveActiveFileContent();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        this.runCurrentCode();
      }
    });

    // Navigation cycling with [ and ]
    window.addEventListener('keydown', (e) => {
      if (e.target === this.codeEditor || e.target === this.aiChatInput) return;
      if (e.key === '[' || (e.ctrlKey && e.key === 'ArrowLeft')) this.cycleLesson(-1);
      if (e.key === ']' || (e.ctrlKey && e.key === 'ArrowRight')) this.cycleLesson(1);
    });

    // AI Chat Input
    if (this.aiChatSendBtn && this.aiChatInput) {
      this.aiChatSendBtn.addEventListener('click', () => this.handleAiChatSubmit());
      this.aiChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleAiChatSubmit();
      });
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('openway_theme', theme);
    this.themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  toggleSidebar(forceState) {
    const isCollapsed = forceState !== undefined ? !forceState : !this.sidebar.classList.contains('collapsed');
    this.sidebar.classList.toggle('collapsed', isCollapsed);
    if (this.toggleSidebarBtn) {
      this.toggleSidebarBtn.classList.toggle('active', !isCollapsed);
    }
  }

  toggleLessonPane(shouldShow) {
    const isShowing = shouldShow !== undefined ? shouldShow : this.lessonPane.classList.contains('collapsed');
    this.lessonPane.classList.toggle('collapsed', !isShowing);
    if (this.expandInstructionsBtn) {
      this.expandInstructionsBtn.style.display = isShowing ? 'none' : 'flex';
    }
  }

  renderSidebar() {
    this.sidebarList.innerHTML = '';
    this.lessons.forEach((lesson, index) => {
      const li = document.createElement('li');
      li.className = `lesson-item ${index === this.currentLessonIndex ? 'active' : ''} ${this.completedLessons.has(lesson.id) ? 'completed' : ''}`;

      const padNum = String(lesson.id).padStart(2, '0');
      const isDone = this.completedLessons.has(lesson.id);

      li.innerHTML = `
        <div class="lesson-number">${isDone ? '✓' : padNum}</div>
        <div class="lesson-info">
          <div class="lesson-title-text">${lesson.title}</div>
          <div class="lesson-meta">
            <span>${lesson.category}</span>
            <span>•</span>
            <span>${lesson.duration}</span>
          </div>
        </div>
        <div class="status-badge">${lesson.icon}</div>
      `;

      li.addEventListener('click', () => this.selectLesson(index));
      this.sidebarList.appendChild(li);
    });

    this.updateProgress();
  }

  selectLesson(index) {
    if (index < 0 || index >= this.lessons.length) return;

    this.currentLessonIndex = index;
    localStorage.setItem('openway_last_index_v1', index);
    const lesson = this.lessons[index];

    // Highlight active in sidebar
    const items = this.sidebarList.querySelectorAll('.lesson-item');
    items.forEach((item, i) => item.classList.toggle('active', i === index));
    if (items[index]) items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });

    // Populate Guide
    this.lessonBadge.textContent = `Lesson ${lesson.id} of 12 • ${lesson.category} • ⏱️ ${lesson.duration}`;
    this.lessonTitle.textContent = lesson.title;
    this.lessonSubtitle.textContent = lesson.subtitle;
    this.lessonContent.innerHTML = lesson.contentHtml;
    this.missionContent.innerHTML = lesson.challenge;

    // Render Hints
    this.renderHints(lesson.hints);

    // Initialize or retrieve virtual files
    if (!this.filesStore[lesson.id]) {
      this.filesStore[lesson.id] = { ...lesson.files };
    }
    const currentFiles = this.filesStore[lesson.id];

    // Determine default file
    const fileNames = Object.keys(currentFiles);
    this.currentActiveFile = fileNames[0] || (this.isWebLesson() ? 'index.html' : 'main.py');

    // Reset view
    this.setViewMode('code');
    this.renderTabs(fileNames);
    this.loadActiveFileContent();

    // If web lesson, auto-render preview
    if (this.isWebLesson()) {
      this.refreshWebPreview();
    }

    this.hideFeedback();
    this.prevBtn.disabled = index === 0;
    this.nextBtn.disabled = index === this.lessons.length - 1;

    // Update Loki drawer if open
    this.renderLokiContent();
  }

  cycleLesson(delta) {
    const nextIdx = this.currentLessonIndex + delta;
    if (nextIdx >= 0 && nextIdx < this.lessons.length) {
      this.selectLesson(nextIdx);
    }
  }

  isWebLesson() {
    const lesson = this.lessons[this.currentLessonIndex];
    return lesson.type === 'web-playground' || lesson.type === 'devtools-lab';
  }

  renderTabs(fileNames) {
    this.fileTabsContainer.innerHTML = '';
    const lesson = this.lessons[this.currentLessonIndex];

    fileNames.forEach(fn => {
      const pill = document.createElement('div');
      pill.className = `tab-pill ${fn === this.currentActiveFile && this.activeView === 'code' ? 'active' : ''}`;
      
      let icon = '📄';
      if (fn.endsWith('.py')) icon = '🐍';
      else if (fn.endsWith('.js')) icon = '⚡';
      else if (fn.endsWith('.html')) icon = '🌐';
      else if (fn.endsWith('.css')) icon = '🎨';
      else if (fn.endsWith('.csv')) icon = '📊';

      pill.innerHTML = `<span>${icon}</span> <span>${fn}</span>`;
      pill.addEventListener('click', () => {
        this.saveActiveFileContent();
        this.currentActiveFile = fn;
        this.setViewMode('code');
        this.renderTabs(Object.keys(this.filesStore[lesson.id]));
        this.loadActiveFileContent();
      });
      this.fileTabsContainer.appendChild(pill);
    });

    // Special View Tabs
    if (this.isWebLesson()) {
      const previewTab = document.createElement('div');
      previewTab.className = `tab-pill ${this.activeView === 'preview' ? 'active' : ''}`;
      previewTab.innerHTML = `<span>⚡</span> <span>Live Web Preview</span>`;
      previewTab.addEventListener('click', () => {
        this.saveActiveFileContent();
        this.setViewMode('preview');
        this.refreshWebPreview();
        this.renderTabs(Object.keys(this.filesStore[lesson.id]));
      });
      this.fileTabsContainer.appendChild(previewTab);
    }

    if (lesson.id === 6) {
      const mapTab = document.createElement('div');
      mapTab.className = `tab-pill ${this.activeView === 'map' ? 'active' : ''}`;
      mapTab.innerHTML = `<span>🗺️</span> <span>Middle Earth Map</span>`;
      mapTab.addEventListener('click', () => {
        this.saveActiveFileContent();
        this.setViewMode('map');
        this.renderTabs(Object.keys(this.filesStore[lesson.id]));
      });
      this.fileTabsContainer.appendChild(mapTab);
    }

    if (lesson.id === 7) {
      const aiTab = document.createElement('div');
      aiTab.className = `tab-pill ${this.activeView === 'ai' ? 'active' : ''}`;
      aiTab.innerHTML = `<span>🤖</span> <span>AI Guest Assistant</span>`;
      aiTab.addEventListener('click', () => {
        this.saveActiveFileContent();
        this.setViewMode('ai');
        this.renderTabs(Object.keys(this.filesStore[lesson.id]));
      });
      this.fileTabsContainer.appendChild(aiTab);
    }
  }

  setViewMode(mode) {
    this.activeView = mode;
    this.editorWrapper.style.display = mode === 'code' ? 'flex' : 'none';
    this.previewWrapper.style.display = mode === 'preview' ? 'flex' : 'none';
    this.mapViewerWrapper.style.display = mode === 'map' ? 'flex' : 'none';
    this.aiSandboxWrapper.style.display = mode === 'ai' ? 'flex' : 'none';
  }

  loadActiveFileContent() {
    const lesson = this.lessons[this.currentLessonIndex];
    const files = this.filesStore[lesson.id] || {};
    this.codeEditor.value = files[this.currentActiveFile] || '';
    this.updateLineNumbers();
  }

  saveActiveFileContent() {
    const lesson = this.lessons[this.currentLessonIndex];
    if (!this.filesStore[lesson.id]) this.filesStore[lesson.id] = {};
    if (this.currentActiveFile && this.activeView === 'code') {
      this.filesStore[lesson.id][this.currentActiveFile] = this.codeEditor.value;
      localStorage.setItem('openway_files_v1', JSON.stringify(this.filesStore));
    }
  }

  refreshWebPreview() {
    const lesson = this.lessons[this.currentLessonIndex];
    const files = this.filesStore[lesson.id] || {};
    const html = files['index.html'] || '';
    const css = files['style.css'] || '';
    const js = files['script.js'] || '';
    const bundled = PlaygroundRunner.bundleWebPreview(html, css, js);
    this.previewIframe.srcdoc = bundled;
  }

  updateLineNumbers() {
    const lines = this.codeEditor.value.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      numbers += i + '\n';
    }
    this.lineNumbers.textContent = numbers;
  }

  renderHints(hints) {
    this.hintsContainer.innerHTML = '';
    if (!hints || hints.length === 0) {
      this.hintsContainer.innerHTML = '<p style="font-size:12px; color:var(--text-muted);">Explore the instructions above to complete the mission!</p>';
      return;
    }
    hints.forEach((h, i) => {
      const d = document.createElement('details');
      d.className = 'hint-details';
      d.innerHTML = `<summary>💡 Hint ${i + 1}</summary><div class="hint-body">${h}</div>`;
      this.hintsContainer.appendChild(d);
    });
  }

  clearTerminal() {
    this.terminalOutput.textContent = '';
    this.hideFeedback();
  }

  appendTerminalOutput(text, cssClass = 'term-stdout') {
    const span = document.createElement('span');
    span.className = cssClass;
    span.textContent = text;
    this.terminalOutput.appendChild(span);
    this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
  }

  async runCurrentCode() {
    this.saveActiveFileContent();
    const lesson = this.lessons[this.currentLessonIndex];
    const files = this.filesStore[lesson.id] || {};

    if (this.isWebLesson()) {
      this.refreshWebPreview();
      this.setViewMode('preview');
      this.renderTabs(Object.keys(files));
      this.clearTerminal();
      this.appendTerminalOutput(`⚡ Live Web Preview updated! Check the preview tab.\n`, 'term-info');
      return { success: true, output: "Web Preview refreshed" };
    }

    const mainCode = files['main.py'] || this.codeEditor.value;
    this.clearTerminal();
    this.appendTerminalOutput(`🐍 Running Python code...\n`, 'term-info');

    const result = await PlaygroundRunner.runPython(mainCode, files, {
      onOutput: (text, type) => this.appendTerminalOutput(text, type || 'term-stdout'),
      onError: (err) => this.appendTerminalOutput(err + '\n', 'term-stderr'),
      onFileWritten: (fn, content) => {
        this.filesStore[lesson.id][fn] = content;
        localStorage.setItem('openway_files_v1', JSON.stringify(this.filesStore));
        this.renderTabs(Object.keys(this.filesStore[lesson.id]));
        this.appendTerminalOutput(`📄 File created: '${fn}'! Check the tab above to view it.\n`, 'term-info');
      }
    });

    return result;
  }

  async checkCurrentSolution() {
    const lesson = this.lessons[this.currentLessonIndex];
    this.saveActiveFileContent();
    const files = this.filesStore[lesson.id] || {};

    this.appendTerminalOutput(`\n🔍 Verifying Mission Requirements...\n`, 'term-info');
    const result = await this.runCurrentCode();

    if (lesson.validate) {
      const targetCode = this.isWebLesson() ? (files['index.html'] || '') : (files['main.py'] || this.codeEditor.value);
      const v = lesson.validate(targetCode, result.output || '', files);
      if (v.pass) {
        this.completedLessons.add(lesson.id);
        localStorage.setItem('openway_completed_v1', JSON.stringify([...this.completedLessons]));
        this.renderSidebar();
        this.showFeedback(true, v.message);
        this.appendTerminalOutput(`\n✅ MISSION PASSED: ${v.message}\n`, 'term-stdout');
      } else {
        this.showFeedback(false, v.message);
        this.appendTerminalOutput(`\n❌ MISSION NOT YET COMPLETE: ${v.message}\n`, 'term-stderr');
      }
    }
  }

  resetCurrentLesson() {
    const lesson = this.lessons[this.currentLessonIndex];
    if (confirm(`Reset Lesson ${lesson.id} files back to the starting code?`)) {
      this.filesStore[lesson.id] = { ...lesson.files };
      localStorage.setItem('openway_files_v1', JSON.stringify(this.filesStore));
      const fileNames = Object.keys(this.filesStore[lesson.id]);
      this.currentActiveFile = fileNames[0] || (this.isWebLesson() ? 'index.html' : 'main.py');
      this.renderTabs(fileNames);
      this.loadActiveFileContent();
      this.clearTerminal();
      this.appendTerminalOutput(`Reset files for Lesson ${lesson.id}.\n`, 'term-info');
      if (this.isWebLesson()) this.refreshWebPreview();
    }
  }

  showFeedback(isSuccess, message) {
    this.feedbackBanner.style.display = 'flex';
    this.feedbackBanner.className = `feedback-banner ${isSuccess ? 'success' : 'error'}`;
    this.feedbackText.innerHTML = `${isSuccess ? '🎉' : '⚠️'} ${message}`;
  }

  hideFeedback() {
    this.feedbackBanner.style.display = 'none';
  }

  updateProgress() {
    const count = this.completedLessons.size;
    const total = this.lessons.length;
    const percent = Math.round((count / total) * 100);
    this.progressFill.style.width = `${percent}%`;
    this.progressText.textContent = `${count} of ${total} Completed (${percent}%)`;
    this.sidebarStats.textContent = `${count} / ${total} Done`;
  }

  // --------------------------------------------------------------------------
  // Loki Hidden Teacher Portal
  // --------------------------------------------------------------------------
  toggleLokiModal(forceState) {
    const isOpen = forceState !== undefined ? forceState : !this.lokiOverlay.classList.contains('open');
    this.lokiOverlay.classList.toggle('open', isOpen);
    if (isOpen) {
      this.renderLokiContent();
    }
  }

  renderLokiContent() {
    const lesson = this.lessons[this.currentLessonIndex];
    let html = `
      <div class="loki-card">
        <h4>Teacher Overview & Pacing (60 Mins)</h4>
        <p style="font-size:12px; color:var(--text-secondary); margin-bottom: 8px;">
          <strong>Lesson ${lesson.id}:</strong> ${lesson.title}
        </p>
        <ul style="font-size: 11.5px; color: var(--text-muted); padding-left: 16px; line-height: 1.6;">
          <li><strong>00-15m:</strong> Concept hook, problem framing, real-world analogies.</li>
          <li><strong>15-35m:</strong> Guided walkthrough of starter code and algorithms.</li>
          <li><strong>35-50m:</strong> Hands-on student challenge & pair debugging.</li>
          <li><strong>50-60m:</strong> Student demonstrations & debrief.</li>
        </ul>
      </div>
    `;

    if (lesson.teacherSolution) {
      html += `
        <div class="loki-card">
          <h4>🔑 Hidden Answer Key (Lesson ${lesson.id})</h4>
          <p style="font-size: 11.5px; color: var(--text-secondary); margin-bottom: 8px;">
            Full working code with all TODOs completed. You can copy this or click to inject directly into the playground!
          </p>
          <pre class="code-preview" style="max-height: 250px; overflow-y: auto;"><code>${this.escapeHtml(lesson.teacherSolution)}</code></pre>
          <button id="injectAnswerBtn" class="btn-inject-answer">✨ Inject Answer into Code Editor</button>
        </div>
      `;
    } else {
      html += `
        <div class="loki-card">
          <h4>Teacher Notes</h4>
          <p style="font-size:12px; color:var(--text-secondary);">
            Encourage students to experiment, make deliberate errors, and read the console output to build debugging resilience!
          </p>
        </div>
      `;
    }

    if (lesson.trinketUrl) {
      html += `
        <div class="loki-card">
          <h4>Original Trinket Reference</h4>
          <p style="font-size: 11.5px; color: var(--text-secondary);">
            External Source: <a href="${lesson.trinketUrl}" target="_blank" style="color:var(--accent-color);">${lesson.trinketUrl}</a>
          </p>
        </div>
      `;
    }

    this.lokiBody.innerHTML = html;

    const injectBtn = document.getElementById('injectAnswerBtn');
    if (injectBtn && lesson.teacherSolution) {
      injectBtn.addEventListener('click', () => {
        const targetFile = this.isWebLesson() ? 'index.html' : 'main.py';
        this.filesStore[lesson.id][targetFile] = lesson.teacherSolution;
        localStorage.setItem('openway_files_v1', JSON.stringify(this.filesStore));
        this.currentActiveFile = targetFile;
        this.setViewMode('code');
        this.renderTabs(Object.keys(this.filesStore[lesson.id]));
        this.loadActiveFileContent();
        this.toggleLokiModal(false);
        this.appendTerminalOutput(`\n🪄 Loki Magic: Teacher solution injected into ${targetFile}!\n`, 'term-info');
        this.runCurrentCode();
      });
    }
  }

  // --------------------------------------------------------------------------
  // AI Guest Assistant Simulator (Lesson 7)
  // --------------------------------------------------------------------------
  handleAiChatSubmit() {
    const text = this.aiChatInput.value.trim();
    if (!text) return;

    this.addAiChatMessage(text, 'user');
    this.aiChatInput.value = '';

    setTimeout(() => {
      const response = this.generateAiResponse(text);
      this.addAiChatMessage(response, 'assistant');
    }, 600);
  }

  addAiChatMessage(content, sender) {
    const bubble = document.createElement('div');
    bubble.className = `ai-bubble ${sender}`;
    bubble.innerHTML = content.replace(/\n/g, '<br>');
    this.aiChatBody.appendChild(bubble);
    this.aiChatBody.scrollTop = this.aiChatBody.scrollHeight;
  }

  generateAiResponse(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes('palindrome')) {
      return `Here is a clean Python function for a palindrome checker with test cases:<br><br>
<code style="background:#070a0f; padding:6px; display:block; border-radius:4px; font-family:var(--font-mono);">
def is_palindrome(s):<br>
&nbsp;&nbsp;&nbsp;&nbsp;clean = ''.join(c.lower() for c in s if c.isalnum())<br>
&nbsp;&nbsp;&nbsp;&nbsp;return clean == clean[::-1]<br>
<br>
print(is_palindrome("racecar")) # True<br>
print(is_palindrome("hello"))   # False
</code><br>
👉 <em>Co-pilot tip: Notice how filtering non-alphanumeric characters protects against punctuation bugs!</em>`;
    }
    if (p.includes('reverse') || p.includes('string')) {
      return `In Python, you can reverse a string using slicing: <code>text[::-1]</code> or <code>"".join(reversed(text))</code>!`;
    }
    if (p.includes('bug') || p.includes('error')) {
      return `To debug effectively:<br>1. Read the last line of the traceback for the exact error type.<br>2. Check variable values right before the crash using print().<br>3. Verify that types match!`;
    }
    return `Great prompt! As an AI pair-programmer, I recommend decomposing this: what are the expected inputs, outputs, and edge cases (like empty lists or zeros)? Try testing the candidate function in your editor!`;
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new CodingApp();
});
