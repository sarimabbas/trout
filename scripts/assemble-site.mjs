import { cp, mkdir, rm } from 'node:fs/promises';

// Only the two public static sites are deployed. No webhook backend or secrets.
const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL('../packages/marketing/out/', import.meta.url), output, { recursive: true });
await cp(new URL('../packages/docs/dist/', import.meta.url), new URL('docs/', output), { recursive: true });
console.log('Assembled marketing at / and documentation at /docs/.');
