import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import MeiliSearch from 'meilisearch';
import {
  listFilesRecursively,
  filterMdFiles,
  generateUrlPath,
} from '../../../scripts/utils';

import type { Index, Config } from 'meilisearch';

const contentBasePath = 'src/content';

// TODO: This can be inferred based on content name
// there shouldn't be need to declare
export enum ContentDirByName {
  'blog' = `${contentBasePath}/blog`,
  'docs' = `${contentBasePath}/docs`,
  'guides' = `${contentBasePath}/guides`,
  'references' = `${contentBasePath}/references`,
  'troubleshooting' = `${contentBasePath}/troubleshooting`,
  'billing' = `${contentBasePath}/billing`,
}

export type ContentName = keyof typeof ContentDirByName;

const sleep = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout);
  });
};

async function waitForTask(client: MeiliSearch, id: number) {
  while (true) {
    const status = await client.getTask(id);
    if (status.error) throw new Error(status.error.message);
    if (status.status !== 'processing') break;
    await sleep(1000);
  }
}

const toSlug = (name: string) => {
  let text = name.toLowerCase();
  text = text.replace(/[^a-z0-9\s]/g, '');
  text = text.replace(/\s+/g, '-');
  text = text.trim();

  return text;
};

export default async ({
  apiKey,
  host,
  indexName,
}: {
  host: string;
  indexName: string;
  apiKey: string;
}) => {
  const client = new MeiliSearch({
    host,
    apiKey,
  } as Config);

  let index: Index | undefined = undefined;

  try {
    index = await client.getIndex(indexName);
    console.log(`✅ Found index ${indexName}`);
  } catch (e) {
    console.log(`⚠️ The index ${indexName} doesn't exist.`);
  }

  if (!index) {
    try {
      const task = await client.createIndex(indexName);
      await waitForTask(client, task.taskUid);

      index = await client.getIndex(indexName);
      console.log(`✅ Created index ${indexName}`);
    } catch (e) {
      console.error('👹 Oops! Failed to create index:', e);
      process.exit(1);
    }
  }

  return async ({ targetDir }: { targetDir: string }) => {
    let files = listFilesRecursively({
      directory: targetDir,
    });

    files = filterMdFiles(files);

    for (const filePath of files) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const parsed = await remark()
        .use(remarkFrontmatter)
        .use(remarkParseFrontmatter)
        .process(fileContent);

      const { title, category, date, desc } = parsed.data.frontmatter as Record<
        string,
        string
      >;

      const re = /---[\s\S]*?---/g;
      let content = fileContent.replace(re, '');
      content = (await remark().use(html).process(content)).toString();

      const url = generateUrlPath({ filePath });

      try {
        // TODO: Change to addDocuments in batches
        // client.index('myIndex').addDocumentsInBatches(documents: Document<T>[], batchSize = 1000): Promise<EnqueuedTask[]>
        await index.addDocuments([
          {
            id: toSlug(`${category}-${title}`),
            content,
            title,
            category,
            date,
            desc,
            url,
          },
        ]);

        console.log(`✅ Added document ${filePath}`);
      } catch (e) {
        console.error(`👹 Oops! Error indexing ${filePath}:`, e);
      }
    }
  };
};
