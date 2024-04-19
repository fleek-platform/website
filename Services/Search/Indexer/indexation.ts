#!/usr/bin/env bun

import initIndexMarkdownFiles, { ContentDirByName } from './indexMarkdownFiles';

import type { ContentName } from './indexMarkdownFiles';

if (!process.argv.slice(2).length) {
  console.error("👹 Oops! Missing arguments, please check the docs for instructions...");
  process.exit(1);
}

const args = process.argv.slice(2);
const contentName = args[0] as ContentName | undefined;
const indexName = args[1];

const host = process.env.PUBLIC_MEILISEARCH_HOST;
const apiKey = process.env.PRIVATE_MEILISEARCH_DOCUMENTS_ADMIN_API_KEY;

if (!apiKey || !host || !contentName|| !indexName) {
  console.error("👹 Oops! Failed to parse arguments for some reason...");
  process.exit(1);
}

(async () => {
  console.log("🤖 Start indexation process");

  try {
    const targetDir = ContentDirByName[contentName];
    const indexMarkdownFiles = await initIndexMarkdownFiles({
      apiKey,
      host,
      indexName,
    });

    await indexMarkdownFiles({
      targetDir
    });

    console.log('👍 Done! Indexation has now completed.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
