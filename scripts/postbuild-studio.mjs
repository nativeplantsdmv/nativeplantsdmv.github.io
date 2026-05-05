#!/usr/bin/env node
import { execSync } from 'child_process';
import { cpSync, mkdirSync, rmSync, existsSync } from 'fs';
import { resolve } from 'path';

const root = process.cwd();
const studioDir = resolve(root, 'sanity', 'studio');
const outputDir = resolve(root, 'dist', 'studio');

console.log('🔨 Building Sanity Studio...');
try {
  execSync('npx sanity build dist --yes', {
    cwd: studioDir,
    stdio: 'inherit',
    env: { ...process.env },
  });
} catch (e) {
  console.error('❌ Sanity Studio build failed');
  process.exit(1);
}

// Copy built studio into dist/studio/
if (existsSync(outputDir)) rmSync(outputDir, { recursive: true });
mkdirSync(outputDir, { recursive: true });
cpSync(resolve(studioDir, 'dist'), outputDir, { recursive: true });
console.log('✅ Sanity Studio embedded at /studio/');
