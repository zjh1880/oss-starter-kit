# 贡献指南

[English](./CONTRIBUTING.md) | 中文

感谢贡献 `oss-starter-kit`。

## 开发环境

```bash
npm install
npm test
npm run lint
npm run ci
```

## Pull Request 检查清单

- 行为变化必须新增或更新测试。
- Public API 变化必须更新 README 示例。
- 设计变化需要更新 `docs/architecture.md` 和 `docs/architecture.zh.md`。
- 发布流程变化需要更新 `docs/release.md` 和 `docs/release.zh.md`。
- 用户可见变化需要更新 `CHANGELOG.md` 和 `CHANGELOG.zh.md`。
- 提交前运行 `npm run ci`。

## 代码风格

- 使用 CommonJS，保持零构建兼容。
- Public API 保持小而稳定。
- 优先显式错误，而不是静默 fallback。
- 新增功能时同步补充中英文文档。
