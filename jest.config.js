module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  modulePathIgnorePatterns: ['<rootDir>/cypress', '<rootDir>/src/assets'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-tests.js'],
  collectCoverageFrom: ['**/src/**/*.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
