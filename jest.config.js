module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/integration-tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['./jest.setup.js'],
  coverageDirectory: "./coverage/",
  collectCoverage: true
}
