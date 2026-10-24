# Architecture

English | [中文](./architecture.zh.md)

This project is intentionally small. Its purpose is to demonstrate the structure of a mature open-source Node.js package.

## Public API

`src/index.js` exports the public API:

- `VERSION`
- `hello(name)`
- `summarizeOptions(options)`
- `loadConfig(options)`
- `validatePackageMetadata(metadata)`
- `buildProjectManifest(options)`
- `createReleaseNotes(version, changes, options)` — `options.date` pins the release date so output is reproducible.
- `describeProject(options)`

Keep public APIs stable. If behavior changes, add tests and update the changelog.

## Tests

Tests live in `tests/` and use Node's built-in test runner. This avoids adding test dependencies for a minimal starter project.

## CI

GitHub Actions runs:

```bash
npm ci --ignore-scripts
npm run ci
```

The workflow is intentionally simple so it is easy to adapt.

## Documentation

Documentation is part of the package surface. When adding a feature, update the relevant docs:

- user-facing behavior: `README.md`
- contributor behavior: `CONTRIBUTING.md`
- design decisions: `docs/architecture.md`
- release steps: `docs/release.md`
