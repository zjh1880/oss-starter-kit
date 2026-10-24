# oss-starter-kit

[English](./README.md) | 中文

[![CI](https://github.com/zjh1880/oss-starter-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/zjh1880/oss-starter-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/oss-starter-kit.svg)](https://www.npmjs.com/package/oss-starter-kit)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个用于快速发布高质量 Node.js 开源项目的成熟 starter kit。

这个仓库不只是代码模板。它包含成熟开源项目通常需要数月积累的内容：文档、治理文件、CI、发布流程、贡献者体验和模板化结构。

## 包含内容

- 零依赖 Node.js 包骨架。
- 项目 manifest 生成器。
- package metadata 校验。
- release notes 生成器。
- 内置 Node.js 测试。
- GitHub Actions CI。
- 完整 README 结构。
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- `SUPPORT.md`
- Issue 模板。
- Pull Request 模板。
- 架构文档。
- 发布文档。
- 变更日志。
- 示例用法。

## 快速开始

安装依赖：

```bash
npm install
```

运行测试：

```bash
npm test
```

运行质量门禁：

```bash
npm run ci
```

使用 starter package：

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

`src/index.js` 导出以下函数：

- `hello(name)`
- `summarizeOptions(options)`
- `loadConfig(options)`
- `validatePackageMetadata(metadata)`
- `buildProjectManifest(options)`
- `createReleaseNotes(version, changes, options)`
- `describeProject(options)`

`createReleaseNotes` 默认使用当天日期。传入 `{ date: '2026-01-31' }`（ISO 日期字符串或 `Date`）可让输出可复现——如果你要快照测试结果，或在多台机器上生成同一份 changelog，就必须固定日期：

```js
starter.createReleaseNotes('1.1.0', ['Add release guide'], { date: '2026-01-31' });
// ## [1.1.0] - 2026-01-31
```

示例：

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

## 项目结构

```text
oss-starter-kit/
  src/index.js
  tests/index.test.js
  examples/basic.js
  docs/architecture.md
  docs/architecture.zh.md
  docs/release.md
  docs/release.zh.md
  .github/workflows/ci.yml
  .github/ISSUE_TEMPLATE/
  .github/PULL_REQUEST_TEMPLATE.md
  CHANGELOG.md
  CHANGELOG.zh.md
  CONTRIBUTING.md
  CONTRIBUTING.zh.md
  CODE_OF_CONDUCT.md
  SECURITY.md
  SUPPORT.md
```

## 设计原则

### 1. 文档是产品的一部分

另一个开发者能否快速理解项目，决定了项目是否真正可用。

### 2. CI 应该简单可靠

默认 workflow 只运行语法检查和测试。项目变大后再增加更复杂流程。

### 3. 贡献应该低摩擦

Issue 模板和 PR 模板可以减少来回沟通。

### 4. 发布应该可重复

发布文档把发布流程变成 checklist，而不是一次性经验。

## 推荐发布清单

- [ ] 替换 `package.json` 中的仓库所有者（`repository`、`bugs`、`homepage`）以及 CI 徽章 URL。
- [ ] 替换包名、描述和关键词。
- [ ] 更新 README 中的真实使用示例。
- [ ] 至少添加三个有意义的测试。
- [ ] 确认 CI 通过。
- [ ] 创建第一个 GitHub Release。
- [ ] 如适合，发布到 npm。

## GitHub Template 用法

1. 在 GitHub 点击 **Use this template**。
2. 替换 package metadata。
3. 删除 README 中的初始 checklist。
4. 添加你的真实项目文档。

## 开发

```bash
npm install
npm test
npm run lint
npm run ci
```

## License

MIT
