# 发布指南

[English](./release.md) | 中文

每次发布都使用这个 checklist。

## 发布前

- [ ] 运行 `npm run ci`。
- [ ] 检查 `CHANGELOG.md` 和 `CHANGELOG.zh.md`。
- [ ] 使用 `createReleaseNotes(version, changes)` 生成一致格式的 release notes。
- [ ] 确认 README 示例仍可运行。
- [ ] 确认 package metadata 正确。

## 创建 Release

1. 更新 `package.json` 中的 `version`。
2. 更新 `CHANGELOG.md` 和 `CHANGELOG.zh.md`。
3. 提交变更。
4. 打 tag：

```bash
git tag v1.1.0
git push origin v1.1.0
```

5. 在 GitHub 从 tag 创建 release。
6. 如果需要发布 npm：

```bash
npm publish
```

## 发布后

- [ ] 检查 GitHub Release 页面。
- [ ] 如果已发布 npm，检查 npm metadata。
- [ ] 在项目讨论区或发布渠道公告。
