/**
 * OpenWay Code - Classroom Instructor & Projector Guides
 * Structured for live classroom projection, step-by-step code walkthroughs,
 * and 1-click step-by-step injection/removal into the student studio.
 */

const INSTRUCTOR_GUIDES = {
  // --------------------------------------------------------------------------
  // LESSON 1
  // --------------------------------------------------------------------------
  1: {
    title: "Lesson 1: Sorting Algorithms: Real-Life Computer Science",
    goal: "Demonstrate why we learn to code through Assembly vs Real Code, AI efficiency limits, and Bubble Sort's comparator & iterator.",
    pacing: {
      hook: "10 mins — Claude / AI Coder Demo & 'Why learn to code?' discussion + Assembly vs C/Python",
      liveCoding: "25 mins — Whiteboard array: Explain Iterator vs Comparator, code Bubble Sort live",
      studentWork: "20 mins — Students run Bubble Sort in Python, observe swap iterations, and compare x² vs Merge Sort",
      debrief: "5 mins — Human brain (0.58 kWh) vs AI (7,500-37,000 kWh): Why algorithmic efficiency matters"
    },
    steps: [
      {
        num: 1,
        title: "The Comparator (Line 24: Swap Adjacent Items)",
        prompt: "Whiteboard: Take two numbers. If the left number is greater than the right number, swap them so the larger value bubbles right.",
        code: `            # 2. The Comparator: checks if adjacent items are out of order
            if left > right:
                # Swap the two numbers
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                swaps += 1
                pass_swapped = True
                print("  Swapped " + str(left) + " and " + str(right) + " -> " + str(numbers))`,
        checkpoint: "✋ Raise a hand when you understand how Python swaps two variables in one line: 'a, b = b, a'!",
        targetFile: "main.py",
        inject: {
          find: /if False:\s*\n\s*# Swap the two numbers\s*\n\s*numbers\[j\], numbers\[j \+ 1\] = numbers\[j \+ 1\], numbers\[j\]\s*\n\s*swaps \+= 1\s*\n\s*pass_swapped = True\s*\n\s*print\("  Swapped " \+ str\(left\) \+ " and " \+ str\(right\) \+ " -> " \+ str\(numbers\)\)/,
          replace: `if left > right:
                # Swap the two numbers
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                swaps += 1
                pass_swapped = True
                print("  Swapped " + str(left) + " and " + str(right) + " -> " + str(numbers))`,
          revert: `if False:
                # Swap the two numbers
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                swaps += 1
                pass_swapped = True
                print("  Swapped " + str(left) + " and " + str(right) + " -> " + str(numbers))`
        }
      },
      {
        num: 2,
        title: "The Iterator (Nested Loop for Passes and Pairs)",
        prompt: "Wrap the comparator in an outer loop (passes) and inner loop (adjacent pairs) to cycle through the list.",
        code: `    # 1. The Iterator: loops through passes and adjacent pairs
    for i in range(n):
        print("Pass " + str(i + 1) + ":")
        pass_swapped = False
        
        for j in range(0, n - i - 1):
            comparisons += 1
            left = numbers[j]
            right = numbers[j + 1]`,
        checkpoint: "✋ Check: Did everyone note how the inner loop bounds 'n - i - 1' prevent out-of-bounds checking?"
      },
      {
        num: 3,
        title: "Run, Test & Measure Iterations (x²)",
        prompt: "Run the algorithm with [5, 1, 4, 2, 8]. Notice how the number of comparisons scales towards x².",
        code: `test_numbers = [5, 1, 4, 2, 8]
bubble_sort(test_numbers)`,
        checkpoint: "Click Run! You should see the list sorted into ascending order [1, 2, 4, 5, 8]."
      }
    ],
    discussionQuestions: [
      "Why does AI use 7,500 to 37,000 kWh to process 74 GB while the human brain uses only 0.58 kWh?",
      "For 1,000,000 numbers, why does Bubble Sort take hours while Merge Sort takes less than half a second?",
      "When is the solution a bigger, faster computer, and when is it a more efficient algorithm?"
    ],
    gotchas: [
      "Remember the inner loop bounds: 'range(0, n - i - 1)' prevents checking past the end of the list.",
      "Bubble Sort has x² iterations in the worst case, making it inefficient for massive datasets."
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
        title: "Edit Heading in index.html",
        prompt: "Instruct students: In index.html, personalize the heading from 'My Personal Web Base' to your own custom title.",
        code: `    <!-- 1. Change this heading to your name! -->
    <h1>Coder's Basecamp</h1>`,
        checkpoint: "Who sees their new title render in the Live Web Preview?",
        targetFile: "index.html",
        inject: {
          find: /<h1>My Personal Web Base<\/h1>/,
          replace: `<h1>Coder's Basecamp</h1>`,
          revert: `<h1>My Personal Web Base</h1>`
        }
      },
      {
        num: 2,
        title: "Update Player Score to 999,999 XP",
        prompt: "Change the score badge to 999,999 XP to complete the mission.",
        code: `    <!-- 2. Change this score to 999,999 XP! -->
    <div class="badge">Player Score: 999,999 XP</div>`,
        checkpoint: "Check Live Preview: Did your XP jump to 999,999?",
        targetFile: "index.html",
        inject: {
          find: /<div class="badge">Player Score: 100 XP<\/div>/,
          replace: `<div class="badge">Player Score: 999,999 XP</div>`,
          revert: `<div class="badge">Player Score: 100 XP</div>`
        }
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
        prompt: "Students open index.html and update the heading and tagline.",
        code: `    <!-- 1. Change this name: -->
    <h1>Sam Taylor</h1>
    <p class="tagline">Future Software Architect &amp; Creator</p>`,
        checkpoint: "Check index.html: Did everyone close their <h1> and <p> tags?",
        targetFile: "index.html",
        inject: {
          find: /<h1>Alex Rivera<\/h1>\s*<p class="tagline">Junior Developer & Creator<\/p>/,
          replace: `<h1>Sam Taylor</h1>\n    <p class="tagline">Future Software Architect & Creator</p>`,
          revert: `<h1>Alex Rivera</h1>\n    <p class="tagline">Junior Developer & Creator</p>`
        }
      },
      {
        num: 2,
        title: "Style with Custom CSS (style.css)",
        prompt: "Open style.css and customize the accent color variable (--accent) to blue (#3b82f6) or purple (#8b5cf6).",
        code: `:root {
  --accent: #3b82f6; /* Custom Blue Accent */
  --bg: #1e2229;
  --card: #272c35;
  --text: #f0f3f6;
  --muted: #9da7b3;
  --border: #383f4a;
}`,
        checkpoint: "Switch to Live Web Preview to see your new custom color scheme!",
        targetFile: "style.css",
        inject: {
          find: /--accent:\s*#2ea043;/,
          replace: `--accent: #3b82f6;`,
          revert: `--accent: #2ea043;`
        }
      },
      {
        num: 3,
        title: "Wire Button Interactivity (script.js)",
        prompt: "Open script.js and inspect the event listener that increments the high five counter.",
        code: `// Interactive JavaScript Button Logic
let count = 0;
const btn = document.getElementById('clapBtn');
const display = document.getElementById('counter');

btn.addEventListener('click', () => {
  count++;
  display.textContent = \`High Fives: \${count} 🎉\`;
  if (count === 5) {
    alert("🔥 5 High Fives! You're on fire!");
  }
});`,
        checkpoint: "Click the high five button in preview! Does the counter tick up?",
        targetFile: "script.js",
        inject: {
          find: /display\.textContent = `High Fives: \${count} 🎉`;/,
          replace: `display.textContent = \`High Fives: \${count} 🚀 (Hyperspeed!)\`;`,
          revert: `display.textContent = \`High Fives: \${count} 🎉\`;`
        }
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
      studentWork: "20 mins — Students run code, inspect generated clean_emails.csv tab, and verify 6 clean emails",
      debrief: "5 mins — Check in: Who got the CSV file in their tabs?"
    },
    steps: [
      {
        num: 1,
        title: "TODO 1: Extract Raw Emails with Regex",
        prompt: "Explain to the room: re.findall searches through the entire messy HTML text and extracts all substrings matching our email pattern.",
        code: `# --- TODO 1: EXTRACT RAW EMAILS ---
# Use re.findall(email_pattern, html_junk)
found_emails = re.findall(email_pattern, html_junk)

print("Raw emails detected: " + str(len(found_emails)))`,
        checkpoint: "Click Run! You should see 'Raw emails detected: 7' in your terminal.",
        targetFile: "main.py",
        inject: {
          find: /found_emails = \[\] # Replace with re\.findall call/,
          replace: `found_emails = re.findall(email_pattern, html_junk)`,
          revert: `found_emails = [] # Replace with re.findall call`
        }
      },
      {
        num: 2,
        title: "TODO 2: Normalize to Lowercase & Deduplicate",
        prompt: "Explain why: Maya.Lin@westoak.edu and maya.lin@westoak.edu are the same human! We convert to .lower() and check 'if clean not in clean_email_list'.",
        code: `# --- TODO 2: LOWERCASE AND DEDUPLICATE ---
clean_email_list = []

# Loop through found_emails:
for email in found_emails:
    clean = email.lower()
    if clean not in clean_email_list:
        clean_email_list.append(clean)

print("Clean, unique emails: " + str(len(clean_email_list)))`,
        checkpoint: "Click Run! You should see 'Clean, unique emails: 6' (1 duplicate caught!)",
        targetFile: "main.py",
        inject: {
          find: /# for email in found_emails:\s*\n\s*#\s*clean = email\.lower\(\)\s*\n\s*#\s*if clean not in clean_email_list:\s*\n\s*#\s*clean_email_list\.append\(clean\)/,
          replace: `for email in found_emails:\n    clean = email.lower()\n    if clean not in clean_email_list:\n        clean_email_list.append(clean)`,
          revert: `# for email in found_emails:\n#     clean = email.lower()\n#     if clean not in clean_email_list:\n#         clean_email_list.append(clean)`
        }
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
        checkpoint: "Check your editor tabs above! A new 'clean_emails.csv' tab just appeared!",
        targetFile: "main.py",
        inject: {
          find: /# with open\("clean_emails\.csv", "w"\) as output_file:[\s\S]*?output_file\.write\(email \+ "\\n"\)/,
          replace: `with open("clean_emails.csv", "w") as output_file:\n    output_file.write("Email Address\\n")\n    for email in clean_email_list:\n        output_file.write(email + "\\n")`,
          revert: `# with open("clean_emails.csv", "w") as output_file:\n#     output_file.write("Email Address\\n")\n#     for email in clean_email_list:\n#         output_file.write(email + "\\n")`
        }
      }
    ],
    discussionQuestions: [
      "Why is a regex pattern like r'[a-zA-Z0-9._%+-]+@...' better than just searching for '@'?",
      "What would happen if we didn't use .lower() when checking for duplicates?",
      "What other real-world data needs regex cleanup? (Phone numbers, zip codes, dates!)"
    ],
    gotchas: [
      "Make sure clean_email_list.append(clean) is indented inside the 'if' block!",
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
        checkpoint: "Make sure get_end_time returns event['end'], NOT event['start']!",
        targetFile: "main.py",
        inject: {
          find: /    return event\["start"\]/,
          replace: `    return event["end"]`,
          revert: `    return event["start"]`
        }
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
        checkpoint: "Click Run! Did your Smart Scheduler attend 4 events without any conflicts?",
        targetFile: "main.py",
        inject: {
          find: /# Check if event starts at or after our current clock_time:[\s\S]*?clock_time = event\["end"\]\s*\n\s*pass/,
          replace: `if event["start"] >= clock_time:\n        optimal_schedule.append(event["title"])\n        clock_time = event["end"]`,
          revert: `# Check if event starts at or after our current clock_time:\n    # if event["start"] >= clock_time:\n    #     optimal_schedule.append(event["title"])\n    #     clock_time = event["end"]\n    pass`
        }
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
    goal: "Solve the Traveling Salesperson routing problem across Middle Earth using Manhattan distance & Nearest Neighbor in Python.",
    pacing: {
      hook: "10 mins — Show the Middle Earth map: Plot Hobbiton, Weathertop, Ettenmoors, Lorien, Rohan, Gondor, Erebor",
      liveCoding: "25 mins — Build Manhattan distance helper, nearest-stop inline check, and greedy path loop",
      studentWork: "20 mins — Students run the algorithm, calculate distance saved, and inspect route",
      debrief: "5 mins — Computer Science concept: NP-Hard problems and why heuristics are essential"
    },
    steps: [
      {
        num: 1,
        title: "TODO 1: Calculate Manhattan Grid Distance",
        prompt: "Explain Manhattan Distance: |x1 - x2| + |y1 - y2|. It measures grid travel distance between coordinates p1 and p2.",
        code: `# --- TODO 1: MANHATTAN DISTANCE ---
def get_distance(p1, p2):
    # p1 is (x1, y1) and p2 is (x2, y2)
    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])`,
        checkpoint: "Check: Did you use abs() for both x (p1[0] - p2[0]) and y (p1[1] - p2[1])?",
        targetFile: "main.py",
        inject: {
          find: /# --- TODO 1: MANHATTAN DISTANCE ---[\s\S]*?return dist_x \+ dist_y/,
          replace: `# --- TODO 1: MANHATTAN DISTANCE ---\ndef get_distance(p1, p2):\n    # p1 is (x1, y1) and p2 is (x2, y2)\n    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])`,
          revert: `# --- TODO 1: MANHATTAN DISTANCE ---\ndef get_distance(p1, p2):\n    # p1 is (x1, y1) and p2 is (x2, y2)\n    dist_x = 0 # abs of difference between p1[0] and p2[0]\n    dist_y = 0 # abs of difference between p1[1] and p2[1]\n    return dist_x + dist_y`
        }
      },
      {
        num: 2,
        title: "TODO 2: Find Closest Destination (Inline Logic)",
        prompt: "Walkthrough: Inside the search loop, check if this stop's distance is less than shortest_dist. If so, update shortest_dist and closest_stop.",
        code: `    # --- TODO 2: FIND CLOSEST DESTINATION ---
    for stop in unvisited:
        dist = get_distance(current_pos, stop["pos"])
        if dist < shortest_dist:
            shortest_dist = dist
            closest_stop = stop`,
        checkpoint: "✋ Make sure 'shortest_dist = dist' and 'closest_stop = stop' are indented inside 'if dist < shortest_dist:'!",
        targetFile: "main.py",
        inject: {
          find: /# if dist < shortest_dist:\s*\n\s*#\s*shortest_dist = dist\s*\n\s*#\s*closest_stop = stop/,
          replace: `if dist < shortest_dist:\n            shortest_dist = dist\n            closest_stop = stop`,
          revert: `# if dist < shortest_dist:\n        #     shortest_dist = dist\n        #     closest_stop = stop`
        }
      },
      {
        num: 3,
        title: "TODO 3: Travel to Closest Stop & Remove break",
        prompt: "Show the greedy advancement: Add shortest_dist to smart_dist, update current_pos, record the stop in smart_route, remove from unvisited, and remove the break statement!",
        code: `    # --- TODO 3: TRAVEL THERE ---
    smart_dist += shortest_dist
    current_pos = closest_stop["pos"]
    smart_route.append(closest_stop["name"])
    unvisited.remove(closest_stop)`,
        checkpoint: "Click Run! Check the terminal output—you should see 'Smart Fellowship Route: 31.5 leagues' and the full 7-city path!",
        targetFile: "main.py",
        inject: {
          find: /# smart_dist \+= shortest_dist[\s\S]*?break # Remove this break after writing TODO 3!/,
          replace: `smart_dist += shortest_dist\n    current_pos = closest_stop["pos"]\n    smart_route.append(closest_stop["name"])\n    unvisited.remove(closest_stop)`,
          revert: `# smart_dist += shortest_dist\n    # current_pos = closest_stop["pos"]\n    # smart_route.append(closest_stop["name"])\n    # unvisited.remove(closest_stop)\n    break # Remove this break after writing TODO 3!`
        }
      }
    ],
    discussionQuestions: [
      "Why is Manhattan distance called 'taxicab distance'?",
      "Does always visiting the nearest city guarantee the absolute best path in every scenario, or is it an approximation (heuristic)?",
      "How do delivery companies like UPS or FedEx use algorithms like this every morning?"
    ],
    gotchas: [
      "Remember to remove the 'break' statement on line 46, otherwise the while loop stops after only 1 destination!",
      "Make sure you update current_pos = closest_stop['pos'] before the next iteration."
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
        prompt: "Show students the naive palindrome checker: def is_palindrome(text): return text == text[::-1]. Notice how it fails on 'Racecar' and phrases with spaces!",
        code: `# Flawed Naive Version:
def is_palindrome(text):
    return text == text[::-1]  # FAILS on "Racecar" and sentences with spaces!`,
        checkpoint: "Why did 'Racecar' fail? (Capital 'R' != lowercase 'r')"
      },
      {
        num: 2,
        title: "Clean Casing and Punctuation (The Fix)",
        prompt: "Fix the function: Clean spaces with .replace(' ', '') and convert to lowercase with .lower().",
        code: `def is_palindrome(text):
    clean = text.replace(" ", "").lower()
    return clean == clean[::-1]`,
        checkpoint: "Now test 'A man a plan a canal Panama'—does it return True?",
        targetFile: "main.py",
        inject: {
          find: /def is_palindrome\(text\):\s*\n\s*return text == text\[::-1\]/,
          replace: `def is_palindrome(text):\n    clean = text.replace(" ", "").lower()\n    return clean == clean[::-1]`,
          revert: `def is_palindrome(text):\n    return text == text[::-1]`
        }
      },
      {
        num: 3,
        title: "Automated Test Suite Verification",
        prompt: "Run the full automated test suite to verify that all 5 test cases PASS.",
        code: `tests = [
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
    print("Some automated verification checks failed!")`,
        checkpoint: "Click Run! You should see all test cases output PASS!"
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INSTRUCTOR_GUIDES };
}
