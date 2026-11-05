/**
 * OpenWay Code - Classroom Instructor & Projector Guides
 * Structured for live classroom projection, step-by-step code walkthroughs,
 * and real-time student copy-along in class.
 */

const INSTRUCTOR_GUIDES = {
  // --------------------------------------------------------------------------
  // LESSON 1
  // --------------------------------------------------------------------------
  1: {
    title: "Lesson 1: Why Code? The Problem-Solving Mindset",
    goal: "Deconstruct the Robot Toast algorithm into sequential steps and error prerequisites in Python.",
    pacing: {
      hook: "10 mins — The human brain vs the literal computer (What happens if we forget power?)",
      liveCoding: "25 mins — Live code the prerequisite error checks and sequential loop on the board",
      studentWork: "20 mins — Students copy the logic, toggle has_bread, and observe terminal output",
      debrief: "5 mins — Group debrief: Why human logic drives code, not just syntax"
    },
    steps: [
      {
        num: 1,
        title: "Check Prerequisites First",
        prompt: "Explain to the room: A computer cannot assume anything! Before toasting, we must verify power and bread.",
        code: `def make_toast(has_bread, has_toaster, is_plugged_in):
    print("Robot Toast Protocol Starting...")
    print("")
    
    # Check prerequisites first
    if not has_toaster or not is_plugged_in:
        return "Error: Toaster is missing or unplugged!"
    if not has_bread:
        return "Error: No bread available!"`,
        checkpoint: "✋ Raise a hand when you have the two 'if' checks typed in!"
      },
      {
        num: 2,
        title: "Sequential Step-by-Step Recipe Loop",
        prompt: "Show the class: Once checks pass, the robot follows each step in exact order from top to bottom.",
        code: `    steps = [
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
    return "Success: Toast ready! Algorithmic recipe complete."`,
        checkpoint: "✋ Check: Did everyone type the 'for i, step in enumerate(steps, 1):' loop?"
      },
      {
        num: 3,
        title: "Call Function & Test Failures",
        prompt: "Live test: Call the recipe with True, then test what happens when has_bread=False.",
        code: `# Test normal operation:
result = make_toast(has_bread=True, has_toaster=True, is_plugged_in=True)
print(result)

# Test failure mode:
# result_fail = make_toast(has_bread=False, has_toaster=True, is_plugged_in=True)
# print(result_fail)`,
        checkpoint: "Click Run! You should see all 7 steps followed by 'Success: Toast ready!'"
      }
    ],
    discussionQuestions: [
      "Why does the computer need to check if it's plugged in BEFORE putting bread in?",
      "If we told an alien to make toast without checking for bread, what ridiculous bug might happen?",
      "Why is computer code simply an unambiguous recipe?"
    ],
    gotchas: [
      "Colons (:) are required at the end of 'def' and 'if' lines.",
      "Lines inside functions and loops must be indented by 4 spaces."
    ]
  },

  // --------------------------------------------------------------------------
  // LESSON 2
  // --------------------------------------------------------------------------
  2: {
    title: "Lesson 2: How the Web Works: DevTools & The DOM",
    goal: "Explore how websites are living DOM trees and use Chrome/Browser DevTools to inspect and edit code live.",
    pacing: {
      hook: "10 mins — Show the live web: Right click any element on the screen and choose 'Inspect'",
      liveCoding: "25 mins — Walk through changing headline text and live CSS styles in the Elements panel",
      studentWork: "20 mins — Students inspect their own page and change their score to 999,999 XP",
      debrief: "5 mins — Debrief: Why live DevTools edits reset on reload and why we save to files"
    },
    steps: [
      {
        num: 1,
        title: "Open Browser DevTools",
        prompt: "Instruct students: Right-click the heading on the page and click 'Inspect' (or press F12).",
        code: `<!-- Locate this element in the Elements tab -->
<h1>My Personal Web Base</h1>`,
        checkpoint: "Who has the DevTools pane open showing the HTML elements?"
      },
      {
        num: 2,
        title: "Edit Live DOM Text",
        prompt: "Double-click the text 'My Personal Web Base' inside the DevTools panel and type your name.",
        code: `<h1>[Your Name]'s Web Base</h1>`,
        checkpoint: "Look at the screen! Your name is now on the webpage in real time!"
      },
      {
        num: 3,
        title: "Hack the Player Score & Inspect CSS",
        prompt: "Double-click the badge text and give yourself 999,999 XP. In the Styles tab, click the color square to change text color.",
        code: `<div class="badge">Player Score: 999,999 XP</div>`,
        checkpoint: "Switch to the Live Web Preview tab to verify your updated score!"
      }
    ],
    discussionQuestions: [
      "Did our DevTools changes alter the website for the whole internet or just our screen?",
      "Why do banks and game developers verify data on a backend server instead of trusting the front end?"
    ],
    gotchas: [
      "Refreshing the browser resets temporary DevTools edits—files must be saved to persist."
    ]
  },

  // --------------------------------------------------------------------------
  // LESSON 3
  // --------------------------------------------------------------------------
  3: {
    title: "Lesson 3: First Web App: Interactive Portfolio",
    goal: "Connect the 3 core web languages (HTML skeleton, CSS styling, JS interactivity) in a multi-file portfolio.",
    pacing: {
      hook: "10 mins — The 3 Pillars of Web: HTML is the skeleton, CSS is the style, JS is the brain",
      liveCoding: "20 mins — Guide edits across index.html, style.css, and script.js",
      studentWork: "25 mins — Students personalize hobbies, colors, and button click counter",
      debrief: "5 mins — Showcase 2-3 student portfolios on the projector"
    },
    steps: [
      {
        num: 1,
        title: "Edit HTML Structure (index.html)",
        prompt: "Students open index.html and update the heading, bio, and add 2 favorite games or hobbies.",
        code: `<h1>Alex Rivera</h1>
<p class="role">Future Software Engineer &amp; Game Creator</p>
<ul class="skills-list">
  <li>Python Logic &amp; Algorithms</li>
  <li>Web Development (HTML/CSS)</li>
  <li>Robotics &amp; Drone Coding</li>
</ul>`,
        checkpoint: "Check index.html: Did everyone close their <li> and <h1> tags?"
      },
      {
        num: 2,
        title: "Style with Custom CSS (style.css)",
        prompt: "Open style.css and customize the accent color variable (--accent) and card background.",
        code: `:root {
  --bg-app: #181b22;
  --bg-card: #212631;
  --accent: #3b82f6; /* Try #10b981 (green) or #8b5cf6 (purple) */
  --text-main: #f0f6fc;
}`,
        checkpoint: "Switch to Live Web Preview to see your new custom color scheme!"
      },
      {
        num: 3,
        title: "Wire Button Interactivity (script.js)",
        prompt: "Open script.js and check the event listener that increments the high five counter.",
        code: `let count = 0;
const btn = document.getElementById("highFiveBtn");
const countDisplay = document.getElementById("countDisplay");

btn.addEventListener("click", () => {
  count += 1;
  countDisplay.textContent = count + " High Fives Given!";
});`,
        checkpoint: "Click the high five button in preview! Does the counter tick up?"
      }
    ],
    discussionQuestions: [
      "If we deleted style.css, what would happen to our webpage?",
      "What is an event listener and how does JavaScript wait for user clicks?"
    ],
    gotchas: [
      "Remember that class names in CSS start with a dot (.card), but element names do not (h1)."
    ]
  },

  // --------------------------------------------------------------------------
  // LESSON 4
  // --------------------------------------------------------------------------
  4: {
    title: "Lesson 4: Messy Data Cleanup with Regular Expressions",
    goal: "Use Python Regular Expressions (re.findall) to extract emails from raw HTML, deduplicate them, and write a CSV.",
    pacing: {
      hook: "10 mins — Show messy_page.html: Point out junk tags, mixed casing, and duplicate signups",
      liveCoding: "25 mins — Step 1 (re.findall), Step 2 (deduplication loop), Step 3 (CSV file write)",
      studentWork: "20 mins — Students run code, inspect generated clean_emails.csv tab, and verify 7 clean emails",
      debrief: "5 mins — Check in: Who got the CSV file in their tabs?"
    },
    steps: [
      {
        num: 1,
        title: "TODO 1: Extract Raw Emails with Regex",
        prompt: "Explain to the room: re.findall searches through the entire messy HTML text and extracts all substrings matching our email pattern.",
        code: `# --- TODO 1: EXTRACT RAW EMAILS ---
# Call re.findall(email_pattern, html_junk)
found_emails = re.findall(email_pattern, html_junk)

print("Raw emails detected: " + str(len(found_emails)))`,
        checkpoint: "Click Run! You should see 'Raw emails detected: 8' in your terminal."
      },
      {
        num: 2,
        title: "TODO 2: Normalize to Lowercase & Deduplicate",
        prompt: "Explain why: Maya.Lin@westoak.edu and maya.lin@westoak.edu are the same human! We convert to .lower() and check 'if clean not in clean_email_list'.",
        code: `# --- TODO 2: LOWERCASE AND DEDUPLICATE ---
clean_email_list = []

for email in found_emails:
    clean = email.lower()
    if clean not in clean_email_list:
        clean_email_list.append(clean)

print("Clean, unique emails: " + str(len(clean_email_list)))`,
        checkpoint: "Click Run! You should see 'Clean, unique emails: 7' (1 duplicate caught!)"
      },
      {
        num: 3,
        title: "TODO 3: Export Clean Dataset to CSV",
        prompt: "Show the class: open('clean_emails.csv', 'w') creates a brand new spreadsheet file. We write the header, then each email on a new line.",
        code: `# --- TODO 3: SAVE TO CSV ---
with open("clean_emails.csv", "w") as output_file:
    output_file.write("Email Address\\n")
    for email in clean_email_list:
        output_file.write(email + "\\n")

print("Generated clean_emails.csv successfully!")`,
        checkpoint: "Check your editor tabs above! A new 'clean_emails.csv' tab just appeared!"
      }
    ],
    discussionQuestions: [
      "Why is a regex pattern like r'[a-zA-Z0-9._%+-]+@...' better than just searching for '@'?",
      "What would happen if we didn't use .lower() when checking for duplicates?",
      "What other real-world data needs regex cleanup? (Phone numbers, zip codes, dates!)"
    ],
    gotchas: [
      "Make sure clean_email_list.append(clean) is double-indented inside the 'if' block!",
      "Don't forget the newline character '\\n' so each email is on its own row in the CSV."
    ]
  },

  // --------------------------------------------------------------------------
  // LESSON 5
  // --------------------------------------------------------------------------
  5: {
    title: "Lesson 5: Event Optimization: Greedy Scheduling",
    goal: "Master the greedy 'Earliest End Time' algorithm to schedule the maximum possible events without time conflicts.",
    pacing: {
      hook: "10 mins — The Tech Fair Dilemma: 7 cool events, but times overlap. How to fit the most activities?",
      liveCoding: "25 mins — Demonstrate why sorting by end time leaves maximum room for future events",
      studentWork: "20 mins — Students complete TODO 1 & 2 in main.py and observe the smart schedule beating the casual one",
      debrief: "5 mins — Math debrief: Why greedy algorithms work here (greedy choice property)"
    },
    steps: [
      {
        num: 1,
        title: "TODO 1: Sort Events by Earliest End Time",
        prompt: "Key concept: To maximize remaining free time in your day, always pick the activity that FINISHES earliest! We write a helper that returns event['end'].",
        code: `# --- TODO 1: SORT BY EARLIEST END TIME ---
def get_end_time(event):
    return event["end"]

events.sort(key=get_end_time)`,
        checkpoint: "Make sure get_end_time returns event['end'], NOT event['start']!"
      },
      {
        num: 2,
        title: "TODO 2: Build the Optimal Schedule Loop",
        prompt: "Walkthrough: Iterate through sorted events. If an event starts at or after our clock, attend it and jump our clock to its end time!",
        code: `# --- TODO 2: BUILD OPTIMAL SCHEDULE ---
optimal_schedule = []
clock_time = 0

for event in events:
    # If the event starts at or after our clock, attend it!
    if event["start"] >= clock_time:
        optimal_schedule.append(event["title"])
        clock_time = event["end"]

print("Smart Scheduler attended " + str(len(optimal_schedule)) + " events:")
print(", ".join(optimal_schedule))
print("Bonus: " + str(len(optimal_schedule) - len(casual_schedule)) + " extra activities!")`,
        checkpoint: "Click Run! Did your Smart Scheduler attend 4 events without any conflicts?"
      }
    ],
    discussionQuestions: [
      "Why does picking the event that finishes earliest work better than picking the shortest event?",
      "Where else is greedy scheduling used in the real world? (Air traffic control, CPU process threads!)",
      "What happens if two events finish at the exact same time?"
    ],
    gotchas: [
      "In TODO 2, make sure you advance clock_time to event['end'], NOT event['start']!",
      "Remember that event['start'] >= clock_time uses greater-than-or-equal (>=)."
    ]
  },

  // --------------------------------------------------------------------------
  // LESSON 6
  // --------------------------------------------------------------------------
  6: {
    title: "Lesson 6: Middle Earth Routing: Nearest Neighbor Algorithm",
    goal: "Solve the Traveling Salesperson routing problem across Middle Earth using Manhattan distance & Nearest Neighbor.",
    pacing: {
      hook: "10 mins — Show the Middle Earth map: Plot Hobbiton, Rivendell, Rohan, Gondor, Erebor",
      liveCoding: "25 mins — Build Manhattan distance helper, nearest-stop finder, and greedy path loop",
      studentWork: "20 mins — Students run the algorithm, calculate distance saved, and inspect route",
      debrief: "5 mins — Computer Science concept: NP-Hard problems and why heuristics are essential"
    },
    steps: [
      {
        num: 1,
        title: "TODO 1: Calculate Manhattan Grid Distance",
        prompt: "Explain Manhattan Distance: |x1 - x2| + |y1 - y2|. It measures grid travel distance (like city blocks).",
        code: `# --- TODO 1: MANHATTAN DISTANCE HELPER ---
def manhattan_distance(coord1, coord2):
    return abs(coord1[0] - coord2[0]) + abs(coord1[1] - coord2[1])`,
        checkpoint: "Check: Did you use abs() for both x and y coordinates?"
      },
      {
        num: 2,
        title: "TODO 2: Find the Nearest Unvisited Stop",
        prompt: "Walkthrough: Iterate over remaining destinations. Calculate distance to each and keep track of the minimum.",
        code: `# --- TODO 2: FIND NEAREST STOP ---
def find_nearest_stop(current_coord, remaining_stops):
    nearest_stop = None
    min_dist = float("inf")
    
    for stop_name, coord in remaining_stops.items():
        dist = manhattan_distance(current_coord, coord)
        if dist < min_dist:
            min_dist = dist
            nearest_stop = stop_name
            
    return nearest_stop, min_dist`,
        checkpoint: "✋ Make sure you return BOTH nearest_stop and min_dist as a tuple!"
      },
      {
        num: 3,
        title: "TODO 3: Build the Greedy Journey Route",
        prompt: "Show the greedy loop: Start at Hobbiton. Repeatedly find the closest unvisited stop, add to route, and remove from unvisited.",
        code: `# --- TODO 3: NEAREST NEIGHBOR ROUTE LOOP ---
smart_route = [start_city]
current_location = start_coord
total_smart_distance = 0.0

while unvisited_stops:
    next_stop, dist = find_nearest_stop(current_location, unvisited_stops)
    smart_route.append(next_stop)
    total_smart_distance += dist
    current_location = unvisited_stops.pop(next_stop)

print("Smart Fellowship Route: " + str(round(total_smart_distance, 1)) + " leagues")
print("Path: " + " -> ".join(smart_route))`,
        checkpoint: "Click Run! Check the terminal output—what was your total distance in leagues?"
      }
    ],
    discussionQuestions: [
      "Why is Manhattan distance called 'taxicab distance'?",
      "Does always visiting the nearest city guarantee the absolute best path in every scenario, or is it an approximation (heuristic)?",
      "How do delivery companies like UPS or FedEx use algorithms like this every morning?"
    ],
    gotchas: [
      "Make sure you remove the visited city with unvisited_stops.pop(next_stop) to prevent an infinite loop!",
      "Float('inf') is Python's way of representing infinity for finding minimums."
    ]
  },

  // --------------------------------------------------------------------------
  // LESSON 7
  // --------------------------------------------------------------------------
  7: {
    title: "Lesson 7: Leveraging AI in Coding: Co-Pilot Thinking",
    goal: "Teach critical thinking in the AI era: prompt engineering, reviewing candidate AI code, and automated testing.",
    pacing: {
      hook: "10 mins — Prompting vs Architecting: AI can draft code in 2 seconds, but who verifies it?",
      liveCoding: "20 mins — Demonstrate palindrome edge cases (spaces, punctuation, mixed casing)",
      studentWork: "25 mins — Students test the AI Guest Assistant tab and write automated assert test cases",
      debrief: "5 mins — The Co-Pilot Rule: You are the pilot, AI is the engine"
    },
    steps: [
      {
        num: 1,
        title: "Review Candidate AI Code & Find the Flaw",
        prompt: "Show students the naive palindrome checker: def is_palindrome(s): return s == s[::-1]. Ask what happens with 'RaceCar' or 'A man a plan a canal Panama'!",
        code: `# Flawed Naive Version:
# def is_palindrome(s):
#     return s == s[::-1]  # FAILS on "RaceCar" and sentences with spaces!`,
        checkpoint: "Why did 'RaceCar' fail? (Capital 'R' != lowercase 'r')"
      },
      {
        num: 2,
        title: "Clean Casing and Punctuation",
        prompt: "Write the robust version: filter characters with .isalnum() and convert with .lower().",
        code: `def is_palindrome(text):
    # Filter only alphanumeric characters and convert to lowercase:
    clean = "".join(c.lower() for c in str(text) if c.isalnum())
    return clean == clean[::-1]`,
        checkpoint: "Now test 'A man a plan a canal Panama'—does it return True?"
      },
      {
        num: 3,
        title: "Write Automated Unit Test Cases",
        prompt: "Show students how professional software engineers write test suites using assert statements.",
        code: `# Automated Test Suite
test_cases = [
    ("racecar", True),
    ("hello", False),
    ("A man a plan a canal Panama", True),
    ("12321", True),
    ("Was it a car or a cat I saw?", True)
]

print("Testing AI-Generated Python Code...")
for test_input, expected in test_cases:
    actual = is_palindrome(test_input)
    status = "PASS" if actual == expected else "FAIL"
    print("  " + status + " | '" + str(test_input) + "' -> " + str(actual))
    assert actual == expected, "Test failed on: " + str(test_input)

print("")
print("All automated verification checks passed!")`,
        checkpoint: "Click Run! You should see all 5 automated test cases PASS!"
      }
    ],
    discussionQuestions: [
      "Why is human code review even more important now that AI can write syntax?",
      "What is an edge case, and why do test suites save software companies billions of dollars?",
      "How did you prompt the AI Guest Sandbox, and did it get the answer right on the first try?"
    ],
    gotchas: [
      "Remember: assert evaluates a condition; if False, Python raises an AssertionError and stops execution.",
      "String slicing [::-1] creates a reversed copy of the string."
    ]
  }
};

