#!/usr/bin/env bun

import initIndexMarkdownFiles from './indexMarkdownFiles';

if (!process.argv.slice(2).length) {
  console.error("👹 Oops! Missing arguments, please check the docs for instructions...");
  process.exit(1);
}

const args = process.argv.slice(2);
const targetDir = args[0];
const indexName = args[1];

const host = process.env.PUBLIC_MEILISEARCH_HOST;
const apiKey = process.env.PRIVATE_MEILISEARCH_DOCUMENTS_ADMIN_API_KEY;

if (!apiKey || !host || !targetDir || !indexName) {
  console.error("👹 Oops! Failed to parse arguments for some reason...");
  console.log('[debug]', {
    apiKey: typeof apiKey,
    host,
    targetDir,
    indexName,
  })

  process.exit(1);
}

try {
  const indexMarkdownFiles = await initIndexMarkdownFiles({
    apiKey,
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

