#!/usr/bin/env bun

import fs from 'fs';

const args = process.argv.slice(2);

if (!args.length) {
  console.error('👹 Oops! Missing the filename argument.');
  process.exit(1);
}

const filepath = args[0];

let fileContent: string = '';

try {
  fileContent = fs.readFileSync(filepath, 'utf-8');
} catch (err) {
  console.log(`🦖 Skipped! The file ${filepath} wasn't found!`);
  process.exit(0);
}

// Markdown headings
const re1 = /---[\s\S]*?---/g;
// Code blocks
const re2 = /```[\s\S]*?```/g;
// Named URL
const re3 = /\[.*?\]\(.*?\)/g;

try {
  const content = fileContent
    .replace(re1, '')
    .replace(re2, '')
    .replace(re3, '')
    .toLowerCase();

  process.stdout.write(content);
} catch (err) {
  console.error('👹 Oops! Failed to normalize the file for some reason...');
  process.exit(1);
}
