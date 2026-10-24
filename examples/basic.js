'use strict';

const starter = require('../src/index.js');

console.log(starter.hello('Open Source'));
console.log(JSON.stringify(starter.describeProject({
  name: 'demo-package',
  version: '1.0.0',
  description: 'Demo package',
  license: 'MIT',
  features: ['tests', 'ci', 'docs']
}), null, 2));
// Pin the date so the example produces the same output on every run.
console.log(starter.createReleaseNotes('1.1.0', ['Add release guide', 'Add tests'], { date: '2026-01-31' }));
