#!/usr/bin/env bun

import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import { listFilesRecursively } from '../scripts/utils';

type ContentWithSlug = {
  title: string;
  slug: string;
  path: string;
};

const filterMdFiles = (filePaths: string[]) => {
  return filePaths.filter((filePath) => {
    const extension = path.extname(filePath);
    return extension === '.md' || extension === '.mdx';
  });
};

const verifyMarkdownFiles = async ({ targetDir }: { targetDir: string }) => {
  let files = listFilesRecursively({
    directory: targetDir,
  });

  files = filterMdFiles(files);

  return files;
};

(async () => {
  console.log('🤖 Start markdown verification process');

  try {
    const files = await verifyMarkdownFiles({
      targetDir: './src/content',
    });

    let contentWithSlug: ContentWithSlug[] = [];

    for (const filePath of files) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const parsed = await remark()
        .use(remarkFrontmatter)
        .use(remarkParseFrontmatter)
        .process(fileContent);

      const { title, slug } = parsed.data.frontmatter as Record<string, string>;

      if (slug) {
        contentWithSlug.push({
          title,
          slug,
          path: filePath,
        });
      }
    }

    if (contentWithSlug.length) {
      console.error('👹 Oops! Custom slugs are not accepted.');
      console.warn(
        '⚠️ WARNING: Remove the slug property and value from the header of the following markdown content files:\n\n',
        contentWithSlug
          .map((item) => `${item.title} (${item.path})`)
          .join('\n'),
      );
      process.exit(1);
    }

    console.log('👍 Done! Markdown files check has now completed.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