// Default instructor guides for lessons 8-12
for (let id = 8; id <= 12; id++) {
  INSTRUCTOR_GUIDES[id] = {
    title: `Lesson ${id}: TBA Capstone & Applied Modules`,
    goal: `Guide students through hands-on algorithmic problem solving in Lesson ${id}.`,
    pacing: {
      hook: "10 mins — Problem framing and real-world connection",
      liveCoding: "25 mins — Guided walkthrough of starter code on the board",
      studentWork: "20 mins — Student coding, peer debugging, and testing",
      debrief: "5 mins — Group verification and demonstration"
    },
    steps: [
      {
        num: 1,
        title: "Explore Starter Algorithm",
        prompt: "Review the starter code on the board and walk through the expected logic flow.",
        code: `# Lesson ${id} Walkthrough\nprint("Starting module ${id}...")\n`,
        checkpoint: "Click Run to verify initial environment setup."
      }
    ],
    discussionQuestions: [
      "What are the inputs, outputs, and edge cases of this algorithm?",
      "How does this connect to real software engineering practices?"
    ],
    gotchas: [
      "Check line numbers in the console traceback if a runtime error occurs.",
      "Ensure proper indentation and variable name spelling."
    ]
  };
}

// Automatically attach to LESSONS_DATA if available
if (typeof LESSONS_DATA !== 'undefined') {
  LESSONS_DATA.forEach(lesson => {
    if (INSTRUCTOR_GUIDES[lesson.id]) {
      lesson.instructorGuide = INSTRUCTOR_GUIDES[lesson.id];
    }
  });
}
