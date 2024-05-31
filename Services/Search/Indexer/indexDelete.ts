#!/usr/bin/env bun

import MeiliSearch from 'meilisearch';

import type { Config } from 'meilisearch';

const args = process.argv.slice(2);
const indexName = args[0];

const host = process.env.PUBLIC_MEILISEARCH_HOST;
const apiKey = process.env.PRIVATE_MEILISEARCH_DOCUMENTS_ADMIN_API_KEY;

if (!apiKey || !host) {
  console.error("👹 Oops! Failed to parse arguments for some reason...");
  process.exit(1);
}

const sleep = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout);
  });
}

async function waitForTask(client: MeiliSearch, id: number) {
  while (true) {
    const status = await client.getTask(id);
    if (status.error) throw new Error(status.error.message);
    if (status.status !== 'processing') break;
    await sleep(1000);
  }
}

const client = new MeiliSearch({
  host,
  apiKey,
} as Config);

const deleteIndex = async ({
  indexName,
}: {
  indexName: string;
}) => {
  try {
    const task = await client.deleteIndex(indexName);
    await waitForTask(client, task.taskUid);       
    
    console.log(`✅ Deleted index ${indexName}`);
  } catch (e) {
    console.error(`👹 Oops! Failed to delete index ${indexName}`, e);
  }
}

(async () => {
  console.log(`🤖 Start Delete Index ${indexName} process`);

  try {
    await deleteIndex({
      indexName,
    });

    console.log(`👍 Done! Delete Index ${indexName} has now completed.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
