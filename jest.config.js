module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'server.js',
    'runner.js',
    'lessons.js',
    'instructor_guides.js',
    '!**/node_modules/**',
    '!**/skulpt*.js',
    '!**/coverage/**'
  ],
  coverageDirectory: 'coverage',
  verbose: true
};
