// ai-happy-01 entry: copies the picture the judge gets to see into /output/entry.png.
// Node 22, standard library only, no network. Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dst = join(out, 'entry.png');

mkdirSync(out, { recursive: true });
copyFileSync(src, dst);

const bytes = statSync(dst).size;
if (bytes > 1048576) throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB cap`);

const head = readFileSync(dst).subarray(0, 3);
const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e;
const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
if (!isPng && !isJpeg) throw new Error('entry.png is neither a PNG nor a JPEG');
