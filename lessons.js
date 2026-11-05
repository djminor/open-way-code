/**
 * OpenWay Code - Curriculum Data (Python Assignments)
 * 60-minute community coding lessons with concise explanations, clean spacing,
 * and Python starter code / challenges.
 */

const LESSONS_DATA = [
  // --------------------------------------------------------------------------
  // LESSON 1
  // --------------------------------------------------------------------------
  {
    id: 1,
    title: "Why Code? The Problem-Solving Mindset",
    subtitle: "Coding in Python: breaking big problems into small, logical steps.",
    category: "Mindset & Logic",
    duration: "60 mins",
    icon: "🧠",
    type: "interactive-logic",
    summary: "Discover why learning to code is learning how to think clearly and solve problems, especially in the era of AI.",
    contentHtml: `
      <h3>Coding Is Problem Solving</h3>
      <p>AI tools can generate syntax in seconds, but they cannot decide <em>what</em> to build or verify if a solution is genuinely correct. Programmers are architects who know how to break down complex challenges into step-by-step algorithms.</p>

      <h4>The 4 Steps of Computational Thinking</h4>
      <ul>
        <li><strong>Decompose:</strong> Break big problems into bite-sized pieces.</li>
        <li><strong>Spot Patterns:</strong> Notice what is repeated or familiar.</li>
        <li><strong>Simplify:</strong> Filter out irrelevant noise and focus on what matters.</li>
        <li><strong>Design the Recipe:</strong> Write clear, unambiguous instructions.</li>
      </ul>

      <div class="tip-box">
        <strong>💡 The Co-Pilot Rule:</strong> AI is an engine; you are the driver. If you know how the code works, you can steer effectively and catch bugs easily.
      </div>
    `,
    challenge: `
      <strong>🎯 Your Mission: The Robot Toast Algorithm</strong>
      <ol>
        <li>Inspect the step-by-step recipe in <code>main.py</code>.</li>
        <li>Click <strong>Run ❯</strong> to watch the computer follow instructions sequentially.</li>
        <li>Try changing <code>has_bread = False</code> on line 32 to see how the code handles missing inputs!</li>
      </ol>
    `,
    files: {
      "main.py": `# Lesson 1: Step-by-Step Problem Solving (Python)
# Test how code handles step-by-step logic

def make_toast(has_bread, has_toaster, is_plugged_in):
    print("Robot Toast Protocol Starting...")
    print("")
    
    # 1. Check prerequisites
    if not has_toaster or not is_plugged_in:
        return "Error: Toaster is missing or unplugged!"
    if not has_bread:
        return "Error: No bread available!"
        
    # 2. Step-by-step recipe
    steps = [
        "Take 1 slice of bread",
        "Place bread in toaster slot",
        "Set heat dial to 3",
        "Push down lever",
        "Wait for toaster to pop up",
        "Carefully remove warm toast",
        "Spread butter evenly"
    ]
    
    for i, step in enumerate(steps, 1):
        print("  Step " + str(i) + ": " + step)
        
    print("")
    return "Success: Toast ready! Algorithmic recipe complete."

# Try toggling has_bread between True and False:
result = make_toast(has_bread=True, has_toaster=True, is_plugged_in=True)
print(result)
`
    },
    teacherSolution: `def make_toast(has_bread, has_toaster, is_plugged_in):
    print("Robot Toast Protocol Starting...")
    print("")
    
    if not has_toaster or not is_plugged_in:
        return "Error: Toaster is missing or unplugged!"
    if not has_bread:
        return "Error: No bread available!"
        
    steps = [
        "Take 1 slice of bread",
        "Place bread in toaster slot",
        "Set heat dial to 3",
        "Push down lever",
        "Wait for toaster to pop up",
        "Carefully remove warm toast",
        "Spread butter evenly"
    ]
    
    for i, step in enumerate(steps, 1):
        print("  Step " + str(i) + ": " + step)
        
    print("")
    return "Success: Toast ready! Algorithmic recipe complete."

result = make_toast(has_bread=True, has_toaster=True, is_plugged_in=True)
print(result)
`,
    hints: [
      "Click 'Run ❯' to see the output in the console.",
      "Notice how the computer executes steps in exact order from top to bottom.",
      "Try setting has_bread = False to test error checking!"
    ],
    validate: (code, output) => {
      if (output.includes("Robot Toast Protocol Starting") && (output.includes("Success") || output.includes("Error"))) {
        return { pass: true, message: "Great job! You ran the recipe algorithm and observed step-by-step execution in Python." };
      }
      return { pass: false, message: "Click 'Run ❯' to execute the toast algorithm!" };
    }
  },

  // --------------------------------------------------------------------------
  // LESSON 2
  // --------------------------------------------------------------------------
  {
    id: 2,
    title: "How the Web Works: DevTools & The DOM",
    subtitle: "Inspect elements and manipulate webpage structure in real time.",
    category: "Web Basics",
    duration: "60 mins",
    icon: "🔍",
    type: "devtools-lab",
    summary: "Every website is built with HTML, CSS, and JavaScript. Learn how browsers turn code into a live DOM tree that you can inspect and modify.",
    contentHtml: `
      <h3>The Three Building Blocks</h3>
      <ul>
        <li><strong>HTML:</strong> Content and structure (headings, buttons, text).</li>
        <li><strong>CSS:</strong> Colors, fonts, layouts, and spacing.</li>
        <li><strong>JavaScript:</strong> Interactivity (clicks, score counters, dynamic updates).</li>
      </ul>

      <h4>The DOM (Document Object Model)</h4>
      <p>The browser reads HTML code and builds a live JavaScript object tree called the <strong>DOM</strong>. When you view a website, you are looking at a live visual rendering of that tree.</p>

      <div class="tip-box">
        <strong>💡 Pro Tip:</strong> Press <kbd>F12</kbd> (or right-click anywhere and choose <strong>Inspect</strong>) to open Developer Tools in any browser!
      </div>
    `,
    challenge: `
      <strong>🎯 Your Mission: Personalize the Web Page</strong>
      <ol>
        <li>Click into <code>index.html</code> in the editor.</li>
        <li>Change the heading text inside <code>&lt;h1&gt;</code> to your name.</li>
        <li>Change the score from <code>100 XP</code> to <code>999,999 XP</code>.</li>
        <li>Switch to the <strong>Live Web Preview</strong> tab to see your changes instantly!</li>
      </ol>
    `,
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 30px;
      background: #1e2229;
      color: #f0f3f6;
      text-align: center;
    }
    .card {
      background: #272c35;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      max-width: 480px;
      margin: 0 auto;
      border: 1px solid #383f4a;
    }
    h1 { color: #4ade80; margin-top: 0; }
    .badge {
      display: inline-block;
      background: #1c3325;
      color: #4ade80;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: bold;
      margin-top: 15px;
      border: 1px solid rgba(74, 222, 128, 0.3);
    }
  </style>
</head>
<body>
  <div class="card">
    <!-- 1. Change this heading to your name! -->
    <h1>My Personal Web Base</h1>
    <p>Currently learning web development and programming.</p>
    
    <!-- 2. Change this score to 999,999 XP! -->
    <div class="badge">Player Score: 100 XP</div>
  </div>
</body>
</html>
`
    },
    hints: [
      "Edit the text between <h1> and </h1>.",
      "Switch to the 'Live Web Preview' tab to see your changes.",
      "Try changing the background color in the <style> section!"
    ],
    validate: (code, output, files) => {
      const html = files["index.html"] || code;
      if (!html.includes("My Personal Web Base") || html.includes("999")) {
        return { pass: true, message: "Awesome! You customized the HTML and updated the live DOM." };
      }
      return { pass: false, message: "Personalize the heading or score in index.html to complete the mission!" };
    }
  },

  // --------------------------------------------------------------------------
  // LESSON 3
  // --------------------------------------------------------------------------
  {
    id: 3,
    title: "First Web App: Interactive Portfolio",
    subtitle: "Build and style your own personal web app directly in the browser.",
    category: "Web Development",
    duration: "60 mins",
    icon: "🎨",
    type: "web-playground",
    summary: "Write HTML for content, CSS for clean styling, and JavaScript for an interactive button—all running right inside your browser without any setup.",
    contentHtml: `
      <h3>Three Files Working Together</h3>
      <p>Click through the tabs above your editor to see how the three files connect:</p>
      <ul>
        <li><code>index.html</code>: Your name, bio, and buttons.</li>
        <li><code>style.css</code>: Fonts, colors, padding, and layout.</li>
        <li><code>script.js</code>: JavaScript event listener and counter logic.</li>
      </ul>

      <div class="tip-box">
        <strong>💡 No Installation Needed:</strong> Everything runs completely in your browser. Any changes you make show immediately in the <strong>Live Web Preview</strong> tab!
      </div>
    `,
    challenge: `
      <strong>🎯 Your Mission: Build Your Bio</strong>
      <ol>
        <li>In <code>index.html</code>, put your name in <code>&lt;h1&gt;</code>.</li>
        <li>Add 2 of your favorite hobbies or games to the list.</li>
        <li>In <code>style.css</code>, try changing <code>--accent</code> to your favorite color (e.g. <code>#3b82f6</code> or <code>#8b5cf6</code>).</li>
        <li>Switch to the <strong>Live Web Preview</strong> and give yourself a high five!</li>
      </ol>
    `,
    files: {
      "index.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <div class="avatar">🚀</div>
    <!-- 1. Change this name: -->
    <h1>Alex Rivera</h1>
    <p class="tagline">Junior Developer & Creator</p>

    <div class="section">
      <h3>About Me</h3>
      <p>I love building web apps, solving tricky puzzles, and coding with Python and JavaScript!</p>
    </div>

    <div class="section">
      <h3>My Superpowers</h3>
      <ul class="skills">
        <li>🎮 Game Design</li>
        <li>💻 Python & Web Dev</li>
        <li>🍕 Pizza Tasting</li>
      </ul>
    </div>

    <div class="action-box">
      <button id="clapBtn" class="btn">✋ Give High Five!</button>
      <div id="counter">High Fives: 0</div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
`,
      "style.css": `/* Modern Balanced Slate Portfolio Styling */
:root {
  --accent: #2ea043; /* Try #3b82f6 (blue) or #8b5cf6 (purple) */
  --bg: #1e2229;
  --card: #272c35;
  --text: #f0f3f6;
  --muted: #9da7b3;
  --border: #383f4a;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  margin: 0;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.card {
  background: var(--card);
  padding: 30px;
  border-radius: 8px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  border: 1px solid var(--border);
  text-align: center;
}

.avatar { font-size: 48px; margin-bottom: 10px; }
h1 { margin: 0; color: var(--text); font-size: 24px; }
.tagline { color: var(--muted); font-size: 14px; margin-top: 4px; }

.section {
  text-align: left;
  margin: 20px 0;
  padding-top: 15px;
  border-top: 1px solid var(--border);
}

.section h3 {
  font-size: 13px;
  text-transform: uppercase;
  color: var(--accent);
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.skills {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skills li {
  background: #1e2229;
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
}

.action-box {
  margin-top: 25px;
  padding: 15px;
  background: #1e2229;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.btn {
  background: var(--accent);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:hover { opacity: 0.9; }

#counter {
  margin-top: 8px;
  font-size: 13px;
  color: var(--muted);
  font-weight: bold;
}
`,
      "script.js": `// Interactive JavaScript Button Logic
let count = 0;
const btn = document.getElementById('clapBtn');
const display = document.getElementById('counter');

btn.addEventListener('click', () => {
  count++;
  display.textContent = \`High Fives: \${count} 🎉\`;
  if (count === 5) {
    alert("🔥 5 High Fives! You're on fire!");
  }
});
`
    },
    hints: [
      "Click the 'style.css' tab to change colors.",
      "Click the 'Live Web Preview' tab to test your high five button.",
      "Check the skills list in index.html to add your own hobbies!"
    ],
    validate: (code, output, files) => {
      const html = files["index.html"] || "";
      if (!html.includes("Alex Rivera") || html.includes("High Fives")) {
        return { pass: true, message: "Great job! You personalized your web app portfolio." };
      }
      return { pass: false, message: "Customize your name or skills in index.html!" };
    }
  },

  // --------------------------------------------------------------------------
  // LESSON 4
  // --------------------------------------------------------------------------
  {
    id: 4,
    title: "Messy Data Cleanup with Regular Expressions",
    subtitle: "Extract emails from raw web data using Python re, remove duplicates, and export a CSV.",
    category: "Data & Regex",
    duration: "60 mins",
    icon: "🧹",
    type: "python-files",
    trinketUrl: "https://trinket.strivemath.org/library/trinkets/1e9c610b0801",
    summary: "Real web data is often messy. Learn how software engineers use Python Regular Expressions to extract patterns, deduplicate records, and generate clean spreadsheets.",
    contentHtml: `
      <h3>The Goal</h3>
      <p>You have a messy HTML file from an event registration form. Extract every student email and save a clean, unique list into <code>clean_emails.csv</code>.</p>

      <h4>The Email Pattern in Python (Regex)</h4>
      <div class="code-preview">
<pre><span class="tok-var">pattern</span> = <span class="tok-str">r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'</span>
<span class="tok-var">emails</span> = <span class="tok-var">re</span>.<span class="tok-fn">findall</span>(<span class="tok-var">pattern</span>, <span class="tok-var">html_junk</span>)</pre>
      </div>

      <h4>Your 3 Tasks:</h4>
      <ul>
        <li><strong>TODO 1:</strong> Call <code>re.findall(email_pattern, html_junk)</code> to extract raw emails.</li>
        <li><strong>TODO 2:</strong> Loop through emails, lowercase them with <code>.lower()</code>, and add unique ones to <code>clean_email_list</code>.</li>
        <li><strong>TODO 3:</strong> Open <code>clean_emails.csv</code> with mode <code>"w"</code> and write each clean email on its own line.</li>
      </ul>
    `,
    challenge: `
      <strong>🎯 Your Mission: Clean the Dataset in Python</strong>
      <ol>
        <li>In <code>main.py</code>, fill in the 3 TODO sections.</li>
        <li>Click <strong>Run ❯</strong> to execute your code.</li>
        <li>Check the tabs above—a new <code>clean_emails.csv</code> tab will appear automatically!</li>
      </ol>
    `,
    files: {
      "main.py": `import re

# 1. Read the messy HTML file (Provided)
with open("messy_page.html", "r") as file:
    html_junk = file.read()

email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'

# --- TODO 1: EXTRACT RAW EMAILS ---
# Use re.findall(email_pattern, html_junk)
found_emails = [] # Replace with re.findall call

print("Raw emails detected: " + str(len(found_emails)))


# --- TODO 2: LOWERCASE AND DEDUPLICATE ---
clean_email_list = []

# Loop through found_emails:
# for email in found_emails:
#     clean = email.lower()
#     if clean not in clean_email_list:
#         clean_email_list.append(clean)


print("Clean, unique emails: " + str(len(clean_email_list)))


# --- TODO 3: SAVE TO CSV ---
# with open("clean_emails.csv", "w") as output_file:
#     output_file.write("Email Address\\n")
#     for email in clean_email_list:
#         output_file.write(email + "\\n")

print("Run your code! 'clean_emails.csv' will appear in your tabs.")
`,
      "messy_page.html": `<!DOCTYPE html>
<html>
<head><title>Spring Tech Fair</title></head>
<body>
    <h1>Registered Participants</h1>
    <div class="user">Maya Lin: <a href="mailto:maya.lin@westoak.edu">Email Maya</a></div>
    <div class="user">Lucas Vance: <a href="mailto:lucas.vance@crestview.org">Email Lucas</a></div>
    <div class="user">Zoe Washington: <span>zoe_wash@hillcrest.net</span></div>
    <div class="user">Devon Brooks: <a href="mailto:devon.brooks@westoak.edu">Email Devon</a></div>
    <!-- Duplicate entry test -->
    <div class="user">Maya Lin (Duplicate): <span>maya.lin@westoak.edu</span></div>
    <aside>Sponsor contact: sponsor@circuitsupply.com</aside>
    <footer>Questions? Contact support@roboticsleague.org or webmaster@techfair.net</footer>
</body>
</html>
`
    },
    teacherSolution: `import re

with open("messy_page.html", "r") as file:
    html_junk = file.read()

email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'

# TODO 1
found_emails = re.findall(email_pattern, html_junk)
print("Raw emails detected: " + str(len(found_emails)))

# TODO 2
clean_email_list = []
for email in found_emails:
    clean = email.lower()
    if clean not in clean_email_list:
        clean_email_list.append(clean)

print("Clean, unique emails: " + str(len(clean_email_list)))

# TODO 3
with open("clean_emails.csv", "w") as output_file:
    output_file.write("Email Address\\n")
    for email in clean_email_list:
        output_file.write(email + "\\n")

print("Generated clean_emails.csv successfully!")
`,
    hints: [
      "TODO 1: found_emails = re.findall(email_pattern, html_junk)",
      "TODO 2: Use email.lower() and check 'if clean not in clean_email_list:'",
      "TODO 3: with open('clean_emails.csv', 'w') as output_file: output_file.write(email + '\\n')"
    ],
    validate: (code, output, files) => {
      const hasFindall = /re\.findall\s*\(/.test(code);
      const hasDedupe = /not\s+in\s+clean_email_list/.test(code);
      const hasCsv = files["clean_emails.csv"] || output.includes("Generated clean_emails.csv");
      if (hasFindall && hasDedupe && output.includes("Clean, unique emails:")) {
        return { pass: true, message: "Perfect! You extracted, cleaned, and exported the email dataset to CSV in Python." };
      }
      return { pass: false, message: "Complete TODO 1 and TODO 2 to extract and deduplicate emails!" };
    }
  },

  // --------------------------------------------------------------------------
  // LESSON 5
  // --------------------------------------------------------------------------
  {
    id: 5,
    title: "Event Optimization: Greedy Scheduling",
    subtitle: "Attend the maximum number of activities using Python sorting and greedy algorithms.",
    category: "Algorithms",
    duration: "60 mins",
    icon: "⏱️",
    type: "python-files",
    trinketUrl: "https://trinket.strivemath.org/library/trinkets/9982e2280384",
    summary: "How do computers schedule flights and CPU tasks without overlaps? Discover the famous Earliest End Time greedy algorithm in Python.",
    contentHtml: `
      <h3>The Challenge: Overlapping Events</h3>
      <p>You have 1 day at the Tech Fair with 7 cool events, but many happen at the exact same time. How do you fit in the maximum number of activities?</p>

      <h4>The Greedy Strategy: Earliest End Time</h4>
      <p>Always pick the event that <strong>finishes earliest</strong>. In Python, we sort by defining a helper function: <code>events.sort(key=get_end_time)</code>!</p>

      <div class="code-preview">
<pre><span class="tok-kw">def</span> <span class="tok-fn">get_end_time</span>(<span class="tok-var">event</span>):
    <span class="tok-kw">return</span> <span class="tok-var">event</span>[<span class="tok-str">"end"</span>]

<span class="tok-var">events</span>.<span class="tok-fn">sort</span>(<span class="tok-var">key</span>=<span class="tok-var">get_end_time</span>)</pre>
      </div>
    `,
    challenge: `
      <strong>🎯 Your Mission: Beat the Casual Schedule in Python</strong>
      <ol>
        <li>Inspect <code>events.txt</code> to see the festival timetable.</li>
        <li>In <code>main.py</code>, complete <strong>TODO 1</strong>: return <code>event["end"]</code> in <code>get_end_time</code>.</li>
        <li>Complete <strong>TODO 2</strong>: If an event starts at or after <code>clock_time</code>, add it to your schedule and update <code>clock_time</code>!</li>
      </ol>
    `,
    files: {
      "main.py": `# Load events from events.txt (Provided)
events = []
with open("events.txt", "r") as file:
    for line in file:
        title, start, end = line.strip().split(",")
        events.append({"title": title, "start": int(start), "end": int(end)})

# Strategy 1: Casual Visitor (Provided)
casual_schedule = []
clock = 0
for event in events:
    if event["start"] >= clock:
        casual_schedule.append(event["title"])
        clock = event["end"]

print("Casual Visitor attended " + str(len(casual_schedule)) + " events:")
print(", ".join(casual_schedule))
print("--------------------------------------------------")

# Strategy 2: Smart Scheduler (Earliest End Time)
# --- TODO 1: SORT BY EARLIEST END TIME ---
def get_end_time(event):
    # TODO: Change this to return event["end"] so events finishing earliest come first!
    return event["start"]

events.sort(key=get_end_time)

# --- TODO 2: BUILD OPTIMAL SCHEDULE ---
optimal_schedule = []
clock_time = 0

for event in events:
    # Check if event starts at or after our current clock_time:
    # if event["start"] >= clock_time:
    #     optimal_schedule.append(event["title"])
    #     clock_time = event["end"]
    pass

print("Smart Scheduler attended " + str(len(optimal_schedule)) + " events:")
print(", ".join(optimal_schedule))
print("Bonus: " + str(len(optimal_schedule) - len(casual_schedule)) + " extra activities!")
`,
      "events.txt": `Robot Wars,9,11
Laser Tag,10,12
Drone Racing,11,12
Game Design,11,14
3D Printing,13,14
AI Art,14,16
Rocket Launch,15,16
`
    },
    teacherSolution: `events = []
with open("events.txt", "r") as file:
    for line in file:
        title, start, end = line.strip().split(",")
        events.append({"title": title, "start": int(start), "end": int(end)})

casual_schedule = []
clock = 0
for event in events:
    if event["start"] >= clock:
        casual_schedule.append(event["title"])
        clock = event["end"]

def get_end_time(event):
    return event["end"]

events.sort(key=get_end_time)

optimal_schedule = []
clock_time = 0
for event in events:
    if event["start"] >= clock_time:
        optimal_schedule.append(event["title"])
        clock_time = event["end"]

print("Smart Scheduler attended " + str(len(optimal_schedule)) + " events:")
print(", ".join(optimal_schedule))
print("Bonus: " + str(len(optimal_schedule) - len(casual_schedule)) + " extra activities!")
`,
    hints: [
      "TODO 1: return event['end']",
      "TODO 2: if event['start'] >= clock_time: optimal_schedule.append(event['title']); clock_time = event['end']",
      "The optimal schedule attends 4 events compared to 3!"
    ],
    validate: (code, output) => {
      if (output.includes("Smart Scheduler attended 4 events") || output.includes("extra activities!")) {
        return { pass: true, message: "Optimal schedule unlocked! You proved greedy scheduling in Python attends 4 events." };
      }
      return { pass: false, message: "Implement TODO 1 and TODO 2 to build the optimal schedule (attends 4 events)!" };
    }
  },

  // --------------------------------------------------------------------------
  // LESSON 6
  // --------------------------------------------------------------------------
  {
    id: 6,
    title: "Middle Earth Routing: Nearest Neighbor Algorithm",
    subtitle: "Navigate the Fellowship using coordinates, Manhattan distance, and greedy routing in Python.",
    category: "AI & Algorithms",
    duration: "60 mins",
    icon: "🗺️",
    type: "python-map",
    trinketUrl: "https://trinket.strivemath.org/library/trinkets/b0d3dd520117",
    summary: "Help the Fellowship travel across Middle Earth. Implement Manhattan distance and the Nearest Neighbor algorithm in Python to calculate the shortest path.",
    contentHtml: `
      <h3>The Fellowship's Journey</h3>
      <p>Frodo and the Fellowship need to travel between 7 Middle Earth destinations. Wandering randomly wastes energy. We can write an algorithm in Python to find a much shorter route.</p>

      <h4>1. Manhattan Distance</h4>
      <p>Distance on a map grid equals the horizontal gap plus vertical gap: <code>abs(x1 - x2) + abs(y1 - y2)</code>.</p>

      <h4>2. Nearest Neighbor</h4>
      <p>At each location, calculate distances to all unvisited destinations and travel to the closest one next!</p>

      <div class="tip-box">
        <strong>🗺️ Map Tab:</strong> Click the <strong>Middle Earth Map</strong> tab above the editor to see all destination coordinates on the map.
      </div>
    `,
    challenge: `
      <strong>🎯 Your Mission: Optimize the Fellowship's Route in Python</strong>
      <ol>
        <li>Complete <strong>TODO 1</strong>: Write <code>get_distance(p1, p2)</code> using <code>abs()</code>.</li>
        <li>Complete <strong>TODO 2</strong>: Inside the search loop, check if <code>dist &lt; shortest_dist</code>.</li>
        <li>Complete <strong>TODO 3</strong>: Move <code>current_pos</code>, record the stop, and remove it from <code>unvisited</code>.</li>
      </ol>
    `,
    files: {
      "main.py": `# --- TODO 1: MANHATTAN DISTANCE ---
def get_distance(p1, p2):
    # p1 is (x1, y1) and p2 is (x2, y2)
    dist_x = 0 # abs of difference between p1[0] and p2[0]
    dist_y = 0 # abs of difference between p1[1] and p2[1]
    return dist_x + dist_y

# Load destinations from stops.txt (Provided)
destinations = []
with open("stops.txt", "r") as file:
    for line in file:
        name, x, y = line.strip().split(",")
        destinations.append({"name": name, "pos": (float(x), float(y))})

# Route A: Unoptimized Wandering Route (Provided)
current_pos = (5.0, 8.0) # Start in Hobbiton
unopt_dist = 0
for stop in destinations:
    unopt_dist += get_distance(current_pos, stop["pos"])
    current_pos = stop["pos"]

print("Unoptimized Journey: " + str(round(unopt_dist, 2)) + " leagues")

# Route B: Smart Route (Nearest Neighbor)
current_pos = (5.0, 8.0)
smart_dist = 0
unvisited = list(destinations)
smart_route = []

while len(unvisited) > 0:
    closest_stop = None
    shortest_dist = 999999

    # --- TODO 2: FIND CLOSEST DESTINATION ---
    for stop in unvisited:
        dist = get_distance(current_pos, stop["pos"])
        # if dist < shortest_dist:
        #     shortest_dist = dist
        #     closest_stop = stop

    # --- TODO 3: TRAVEL THERE ---
    # smart_dist += shortest_dist
    # current_pos = closest_stop["pos"]
    # smart_route.append(closest_stop["name"])
    # unvisited.remove(closest_stop)
    break # Remove this break after writing TODO 3!

print("Smart Fellowship Route: " + str(round(smart_dist, 2)) + " leagues")
print("Path:                   " + " -> ".join(smart_route))
`,
      "stops.txt": `Hobbiton,5,8
Weathertop,8.5,8
Ettenmoors,9.5,9.25
Lorien,6.5,10.5
Rohan,5,11
Gondor,3,10
Erebor,9.5,13.8
`
    },
    teacherSolution: `def get_distance(p1, p2):
    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])

destinations = []
with open("stops.txt", "r") as file:
    for line in file:
        name, x, y = line.strip().split(",")
        destinations.append({"name": name, "pos": (float(x), float(y))})

current_pos = (5.0, 8.0)
unopt_dist = 0
for stop in destinations:
    unopt_dist += get_distance(current_pos, stop["pos"])
    current_pos = stop["pos"]

print("Unoptimized Journey: " + str(round(unopt_dist, 2)) + " leagues")

current_pos = (5.0, 8.0)
smart_dist = 0
unvisited = list(destinations)
smart_route = []

while len(unvisited) > 0:
    closest_stop = None
    shortest_dist = 999999
    for stop in unvisited:
        dist = get_distance(current_pos, stop["pos"])
        if dist < shortest_dist:
            shortest_dist = dist
            closest_stop = stop

    smart_dist += shortest_dist
    current_pos = closest_stop["pos"]
    smart_route.append(closest_stop["name"])
    unvisited.remove(closest_stop)

print("Smart Fellowship Route: " + str(round(smart_dist, 2)) + " leagues")
print("Path:                   " + " -> ".join(smart_route))
print("Saved:                  " + str(round(unopt_dist - smart_dist, 2)) + " leagues!")
`,
    hints: [
      "TODO 1: return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])",
      "TODO 2: if dist < shortest_dist: shortest_dist = dist; closest_stop = stop",
      "TODO 3: Remember to remove the 'break' statement!"
    ],
    validate: (code, output) => {
      if (output.includes("Smart Fellowship Route:") && !output.includes("break")) {
        return { pass: true, message: "Route optimized! You solved the Middle Earth routing challenge in Python." };
      }
      return { pass: false, message: "Implement TODO 1, 2, and 3 to compute the smart Fellowship route!" };
    }
  },

  // --------------------------------------------------------------------------
  // LESSON 7
  // --------------------------------------------------------------------------
  {
    id: 7,
    title: "Leveraging AI in Coding: Co-Pilot Thinking",
    subtitle: "Partner with an AI model: prompting, verification, and catching bugs in Python.",
    category: "AI & Modern Dev",
    duration: "60 mins",
    icon: "🤖",
    type: "ai-sandbox",
    summary: "Learn how modern engineers pair-program with AI tools. Practice writing clear prompts, reviewing generated Python code, and running test suites.",
    contentHtml: `
      <h3>Coding with an AI Partner</h3>
      <p>Modern developers use AI to accelerate boilerplate tasks. But AI models can generate subtle bugs or hallucinations. Your job as the programmer is to be the <strong>architect and reviewer</strong>.</p>

      <h4>The 3 Rules of Coding Prompts</h4>
      <ul>
        <li><strong>Role:</strong> "You are an expert Python tutor."</li>
        <li><strong>Constraints:</strong> Specify exact inputs, outputs, and edge cases.</li>
        <li><strong>Test Cases:</strong> Always ask: <em>"Include 3 test cases to verify the function."</em></li>
      </ul>
    `,
    challenge: `
      <strong>🎯 Your Mission: Review and Test AI Code</strong>
      <ol>
        <li>Inspect the AI-generated palindrome function in <code>main.py</code>.</li>
        <li>Click <strong>Run ❯</strong> to run the automated test suite.</li>
        <li>Switch to the <strong>AI Guest Assistant</strong> tab to test prompting a new function!</li>
      </ol>
    `,
    files: {
      "main.py": `# Lesson 7: AI Code Review & Verification (Python)
# Candidate function generated by AI:
def is_palindrome(text):
    clean = text.replace(" ", "").lower()
    return clean == clean[::-1]

# Automated Test Suite:
tests = [
    ("racecar", True),
    ("hello", False),
    ("A man a plan a canal Panama", True),
    ("12321", True)
]

print("Testing AI-Generated Python Code...")
for word, expected in tests:
    result = is_palindrome(word)
    mark = "PASS" if result == expected else "FAIL"
    print("  " + mark + " | '" + word + "' -> " + str(result))

print("")
print("All automated verification checks passed!")
`
    },
    teacherSolution: `def is_palindrome(text):
    clean = text.replace(" ", "").lower()
    return clean == clean[::-1]

tests = [
    ("racecar", True),
    ("hello", False),
    ("A man a plan a canal Panama", True),
    ("12321", True)
]

print("Testing AI-Generated Python Code...")
for word, expected in tests:
    result = is_palindrome(word)
    mark = "PASS" if result == expected else "FAIL"
    print("  " + mark + " | '" + word + "' -> " + str(result))

print("")
print("All automated verification checks passed!")
`,
    hints: [
      "Click 'Run ❯' to execute the test suite.",
      "Notice how string slicing [::-1] reverses the string cleanly in Python!",
      "Use the AI tab to experiment with prompts."
    ],
    validate: (code, output) => {
      if (output.includes("Testing AI-Generated Python Code") && output.includes("PASS")) {
        return { pass: true, message: "Great work! You reviewed and verified AI-generated Python with test cases." };
      }
      return { pass: false, message: "Run the verification suite in main.py!" };
    }
  },

  // --------------------------------------------------------------------------
  // LESSONS 8 - 12 (TBA)
  // --------------------------------------------------------------------------
  {
    id: 8,
    title: "TBA: 2D Game Physics & Collisions",
    subtitle: "Simulating gravity, jump velocity, and collisions in code.",
    category: "Game Dev",
    duration: "60 mins",
    icon: "🕹️",
    type: "tba",
    summary: "Upcoming module: Learn game loops, coordinate movement, and collision detection.",
    contentHtml: `<p>This module is currently in preparation. Check back soon!</p>`,
    challenge: `<p>Coming soon.</p>`,
    files: { "main.py": `# Lesson 8: In preparation\nprint("Lesson 8 coming soon!")\n` },
    validate: () => ({ pass: true, message: "Preview unlocked!" })
  },
  {
    id: 9,
    title: "TBA: Live Data & Weather APIs",
    subtitle: "Fetching real-world live information using HTTP requests and JSON data.",
    category: "Networking",
    duration: "60 mins",
    icon: "🌐",
    type: "tba",
    summary: "Upcoming module: Connecting programs to real-world live APIs.",
    contentHtml: `<p>This module is currently in preparation. Check back soon!</p>`,
    challenge: `<p>Coming soon.</p>`,
    files: { "main.py": `# Lesson 9: In preparation\nprint("Lesson 9 coming soon!")\n` },
    validate: () => ({ pass: true, message: "Preview unlocked!" })
  },
  {
    id: 10,
    title: "TBA: Data Science & Statistics",
    subtitle: "Analyzing trends, finding patterns, and generating charts with Python.",
    category: "Data Science",
    duration: "60 mins",
    icon: "📊",
    type: "tba",
    summary: "Upcoming module: Exploring big datasets and plotting graphs.",
    contentHtml: `<p>This module is currently in preparation. Check back soon!</p>`,
    challenge: `<p>Coming soon.</p>`,
    files: { "main.py": `# Lesson 10: In preparation\nprint("Lesson 10 coming soon!")\n` },
    validate: () => ({ pass: true, message: "Preview unlocked!" })
  },
  {
    id: 11,
    title: "TBA: Cybersecurity Basics",
    subtitle: "Secret ciphers, hashing, and defense against attacks.",
    category: "Security",
    duration: "60 mins",
    icon: "🛡️",
    type: "tba",
    summary: "Upcoming module: Cryptography, passwords, and web security fundamentals.",
    contentHtml: `<p>This module is currently in preparation. Check back soon!</p>`,
    challenge: `<p>Coming soon.</p>`,
    files: { "main.py": `# Lesson 11: In preparation\nprint("Lesson 11 coming soon!")\n` },
    validate: () => ({ pass: true, message: "Preview unlocked!" })
  },
  {
    id: 12,
    title: "TBA: Capstone Showcase",
    subtitle: "Design and present your custom software project.",
    category: "Capstone",
    duration: "60 mins",
    icon: "🏆",
    type: "tba",
    summary: "Upcoming module: The final project presentation and course graduation.",
    contentHtml: `<p>This module is currently in preparation. Check back soon!</p>`,
    challenge: `<p>Coming soon.</p>`,
    files: { "main.py": `# Lesson 12: In preparation\nprint("Lesson 12 coming soon!")\n` },
    validate: () => ({ pass: true, message: "Preview unlocked!" })
  }
];
