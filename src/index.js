'use strict';

const VERSION = '1.1.0';
const DEFAULT_PACKAGE_NAME = 'oss-starter-kit';
const DEFAULT_LICENSE = 'MIT';

function hello(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new TypeError('hello() requires a non-empty name');
  }

  return `Hello, ${name.trim()}!`;
}

function summarizeOptions(options) {
  const safeOptions = options || {};
  return {
    name: safeOptions.name || DEFAULT_PACKAGE_NAME,
    version: VERSION,
    node: process.versions.node,
    environment: safeOptions.environment || 'development'
  };
}

function loadConfig(options) {
  const safeOptions = options || {};
  return {
    name: safeOptions.name || DEFAULT_PACKAGE_NAME,
    version: safeOptions.version || VERSION,
    description: safeOptions.description || 'A polished open-source starter kit.',
    license: safeOptions.license || DEFAULT_LICENSE,
    environment: safeOptions.environment || 'development',
    features: normalizeFeatures(safeOptions.features)
  };
}

function normalizeFeatures(features) {
  if (!features) return ['tests', 'ci', 'docs'];
  if (Array.isArray(features)) return [...new Set(features.map(String).filter(Boolean))];
  if (typeof features === 'string') {
    return features.split(',').map((feature) => feature.trim()).filter(Boolean);
  }
  throw new TypeError('features must be an array or comma-separated string');
}

function validatePackageMetadata(metadata) {
  const errors = [];
  const safeMetadata = metadata || {};

  if (typeof safeMetadata.name !== 'string' || safeMetadata.name.trim() === '') {
    errors.push('name is required');
  }
  if (typeof safeMetadata.version !== 'string' || !/^\d+\.\d+\.\d+/.test(safeMetadata.version)) {
    errors.push('version must follow semver, for example 1.0.0');
  }
  if (safeMetadata.license && typeof safeMetadata.license !== 'string') {
    errors.push('license must be a string when provided');
  }
  if (safeMetadata.description && typeof safeMetadata.description !== 'string') {
    errors.push('description must be a string when provided');
  }

  return {
    ok: errors.length === 0,
    errors
  };
}

function buildProjectManifest(options) {
  const config = loadConfig(options);
  const validation = validatePackageMetadata({
    name: config.name,
    version: config.version,
    license: config.license,
    description: config.description
  });

  return {
    ...config,
    ready: validation.ok,
    validation,
    packageJson: {
      name: config.name,
      version: config.version,
      description: config.description,
      license: config.license,
      type: 'commonjs',
      main: 'src/index.js',
      scripts: {
        test: 'node --test',
        lint: 'node --check src/index.js && node --check tests/index.test.js',
        ci: 'npm run lint && npm test'
      },
      engines: {
        node: '>=18'
      }
    }
  };
}

function createReleaseNotes(version, changes, options) {
  if (!version || !/^\d+\.\d+\.\d+/.test(version)) {
    throw new TypeError('version must follow semver, for example 1.0.0');
  }

  const safeOptions = options || {};
  const date = resolveReleaseDate(safeOptions.date);
  const safeChanges = Array.isArray(changes) ? changes : [];
  const lines = [`## [${version}] - ${date}`, '', '### Added'];

  if (safeChanges.length === 0) {
    lines.push('- Initial release.');
  } else {
    for (const change of safeChanges) {
      lines.push(`- ${change}`);
    }
  }

  return `${lines.join('\n')}\n`;
}

// Release notes must be reproducible: defaulting to "today" makes the same
// input produce different output tomorrow, which breaks snapshot tests and
// makes generated changelogs churn on every run. Callers can pin the date.
function resolveReleaseDate(value) {
  if (value === undefined || value === null || value === '') {
    return new Date().toISOString().slice(0, 10);
  }

  const text = value instanceof Date ? value.toISOString().slice(0, 10) : String(value);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    throw new TypeError('date must be an ISO date such as 2026-01-31');
  }
  if (Number.isNaN(Date.parse(`${text}T00:00:00Z`))) {
    throw new TypeError(`date is not a real calendar day: ${text}`);
  }

  return text;
}

function describeProject(options) {
  const manifest = buildProjectManifest(options);
  return {
    name: manifest.name,
    version: manifest.version,
    license: manifest.license,
    ready: manifest.ready,
    features: manifest.features,
    node: process.versions.node
  };
}

module.exports = {
  VERSION,
  hello,
  summarizeOptions,
  loadConfig,
  validatePackageMetadata,
  buildProjectManifest,
  createReleaseNotes,
  describeProject
};
