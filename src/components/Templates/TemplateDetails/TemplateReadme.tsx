import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@utils/cn';
import Text from '@components/Text';
import Link from '@components/Link';
import ContentBox from '@components/About/ContentBox';

interface TemplateReadmeProps {
  readmeContent: string;
}

export const TemplateReadme: React.FC<TemplateReadmeProps> = ({
  readmeContent,
}) => {
  return (
    <ContentBox
      variant="narrow"
      className="readme-content rounded-sm box-border max-w-full p-3"
    >
      <ReactMarkdown
        className="font-plex-sans text-[13px] leading-[22px] text-neutral-11 md:text-[16px]"
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children, className, node, ...rest }) => (
            <pre
              {...rest}
              className={cn(
                className,
                'mb-16 max-w-full overflow-hidden rounded-5 bg-neutral-2 p-12 text-neutral-12',
              )}
            >
              {children}
            </pre>
          ),
          code: ({ children, className, node, ...rest }) => (
            <code
              {...rest}
              className={cn(
                className,
                'rounded-[0.25rem] bg-neutral-2 px-[0.375rem] text-[13px] text-neutral-12 md:text-[16px]',
              )}
            >
              {children}
            </code>
          ),
          p: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(
                className,
                'mb-16  text-[13px] text-neutral-11 md:text-[16px]',
              )}
              as="p"
              style="m"
            >
              {children}
            </Text>
          ),
          h1: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(
                className,
                'mb-16 border-b-2 border-b-neutral-4 pb-6 text-neutral-12 ',
              )}
              as="h1"
              style="3xl"
            >
              {children}
            </Text>
          ),
          h2: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(
                className,
                'mb-16 border-b-2 border-b-neutral-4 pb-6 text-neutral-12',
              )}
              as="h2"
              style="2xl"
            >
              {children}
            </Text>
          ),
          h3: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(
                className,
                'mb-16 pb-6 !text-[20px] !font-bold !leading-[28px] text-neutral-12',
              )}
              as="h3"
              style="xl"
            >
              {children}
            </Text>
          ),
          table: ({ children, className, node, ...rest }) => (
            <table
              {...rest}
              className={cn(
                className,
                'mb-16 w-full border-collapse border-2 border-neutral-4 p-6 font-plex-sans text-[13px] md:text-[16px]',
              )}
            >
              {children}
            </table>
          ),
          td: ({ children, className, node, ...rest }) => (
            <td
              {...rest}
              className={cn(
                className,
                'border-collapse border-2 border-neutral-4 p-6 text-neutral-11',
              )}
            >
              {children}
            </td>
          ),
          th: ({ children, className, node, ...rest }) => (
            <th
              {...rest}
              className={cn(
                className,
                'border-collapse border-2 border-neutral-4 p-6 leading-24 text-neutral-11',
              )}
            >
              {children}
            </th>
          ),
          ul: ({ children, className, node, ...rest }) => (
            <ul
              {...rest}
              className={cn(
                className,
                'mb-16 list-inside list-disc pl-5 font-plex-sans text-[13px] text-neutral-12 md:text-[16px]',
              )}
            >
              {children}
            </ul>
          ),
          a: ({ children, className, node, href, ...rest }) => (
            <Link
              {...rest}
              href={href || '#'}
              className={cn(
                className,
                'inline text-[13px] text-yellow-dark-11 md:text-[16px]',
              )}
            >
              {children}
            </Link>
          ),
        }}
      >
        {readmeContent}
      </ReactMarkdown>
    </ContentBox>
  );
};
