#!/usr/bin/env bun

import initIndexMarkdownFiles from './indexMarkdownFiles';

if (!process.argv.slice(2).length) {
  console.error("👹 Oops! Missing arguments, please check the docs for instructions...");
  process.exit(1);
}

const args = process.argv.slice(2);
const host = process.env.PUBLIC_MEILISEARCH_HOST;
const targetDir = args[0];
const indexName = args[1];

if (!targetDir || !indexName) {
  console.error("👹 Oops! Failed to parse arguments for some reason...");

  process.exit(1);
}

try {
  const indexMarkdownFiles = await initIndexMarkdownFiles({
    host,
    indexName,
  });

  await indexMarkdownFiles({
    targetDir
  });  
} catch (e) {
  console.error(e);
  process.exit(1);
}

