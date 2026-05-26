/**
 * Generates PWA PNG icons from public/favicon.svg using Sharp.
 * Executed automatically via the predev / prebuild npm hooks.
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svgBuffer = readFileSync(resolve(root, 'public/favicon.svg'));

/** @type {{ size: number; name: string }[]} */
const icons = [
  { size: 180, name: 'apple-touch-icon.png' }, // iOS home-screen icon
  { size: 192, name: 'icon-192.png' },          // Android baseline
  { size: 512, name: 'icon-512.png' },          // Android splash + store
];

async function main() {
  const { default: sharp } = await import('sharp');

  for (const { size, name } of icons) {
    // Rasterise the SVG at a density high enough for crisp edges, then
    // resize to the exact target dimensions.
    const density = Math.ceil(72 * size / 64); // 64 = SVG viewBox side length
    await sharp(svgBuffer, { density })
      .resize(size, size)
      .png()
      .toFile(resolve(root, 'public', name));

    console.log(`  ✓ public/${name}  (${size}×${size})`);
  }
}

main().catch((err) => {
  console.error('generate-icons failed:', err.message);
  process.exit(1);
});
