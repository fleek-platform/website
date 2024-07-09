import '@styles/search.css';
import { useEffect, useState, useRef } from 'react';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import {
  InstantSearch,
  Hits,
  Configure,
  useSearchBox,
  useInstantSearch,
} from 'react-instantsearch';

import type { Hit as AlgoliaHit } from 'instantsearch.js';
import type { Dispatch, SetStateAction } from 'react';
import {
  onSearchBtnEnterDefaultCallback,
  onSearchBtnLeaveDefaultCallback,
} from '@utils/search';

const MagnifyingGlassSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const { apiKey, host } = (() => {
  const apiKey = import.meta.env.PUBLIC_MEILISEARCH_DOCUMENTS_CLIENT_API_KEY;
  const host = import.meta.env.PUBLIC_MEILISEARCH_HOST;

  if (!apiKey || !host) {
    throw Error(
      `👹 Oops! Missing environment variables (host ${host}, apiKey ${apiKey})`,
    );
  }

  return {
    apiKey,
    host,
  };
})();

const { searchClient } = instantMeiliSearch(host, apiKey);

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

export const Hit = ({ hit }: HitProps) => {
  const { results } = useInstantSearch();

  const { value } = hit._highlightResult?.content as { value: string };

  const parser = new DOMParser();
  const doc = parser.parseFromString(value, 'text/html');
  const data = doc.body.textContent || '';

  const text = stripHtmlAndEntities(data);

  return (
    <a key={hit.id} href={hit.url}>
      <div className="result-item-box">
        <span className="font-semi-bold block pb-10">★ {hit.title}</span>
        <span>{results.query && <span>{text}</span>}</span>
      </div>
    </a>
  );
};

function stripHtmlAndEntities(htmlString: string) {
  const strippedOfTags = htmlString.replace(/<[^>]*>/g, '');
  const decodedString = strippedOfTags.replace(
    /&([a-z]+);/g,
    (match, entity) => {
      switch (entity) {
        case 'lt':
          return '<';
        case 'gt':
          return '>';
        case 'amp':
          return '&';
        case 'quot':
          return '"';
        case 'apos':
          return "'";
        default:
          return match;
      }
    },
  );

  return decodedString;
}

const CustomSearchBox = ({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { query, refine } = useSearchBox();
  const { results } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const setQuery = (newQuery: string) => {
    setInputValue(newQuery);

    refine(newQuery);
  };

  return (
    <>
      <div className="search-box">
        <input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search"
          spellCheck={false}
          maxLength={300}
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
        />
        <button type="button" onClick={() => setOpenModal(false)}>
          Esc
        </button>
      </div>
      {query && !results.hits.length && (
        <p className="modal-no-result">No results</p>
      )}
    </>
  );
};

type Props = {
  indexName: string;
  onEnter?: () => void;
  onLeave?: () => void;
};

export default ({
  indexName,
  // Warn: Astro components are built server side, thus can’t pass
  // client side functions as a prop inside of a ".astro" files
  // we'd have to pass the function inside of a react component
  // so we pass defaults functions to at least be the closest to
  // separation of concerns
  onEnter = onSearchBtnEnterDefaultCallback,
  onLeave = onSearchBtnLeaveDefaultCallback,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onSearchFocus = () => setOpenModal(true);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'escape') {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (openModal && typeof onEnter === 'function') {
      onEnter();
    }

    if (!openModal && typeof onLeave === 'function') {
      onLeave();
    }
  }, [openModal]);

  return (
    <div className="search-btn">
      <div className="input-container desktop" onClick={onSearchFocus}>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          readOnly={true}
        />
        <div className="icon-container">
          <MagnifyingGlassSVG />
        </div>
      </div>
      <div className="mobile" onClick={onSearchFocus}>
        <div className="icon-container">
          <MagnifyingGlassSVG />
        </div>
      </div>
      {openModal && (
        <div className="modal-open" onClick={() => setOpenModal(false)}>
          <div
            className="modal-user-box"
            onClick={(e: any) => e.stopPropagation()}
          >
            <InstantSearch
              indexName={indexName}
              searchClient={searchClient}
              insights={false}
            >
              <Configure
                hitsPerPage={12}
                attributesToSnippet={['content:32']}
              />
              <div className="modal-custom-search-container">
                <CustomSearchBox setOpenModal={setOpenModal} />
              </div>
              <div className="modal-hits-container">
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
          </div>
        </div>
      )}
    </div>
  );
};
