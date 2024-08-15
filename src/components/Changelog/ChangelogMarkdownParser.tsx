import { useEffect, useState } from 'react';
import { parseMarkdown } from '../../utils/parseMarkdown';

export const ChangelogMarkdownParser = ({ markdown }: { markdown: string }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const parse = async () => {
      const parsedHtml = await parseMarkdown(markdown);
      setHtmlContent(parsedHtml);
    };

    parse();
  }, [markdown]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ChangelogMarkdownParser;
