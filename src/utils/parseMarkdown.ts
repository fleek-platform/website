import { remark } from 'remark';
import html from 'remark-html';
import frontmatter from 'remark-frontmatter';

export const parseMarkdown = async (markdown: string): Promise<string> => {
  const result = await remark()
    .use(frontmatter, ['yaml', 'toml'])
    .use(html)
    .process(markdown);
  return result.toString();
};
