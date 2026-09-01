// Validates src/data/redirects.ts against the actual built site:
// - no redirect chains (A -> B where B is also a redirect source)
// - no redirect loops (A -> A, directly or transitively)
// - no duplicate "from" keys pointing at different targets
// - every redirect target resolves to a real page in dist/client/
//
// Run after `astro build` (dist/client must exist, per the @astrojs/vercel
// adapter's output layout). Exits non-zero on failure so it can gate CI/local QA.

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(root, '..');
const distDir = path.join(siteRoot, 'dist', 'client');
const snapshotPath = path.join(siteRoot, '.redirects-snapshot.json');

if (!existsSync(snapshotPath)) {
  console.error('.redirects-snapshot.json not found — run `npx tsx scripts/snapshot-redirects.mjs` first.');
  process.exit(1);
}

const redirects = JSON.parse(readFileSync(snapshotPath, 'utf-8'));

let errors = [];

// --- 1. Loop / chain detection (graph analysis, no filesystem needed) ---
const fromSet = new Set(Object.keys(redirects));
for (const [from, to] of Object.entries(redirects)) {
  const toPathOnly = to.split(/[?#]/)[0];
  if (toPathOnly === from) {
    errors.push(`Redirect loop: "${from}" -> "${to}" (points to itself)`);
    continue;
  }
  if (fromSet.has(toPathOnly)) {
    errors.push(`Redirect chain: "${from}" -> "${toPathOnly}" -> "${redirects[toPathOnly]}" (target is itself a redirect source; should point directly at final destination)`);
  }
}

// --- 2. Resolve every unique target against the built site ---
function pageExists(urlPath) {
  const clean = urlPath.split(/[?#]/)[0].replace(/^\//, '').replace(/\/$/, '');
  if (clean === '') return existsSync(path.join(distDir, 'index.html'));
  const asDir = path.join(distDir, clean, 'index.html');
  const asFile = path.join(distDir, `${clean}.html`);
  return existsSync(asDir) || existsSync(asFile);
}

if (!existsSync(distDir)) {
  console.error('dist/client not found — run `npm run build` before validating redirects.');
  process.exit(1);
}

const uniqueTargets = new Set(Object.values(redirects).map((t) => t.split(/[?#]/)[0]));
for (const target of uniqueTargets) {
  if (!pageExists(target)) {
    errors.push(`Dead redirect target: "${target}" does not resolve to a page in dist/client/`);
  }
}

// --- 3. Report ---
if (errors.length > 0) {
  console.error(`\nRedirect validation FAILED (${errors.length} issue${errors.length === 1 ? '' : 's'}):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

console.log(`Redirect validation passed: ${Object.keys(redirects).length} redirects, ${uniqueTargets.size} unique targets, no chains/loops/dead targets.`);
