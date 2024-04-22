import { useEffect, useState, useRef } from 'react';
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  useSearchBox,
  useInstantSearch,
} from 'react-instantsearch';

import type { Hit as AlgoliaHit } from 'instantsearch.js';

const { apiKey, host } = (() => {
  const apiKey = import.meta.env.PUBLIC_MEILISEARCH_DOCUMENTS_CLIENT_API_KEY;
  const host = import.meta.env.PUBLIC_MEILISEARCH_HOST;

  if (!apiKey || !host) {
    throw Error(`👹 Oops! Missing environment variables (host ${host}, apiKey ${apiKey})`);
  }

  return {
    apiKey,
    host,
  }
})();

const { searchClient } = instantMeiliSearch(
  host,
  apiKey,
);

// TODO: Share types with indexer  
type HitProps = {
  hit: AlgoliaHit<{
    id: string;
    title: string;
    content: string;
    date: Date;
    url: string;
  }>;
};

// TODO: Change to corresponding indexed field
// at the moment is using dummy data
const HIT_KEY = "title";

const Hit = ({ hit }: HitProps) => {
  const maxLength = 90;
  
  return (
    <a key={hit.id} href={hit.url}>
      <span className="text-12 font-light bg-neutral-600 transition hover:opacity-80 p-10 leading-loose rounded-8 w-full inline-block">
        {
          hit[HIT_KEY].substring(0, maxLength) + '...'
        }
      </span>
    </a>
  );
}

const CustomSearchBox = ({
  setOpenModal,
}: {
  setOpenModal: () => void,
}) => {
  const { query, refine } = useSearchBox();
  const { results } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const setQuery = (newQuery: string) => {
    setInputValue(newQuery);

    refine(newQuery);
  }
 
  return (
    <>
      <div className="relative h-auto">
        <input
          className="flex w-full bg-black rounded-8 outline-0 border-0 font-light p-10 text-16 indent-8"
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search..."
          spellCheck={false}
          maxLength={300}
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
        />
        <button
          className="absolute color p-2 text-10 text-neutral-400	 font-light top-0 right-10 border border-solid border-neutral-400	 rounded-4 top-1/2 transform -translate-y-1/2 transition hover:opacity-80"
          type="button"
          onClick={() => setOpenModal(false)}
        >Esc</button>
      </div>
      {
        query && !results.hits.length
        && (
          <p className="text-neutral-400 text-16 font-light p-10">No results</p>
        )
      }
    </>
  )
};

type Props = {
  indexName: string;
}

export default ({
  indexName
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const onSearchFocus = () => setOpenModal(true);
  const handleKeyDown = (event) => {
    if (event.key.toLowerCase() === 'escape') {
      setOpenModal(false);
    }
  };

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
                <div className="w-full p-10">
                  <CustomSearchBox
                    setOpenModal={setOpenModal}  
                  />
                </div>
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
