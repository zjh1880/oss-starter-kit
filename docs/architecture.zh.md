# 架构文档

[English](./architecture.md) | 中文

这个项目刻意保持小巧，目标是展示一个成熟 Node.js 开源包应有的结构。

## Public API

`src/index.js` 导出以下 Public API：

- `VERSION`
- `hello(name)`
- `summarizeOptions(options)`
- `loadConfig(options)`
- `validatePackageMetadata(metadata)`
- `buildProjectManifest(options)`
- `createReleaseNotes(version, changes, options)` — `options.date` 用于固定发布日期，保证输出可复现。
- `describeProject(options)`

Public API 应保持稳定。行为变化需要新增测试并更新 changelog。

## 测试

测试位于 `tests/`，使用 Node.js 内置 test runner。这样 starter 项目不需要额外测试依赖。

## CI

GitHub Actions 会运行：

```bash
npm ci --ignore-scripts
npm run ci
```

workflow 保持简单，方便后续项目按需扩展。

## 文档

文档是 package 表面的一部分。新增功能时更新对应文档：

- 用户行为：`README.md`、`README.zh.md`
- 贡献者行为：`CONTRIBUTING.md`、`CONTRIBUTING.zh.md`
- 设计决策：`docs/architecture.md`、`docs/architecture.zh.md`
- 发布步骤：`docs/release.md`、`docs/release.zh.md`
