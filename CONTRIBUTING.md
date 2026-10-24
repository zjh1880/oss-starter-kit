# Contributing

English | [中文](./CONTRIBUTING.zh.md)

Thank you for contributing to `oss-starter-kit`.

## Development setup

```bash
npm install
npm test
npm run lint
```

## Pull request checklist

- Add or update tests for behavior changes.
- Update README examples when public API changes.
- Update `docs/architecture.md` for design changes.
- Update `CHANGELOG.md` for user-facing changes.
- Run `npm run ci` before opening a pull request.

## Code style

- Use CommonJS for zero-build compatibility.
- Keep the public API small and predictable.
- Prefer explicit errors over silent fallbacks.
