import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('../dist/', import.meta.url);
const files = fs.readdirSync(root, { recursive: true }).filter(p => p.endsWith('.html'));
let references = 0;
for (const file of files) {
  const html = fs.readFileSync(new URL(file, root), 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (match[1].startsWith('//')) continue;
    const url = decodeURI(match[1].split(/[?#]/)[0]).slice(1);
    assert([url, url + '.html', path.join(url, 'index.html')].some(p => fs.existsSync(new URL(p, root))), `${file}: missing ${url}`);
    references++;
  }
}
for (const file of ['index.html', 'docs/index.html', 'docs/tutorial/index.html', 'docs/learn/index.html', 'docs/reference/disclaimers/index.html', 'docs/reference/acknowledgements/index.html', 'promo.mp4']) {
  assert(fs.existsSync(new URL(file, root)), `Missing ${file}`);
}
for (const file of fs.readdirSync(new URL('../packages/docs/public/get-started/', import.meta.url))) {
  assert(fs.readFileSync(new URL('../packages/docs/public/get-started/' + file, import.meta.url)).equals(fs.readFileSync(new URL('docs/get-started/' + file, root))), `Screenshot changed: ${file}`);
}
console.log(`PASS: ${files.length} HTML pages, ${references} local references, all tutorial screenshots preserved.`);
