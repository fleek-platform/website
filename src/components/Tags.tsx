import type { PropsWithChildren } from 'react';
import { cn } from '@utils/cn';

type TagsProps = PropsWithChildren & {
  tags?: string[];
  className?: string;
};

export const Tags: React.FC<TagsProps> = ({ tags, className }) => {
  return tags && tags.length ? (
    <div className={cn('tags flex h-18 gap-10 text-12 leading-14', className)}>
      {tags.map((tag: string) => (
        <div className="rounded-10 border border-gray-dark-11 px-6" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  ) : null;
};
