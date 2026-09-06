import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
const iconDir = path.join(root, 'assets', 'icons');
const mime = { '.svg': 'image/svg+xml', '.png': 'image/png' };
const icons = Object.fromEntries(
  fs.readdirSync(iconDir).map((file) => {
    const extension = path.extname(file);
    const data = fs.readFileSync(path.join(iconDir, file)).toString('base64');
    return [path.basename(file, extension), `data:${mime[extension]};base64,${data}`];
  }),
);

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(
  /(<img\s+data-icon="([^"]+)"\s+src=")[^"]+("[^>]*>)/g,
  (_, before, name, after) => `${before}${icons[name]}${after}`,
);
fs.writeFileSync(path.join(dist, 'index.html'), html);
for (const file of ['styles.css', 'script.js']) fs.copyFileSync(path.join(root, file), path.join(dist, file));
console.log('构建完成：dist/');
