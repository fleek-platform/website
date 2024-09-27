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
            no-underline  
            ${isNext ? 'ml-auto items-end' : 'mr-auto items-start'} 
            border
            border-gray-dark-6
            hover:border-gray-dark-7
            hover:bg-gray-dark-1
             `}
    >
      <div
        className={`flex w-full flex-col text-16 ${isNext ? 'items-end' : 'items-start'}`}
      >
        <div className={`flex flex-row items-center`}>
          {!isNext && <IconArrowLeft className="text-yellow-dark-11" />}
          <span className="no-underline hover:no-underline">
            {isNext ? 'Next' : 'Previous'}
          </span>
          {isNext && <IconArrowRight className="text-yellow-dark-11" />}
        </div>
        <span className="text-gray-dark-12 ">{docItem.title}</span>
      </div>
    </a>
  );
};

export default DocItemLink;
