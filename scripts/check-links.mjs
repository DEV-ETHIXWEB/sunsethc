// Crawls every built HTML page in dist/client/ and verifies every internal
// <a href> resolves to either a real page or a valid redirect source. Flags:
// - broken internal links (no matching file and not a known redirect)
// - links to pages that exist but the anchor text is a low-value generic
//   phrase ("click here", "learn more") used as the ENTIRE link text —
//   informational only, does not fail the build.
//
// External links (http(s):// to other domains), mailto:, tel:, and anchor
// (#foo) links are skipped.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(root, '..');
const distDir = path.join(siteRoot, 'dist', 'client');
const snapshotPath = path.join(siteRoot, '.redirects-snapshot.json');

if (!existsSync(distDir)) {
  console.error('dist/client not found — run `npm run build` first.');
  process.exit(1);
}

const redirectSources = existsSync(snapshotPath)
  ? new Set(Object.keys(JSON.parse(readFileSync(snapshotPath, 'utf-8'))))
  : new Set();

function findHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) findHtmlFiles(full, files);
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

function urlFor(filePath) {
  const rel = path.relative(distDir, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
}

function pageExists(urlPath) {
  const clean = urlPath.split(/[?#]/)[0].replace(/^\//, '').replace(/\/$/, '');
  if (clean === '') return existsSync(path.join(distDir, 'index.html'));
  return (
    existsSync(path.join(distDir, clean, 'index.html')) ||
    existsSync(path.join(distDir, `${clean}.html`))
  );
}

const htmlFiles = findHtmlFiles(distDir);
const genericAnchors = new Set(['click here', 'learn more', 'read more', 'here']);

let brokenLinks = [];
let genericAnchorWarnings = [];
let checkedCount = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  const pageUrl = urlFor(file);
  const anchorMatches = [...html.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];

  for (const [, href, innerHtml] of anchorMatches) {
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      href === ''
    ) {
      continue;
    }

    checkedCount++;
    const cleanPath = href.split(/[?#]/)[0];
    const exists = pageExists(cleanPath) || redirectSources.has(cleanPath);
    if (!exists) {
      brokenLinks.push(`${pageUrl}: broken link to "${href}"`);
    }

    const anchorText = innerHtml.replace(/<[^>]*>/g, '').trim().toLowerCase();
    if (genericAnchors.has(anchorText)) {
      genericAnchorWarnings.push(`${pageUrl}: generic anchor text "${anchorText}" linking to "${href}"`);
    }
  }
}

console.log(`\nLink check: scanned ${htmlFiles.length} pages, ${checkedCount} internal links.\n`);

if (genericAnchorWarnings.length > 0) {
  console.log(`Generic anchor text warnings (${genericAnchorWarnings.length}):`);
  for (const w of genericAnchorWarnings.slice(0, 20)) console.log(`  - ${w}`);
  if (genericAnchorWarnings.length > 20) console.log(`  ... and ${genericAnchorWarnings.length - 20} more`);
  console.log('');
}

if (brokenLinks.length > 0) {
  console.error(`Broken links (${brokenLinks.length}):`);
  for (const b of brokenLinks) console.error(`  - ${b}`);
  console.error('');
  process.exit(1);
}

console.log('Link check passed: no broken internal links.');
