# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v2.1.0...v2.2.0) (2022-01-19)


### Features

* updated React dependency version requirement ([9a4d6b1](https://github.com/EricLambrecht/react-timing-hooks/commit/9a4d6b1b0b81c628ebb80b5c8102b651da63af1f))

## [2.1.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v2.0.0...v2.1.0) (2022-01-15)


### Features

* Add a new hook "useClock" that displays time ([7e88d12](https://github.com/EricLambrecht/react-timing-hooks/commit/7e88d1225ec2f28f5edb5f8f976e7c603674dac8)), closes [#17](https://github.com/EricLambrecht/react-timing-hooks/issues/17)

## [2.0.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.4.2...v2.0.0) (2020-09-24)


### ⚠ BREAKING CHANGES

* Node 8 is no longer supported.

* 🔧 Drop support for Node 8 ([53e99b7](https://github.com/EricLambrecht/react-timing-hooks/commit/53e99b7bdfcb7237578090ddb28b27b898c3f397))

### [1.4.2](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.4.1...v1.4.2) (2020-09-24)

Warning: This build does not support Node 8 anymore. Please use version 2.0.0 instead.


### Bug Fixes

* Fix potential security issue in lodash ([e9fe8fe](https://github.com/EricLambrecht/react-timing-hooks/commit/e9fe8fe63e74a91f1ad93869a43f9badb9e0bdf0))
* Fix security issue in dot-prop by updating standard-version ([c2fa24e](https://github.com/EricLambrecht/react-timing-hooks/commit/c2fa24ead10892a627fba8a53ade64472df84100))

### [1.4.1](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.4.0...v1.4.1) (2020-07-25)


### Bug Fixes

* Fix timeouts not being properly unmounted (if more than 1) ([df2d247](https://github.com/EricLambrecht/react-timing-hooks/commit/df2d2476a5bd899ba8a362cb2ae5636f6d4089ab)), closes [#4](https://github.com/EricLambrecht/react-timing-hooks/issues/4)

## [1.4.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.3.2...v1.4.0) (2020-06-12)


### Features

* Add second param to useTimeoutEffect callback to manually clean the timeout ([428c3f7](https://github.com/EricLambrecht/react-timing-hooks/commit/428c3f759bb3a6e117b288c484e5cfe76e396c49))

### [1.3.2](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.3.1...v1.3.2) (2020-03-28)

Updated `homepage` in `package.json` and overhauled the [documentation](https://ericlambrecht.github.io/react-timing-hooks/).

Technically identical to `1.3.1`.

### [1.3.1](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.3.0...v1.3.1) (2020-03-27)


### Bug Fixes

* Add missing docs for new hook "useTimer" ([e7b30fd](https://github.com/EricLambrecht/react-timing-hooks/commit/e7b30fd9455720e2058188eb82b3907cab214bb7))

## [1.3.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.2.0...v1.3.0) (2020-03-27)


### Features

* Add utility hook "useTimer" ([1874244](https://github.com/EricLambrecht/react-timing-hooks/commit/18742443a2316ae2902e972b2a5879155e5fa375))

## [1.2.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.1.1...v1.2.0) (2020-03-27)


### Features

* Make useAnimationFrame and useAnimationFrame loop generic and improve overall typing ([7d69dd8](https://github.com/EricLambrecht/react-timing-hooks/commit/7d69dd8b025c10ece46e0885c330ca67f647c9dd))
* Make useIdleCallback generic and improve overall typing ([c5282d5](https://github.com/EricLambrecht/react-timing-hooks/commit/c5282d58d2e4dfcf7b379f8afd5db6b405586493))
* Make useInterval generic and improve overall typing ([3cc08aa](https://github.com/EricLambrecht/react-timing-hooks/commit/3cc08aa27277f826077c4cabe5e98c0467dbb4b0))
* Make useTimeout generic and improve overall typing ([a65921a](https://github.com/EricLambrecht/react-timing-hooks/commit/a65921a44334e9c9aa511cb89c957822807a04c4))

### [1.1.1](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.1.0...v1.1.1) (2020-03-21)


### Bug Fixes

* Mark this package as side-effect-free to allow proper tree shaking ([5cc805a](https://github.com/EricLambrecht/react-timing-hooks/commit/5cc805a039d2bf3bcf88e3fc63d954638a421b89))

## [1.1.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.0.1...v1.1.0) (2020-03-21)


### Features

* Allow tree shaking by adding a es module export. ([bee51c6](https://github.com/EricLambrecht/react-timing-hooks/commit/bee51c68c88c9d05aeb037d96a7978ee9e01f2aa))


### Bug Fixes

* Fix effect cleanups not being executed (useTimeoutEffect & useIdleCallbackEffect) ([f62e393](https://github.com/EricLambrecht/react-timing-hooks/commit/f62e39399e72b49107fae387698a8bd46cb6607c))

### [1.0.1](https://github.com/EricLambrecht/react-timing-hooks/compare/v1.0.0...v1.0.1) (2020-03-20)

Updated npm keywords.

## 🎉🎉🎉 [1.0.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.2.1...v1.0.0) (2020-03-20) 🎉🎉🎉

This package has now reached a state that justifies a version 1.0.0. Technically this is version 0.2.1 with a new README and a new dedicated API documentation (which you can view [here](https://ericlambrecht.github.io/react-timing-hooks)). However, I want the public API to be considered stable at this point — which 0.X.X is [not](https://semver.org/#spec-item-4) — hence the bump to 1.0.0.

Fell free to try it out and leave feedback on [Github](https://github.com/EricLambrecht/react-timing-hooks)! :)

### [0.2.1](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.2.0...v0.2.1) (2020-03-18)


### Bug Fixes

* Fix doc in README ([fb927cb](https://github.com/EricLambrecht/react-timing-hooks/commit/fb927cb11cd1b1336f0788d4ca2d7c10c4df7031))

## [0.2.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.4...v0.2.0) (2020-03-18)


### Features

* useAnimationFrameLoop can now be stopped ([854c9fb](https://github.com/EricLambrecht/react-timing-hooks/commit/854c9fb2e454c174b1f250e2868ecb125d54a951)), closes [#1](https://github.com/EricLambrecht/react-timing-hooks/issues/1)

### [0.1.4](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.2...v0.1.4) (2020-03-17)


### Bug Fixes

* Fix acorn security vulnerability ([866e838](https://github.com/EricLambrecht/react-timing-hooks/commit/866e838dcf9df35ef2b94801c4b5ddea0f5986d8))
* Fix all security vulnarabilities except for minimist ([eea30ea](https://github.com/EricLambrecht/react-timing-hooks/commit/eea30ea7388e6d7fc2eead5ba55c976c78d03506)), closes [#2](https://github.com/EricLambrecht/react-timing-hooks/issues/2)

### [0.1.3](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.2...v0.1.3) (2020-03-17)


### Bug Fixes

* Fix all security vulnarabilities except for minimist ([9149df1](https://github.com/EricLambrecht/react-timing-hooks/commit/9149df10c612e6133d1f02e1e61be15487d76ff3))

### [0.1.2](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.1...v0.1.2) (2019-11-08)


### Bug Fixes

* Fix example in documentation ([44b0713](https://github.com/EricLambrecht/react-timing-hooks/commit/44b0713cc42cdae41d3fadf41e7ae45bf8291580))

### [0.1.1](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.0...v0.1.1) (2019-11-08)

This release contains only documentation updates.

## [0.1.0](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.0-alpha.6...v0.1.0) (2019-11-08)


### Features

* Added new hook "useAnimationFrame" ([6808e6a](https://github.com/EricLambrecht/react-timing-hooks/commit/6808e6a418026fc2585695676f9cafc65e0a3b33))
* Added new hook "useAnimationFrameLoop" ([147067c](https://github.com/EricLambrecht/react-timing-hooks/commit/147067cb6a9bcb0d75e2aadb6523b8cad48e525c))


### Bug Fixes

* Add callback type to index.js ([38d7c6f](https://github.com/EricLambrecht/react-timing-hooks/commit/38d7c6ff3d8b9ba81027e99f464a2009cb6a5ad1))

## [0.1.0-alpha.6](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2019-11-08)


### Features

* Added new hook "useIdleCallback" ([20cdc46](https://github.com/EricLambrecht/react-timing-hooks/commit/20cdc46ebb104352216abefc22dd0f3685291580))
* Added new hook "useTimeout" ([5ca6de6](https://github.com/EricLambrecht/react-timing-hooks/commit/5ca6de6d617c19b3b9757f5f2381ffb79089d9c5))

## [0.1.0-alpha.5](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2019-11-07)


### Bug Fixes

* Fix documentation ([f82e428](https://github.com/EricLambrecht/react-timing-hooks/commit/f82e42861df397f400dc17b44e29ae83e8c5b2e5))

## [0.1.0-alpha.4](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.0-alpha.3...v0.1.0-alpha.4) (2019-11-07)


### Bug Fixes

* Added return types to index export ([3ddb7ef](https://github.com/EricLambrecht/react-timing-hooks/commit/3ddb7efd41afd0537e5141c964d64c6c39dafbbc))

## [0.1.0-alpha.3](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2019-11-07)


### Features

* Added hook "useIdleCallbackEffect" ([b166e8f](https://github.com/EricLambrecht/react-timing-hooks/commit/b166e8f28274d9b29d3cbc9d23dadd6fbefa2c56))

## [0.1.0-alpha.2](https://github.com/EricLambrecht/react-timing-hooks/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2019-11-07)


### Documentation

* Updated the Readme ([3d185df](https://github.com/EricLambrecht/react-timing-hooks/commit/3d185dfd550e0fc2f256ff44c7d5331162a207f0))

## 0.1.0-alpha.1 (2019-11-07)


### Features

* Added useInterval hook ([799ac50](https://github.com/EricLambrecht/react-timing-hooks/commit/799ac506d3881de6ff2732f2bb998b151e960c5f))
* First draft of useTimeoutEffect ([b62a961](https://github.com/EricLambrecht/react-timing-hooks/commit/b62a96108f641c10191ab6b3146238b236f0b5fe))

## 0.1.0-alpha.0 (2019-10-25)


### Features

* First draft of useTimeoutEffect ([59bffe3](https://github.com/EricLambrecht/react-timing-hooks/commit/59bffe34921039c608010d83ef58c0d8e1a268db))
