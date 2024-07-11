import { debounce } from 'lodash-es';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import { removeProtocolFromUrl } from '@utils/url';

interface Hit {
  id: string;
  content: string;
  url: string;
  title: string;
  desc: string;
}

interface Result {
  indexUid: string;
  hits: Hit[];
}

const { authBearer, host } = (() => {
  const host = removeProtocolFromUrl(import.meta.env.PUBLIC_MEILISEARCH_HOST);
  const authBearer = import.meta.env
    .PUBLIC_MEILISEARCH_DOCUMENTS_CLIENT_API_KEY;

  if (!host) {
    throw Error(
      `👹 Oops! Missing environment variable PUBLIC_MEILISEARCH_HOST`,
    );
  }

  if (!authBearer) {
    throw Error(
      `👹 Oops! Missing environment variable PUBLIC_MEILISEARCH_DOCUMENTS_CLIENT_API_KEY`,
    );
  }

  return {
    authBearer,
    host,
  };
})();

const MultiSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const performSearch = debounce(async (query: string) => {
    if (isLocked) return;

    setLoading(true);
    setIsLocked(true);

    try {
      const response = await fetch(`//${host}/multi-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authBearer}`,
        },
        body: JSON.stringify({
          queries: [
            {
              indexUid: 'fleekxyz_website_docs',
              q: query,
              limit: 5,
            },
            {
              indexUid: 'fleekxyz_website_references',
              q: query,
              limit: 5,
            },
            {
              indexUid: 'fleekxyz_website_guides',
              q: query,
              limit: 5,
            },
            {
              indexUid: 'fleekxyz_website_billing',
              q: query,
              limit: 5,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const combinedHits = data?.results?.flatMap(
        (result: Result) => result.hits,
      );
      setResults(combinedHits);
      setIsOpen(true);
    } catch (error) {
      toast.dismiss();
      toast.error(
        'Oops! Your search didn’t come through. Please give it another try! If the issue persists report to us to help us improve!',
      );
    } finally {
      setLoading(false);
      setIsLocked(false);
    }
  }, 1000);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <div className="relative z-[20] mx-auto mb-[4rem] mt-[1rem] w-[90%] rounded-[17.02px] border-[1.52px] border-gray-dark-7 bg-gray-dark-2 px-[1.3rem] py-[1rem] md:w-[50%] xl:w-[40%] xl:px-[1.5rem] xl:py-[1.25rem]">
        <div className="flex items-center gap-[1rem]">
          <div>
            <IoIosSearch
              className="text-gray-dark-9 focus:text-blue-600"
              fontSize={27}
            />
          </div>
          <form
            className="w-full text-gray-dark-13"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-full border-none bg-transparent text-[1.5rem] outline-none placeholder:text-gray-dark-11 focus:placeholder:text-gray-dark-13 xl:text-[2rem]"
              type="text"
              aria-label="Search"
              value={query}
              onChange={handleInputChange}
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
      <div className="absolute left-[50%] top-[80%] z-[10] w-[90%] -translate-x-[50%] md:w-[50%] md:text-[1.5rem] xl:w-[40%]">
        {loading && (
          <div className="rounded-md max-h-[250px] w-[90%] -translate-x-[50%] bg-gray-dark-3 text-[1.3rem] md:w-[50%] md:text-[1.5rem] xl:w-[40%]" />
        )}
        {results?.length > 0 && isOpen && !loading && (
          <div ref={dropdownRef}>
            <ul className="rounded-md z-20 max-h-[250px] overflow-scroll rounded-b-[12px] bg-gray-dark-3 p-[12px] text-[1.3rem] shadow-2xl">
              {results.map((hit) => (
                <li
                  className="cursor-pointer rounded-[10px] p-[1.4rem] hover:bg-gray-dark-2"
                  key={hit.url}
                >
                  <a
                    href={hit.url}
                    className="text-gray-dark-12"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hit.title}
                    <p className="py-[.5rem] text-[1.3rem] text-gray-dark-11">
                      {hit.desc}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSearch;
