/**
 * OpenWay Code - Instructor Guides & Classroom Pacing Tests
 * Validates step-by-step projector guide structures, pacing breakdowns, checkpoints, and discussion prompts.
 */

const { INSTRUCTOR_GUIDES } = require('../instructor_guides');

describe('Instructor & Projector Guides Module', () => {
  test('defines instructor guides object', () => {
    expect(INSTRUCTOR_GUIDES).toBeDefined();
    expect(typeof INSTRUCTOR_GUIDES).toBe('object');
  });

  test('Lesson 1 guide has complete title, goal, pacing, and 3 progressive steps', () => {
    const guide1 = INSTRUCTOR_GUIDES[1];
    expect(guide1).toBeDefined();
    expect(guide1.title).toContain('Lesson 1: Sorting Algorithms');
    expect(guide1.goal).toContain('Bubble Sort');

    expect(guide1.pacing).toBeDefined();
    expect(guide1.pacing.hook).toContain('10 mins');
    expect(guide1.pacing.liveCoding).toContain('25 mins');
    expect(guide1.pacing.studentWork).toContain('20 mins');
    expect(guide1.pacing.debrief).toContain('5 mins');

    expect(Array.isArray(guide1.steps)).toBe(true);
    expect(guide1.steps.length).toBe(3);

    guide1.steps.forEach((step, idx) => {
      expect(step.num).toBe(idx + 1);
      expect(typeof step.title).toBe('string');
      expect(typeof step.prompt).toBe('string');
      expect(typeof step.code).toBe('string');
      expect(typeof step.checkpoint).toBe('string');
    });

    expect(Array.isArray(guide1.discussionQuestions)).toBe(true);
    expect(guide1.discussionQuestions.length).toBeGreaterThan(0);

    expect(Array.isArray(guide1.gotchas)).toBe(true);
    expect(guide1.gotchas.length).toBeGreaterThan(0);
  });

  test('every defined instructor guide satisfies structural integrity', () => {
    Object.entries(INSTRUCTOR_GUIDES).forEach(([lessonId, guide]) => {
      expect(Number(lessonId)).toBeGreaterThan(0);
      expect(typeof guide.title).toBe('string');
      expect(typeof guide.goal).toBe('string');
      expect(guide.pacing).toBeDefined();
      expect(typeof guide.pacing.hook).toBe('string');
      expect(typeof guide.pacing.liveCoding).toBe('string');
      expect(typeof guide.pacing.studentWork).toBe('string');
      expect(typeof guide.pacing.debrief).toBe('string');

      expect(Array.isArray(guide.steps)).toBe(true);
      expect(guide.steps.length).toBeGreaterThan(0);
    });
  });
});
