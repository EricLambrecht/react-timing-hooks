module.exports = {
  "roots": [
    "<rootDir>/src",
    "<rootDir>/integration-tests"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "setupFiles": ['./jest.setup.js']
}
