import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch';

import type { Hit as AlgoliaHit } from 'instantsearch.js';

// Algolia search key is safe to be made public
const appId = import.meta.env.PUBLIC_ALGOLIA_APP_ID;
const apiKey = import.meta.env.PUBLIC_ALGOLIA_API_KEY;

const searchClient = algoliasearch(
  appId,
  apiKey,
);

type HitProps = {
  hit: AlgoliaHit<{
    content: string;
    url: string;
    url_without_anchor: string;
  }>;
};

// TODO: Change to corresponding indexed field
// at the moment is using dummy data
const HIT_KEY = "overview";

const Hit = ({ hit }: HitProps) => {
  const maxLength = 90;

  if (!hit[HIT_KEY]) return;
  
  return (
    <a href={hit.url}>
      <span className="text-12 bg-neutral-600 transition hover:opacity-80 p-10 leading-loose rounded-8 w-full inline-block">
        {
          hit[HIT_KEY].substring(0, maxLength) + '...'
        }
      </span>
    </a>
  );
}

type Props = {
  indexName: string;
}

export default ({
  indexName
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const onSearchFocus = () => setOpenModal(true);

  return (
    <>
      <div onClick={onSearchFocus}>
          <div className="flex h-40">
            <input
              id="search"
              type="text"
              className="outline-0 border-2 focus:border-blue-500 h-full pl-40 rounded-8 font-sans h-20 leading-18 text-18 font-light"
              placeholder="Search blog posts..."
              readOnly={true}
            />
          	<div className="absolute left-0 flex items-center p-10">
          	  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="#aaa">
          	    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          	  </svg>
          	</div>
          </div>
      </div>
      {
        openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-top justify-center z-50" onClick={() => setOpenModal(false)}>
            <div className="bg-ui-fleek-black rounded-8 mt-40 w-640 h-480 p-6 rounded shadow-lg z-100" onClick={(e: any) => e.stopPropagation()}>
              <InstantSearch
                indexName={indexName}
                searchClient={searchClient}
                insights={false}
              >
                <Configure hitsPerPage={12} />
                <SearchBox className="" autoFocus={true} placeholder='Search...' />
                <div className="w-full h-[420px] overflow-hidden overflow-y-visible p-10">
                  <Hits hitComponent={Hit} />
                </div>
              </InstantSearch>
            </div>
          </div>
        )
      }
    </>
  );
}
