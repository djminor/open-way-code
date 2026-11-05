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

    // Loki / Instructor Classroom Projector Stage
    this.lokiOverlay = document.getElementById('lokiOverlay');
    this.instructorStage = document.getElementById('instructorStage');
    this.lokiHeader = document.getElementById('lokiHeader');
    this.lokiBody = document.getElementById('lokiBody');
    this.instructorTab = 'steps'; // 'steps', 'solution', 'notes'
    this.instructorZoom = parseInt(localStorage.getItem('openway_projector_zoom') || '18', 10);
    this.instructorFilterStep = 'all';
    this.instructorDemoOutput = '';

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
  // --------------------------------------------------------------------------
  // Instructor Classroom Projector Board (Loki Presentation Mode)
  // --------------------------------------------------------------------------
  toggleLokiModal(forceState) {
    if (!this.lokiOverlay) return;
    const isOpen = forceState !== undefined ? forceState : !this.lokiOverlay.classList.contains('open');
    this.lokiOverlay.classList.toggle('open', isOpen);
    if (isOpen) {
      this.renderLokiContent();
    }
  }

  setInstructorZoom(targetSize) {
    const validSizes = [16, 18, 22, 26];
    let nextSize = validSizes.includes(targetSize) ? targetSize : 18;
    this.instructorZoom = nextSize;
    localStorage.setItem('openway_projector_zoom', nextSize);
    if (this.instructorStage) {
      this.instructorStage.className = `instructor-stage projector-scale-${nextSize}`;
    }
    this.renderLokiContent();
  }

  async runInstructorProjectorDemo() {
    const lesson = this.lessons[this.currentLessonIndex];
    if (!lesson.teacherSolution) return;

    this.instructorDemoOutput = "⏳ Running live demonstration in Python...\n";
    this.renderLokiContent();

    const files = { ...lesson.files };
    const result = await PlaygroundRunner.runPython(lesson.teacherSolution, files, {
      onFileWritten: (fn, content) => {
        files[fn] = content;
      }
    });

    if (result.success) {
      this.instructorDemoOutput = result.output || "(Demonstration completed cleanly with no printed output)";
    } else {
      this.instructorDemoOutput = "❌ Demonstration Error:\n" + (result.error || "Unknown execution error");
    }
    this.renderLokiContent();
  }

  renderLokiContent() {
    if (!this.lokiHeader || !this.lokiBody) return;
    const lesson = this.lessons[this.currentLessonIndex];
    const guide = lesson.instructorGuide || (typeof INSTRUCTOR_GUIDES !== 'undefined' && INSTRUCTOR_GUIDES[lesson.id]) || {
      goal: lesson.summary,
      pacing: {
        hook: "10 mins — Problem framing and real-world connection",
        liveCoding: "25 mins — Step-by-step code demonstration on the board",
        studentWork: "20 mins — Students copy, test, and tweak",
        debrief: "5 mins — Classroom debrief & verification"
      },
      steps: lesson.teacherSolution ? [
        {
          num: 1,
          title: "Complete Solution Walkthrough",
          prompt: "Display and walk through the reference solution while students follow along.",
          code: lesson.teacherSolution,
          checkpoint: "✋ Check: Did everyone copy this code and run it?"
        }
      ] : [],
      discussionQuestions: [
        "What does this algorithm achieve step-by-step?",
        "What happens if inputs or data types are invalid?"
      ],
      gotchas: [
        "Watch out for colons, casing, and indentation errors!"
      ]
    };

    // Apply zoom class
    if (this.instructorStage) {
      this.instructorStage.className = `instructor-stage projector-scale-${this.instructorZoom}`;
    }

    // 1. Render Top Header Bar
    this.lokiHeader.innerHTML = `
      <div class="instructor-title-group">
        <span class="projector-badge">📽️ Projector Stage</span>
        <span class="instructor-lesson-title">Lesson ${lesson.id}: ${lesson.title}</span>
      </div>

      <div class="instructor-nav-tabs">
        <button class="instructor-tab-btn ${this.instructorTab === 'steps' ? 'active' : ''}" id="tabBtnSteps">
          <span>📋</span> Step-by-Step Board
        </button>
        <button class="instructor-tab-btn ${this.instructorTab === 'solution' ? 'active' : ''}" id="tabBtnSolution">
          <span>💻</span> Full Solution
        </button>
        <button class="instructor-tab-btn ${this.instructorTab === 'notes' ? 'active' : ''}" id="tabBtnNotes">
          <span>💬</span> Prompts &amp; Pacing
        </button>
      </div>

      <div class="instructor-controls">
        <div class="zoom-group">
          <span>Font:</span>
          <button class="btn-zoom" id="btnZoomDown" title="Smaller font">A-</button>
          <span style="font-weight:700; color:#fff; min-width: 32px; text-align: center;">${this.instructorZoom}px</span>
          <button class="btn-zoom" id="btnZoomUp" title="Larger font for back row">A+</button>
        </div>
        ${lesson.teacherSolution ? `
          <button id="btnRunProjectorDemo" class="btn-instructor-action btn-run-demo" title="Run demonstration code on projector">
            <span>▶</span> Run Demo
          </button>
          <button id="btnInjectSolution" class="btn-instructor-action" title="Inject solution into student playground">
            <span>📥</span> Inject to Studio
          </button>
        ` : ''}
        <a href="instructor.html?lesson=${lesson.id}" target="_blank" class="btn-instructor-action" title="Open dedicated projector window for second monitor">
          <span>↗</span> Pop Out
        </a>
        <button id="closeLokiBtn" class="btn-icon" title="Close Projector Stage (Esc)">✕</button>
      </div>
    `;

    // 2. Render Stage Body
    let bodyHtml = `
      <!-- Goal Banner -->
      <div class="instructor-goal-card">
        <span class="goal-badge">Classroom Mission</span>
        <div class="goal-text">${guide.goal}</div>
      </div>
    `;

    // Tab 1: Step-by-Step Board
    if (this.instructorTab === 'steps') {
      const steps = guide.steps || [];
      if (steps.length === 0 && lesson.teacherSolution) {
        bodyHtml += `
          <div class="step-card">
            <div class="step-header">
              <span class="step-num-badge">Reference</span>
              <span class="step-title-text">Complete Lesson Code</span>
            </div>
            <div class="step-prompt-box">
              🗣️ <strong>Instructor Prompt:</strong> Guide students to copy this complete implementation into their editor.
            </div>
            <div class="step-code-box">
              <button class="btn-copy-step" data-step-code="${encodeURIComponent(lesson.teacherSolution)}">📋 Copy Code</button>
              <pre class="step-code-pre"><code>${this.escapeHtml(lesson.teacherSolution)}</code></pre>
            </div>
          </div>
        `;
      } else {
        bodyHtml += `<div class="step-container">`;
        steps.forEach((s) => {
          bodyHtml += `
            <div class="step-card">
              <div class="step-header">
                <span class="step-num-badge">Step ${s.num}</span>
                <span class="step-title-text">${s.title}</span>
              </div>
              <div class="step-prompt-box">
                🗣️ <strong>Instructor Prompt:</strong> ${s.prompt}
              </div>
              <div class="step-code-box">
                <button class="btn-copy-step" data-step-code="${encodeURIComponent(s.code)}">📋 Copy Snippet</button>
                <pre class="step-code-pre"><code>${this.escapeHtml(s.code)}</code></pre>
              </div>
              <div class="step-checkpoint">
                ${s.checkpoint}
              </div>
            </div>
          `;
        });
        bodyHtml += `</div>`;
      }
    }

    // Tab 2: Full Solution
    if (this.instructorTab === 'solution') {
      if (lesson.teacherSolution) {
        bodyHtml += `
          <div class="full-solution-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <span style="font-size:13px; font-weight:700; color:#93c5fd;">COMPLETE PYTHON SOLUTION</span>
              <button class="btn-copy-step" data-step-code="${encodeURIComponent(lesson.teacherSolution)}" style="position:static;">📋 Copy Entire Script</button>
            </div>
            <pre class="full-solution-pre"><code>${this.escapeHtml(lesson.teacherSolution)}</code></pre>
          </div>
        `;
      } else {
        bodyHtml += `
          <div class="notes-card">
            <h4>No Reference Solution</h4>
            <p style="font-size:14px; color:var(--text-secondary);">This module is an interactive lab or placeholder. Encourage student experimentation!</p>
          </div>
        `;
      }
    }

    // Tab 3: Notes & Pacing
    if (this.instructorTab === 'notes') {
      const pacing = guide.pacing || {};
      const questions = guide.discussionQuestions || [];
      const gotchas = guide.gotchas || [];

      bodyHtml += `
        <div class="notes-grid">
          <div class="notes-card">
            <h4>⏱️ 60-Minute Classroom Pacing</h4>
            <ul class="notes-list">
              <li><strong>Hook:</strong> ${pacing.hook || "10 mins"}</li>
              <li><strong>Live Coding:</strong> ${pacing.liveCoding || "25 mins"}</li>
              <li><strong>Student Practice:</strong> ${pacing.studentWork || "20 mins"}</li>
              <li><strong>Debrief:</strong> ${pacing.debrief || "5 mins"}</li>
            </ul>
          </div>

          <div class="notes-card">
            <h4>💬 Questions to Ask the Room</h4>
            <ul class="notes-list">
              ${questions.map(q => `<li>${q}</li>`).join('')}
            </ul>
          </div>

          <div class="notes-card">
            <h4>⚠️ Common Student Gotchas</h4>
            <ul class="notes-list">
              ${gotchas.map(g => `<li>${g}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    // Live Projector Terminal output (if demo was run)
    if (this.instructorDemoOutput) {
      bodyHtml += `
        <div class="projector-terminal-card">
          <div class="projector-term-header">
            <span>🖥️ Projector Demonstration Terminal Output</span>
            <button class="btn-term-action" id="btnClearDemoOutput" style="color:#94a3b8;">Clear</button>
          </div>
          <div class="projector-term-body">${this.escapeHtml(this.instructorDemoOutput)}</div>
        </div>
      `;
    }

    this.lokiBody.innerHTML = bodyHtml;

    // 3. Attach Events
    const closeBtn = document.getElementById('closeLokiBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggleLokiModal(false));

    const tabBtnSteps = document.getElementById('tabBtnSteps');
    if (tabBtnSteps) tabBtnSteps.addEventListener('click', () => {
      this.instructorTab = 'steps';
      this.renderLokiContent();
    });

    const tabBtnSolution = document.getElementById('tabBtnSolution');
    if (tabBtnSolution) tabBtnSolution.addEventListener('click', () => {
      this.instructorTab = 'solution';
      this.renderLokiContent();
    });

    const tabBtnNotes = document.getElementById('tabBtnNotes');
    if (tabBtnNotes) tabBtnNotes.addEventListener('click', () => {
      this.instructorTab = 'notes';
      this.renderLokiContent();
    });

    // Zoom buttons
    const btnZoomDown = document.getElementById('btnZoomDown');
    if (btnZoomDown) btnZoomDown.addEventListener('click', () => {
      const sizes = [16, 18, 22, 26];
      const curIdx = sizes.indexOf(this.instructorZoom);
      if (curIdx > 0) this.setInstructorZoom(sizes[curIdx - 1]);
    });

    const btnZoomUp = document.getElementById('btnZoomUp');
    if (btnZoomUp) btnZoomUp.addEventListener('click', () => {
      const sizes = [16, 18, 22, 26];
      const curIdx = sizes.indexOf(this.instructorZoom);
      if (curIdx < sizes.length - 1) this.setInstructorZoom(sizes[curIdx + 1]);
    });

    // Run Demo button
    const btnRunDemo = document.getElementById('btnRunProjectorDemo');
    if (btnRunDemo) btnRunDemo.addEventListener('click', () => this.runInstructorProjectorDemo());

    const btnClearDemo = document.getElementById('btnClearDemoOutput');
    if (btnClearDemo) btnClearDemo.addEventListener('click', () => {
      this.instructorDemoOutput = '';
      this.renderLokiContent();
    });

    // Inject Solution button
    const btnInject = document.getElementById('btnInjectSolution');
    if (btnInject && lesson.teacherSolution) {
      btnInject.addEventListener('click', () => {
        const targetFile = this.isWebLesson() ? 'index.html' : 'main.py';
        this.filesStore[lesson.id][targetFile] = lesson.teacherSolution;
        localStorage.setItem('openway_files_v1', JSON.stringify(this.filesStore));
        this.currentActiveFile = targetFile;
        this.setViewMode('code');
        this.renderTabs(Object.keys(this.filesStore[lesson.id]));
        this.loadActiveFileContent();
        this.toggleLokiModal(false);
        this.appendTerminalOutput(`\n🪄 Loki Magic: Reference code injected into ${targetFile}!\n`, 'term-info');
        this.runCurrentCode();
      });
    }

    // Step copy buttons
    const copyBtns = this.lokiBody.querySelectorAll('.btn-copy-step');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rawCode = decodeURIComponent(btn.getAttribute('data-step-code') || '');
        navigator.clipboard.writeText(rawCode).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '✓ Copied!';
          setTimeout(() => btn.textContent = originalText, 1500);
        }).catch(() => {
          // Fallback if clipboard API is restricted
          btn.textContent = '✓ Selected!';
        });
      });
    });
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
