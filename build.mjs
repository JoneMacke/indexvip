import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js']) fs.copyFileSync(path.join(root, file), path.join(dist, file));
console.log('构建完成：dist/');
