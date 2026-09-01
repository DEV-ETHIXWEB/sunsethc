import { redirects } from '../src/data/redirects.ts';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(root, '..', '.redirects-snapshot.json');
writeFileSync(outPath, JSON.stringify(redirects, null, 2));
console.log(`Wrote ${Object.keys(redirects).length} redirects to .redirects-snapshot.json`);
