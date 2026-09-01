// Crawls dist/client/ (must be built first) and checks every generated HTML
// page for:
// - missing/duplicate <title>
// - missing/duplicate meta description
// - missing or duplicate H1
// - missing canonical link
// - images missing alt attributes (excluding decorative ones already marked alt="")
// - JSON-LD blocks that fail to parse as JSON
// - noindex on pages that should be indexable (flagged as a warning)
//
// Exits non-zero if any hard failure is found. Designed to run after `astro build`.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(root, '..');
const distDir = path.join(siteRoot, 'dist', 'client');

if (!existsSync(distDir)) {
  console.error('dist/client not found — run `npm run build` first.');
  process.exit(1);
}

function findHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) findHtmlFiles(full, files);
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = findHtmlFiles(distDir);

const titleMap = new Map();
const descMap = new Map();
let errors = [];
let warnings = [];

function urlFor(filePath) {
  const rel = path.relative(distDir, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  const url = urlFor(file);
  const isRedirectPage = /<meta http-equiv="refresh"/i.test(html);

  if (isRedirectPage) continue;

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`${url}: missing <title>`);
  } else {
    const title = titleMatch[1].trim();
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(url);
  }

  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    errors.push(`${url}: missing meta description`);
  } else {
    const desc = descMatch[1].trim();
    if (!descMap.has(desc)) descMap.set(desc, []);
    descMap.get(desc).push(url);
  }

  const h1Matches = [...html.matchAll(/<h1[^>]*>/gi)];
  if (h1Matches.length === 0) {
    errors.push(`${url}: missing H1`);
  } else if (h1Matches.length > 1) {
    warnings.push(`${url}: ${h1Matches.length} H1 elements found (expected exactly 1)`);
  }

  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  if (!canonicalMatch) {
    errors.push(`${url}: missing canonical link`);
  }

  if (/<meta name="robots" content="noindex/i.test(html)) {
    warnings.push(`${url}: page is marked noindex — verify this is intentional`);
  }

  const imgMatches = [...html.matchAll(/<img\s+[^>]*>/gi)];
  for (const [imgTag] of imgMatches) {
    if (!/\salt(="|[\s>])/.test(imgTag)) {
      warnings.push(`${url}: <img> missing alt attribute — ${imgTag.slice(0, 80)}...`);
    }
  }

  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, jsonContent] of jsonLdMatches) {
    try {
      JSON.parse(jsonContent);
    } catch (e) {
      errors.push(`${url}: invalid JSON-LD — ${e.message}`);
    }
  }
}

for (const [title, urls] of titleMap) {
  if (urls.length > 1) {
    errors.push(`Duplicate <title> "${title}" used on ${urls.length} pages: ${urls.slice(0, 5).join(', ')}${urls.length > 5 ? '…' : ''}`);
  }
}
for (const [, urls] of descMap) {
  if (urls.length > 1) {
    errors.push(`Duplicate meta description used on ${urls.length} pages: ${urls.slice(0, 5).join(', ')}${urls.length > 5 ? '…' : ''}`);
  }
}

console.log(`\nSEO audit: scanned ${htmlFiles.length} HTML files in dist/client/\n`);

if (warnings.length > 0) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings.slice(0, 30)) console.log(`  - ${w}`);
  if (warnings.length > 30) console.log(`  ... and ${warnings.length - 30} more`);
  console.log('');
}

if (errors.length > 0) {
  console.error(`Errors (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

console.log('SEO audit passed: no missing titles/descriptions/H1s/canonicals, no duplicate titles/descriptions, all JSON-LD valid.');
