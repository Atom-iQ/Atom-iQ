# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0-alpha.1](https://github.com/Atom-iQ/Atom-iQ/compare/v0.2.0-alpha.0...v0.2.0-alpha.1) (2020-11-14)


### Features

* **core:** add Reactive Event Delegation System ([85a6203](https://github.com/Atom-iQ/Atom-iQ/commit/85a6203fec5e6dcb85ae365502e572c2c7e9fd73))

## [0.2.0-alpha.0](https://github.com/Atom-iQ/Atom-iQ/compare/v0.2.0-alpha...v0.2.0-alpha.0) (2020-10-28)


### Bug Fixes

* **core:** fix circular dependencies ([d4a4318](https://github.com/Atom-iQ/Atom-iQ/commit/d4a43182bb370a228966a0fc0fd8a7f44ef2f96f))

## [0.2.0-alpha](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.1...v0.2.0-alpha) (2020-10-21)


### Features

* **framework:** add middleware handling to core and basic middlewares - context, ref and teardown ([4701f2b](https://github.com/Atom-iQ/Atom-iQ/commit/4701f2baf4007ad91916297542f99d7b1fc8210a)), closes [#28](https://github.com/Atom-iQ/Atom-iQ/issues/28)

### [0.1.1](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.0...v0.1.1) (2020-10-15)


### Features

* **core:** update keyed fragment renderer - re-create keyed element with different type ([#32](https://github.com/Atom-iQ/Atom-iQ/issues/32)) ([03801a3](https://github.com/Atom-iQ/Atom-iQ/commit/03801a32f13a29f0e69847673863f1bac145879d)), closes [#31](https://github.com/Atom-iQ/Atom-iQ/issues/31)

## [0.1.0](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.0-beta.0...v0.1.0) (2020-10-15)


### Features

* **core:** add Controlled Form Elements ([d8484ee](https://github.com/Atom-iQ/Atom-iQ/commit/d8484ee4843b700d584fe17d227bcc75cd4a13e2))
* **core:** implement controlled form elements ([88d0f57](https://github.com/Atom-iQ/Atom-iQ/commit/88d0f570c495f701a2695d583eafa7485d3ca2f6))


### Bug Fixes

* **core:** fix rendering order error - children index sorter ([#29](https://github.com/Atom-iQ/Atom-iQ/issues/29)) ([d0b6751](https://github.com/Atom-iQ/Atom-iQ/commit/d0b6751a18696cbf8fbe9f5a9d3b8d7317e150dc)), closes [#19](https://github.com/Atom-iQ/Atom-iQ/issues/19)

## [0.1.0-beta.0](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.0-alpha.7...v0.1.0-beta.0) (2020-10-11)


### Features

* **core:** improve rendering Text nodes - update nodeValue instead of re-create Text node ([19ee775](https://github.com/Atom-iQ/Atom-iQ/commit/19ee77552e897a3fc18d0a658b3b4a975bfebe29))


### Bug Fixes

* **cli:** update bug with getting config file names in cli ([b039338](https://github.com/Atom-iQ/Atom-iQ/commit/b039338d324c82e1c9b8dd92774d9cd5a95806cd))
* **web:** update benchmark results ([b0a08ca](https://github.com/Atom-iQ/Atom-iQ/commit/b0a08cab304789e783944d03a569d4f17b9a8f4a))

## [0.1.0-alpha.7](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.0-alpha.6...v0.1.0-alpha.7) (2020-10-06)


### Features

* **web:** start creating a webpage ([c80dd78](https://github.com/Atom-iQ/Atom-iQ/commit/c80dd786e169995e8658d8c349a2ac118aa15887))

## [0.1.0-alpha.6](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2020-10-05)


### Features

* **jsx-plugin:** allow noImports option for jsx plugin ([#18](https://github.com/Atom-iQ/Atom-iQ/issues/18)) ([7f9122e](https://github.com/Atom-iQ/Atom-iQ/commit/7f9122e29ba034f1f6b62df7c9c7bbef46cc33de))

## [0.1.0-alpha.5](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.0-alpha.3...v0.1.0-alpha.5) (2020-10-04)

## [0.1.0-alpha.3](https://github.com/Atom-iQ/Atom-iQ/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2020-10-03)


### Features

* **cli:** add cli 'build' command ([#17](https://github.com/Atom-iQ/Atom-iQ/issues/17)) ([921dd78](https://github.com/Atom-iQ/Atom-iQ/commit/921dd784bbdcb6b7b79fd2261fab240705c025b8)), closes [#11](https://github.com/Atom-iQ/Atom-iQ/issues/11)

## 0.1.0-alpha.2 (2020-10-03)
## 0.1.0-alpha.1 (2020-10-03)

### Features
* **core:** implement ReactiveVirtualDOM Renderer and Component state functions
* **cli:** implement `iq start` command and webpack config generator
* **framework:** replace old JSX plugin with InfernoJS plugin adopted for Atom-iQ ([#12](https://github.com/Atom-iQ/Atom-iQ/issues/12)) ([cf92d84](https://github.com/Atom-iQ/Atom-iQ/commit/cf92d8486d9130565e9d60d8b915093ddc3d2984)), closes [#8](https://github.com/Atom-iQ/Atom-iQ/issues/8)
* **framework:** start using conventional changelog. Update naming and structure due to new nameUpdate project structure. Update naming. Add documentation. Add eventState function to core. Add development tools ([b299498](https://github.com/Atom-iQ/Atom-iQ/commit/b299498f9ffdf1c0011502c818ada33f56196fa8))
* **framework:** updated structure and naming. ([fbbf67c](https://github.com/Atom-iQ/Atom-iQ/commit/fbbf67c7833d9851b3648bdba4dfa7eb9f40de9d))


### Bug Fixes

* **core:** fix array rendering ([216a273](https://github.com/Atom-iQ/Atom-iQ/commit/216a273226e45a2ca2fe8cb2ffbd26206570545a)), closes [#9](https://github.com/Atom-iQ/Atom-iQ/issues/9)
* **core:** fix removing items from array ([d9d455d](https://github.com/Atom-iQ/Atom-iQ/commit/d9d455d107c321fe0f4fd912dd0e4a9fb7cf2ceb))
