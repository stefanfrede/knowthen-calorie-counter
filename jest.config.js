module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.s?css$': require.resolve('./test/style-mock.js'),
  },
  modulePathIgnorePatterns: ['<rootDir>/cypress', '<rootDir>/src/assets'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-tests.js'],
  collectCoverageFrom: ['**/src/**/*.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  transformIgnorePatterns: ['/node_modules/(?!lit-html).+\\.js'],
  coverageThreshold: {
    global: {
      statements: 17,
      branches: 4,
      lines: 17,
      functions: 20,
    },
  },
};
