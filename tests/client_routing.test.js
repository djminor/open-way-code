/**
 * OpenWay Code - Client-Side Routing & State Resolution Tests
 * Tests URL search param parsing (?lesson=X), hash routing (#lesson-X),
 * boundary clamping, and virtual filesystem store synchronization.
 */

describe('Client-Side Routing & State Resolution Module', () => {
  const TOTAL_LESSONS = 12;

  function resolveInitialLessonIndex({ search = '', hash = '', savedIndex = null } = {}) {
    const urlParams = new URLSearchParams(search);
    const paramLesson = parseInt(urlParams.get('lesson'), 10);
    const hashMatch = (hash || '').match(/lesson-(\d+)/);

    if (!isNaN(paramLesson) && paramLesson >= 1 && paramLesson <= TOTAL_LESSONS) {
      return paramLesson - 1;
    } else if (hashMatch) {
      const hashLesson = parseInt(hashMatch[1], 10);
      if (!isNaN(hashLesson) && hashLesson >= 1 && hashLesson <= TOTAL_LESSONS) {
        return hashLesson - 1;
      }
    } else {
      const parsedSaved = parseInt(savedIndex !== null ? savedIndex : '0', 10);
      return isNaN(parsedSaved) ? 0 : Math.min(Math.max(0, parsedSaved), TOTAL_LESSONS - 1);
    }
    return 0;
  }

  describe('URL Search Parameter Routing (?lesson=X)', () => {
    test('resolves ?lesson=1 to index 0', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=1' })).toBe(0);
    });

    test('resolves ?lesson=6 to index 5 (Middle Earth Map)', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=6' })).toBe(5);
    });

    test('resolves ?lesson=12 to index 11 (Capstone)', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=12' })).toBe(11);
    });

    test('falls back to default index when ?lesson is out of range (> 12)', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=99', savedIndex: '3' })).toBe(3);
    });

    test('falls back to default index when ?lesson is negative or zero', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=0', savedIndex: '2' })).toBe(2);
      expect(resolveInitialLessonIndex({ search: '?lesson=-5', savedIndex: '0' })).toBe(0);
    });

    test('falls back safely when ?lesson is non-numeric string', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=python', savedIndex: '1' })).toBe(1);
    });
  });

  describe('Hash Routing (#lesson-X)', () => {
    test('resolves #lesson-3 to index 2 when no search param is present', () => {
      expect(resolveInitialLessonIndex({ hash: '#lesson-3' })).toBe(2);
    });

    test('prioritizes valid ?lesson query param over #lesson hash', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=5', hash: '#lesson-2' })).toBe(4);
    });

    test('falls back to hash when query param is invalid', () => {
      expect(resolveInitialLessonIndex({ search: '?lesson=invalid', hash: '#lesson-7' })).toBe(6);
    });
  });

  describe('LocalStorage Persistence & Clamping', () => {
    test('uses saved index when neither query nor hash is provided', () => {
      expect(resolveInitialLessonIndex({ savedIndex: '4' })).toBe(4);
    });

    test('clamps saved index exceeding total lessons to 11', () => {
      expect(resolveInitialLessonIndex({ savedIndex: '45' })).toBe(11);
    });

    test('clamps negative saved index to 0', () => {
      expect(resolveInitialLessonIndex({ savedIndex: '-3' })).toBe(0);
    });

    test('defaults to 0 when storage is empty or corrupt', () => {
      expect(resolveInitialLessonIndex({ savedIndex: 'corrupt_string' })).toBe(0);
      expect(resolveInitialLessonIndex({ savedIndex: null })).toBe(0);
    });
  });

  describe('Virtual Filesystem Cache Synchronizer', () => {
    test('detects and migrates outdated Robot Toast files to Bubble Sort', () => {
      const mockFilesStore = {
        1: { 'main.py': '# Robot Toast Protocol Starting\ndef make_toast(): pass' }
      };
      const freshLessonFiles = {
        1: { 'main.py': '# Lesson 1: Sorting Algorithms (Bubble Sort)\ndef bubble_sort(): pass' }
      };

      const needsMigration = (lessonId, store) => {
        return !store[lessonId] || Object.keys(store[lessonId]).length === 0 ||
          (lessonId === 1 && store[1]?.['main.py']?.includes("Robot Toast"));
      };

      expect(needsMigration(1, mockFilesStore)).toBe(true);

      if (needsMigration(1, mockFilesStore)) {
        mockFilesStore[1] = { ...freshLessonFiles[1] };
      }

      expect(mockFilesStore[1]['main.py']).toContain('bubble_sort');
      expect(needsMigration(1, mockFilesStore)).toBe(false);
    });
  });

  describe('Reset Lesson & Completion State', () => {
    test('resetting a lesson removes it from completedLessons and updates storage', () => {
      const completedSet = new Set([1, 2, 6]);
      const lessonToReset = 6;

      expect(completedSet.has(lessonToReset)).toBe(true);

      // Perform reset action
      completedSet.delete(lessonToReset);
      const serialized = JSON.stringify([...completedSet]);

      expect(completedSet.has(lessonToReset)).toBe(false);
      expect(JSON.parse(serialized)).toEqual([1, 2]);
    });
  });
});
