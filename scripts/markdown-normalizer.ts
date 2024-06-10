#!/usr/bin/env bun

import fs from 'fs';

if (!process.argv.slice(1).length) {
  console.error("👹 Oops! Missing the filename argument.");
  process.exit(1);
}

const args = process.argv.slice(1);
const filePath = args[1];
const fileContent = fs.readFileSync(filePath, 'utf-8');

// Markdown headings
const re1 = /---[\s\S]*?---/g;
// Code blocks
const re2 = /```[\s\S]*?```/g;
// Named URL
const re3 = /\[.*?\]\(.*?\)/g;

try {
  let content = fileContent
    .replace(re1, '')
    .replace(re2, '')
    .replace(re3, '')
    .toLowerCase();

  process.stdout.write(content);
} catch (err) {
  console.error("👹 Oops! Failed to normalize the file for some reason...");
  process.exit(1);
}
