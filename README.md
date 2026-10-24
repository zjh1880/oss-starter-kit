# oss-starter-kit

English | [中文](./README.zh.md)

[![CI](https://github.com/zjh1880/oss-starter-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/zjh1880/oss-starter-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/oss-starter-kit.svg)](https://www.npmjs.com/package/oss-starter-kit)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A polished open-source starter kit for shipping trustworthy Node.js projects on GitHub.

This repository is not just a code template. It includes the documentation, governance, CI, release process, and contributor experience that mature projects usually accumulate over months.

Use it when you want your next library to look production-ready from the first commit.

## What is included

- Zero-dependency Node.js package skeleton.
- Project manifest builder and release note helper.
- Built-in Node.js tests.
- GitHub Actions CI workflow.
- Complete README structure.
- `CONTRIBUTING.md`.
- `CODE_OF_CONDUCT.md`.
- `SECURITY.md`.
- `SUPPORT.md`.
- Issue templates.
- Pull request template.
- Architecture guide.
- Release guide.
- Change log.
- Example usage.

## Quick start

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run the quality gate:

```bash
npm run ci
```

Use the starter package:

```js
const starter = require('oss-starter-kit');

console.log(starter.hello('Ada'));
// Hello, Ada!

console.log(JSON.stringify(starter.describeProject({
  name: 'demo-package',
  version: '1.0.0',
  features: ['tests', 'ci', 'docs']
}), null, 2));
```

## Public API

`src/index.js` exports helper functions for building and validating starter projects:

```js
const starter = require('oss-starter-kit');

const manifest = starter.buildProjectManifest({
  name: 'demo-package',
  version: '1.0.0',
  description: 'Demo package',
  license: 'MIT',
  features: ['tests', 'ci', 'docs']
});

console.log(manifest.ready);
console.log(starter.createReleaseNotes('1.1.0', ['Add release guide']));
```

Available functions:

- `hello(name)`
- `summarizeOptions(options)`
- `loadConfig(options)`
- `validatePackageMetadata(metadata)`
- `buildProjectManifest(options)`
- `createReleaseNotes(version, changes, options)`
- `describeProject(options)`

`createReleaseNotes` defaults to today's date. Pass `{ date: '2026-01-31' }` (an ISO date or a `Date`) to make the output reproducible — required if you snapshot the result or generate the same changelog on more than one machine:

```js
starter.createReleaseNotes('1.1.0', ['Add release guide'], { date: '2026-01-31' });
// ## [1.1.0] - 2026-01-31
```

## Project structure

```text
oss-starter-kit/
  src/index.js                 # Public package API
  tests/index.test.js          # Built-in tests
  examples/basic.js            # Usage example
  docs/architecture.md         # Design notes
  docs/release.md              # Release checklist
  .github/workflows/ci.yml     # CI pipeline
  .github/ISSUE_TEMPLATE/      # Issue templates
  .github/PULL_REQUEST_TEMPLATE.md
  CHANGELOG.md
  CONTRIBUTING.md
  CODE_OF_CONDUCT.md
  SECURITY.md
  SUPPORT.md
```

## Design principles

### 1. Documentation is part of the product

A project is only useful if another developer can understand it quickly. This kit includes the docs that most new repositories forget.

### 2. CI should be boring

The default workflow runs syntax checks and tests on every push and pull request. Keep CI simple until the project needs more.

### 3. Contribution should be low-friction

Issue templates and pull request templates reduce back-and-forth. New contributors know exactly what information to provide.

### 4. Releases should be repeatable

The release guide turns publishing into a checklist instead of a ritual.

## Recommended first release checklist

- [ ] Replace the repository owner in `package.json` (`repository`, `bugs`, `homepage`) and in the CI badge URLs.
- [ ] Replace the package name, description, and keywords.
- [ ] Update the README with real usage examples.
- [ ] Add at least three meaningful tests.
- [ ] Confirm CI passes.
- [ ] Create the first GitHub release.
- [ ] Publish to npm if appropriate.

## GitHub template usage

1. Click **Use this template** on GitHub.
2. Replace package metadata.
3. Delete this checklist from the README once completed.
4. Add your real project docs.

## Development

```bash
npm install
npm test
npm run lint
npm run ci
```

## License

MIT
