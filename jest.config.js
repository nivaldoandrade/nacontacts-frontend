module.exports = {
  testPathIgnorePatterns: ['/node_modules'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.spec.js',
    '!src/assets/**/*',
    '!src/utils/delay.js',
    '!src/index.js'
  ],
  coverageReporters: ['lcov', 'json']
};
