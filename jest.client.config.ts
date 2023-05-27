module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/client/**/*.spec.[jt]s?(x)'],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
};
