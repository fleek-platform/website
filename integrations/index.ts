import {
  listFilesRecursively,
  filterMdFiles,
  generateUrlPath,
} from '../scripts/utils';
import fs from 'fs';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';

const outputDir = './dist/custom-data';
const outputFilePath = `${outputDir}/latestBlogPosts.json`;

interface BlogPost {
  title: string;
  date: string;
  url: string;
}

interface Frontmatter {
  title: string;
  date: string;
}

interface ParsedMarkdown {
  data?: {
    frontmatter: Frontmatter;
  };
}

const sortByDateDesc = (dataObjects: BlogPost[]): BlogPost[] => {
  return dataObjects.sort((a, b) => {
    const timestampA = new Date(a.date).getTime();
    const timestampB = new Date(b.date).getTime();
    return timestampB > timestampA
      ? 1
      : timestampB < timestampA
        ? -1
        : 0;
  });
};

export const getLatestBlogPosts = ({
  targetDir,
}: {
  targetDir: string;
}) => ({
  name: 'latestBlogPosts',
  hooks: {
    'astro:build:done': async () => {
      let files = listFilesRecursively({
        directory: targetDir,
      });

      files = filterMdFiles(files);

      const data: BlogPost[] = [];
      
      for (const filePath of files) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const parsed = await remark()
          .use(remarkFrontmatter)
          .use(remarkParseFrontmatter)
          .process(fileContent) as unknown as ParsedMarkdown;

        if (!parsed.data?.frontmatter?.date) continue;

        data.push({
          title: parsed.data.frontmatter.title,
          date: parsed.data.frontmatter.date,
          url: generateUrlPath({
            filePath,
          }),
        });
      }

      const sortedLatestBlogPosts = sortByDateDesc(data)
        .map(
          ({
            title,
            date,
            url
          }) => ({
            title,
            date,
            path: url,
          })
        );

      const jsonStr = JSON.stringify({
        data: sortedLatestBlogPosts.slice(0, 10),
      }, null, 2);

      try {
        await fs.promises.mkdir(outputDir, { recursive: true });
        await fs.promises.writeFile(outputFilePath, jsonStr);

        console.log(`✅ Generated latest blog posts JSON in ${outputFilePath}`);
      } catch (err) {
        console.error(`👹 Oops! Failed to generate ${outputFilePath}`);
      }
    },
  }
});
