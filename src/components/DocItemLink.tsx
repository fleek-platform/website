import type { DocsLink } from '@base/pages/docs/[...slug].astro';
import React from 'react';

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
      className={` bg-red-300 flex flex-row items-end px-10 py-10 text-white opacity-90  hover:opacity-100 ${isNext ? 'ml-auto items-end' : 'mr-auto items-start'}`}
    >
      {!isNext && (
        <img
          src="/svg/arrow-left.svg"
          alt="arrow-left"
          className="mr-10 pb-8 text-white"
          width={20}
          height={20}
        />
      )}
      <div className={`flex flex-col`}>
        <span className="text-white no-underline hover:no-underline">
          {isNext ? 'Next' : 'Previous'}
        </span>
        <span>{docItem.title}</span>
      </div>
      {isNext && (
        <img
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          className="ml-10 pb-8 text-white"
          width={20}
          height={20}
        />
      )}
    </a>
  );
};

export default DocItemLink;
