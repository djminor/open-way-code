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
    title: "Sorting Algorithms: Real-Life Computer Science",
    subtitle: "Why learn to code? From Assembly to Bubble Sort, Merge Sort, and Algorithmic Thinking in the Era of AI.",
    category: "Algorithms & Logic",
    duration: "60 mins",
    icon: "⚡",
    type: "interactive-logic",
    summary: "Discover why learning to code is essential in the era of AI. Explore machine code vs real languages, algorithmic efficiency, and how Bubble Sort and Merge Sort solve real-world problems.",
    contentHtml: `
      <h3>Claude (Or Other AI Coder) Demo</h3>
      <p><em>Start with a live interactive demonstration of an AI coding tool.</em></p>

      <h3>So Why Learn to Code?</h3>
      <p><strong>Ask everyone:</strong> Why learn to code when AI can generate code for us?</p>
      <p><strong>Synthesize answers and explain:</strong> Generating syntax is fast for AI, but software engineering is fundamentally about understanding logic, algorithmic efficiency, and knowing when AI makes flawed assumptions.</p>

      <h3>From 1940s Machine Code to Real Languages</h3>
      <p>Back in the 1940s and 50s, we mostly used something called <strong>assembly</strong>, or machine code. It got overtaken by real coding languages, like the ones we’ll learn in this class.</p>

      <div class="code-preview">
<span class="tok-comment"># Assembly (Low-level machine instructions: registers, memory offsets, raw addresses)</span>
MOV EAX, [num1]
ADD EAX, [num2]
MOV [result], EAX

<span class="tok-comment"># Python / C (High-level, human-readable real coding language)</span>
result = num1 + num2
print(result)
      </div>

      <h4>How AI Is Both Different and the Same</h4>
      <p>We don’t need to look at machine code anymore, but we might need to look at real code.</p>
      <p><strong>AI makes a lot of assumptions that we need to understand</strong>, because sometimes it can go in the wrong direction without us even knowing.</p>

      <h3>Thinking Algorithmically: Bubble Sort</h3>
      <p>Let’s get thinking algorithmically so we can actually run coding processes.</p>

      <div class="tip-box">
        🎥 <strong>Bubble sort representation:</strong> 
        <a href="https://youtube.com/shorts/fpwj_gp3jtE?is=vrB3QND_DjBebV7g" target="_blank" rel="noopener">Watch Video Demonstration (YouTube Shorts) ❯</a>
      </div>

      <p><strong>Whiteboard:</strong> array of numbers. Explain how bubble sort is implemented code-wise. There are two parts:</p>
      <ul>
        <li><strong>An Iterator:</strong> Loops across the list step-by-step.</li>
        <li><strong>A Comparator:</strong> Compares two adjacent numbers and decides whether to swap.</li>
      </ul>

      <p>How Bubble Sort operates:</p>
      <ol>
        <li>It gets a list of numbers</li>
        <li>It compares each number in that list with the next one</li>
        <li>If they’re out of order, it swaps them</li>
        <li>It repeats this for every pair in the list</li>
      </ol>

      <h4>Pseudo Code vs. Real Code</h4>
      <div class="code-preview">
<span class="tok-comment"># Pseudo Code</span>
For each pass across the list:
    For each adjacent pair (A, B):
        If A &gt; B:
            Swap A and B

<span class="tok-comment"># Real Python Code</span>
<span class="tok-kw">def</span> <span class="tok-fn">bubble_sort</span>(numbers):
    n = <span class="tok-fn">len</span>(numbers)
    <span class="tok-kw">for</span> i <span class="tok-kw">in</span> <span class="tok-fn">range</span>(n):
        <span class="tok-kw">for</span> j <span class="tok-kw">in</span> <span class="tok-fn">range</span>(0, n - i - 1):
            <span class="tok-kw">if</span> numbers[j] &gt; numbers[j + 1]:
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
    <span class="tok-kw">return</span> numbers
      </div>

      <h3>The Problem: x² Iterations</h3>
      <p>But this has a problem. It works for smaller datasets and ones that are already relatively organized, but guess how many possible iterations it has for <em>x</em> items?</p>
      <p><strong>It has x² possible iterations.</strong></p>

      <h3>AI vs. Efficiency</h3>
      <p>Often AI is like bubble sort – it works really fast because what it is doing is easy, but it’s not efficient.</p>
      <ul>
        <li>For instance – our brains process about <strong>74 GB of data a day</strong>.</li>
        <li>An AI model can process that same amount of data in about <strong>ten seconds</strong>.</li>
        <li><strong>But just because it’s fast doesn’t mean it’s efficient.</strong></li>
        <li>AI would also use anywhere from <strong>7,500 to 37,000 kWh</strong> for this task.</li>
        <li>Our brains use about <strong>0.58 kWh</strong>.</li>
      </ul>
      <p><strong>So this is why we learn to code!</strong></p>

      <h3>A Much More Efficient Algorithm: Merge Sort</h3>
      <p>Here’s a representation of a much more efficient sorting algorithm, merge sort:</p>
      <div style="text-align: center; margin: 16px 0;">
        <img src="assets/merge_sort_diagram.png" alt="Merge Sort Algorithm Diagram" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--border-strong); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      </div>

      <ul>
        <li>For one million numbers, <strong>bubble sort can take up to a few hours</strong>.</li>
        <li>For the same, <strong>merge sort takes less than half a second</strong>.</li>
      </ul>

      <div class="tip-box" style="border-left: 4px solid var(--accent-green);">
        <p style="margin-bottom: 6px;"><strong>Sometimes the solution is making a bigger, faster computer.</strong></p>
        <p style="margin-bottom: 6px;"><strong>Other times it’s making a more efficient algorithm.</strong></p>
        <p style="margin: 0; font-size: 15px; font-weight: 700; color: var(--accent-green);">That’s why we learn to code.</p>
      </div>
    `,
    challenge: `
      <strong>🎯 Your Mission: Complete the Bubble Sort Comparator</strong>
      <ol>
        <li>Click <strong>Run ❯</strong> to watch the list pass through the loops. Notice that nothing swaps yet because the comparator is set to <code>False</code>!</li>
        <li>Find the <strong>Comparator</strong> on line 24: <code>if False:</code>. Change <code>False</code> to <code>left &gt; right</code> to swap numbers when the left is larger!</li>
        <li>Click <strong>✓ Check Answer</strong> to verify your algorithm sorts the list into <code>[1, 2, 4, 5, 8]</code>! (Bonus: try <code>left &lt; right</code> for descending order!)</li>
        <li>Notice how 5 items take up to 25 (x²) iterations. Imagine sorting 1,000,000 numbers — that's why we need algorithms like Merge Sort!</li>
      </ol>
    `,
    files: {
      "main.py": `# Lesson 1: Sorting Algorithms (Bubble Sort)
# Explore the two core components: an Iterator and a Comparator

def bubble_sort(numbers):
    n = len(numbers)
    comparisons = 0
    swaps = 0
    
    print("Initial unsorted list:", numbers)
    print("Number of items (x):  ", n)
    print("Theoretical max iterations (x²):", n * n)
    print("-" * 48)
    
    # 1. The Iterator: loops through passes and adjacent pairs
    for i in range(n):
        print("Pass " + str(i + 1) + ":")
        pass_swapped = False
        
        for j in range(0, n - i - 1):
            comparisons += 1
            left = numbers[j]
            right = numbers[j + 1]
            
            # 2. The Comparator: checks if adjacent items are out of order
            # TODO: Complete the comparator condition below!
            # If left > right, swap them so the larger number moves right.
            # Replace 'False' with: left > right (or left < right to sort descending)
            if False:
                # Swap the two numbers
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                swaps += 1
                pass_swapped = True
                print("  Swapped " + str(left) + " and " + str(right) + " -> " + str(numbers))
            else:
                print("  In order: " + str(left) + " <= " + str(right))
                
        # If no swaps happened in this pass, the array is already sorted!
        if not pass_swapped:
            print("  (No swaps in this pass — list is fully sorted!)")
            break
            
    print("-" * 48)
    print("Sorted result:    ", numbers)
    print("Total comparisons:", comparisons)
    print("Total swaps:      ", swaps)
    return numbers

# Test Bubble Sort with a sample list:
test_numbers = [5, 1, 4, 2, 8]
bubble_sort(test_numbers)
`
    },
    teacherSolution: `def bubble_sort(numbers):
    n = len(numbers)
    comparisons = 0
    swaps = 0
    
    for i in range(n):
        pass_swapped = False
        for j in range(0, n - i - 1):
            comparisons += 1
            if numbers[j] > numbers[j + 1]:
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                swaps += 1
                pass_swapped = True
        if not pass_swapped:
            break
            
    print("Sorted result:    ", numbers)
    print("Total comparisons:", comparisons)
    print("Total swaps:      ", swaps)
    return numbers

test_numbers = [5, 1, 4, 2, 8]
bubble_sort(test_numbers)
`,
    hints: [
      "Click 'Run ❯' to see the iterator and comparator sort adjacent pairs in real time.",
      "Look for the comparator on line 24: 'if False:'. Change 'False' to 'left > right' to swap adjacent numbers!",
      "Notice how 5 items take up to 25 (x²) iterations. Imagine sorting 1,000,000 numbers — that's why we need algorithms like Merge Sort!"
    ],
    validate: (code, output) => {
      const isAscending = output.includes("Sorted result:     [1, 2, 4, 5, 8]") || output.includes("[1, 2, 4, 5, 8]");
      const isDescending = output.includes("Sorted result:     [8, 5, 4, 2, 1]") || output.includes("[8, 5, 4, 2, 1]");
      const hasSwaps = !output.includes("Total swaps:       0") && /Total swaps:\s*[1-9]/.test(output);

      if ((isAscending || isDescending) && hasSwaps) {
        return { 
          pass: true, 
          message: isDescending 
            ? "Great job! You modified the comparator to sort in descending order (highest to lowest)!" 
            : "Great job! You completed the comparator, executed Bubble Sort, and observed the algorithm sort adjacent pairs in x² iterations!"
        };
      }

      if (code.includes("if False:")) {
        return { 
          pass: false, 
          message: "The comparator is not finished yet.",
          hint: "In main.py line 24, change 'if False:' to 'if left > right:' so the comparator swaps numbers when they are out of order!"
        };
      }

      if (!output.includes("Sorted result:")) {
        return { 
          pass: false, 
          message: "Click 'Run ❯' to execute the Bubble Sort algorithm!",
          hint: "Run your code first to verify that the output prints 'Sorted result:'."
        };
      }

      return { 
        pass: false, 
        message: "The list is not yet sorted correctly.",
        hint: "Make sure your comparator on line 24 compares adjacent numbers with 'if left > right:' (or 'if left < right:' for descending) and click Run!"
      };
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
      const html = (files && files["index.html"]) || code || "";
      if (!html.includes("My Personal Web Base") || html.includes("Player Score: 999") || !html.includes("Player Score: 100 XP")) {
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
      const html = (files && files["index.html"]) || code || "";
      if (!html.includes("Alex Rivera")) {
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
      const activeLines = code.split("\n").filter(line => !line.trim().startsWith("#"));
      const activeCode = activeLines.join("\n");

      const hasFindall = /found_emails\s*=\s*re\.findall\s*\(/.test(activeCode);
      const hasDedupe = /not\s+in\s+clean_email_list/.test(activeCode) && /clean_email_list\.append\s*\(/.test(activeCode);
      const hasCleanEmails = output.includes("Clean, unique emails:") && !output.includes("Clean, unique emails: 0");

      if (hasFindall && hasDedupe && hasCleanEmails) {
        return { pass: true, message: "Perfect! You extracted, cleaned, and exported the email dataset in Python." };
      }

      if (!hasFindall || output.includes("Raw emails detected: 0")) {
        return { 
          pass: false, 
          message: "TODO 1 is not complete yet (0 raw emails detected).",
          hint: "Set found_emails = re.findall(email_pattern, html_junk) to extract all email addresses from the HTML."
        };
      }

      if (!hasDedupe || output.includes("Clean, unique emails: 0")) {
        return { 
          pass: false, 
          message: "TODO 2 is not complete yet (emails need to be lowercased and deduplicated).",
          hint: "Loop through found_emails, clean with email.lower(), and check 'if clean not in clean_email_list: clean_email_list.append(clean)'."
        };
      }

      return { 
        pass: false, 
        message: "The email cleanup is not complete yet.",
        hint: "Complete TODO 1 (extract with re.findall) and TODO 2 (deduplicate into clean_email_list)!"
      };
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
      const hasFourEvents = output.includes("Smart Scheduler attended 4 events");
      const isNotNegative = !output.includes("-2 extra activities") && !output.includes("attended 0 events");

      if (hasFourEvents && isNotNegative) {
        return { pass: true, message: "Optimal schedule unlocked! You proved greedy scheduling in Python attends 4 events." };
      }
      return { 
        pass: false, 
        message: "The smart scheduler has not selected the optimal 4 events yet.",
        hint: "Complete TODO 1 to sort events by end time, and TODO 2 to greedily attend events that start after clock_time!"
      };
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
        <strong>🗺️ Map Tab:</strong> Click the <strong>Middle Earth Map</strong> tab above the editor to cycle through the location progression slides, see how each destination arrived one-by-one, examine the unoptimized zigzag route, and view the Cartesian coordinate grid!
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
      const hasZeroDist = output.includes("Smart Fellowship Route: 0 leagues") || 
                          output.includes("Smart Fellowship Route: 0.0 leagues") || 
                          output.includes("Unoptimized Journey: 0 leagues");
      const hasPath = output.includes("->") && !output.includes("Path:                   \n");
      const hasNoBreak = !code.includes("\n    break") && !code.includes("\nbreak");
      const hasSmartRoute = output.includes("Smart Fellowship Route:") && !hasZeroDist;

      if (hasSmartRoute && hasPath && hasNoBreak) {
        return { pass: true, message: "Route optimized! You solved the Middle Earth routing challenge in Python." };
      }

      if (hasZeroDist || code.includes("dist_x = 0")) {
        return { 
          pass: false, 
          message: "The Manhattan Distance calculation is not complete yet (distances are 0 leagues).",
          hint: "In TODO 1, implement get_distance(p1, p2) using abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])!"
        };
      }

      if (code.includes("break # Remove this break") || code.includes("\n    break")) {
        return { 
          pass: false, 
          message: "The nearest neighbor search loop is breaking after the first iteration.",
          hint: "Uncomment TODO 2 and TODO 3, and remove the 'break' statement on line 46!"
        };
      }

      return { 
        pass: false, 
        message: "The Fellowship route is not fully calculated yet.",
        hint: "Complete TODO 1, 2, and 3 to compute the shortest path visiting all 7 Middle Earth destinations!"
      };
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
        <li>Click <strong>Run ❯</strong> to run the automated test suite. Notice which tests FAIL!</li>
        <li>Fix the flaw in <code>is_palindrome()</code> to handle casing and spaces so all tests PASS.</li>
      </ol>
    `,
    files: {
      "main.py": `# Lesson 7: AI Code Review & Verification (Python)
# Candidate function generated by AI:
# TODO: Notice that this naive AI function fails on mixed casing and phrases with spaces!
# Fix it so all test cases pass.
def is_palindrome(text):
    return text == text[::-1]

# Automated Test Suite:
tests = [
    ("racecar", True),
    ("Racecar", True),
    ("hello", False),
    ("A man a plan a canal Panama", True),
    ("12321", True)
]

print("Testing AI-Generated Python Code...")
all_passed = True
for word, expected in tests:
    result = is_palindrome(word)
    mark = "PASS" if result == expected else "FAIL"
    if mark == "FAIL":
        all_passed = False
    print("  " + mark + " | '" + word + "' -> " + str(result))

print("")
if all_passed:
    print("All automated verification checks passed!")
else:
    print("Some automated verification checks failed!")
`
    },
    teacherSolution: `def is_palindrome(text):
    clean = text.replace(" ", "").lower()
    return clean == clean[::-1]

tests = [
    ("racecar", True),
    ("Racecar", True),
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
      "Clean text first with .lower() and .replace(' ', '') to handle spaces and capital letters!"
    ],
    validate: (code, output) => {
      const hasRun = output.includes("Testing AI-Generated Python Code");
      const allPassed = output.includes("All automated verification checks passed!") && !output.includes("FAIL");

      if (hasRun && allPassed) {
        return { pass: true, message: "Great work! You reviewed and verified AI-generated Python with test cases." };
      }

      if (output.includes("FAIL")) {
        return { 
          pass: false, 
          message: "Some test cases failed! The naive AI code does not handle mixed casing or spaces.",
          hint: "In is_palindrome(text), clean the text by converting to lowercase (.lower()) and stripping spaces (.replace(' ', '')) before checking [::-1]!"
        };
      }

      return { 
        pass: false, 
        message: "Run the verification suite in main.py!",
        hint: "Click 'Run ❯' to execute the test suite and see if all tests PASS."
      };
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
    validate: () => ({ pass: false, message: "This module is coming soon!", hint: "Select Lessons 1 through 7 in the guide menu to build real projects!" })
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
    validate: () => ({ pass: false, message: "This module is coming soon!", hint: "Select Lessons 1 through 7 in the guide menu to build real projects!" })
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
    validate: () => ({ pass: false, message: "This module is coming soon!", hint: "Select Lessons 1 through 7 in the guide menu to build real projects!" })
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
    validate: () => ({ pass: false, message: "This module is coming soon!", hint: "Select Lessons 1 through 7 in the guide menu to build real projects!" })
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
    validate: () => ({ pass: false, message: "This module is coming soon!", hint: "Select Lessons 1 through 7 in the guide menu to build real projects!" })
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LESSONS_DATA };
}
