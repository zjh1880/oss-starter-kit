'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const starter = require('../src/index.js');

test('greets a valid name', () => {
  assert.equal(starter.hello('Ada'), 'Hello, Ada!');
});

test('trims surrounding whitespace', () => {
  assert.equal(starter.hello('  Grace  '), 'Hello, Grace!');
});

test('rejects an empty name', () => {
  assert.throws(() => starter.hello(''), /non-empty name/);
});

test('summarizes package options', () => {
  const summary = starter.summarizeOptions({ environment: 'test' });

  assert.equal(summary.name, 'oss-starter-kit');
  assert.equal(summary.environment, 'test');
  assert.equal(typeof summary.version, 'string');
  assert.equal(typeof summary.node, 'string');
});

test('loads normalized config', () => {
  const config = starter.loadConfig({
    name: 'demo-package',
    version: '2.0.0',
    description: 'Demo package',
    license: 'Apache-2.0',
    features: 'tests, ci, docs'
  });

  assert.deepEqual(config.features, ['tests', 'ci', 'docs']);
  assert.equal(config.license, 'Apache-2.0');
});

test('validates package metadata', () => {
  const valid = starter.validatePackageMetadata({
    name: 'demo-package',
    version: '1.2.3',
    license: 'MIT',
    description: 'Demo'
  });
  const invalid = starter.validatePackageMetadata({
    name: '',
    version: 'latest'
  });

  assert.equal(valid.ok, true);
  assert.equal(valid.errors.length, 0);
  assert.equal(invalid.ok, false);
  assert.equal(invalid.errors.length, 2);
});

test('builds a project manifest', () => {
  const manifest = starter.buildProjectManifest({
    name: 'demo-package',
    version: '1.0.0',
    description: 'Demo package',
    license: 'MIT',
    features: ['tests', 'ci']
  });

  assert.equal(manifest.ready, true);
  assert.equal(manifest.packageJson.name, 'demo-package');
  assert.equal(manifest.packageJson.scripts.ci, 'npm run lint && npm test');
});

test('creates release notes', () => {
  const notes = starter.createReleaseNotes('1.1.0', ['Add release guide', 'Add tests']);

  assert.equal(notes.includes('## [1.1.0]'), true);
  assert.equal(notes.includes('- Add release guide'), true);
  assert.equal(notes.includes('- Add tests'), true);
});

test('creates reproducible release notes when the date is pinned', () => {
  const first = starter.createReleaseNotes('1.2.0', ['Fix a bug'], { date: '2026-01-31' });
  const second = starter.createReleaseNotes('1.2.0', ['Fix a bug'], { date: '2026-01-31' });

  assert.equal(first, second);
  assert.equal(first.includes('## [1.2.0] - 2026-01-31'), true);
});

test('accepts a Date for the release date', () => {
  const notes = starter.createReleaseNotes('2.0.0', [], { date: new Date('2026-03-04T00:00:00Z') });

  assert.equal(notes.includes('## [2.0.0] - 2026-03-04'), true);
  assert.equal(notes.includes('- Initial release.'), true);
});

test('rejects a malformed release date', () => {
  assert.throws(() => starter.createReleaseNotes('1.0.0', [], { date: '31/01/2026' }), /ISO date/);
  assert.throws(() => starter.createReleaseNotes('1.0.0', [], { date: '2026-13-45' }), /real calendar day/);
});

test('rejects a malformed version', () => {
  assert.throws(() => starter.createReleaseNotes('latest', []), /semver/);
});

test('describes a project', () => {
  const description = starter.describeProject({
    name: 'demo-package',
    version: '1.0.0',
    features: ['docs']
  });

  assert.equal(description.name, 'demo-package');
  assert.equal(description.ready, true);
  assert.deepEqual(description.features, ['docs']);
});
