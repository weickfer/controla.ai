#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();

const IGNORED_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.vercel', '.turbo'
]);

function isDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

// Accept kebab segments and multi-dot extensions (e.g., d.ts, config.tsx)
// All segments must be lowercase a-z, 0-9 or '-'
const filenameOk = (name) => /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z0-9]+$/.test(name);

const failures = [];
for (const file of walk(root)) {
  const rel = path.relative(root, file);
  // Skip dotfiles at root like .env, .gitignore, etc.
  const base = path.basename(file);
  if (base.startsWith('.')) continue;
  if (!filenameOk(base)) failures.push(rel);
}

if (failures.length) {
  console.error('\nFilename check failed for:');
  for (const f of failures) console.error(' -', f);
  console.error('\nUse kebab-case: nome-do-arquivo.extensao');
  process.exit(1);
} else {
  console.log('All filenames are kebab-case compliant.');
}

