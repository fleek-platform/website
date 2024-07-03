import type { DocsLink } from '@base/pages/docs/[...slug].astro';
import React from 'react';
import { IconArrowLeft, IconArrowRight } from './IconArrow';

interface DocItemLinkProps {
  isNext?: boolean;
  docItem: DocsLink;
}

const DocItemLink: React.FC<DocItemLinkProps> = ({
  isNext = false,
  docItem,
}) => {
  return (
    <a
      href={`/docs/${docItem.slug}`}
      className={`
            flex
            w-full 
            flex-row 
            rounded-10
            p-20
            text-white 
            no-underline  
            ${isNext ? 'ml-auto items-end' : 'mr-auto items-start'} 
            border
            border-gray-400
            hover:border-white
             `}
    >
      <div
        className={`flex w-full flex-col ${isNext ? 'items-end' : 'items-start'}`}
      >
        <div className={`flex flex-row items-center`}>
          {!isNext && <IconArrowLeft className="mt-2 text-yellow" />}
          <span className="no-underline hover:no-underline">
            {isNext ? 'Next' : 'Previous'}
          </span>
          {isNext && <IconArrowRight className="mt-2 text-yellow" />}
        </div>
        <div>
          <span className="text-white">{docItem.title}</span>
        </div>
      </div>
    </a>
  );
};

export default DocItemLink;
