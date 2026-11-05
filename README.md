# OpenWay Code 🧭
*Community Pathways to Computer Science*

An interactive, 60-minute-per-lesson coding teaching platform designed to provide an open, accessible on-ramp to computer science, algorithmic thinking, and web development for young learners and beginners.

> **Origin**: Born out of free community classes at United Way, **OpenWay Code** is built on the belief that learning to code is learning how to think and solve problems—and that every student deserves access without barriers or software installation headaches.

---

## ⚡ Key Highlights

- **Zero Software Setup**: Students code immediately in the browser. No Python installations, no command-line setups, no IDE hurdles.
- **Client-Side Runtime**: Assignments in **Python** (and web dev in HTML/CSS/JS) execute 100% in-browser via Skulpt.
- **Free & Infinite Scalability**: Because code runs on the student's device, hosting is free with zero backend sandboxes, servers, or cloud costs.
- **Classroom-Ready**: Built-in 60-minute lesson pacing guides, secret Loki teacher answer keys (<kbd>Alt+L</kbd>), and 1-click code injection.

---

## 🚀 Running Locally

Start the local Node.js application server:

```bash
npm start
# or: node server.js
```

Then open **[http://localhost:8000](http://localhost:8000)** in your browser *(or directly open [`index.html`](file:///Users/djsproul/Desktop/AntigravityDemo/index.html))*.

---

## 🌐 Deploying to GitHub Pages (Step-by-Step)

Because OpenWay Code runs entirely client-side, GitHub Pages will host it for free forever:

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial release of OpenWay Code"
   ```

2. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and create a new repository (e.g. `openway-code`).
   - Link and push your code:
     ```bash
     git remote add origin https://github.com/<your-username>/openway-code.git
     git branch -M main
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - In your repository, click **Settings** → **Pages** (under Code and automation).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, choose `main` and folder `/(root)`, then click **Save**.
   - Within 1–2 minutes, your site will be live at:
     ```
     https://<your-username>.github.io/openway-code/
     ```

---

## 🧭 The 12-Lesson Community Curriculum

| # | Lesson Title | Topic / Activity | Runtime |
|---|---|---|---|
| **01** | **Why Code? The Problem-Solving Mindset** | Algorithmic thinking, functions, conditional checks, and the "Robot Toast" protocol. | Python (`main.py`) |
| **02** | **How the Web Works: DevTools & The DOM** | Inspecting elements, understanding the DOM tree, and altering live text & styles with browser DevTools. | DevTools Lab (`index.html`) |
| **03** | **First Web App: Interactive Portfolio** | Multi-file web development (`index.html`, `style.css`, `script.js`) with live real-time preview. | Web Playground (HTML/CSS/JS) |
| **04** | **Messy Data Cleanup with Regular Expressions** | Scraped HTML parsing, regex pattern matching with `re.findall()`, deduplication, and CSV export. | Python (`main.py` + `messy_page.html`) |
| **05** | **Event Optimization: Greedy Scheduling** | Interval scheduling, sorting with custom keys, and the Earliest End Time greedy algorithm. | Python (`main.py` + `events.txt`) |
| **06** | **Middle Earth Routing: Nearest Neighbor** | Coordinate mapping, Manhattan distance, and greedy path routing across Middle Earth locations. | Python (`main.py` + `stops.txt` + Map) |
| **07** | **Leveraging AI in Coding: Co-Pilot Thinking** | Prompt engineering for programmers, reviewing AI-generated code, and unit testing suites. | Python (`main.py` + AI Guest Sandbox) |
| **08** | **TBA: 2D Game Physics & Collisions** | Velocity, gravity, bouncing, and hitbox collision logic. | Python (`main.py`) |
| **09** | **TBA: Live Data & Weather APIs** | Real-world API integration, JSON parsing, and handling data feeds. | Python (`main.py`) |
| **10** | **TBA: Data Science & Statistics** | Statistical data analysis, averages, medians, and distribution summaries. | Python (`main.py`) |
| **11** | **TBA: Cybersecurity Basics** | Encryption ciphers, hashing, and defense against malicious input. | Python (`main.py`) |
| **12** | **TBA: Capstone Showcase** | Students design, build, and present their own custom project. | Python (`main.py`) |

---

## 🗝️ Loki Teacher Portal

Access teacher answer keys and instructional tools:
- Click the **🗝️ Loki Portal** button in the header, OR
- Press the keyboard shortcut: <kbd>Alt+L</kbd> (or <kbd>Ctrl+L</kbd>).

**Features:**
- **Pacing Guides**: 60-minute classroom breakdown (Concept hook → Guided walkthrough → Student challenge → Debrief).
- **Verified Python Answer Keys**: Complete working solutions for all assignments.
- **✨ Inject Answer into Code Editor**: 1-click solution injection to quickly demonstrate working code to the class.

---

## 🖥️ Distraction-Free Workspace Controls

- **Collapsible Lesson Guide**: Click **`‹ Hide Guide`** to collapse instructions and give the code editor 100% full width. Click **`📖 Guide ❯`** to expand it back anytime.
- **Collapsible Curriculum Sidebar**: Click **`☰ Curriculum`** in the header to toggle the 12-lessons sidebar.
- **Balanced Slate Theme**: Smooth, cohesive medium-slate styling with high-contrast text and zero neon distractions.
