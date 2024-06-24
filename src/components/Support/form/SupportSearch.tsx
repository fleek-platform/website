import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IoIosSearch } from 'react-icons/io';

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

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const MultiSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const performSearch = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const response = await fetch(`http://${host}/multi-search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            queries: [
              {
                indexUid: 'fleekxyz_website_docs',
                q: query,
                limit: 5,
              },
              {
                indexUid: 'fleekxyz_website_troubleshooting',
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
        const data = await response.json();
        const combinedHits = data?.results?.flatMap(
          (result: Result) => result.hits,
        );
        setResults(combinedHits);
      } catch (error) {
        console.error('Error performing search:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query, performSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <div className=" mx-auto mb-[4rem]  mt-[1rem] w-[90%] rounded-[8px] border-white/30 bg-[#FFFFFF]/10 px-[1.3rem] py-[1rem] focus-within:border-[.1px] focus-within:bg-[#FFFFFF]/25 hover:border-[.1px] hover:bg-[#FFFFFF]/25 md:w-[50%] xl:w-[40%] xl:px-[1.5rem] xl:py-[1.25rem]">
        <div className="flex items-center gap-[1rem] ">
          <div>
            <IoIosSearch className="focus:text-blue-600" fontSize={27} />
          </div>
          <form
            className="w-full  text-[#9BA1A6]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-full border-none bg-transparent text-[1.5rem] outline-none placeholder:text-[#ECEDEE] focus:placeholder:text-[#9BA1A6] xl:text-[2rem]"
              type="search"
              aria-label="Search"
              value={query}
              onChange={handleInputChange}
              placeholder="Search..."
            />
          </form>
        </div>
      </div>

      <div>
        {loading && (
          <div className="rounded-md absolute left-[50%] top-[100%] z-20  max-h-[250px]  w-[90%]   -translate-x-[50%] overflow-scroll  bg-[#111111] text-[1.3rem] md:w-[50%] md:text-[1.5rem] xl:w-[40%]">
            Loading...
          </div>
        )}
        {results?.length >= 1 && isOpen && !loading && (
          <div ref={dropdownRef}>
            <ul className="rounded-md absolute left-[50%] top-[100%] z-20  max-h-[250px]  w-[90%]   -translate-x-[50%] overflow-scroll  bg-[#111111] text-[1.3rem] md:w-[50%] md:text-[1.5rem] xl:w-[40%]">
              {results?.map((hit) => (
                <li
                  className="cursor-pointer px-[1.4rem] py-[.5rem] hover:bg-gray-700"
                  key={hit.url}
                >
                  <a href={hit.url}>{hit.title}</a>
                  <p className="px-[1.4rem] py-[.5rem] text-[1.3rem] text-gray-500">
                    {hit.desc}
                  </p>
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
