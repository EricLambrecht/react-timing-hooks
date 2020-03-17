# Contribution guide

## Developing react-timing-hooks

All contributions to _react-timing-hooks_ are welcome!

Please consider these guidelines when filing a pull request:

1. All commit messages must adhere to the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format. So **please use `npm run commit`** to commit your staged changes.
2. Test everything before you commit it: `npm run test` will take care of that.
3. Use [prettier](https://prettier.io) while developing. You can check your code with `npm run prettier:check` to make sure everything's formatted correctly.

## Creating releases

react-timing-hooks uses [standard-version](https://github.com/conventional-changelog/standard-version)
to release new versions automatically.

*  Commits of type `fix` will trigger bugfix releases, think `0.0.1`
*  Commits of type `feat` will trigger feature releases, think `0.1.0`
*  Commits with `BREAKING CHANGE` in body or footer will trigger breaking releases, think `1.0.0`

**All other commit types will trigger no new release.**
