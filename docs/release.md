# Release guide

English | [中文](./release.zh.md)

Use this checklist for every release.

## Before release

- [ ] Run `npm run ci`.
- [ ] Review `CHANGELOG.md`.
- [ ] Use `createReleaseNotes(version, changes)` for consistent release note formatting.
- [ ] Confirm README examples still work.
- [ ] Confirm package metadata is correct.

## Create release

1. Update `version` in `package.json`.
2. Update `CHANGELOG.md`.
3. Commit the changes.
4. Tag the release:

```bash
git tag v1.0.0
git push origin v1.0.0
```

5. Create a GitHub release from the tag.
6. Publish to npm if this package should be installable:

```bash
npm publish
```

## After release

- [ ] Verify the GitHub release page.
- [ ] Verify npm package metadata if published.
- [ ] Announce the release in the project discussion channel.
