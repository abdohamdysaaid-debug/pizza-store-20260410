/* global process */
import fs from 'fs';
import path from 'path';

try {
  fs.copyFileSync(
    path.join('dist', 'index.html'),
    path.join('dist', '404.html')
  );
  console.log('Successfully copied dist/index.html to dist/404.html');
} catch (err) {
  console.error('Error copying index.html to 404.html:', err);
  process.exit(1);
}
