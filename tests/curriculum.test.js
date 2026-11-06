/**
 * OpenWay Code - Curriculum & Lesson Integrity Tests
 * Validates lesson metadata, virtual files, starter code, and solution validation logic.
 */

const { LESSONS_DATA } = require('../lessons');

describe('Curriculum & Lessons Integrity Module', () => {
  test('defines exactly 12 curriculum lessons', () => {
    expect(LESSONS_DATA).toBeDefined();
    expect(Array.isArray(LESSONS_DATA)).toBe(true);
    expect(LESSONS_DATA.length).toBe(12);
  });

  test('each lesson has sequential IDs from 1 to 12', () => {
    LESSONS_DATA.forEach((lesson, index) => {
      expect(lesson.id).toBe(index + 1);
    });
  });

  test('each lesson defines required metadata properties', () => {
    LESSONS_DATA.forEach(lesson => {
      expect(typeof lesson.title).toBe('string');
      expect(lesson.title.trim().length).toBeGreaterThan(0);

      expect(typeof lesson.subtitle).toBe('string');
      expect(typeof lesson.duration).toBe('string');
      expect(typeof lesson.category).toBe('string');
      expect(typeof lesson.type).toBe('string');
      expect(typeof lesson.icon).toBe('string');

      expect(typeof lesson.summary).toBe('string');
      expect(typeof lesson.contentHtml).toBe('string');
      expect(typeof lesson.challenge).toBe('string');

      expect(typeof lesson.files).toBe('object');
      expect(Object.keys(lesson.files).length).toBeGreaterThan(0);

      expect(typeof lesson.validate).toBe('function');
    });
  });

  describe('Lesson 1 (Sorting Algorithms & Real-Life CS)', () => {
    let lesson1;

    beforeAll(() => {
      lesson1 = LESSONS_DATA.find(l => l.id === 1);
    });

    test('has correct title, category, and bubble sort content', () => {
      expect(lesson1.title).toContain('Sorting Algorithms');
      expect(lesson1.category).toBe('Algorithms & Logic');
      expect(lesson1.contentHtml).toContain('Bubble Sort');
      expect(lesson1.contentHtml).toContain('Merge Sort');
      expect(lesson1.contentHtml).toContain('An Iterator:');
      expect(lesson1.contentHtml).toContain('A Comparator:');
      expect(lesson1.contentHtml).toContain('x² possible iterations');
      expect(lesson1.contentHtml).toContain('74 GB');
      expect(lesson1.contentHtml).toContain('0.58 kWh');
      expect(lesson1.contentHtml).toContain('assets/merge_sort_diagram.png');
    });

    test('starter file main.py contains bubble_sort implementation', () => {
      const mainPy = lesson1.files['main.py'];
      expect(mainPy).toBeDefined();
      expect(mainPy).toContain('def bubble_sort(numbers):');
      expect(mainPy).toContain('left > right');
      expect(mainPy).toContain('test_numbers = [5, 1, 4, 2, 8]');
    });

    test('validation passes when output contains sorted result and comparisons/swaps', () => {
      const validOutput = `
Initial unsorted list: [5, 1, 4, 2, 8]
Sorted result:     [1, 2, 4, 5, 8]
Total comparisons: 9
Total swaps:       4
`;
      const result = lesson1.validate(lesson1.files['main.py'], validOutput);
      expect(result.pass).toBe(true);
      expect(result.message).toContain('Bubble Sort');
    });

    test('validation passes when sorted in descending order', () => {
      const descendingOutput = `
Initial unsorted list: [5, 1, 4, 2, 8]
Sorted result:     [8, 5, 4, 2, 1]
Total comparisons: 10
Total swaps:       6
`;
      const result = lesson1.validate(lesson1.files['main.py'], descendingOutput);
      expect(result.pass).toBe(true);
      expect(result.message).toContain('descending');
    });

    test('validation fails when starter code is unchanged (not done yet) and provides a helpful hint', () => {
      const starterOutput = `
Initial unsorted list: [5, 1, 4, 2, 8]
Sorted result:     [5, 1, 4, 2, 8]
Total comparisons: 10
Total swaps:       0
`;
      const result = lesson1.validate(lesson1.files['main.py'], starterOutput);
      expect(result.pass).toBe(false);
      expect(result.message).toContain('comparator is not finished yet');
      expect(result.hint).toContain('left > right');
    });

    test('validation fails when output is empty or missing sort completion', () => {
      const invalidOutput = 'Error: Syntax error on line 1';
      const result = lesson1.validate('', invalidOutput);
      expect(result.pass).toBe(false);
      expect(result.message).toContain("Click 'Run ❯'");
      expect(result.hint).toBeDefined();
    });

    test('teacherSolution is provided and non-empty', () => {
      expect(typeof lesson1.teacherSolution).toBe('string');
      expect(lesson1.teacherSolution).toContain('def bubble_sort');
    });
  });

  describe('Lesson 2 & 3 (Web Basics & Interactive DOM)', () => {
    test('Lesson 2 contains index.html and validates correctly', () => {
      const lesson2 = LESSONS_DATA.find(l => l.id === 2);
      expect(lesson2.files['index.html']).toBeDefined();

      const passResult = lesson2.validate('<h1>My New Custom Title</h1>', '', {
        'index.html': '<h1>My New Custom Title</h1>'
      });
      expect(passResult.pass).toBe(true);

      const failResult = lesson2.validate(lesson2.files['index.html'], '', lesson2.files);
      expect(failResult.pass).toBe(false);
    });

    test('Lesson 3 contains complete counter app starter files and validates count increment logic', () => {
      const lesson3 = LESSONS_DATA.find(l => l.id === 3);
      expect(lesson3.files['index.html']).toBeDefined();
      expect(lesson3.files['style.css']).toBeDefined();
      expect(lesson3.files['script.js']).toBeDefined();

      const passingHtml = `<h1>Jane Doe - Web Developer</h1>`;
      expect(lesson3.validate('', '', { 'index.html': passingHtml }).pass).toBe(true);

      expect(lesson3.validate('', '', lesson3.files).pass).toBe(false);
    });
  });

  describe('Lesson 4 & 5 (Data Structures & Files)', () => {
    test('Lesson 4 validates email regex extraction and deduplication', () => {
      const lesson4 = LESSONS_DATA.find(l => l.id === 4);
      expect(lesson4.files['main.py']).toBeDefined();
      expect(lesson4.files['messy_page.html']).toBeDefined();

      const validCode = `
import re
found_emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', html_junk)
clean_email_list = []
for email in found_emails:
    clean = email.lower()
    if clean not in clean_email_list:
        clean_email_list.append(clean)
`;
      const validOutput = 'Clean, unique emails: 4\nGenerated clean_emails.csv';
      expect(lesson4.validate(validCode, validOutput, {}).pass).toBe(true);
      expect(lesson4.validate('print("hello")', 'Clean, unique emails: 0', {}).pass).toBe(false);
    });

    test('Lesson 5 contains events.txt virtual file and validates optimal greedy scheduling', () => {
      const lesson5 = LESSONS_DATA.find(l => l.id === 5);
      expect(lesson5.files['events.txt']).toBeDefined();
      expect(lesson5.files['main.py']).toBeDefined();

      const validOutput = 'Smart Scheduler attended 4 events! You attended 1 extra activities!';
      expect(lesson5.validate('', validOutput).pass).toBe(true);
      expect(lesson5.validate('', '0 events attended').pass).toBe(false);
    });
  });

  describe('Lesson 6 & 7 (Algorithmic Complexity & AI Co-Pilot)', () => {
    test('Lesson 6 has middle earth map data and validates routing optimization', () => {
      const lesson6 = LESSONS_DATA.find(l => l.id === 6);
      expect(lesson6.files['stops.txt']).toBeDefined();
      expect(lesson6.files['main.py']).toBeDefined();

      const validOutput = 'Smart Fellowship Route: 31.5 leagues\nPath: Hobbiton -> Weathertop -> Lorien -> Erebor';
      expect(lesson6.validate('dist = get_distance()', validOutput).pass).toBe(true);

      const starterOutput = 'Unoptimized Journey: 0 leagues\nSmart Fellowship Route: 0 leagues\nPath:                   ';
      expect(lesson6.validate(lesson6.files['main.py'], starterOutput).pass).toBe(false);
      expect(lesson6.validate(lesson6.files['main.py'], starterOutput).message).toContain('not complete yet');
    });

    test('Lesson 7 contains palindrome test verification', () => {
      const lesson7 = LESSONS_DATA.find(l => l.id === 7);
      expect(lesson7.files['main.py']).toBeDefined();

      const validOutput = 'Testing AI-Generated Python Code...\n  PASS | racecar -> True\n  PASS | Racecar -> True\nAll automated verification checks passed!\n';
      expect(lesson7.validate('', validOutput).pass).toBe(true);
      expect(lesson7.validate('', 'Testing AI-Generated Python Code...\n  FAIL | Racecar -> False').pass).toBe(false);
    });
  });

  describe('Lessons 8 - 12 (Upcoming Modules)', () => {
    test('upcoming lessons return not done yet with helpful navigation hint', () => {
      [8, 9, 10, 11, 12].forEach(id => {
        const lesson = LESSONS_DATA.find(l => l.id === id);
        const result = lesson.validate();
        expect(result.pass).toBe(false);
        expect(result.message).toContain('coming soon');
        expect(result.hint).toContain('Lessons 1 through 7');
      });
    });
  });
});
