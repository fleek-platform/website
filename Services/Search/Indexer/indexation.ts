#!/usr/bin/env bun

import initIndexMarkdownFiles from './indexMarkdownFiles';

if (!process.argv.slice(2).length) {
  console.error("👹 Oops! Missing arguments, please check the docs for instructions...");
  process.exit(1);
}

const args = process.argv.slice(2);
const host = args[0];
const targetDir = args[1];
const indexName = args[2];

try {
  const indexMarkdownFiles = await initIndexMarkdownFiles({
    host,
    indexName,
  });

  await indexMarkdownFiles({
    targetDir
  });  
} catch (e) {
  process.exit(1);
}

