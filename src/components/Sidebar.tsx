import { useState, useEffect, useMemo } from 'react';
import {
  ROOT_FALLBACK_CATEGORY,
  type GenerateSidebarResponse,
} from '@utils/generateSidebarDS';
import { generateSlug } from '@utils/url';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { down } from '@utils/screens';
import { useScrollToActiveItem } from '@hooks/useScrollToActiveItem';
import { cn } from '@utils/cn';
import { FaHouse } from 'react-icons/fa6';
import SearchBtn from './SearchBtn';
import { Button } from '@components/Button';
import { TabbedButtons } from '@components/TabbedButtons';
import { isClient } from '@utils/common';

interface Props {
  data: GenerateSidebarResponse;
  pathname: string;
  indexNameDocs: string;
}

const findBase = (splitted: string[]) => {
  if (splitted[0] === '/docs') return ROOT_FALLBACK_CATEGORY;

  if (splitted.length === 1) {
    return 'docs';
  }

  return splitted[1];
};

const SidebarMenu: React.FC<Props> = ({ data, pathname, indexNameDocs }) => {
  const [currentView, setCurrentView] = useState<'ai-agents' | 'hosting'>(
    () => {
      if (pathname === '/docs/' || pathname.includes('/docs/ai-agents/')) {
        return 'ai-agents';
      }
      return 'hosting';
    },
  );

  useEffect(() => {
    if (isClient) {
      const handlePopState = () => {
        const currentPath = window.location.pathname;
        if (
          currentPath === '/docs/' ||
          currentPath.includes('/docs/ai-agents/')
        ) {
          setCurrentView('ai-agents');
        } else {
          setCurrentView('hosting');
        }
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (currentView === 'ai-agents') {
        return item.category === 'ai-agents';
      }
      return item.category !== 'ai-agents';
    });
  }, [data, currentView]);

  const splitted = pathname.split('/').filter(Boolean);
  const activeCategory = splitted.length > 2 ? splitted[1] : findBase(splitted);
  const activeSlug =
    splitted.length > 2
      ? splitted[2]
      : splitted.length === 2
        ? splitted[1]
        : splitted[0];
  const { containerRef: scrollableContainerRef, itemRef: activeItemRef } =
    useScrollToActiveItem(activeCategory, activeSlug);
  const isHome = activeSlug === 'docs';
  const isActiveCategory = (category: string) => category === activeCategory;
  const isActiveSlug = (slug: string) => slug === activeSlug;
  let isOpen = true;
  const isMd = useMediaQuery(down('md'));

  return (
    <div
      className="relative shrink-0 overflow-y-auto md:sticky md:top-[92px] md:max-h-[calc(100vh-96px)] md:w-232 md:pr-12"
      ref={scrollableContainerRef}
    >
      <div className="sticky top-0 z-10 w-full">
        <SearchBtn indexName={indexNameDocs} />
        <div className="absolute h-24 w-full bg-gradient-to-b from-black to-transparent" />
        <div className="fixed bottom-0 h-24 w-[233px] bg-gradient-to-t from-black to-transparent" />
      </div>
      <ul className="flex flex-col gap-20 px-8 pb-8 pt-24 font-plex-sans text-14 text-gray-dark-11 md:pb-64">
        <li>
          <a
            ref={isHome ? activeItemRef : null}
            href="/docs/"
            className={cn(
              'group flex items-center gap-8 font-semibold hover:text-gray-dark-12',
              {
                'text-gray-dark-12': isHome,
              },
            )}
          >
            <div
              className={cn(
                'flex size-20 items-center justify-center rounded-4 bg-gray-dark-3 group-hover:bg-gray-dark-4',
                {
                  'bg-yellow-dark-11 group-hover:bg-yellow-dark-11': isHome,
                },
              )}
            >
              <FaHouse
                className={cn('size-12 text-gray-dark-11', {
                  'text-gray-dark-1': isHome,
                })}
              />
            </div>
            Getting started
          </a>
        </li>

        <div className="mb-4 flex gap-4">
          <TabbedButtons
            buttons={[
              <Button
                key="ai-agents"
                variant={
                  currentView === 'ai-agents'
                    ? 'primary-ghost'
                    : 'secondary-ghost'
                }
                size="sm"
                onClick={() => {
                  setCurrentView('ai-agents');
                }}
              >
                AI Agents
              </Button>,
              <Button
                key="hosting"
                variant={
                  currentView === 'hosting'
                    ? 'primary-ghost'
                    : 'secondary-ghost'
                }
                size="sm"
                onClick={() => {
                  setCurrentView('hosting');
                }}
              >
                Hosting
              </Button>,
            ]}
          />
        </div>

        {filteredData.map(
          (item: GenerateSidebarResponse[number], idx: number) => {
            if (item.category === ROOT_FALLBACK_CATEGORY) {
              return (
                <li key={`${idx}-${item.slug}`}>
                  <a
                    ref={isActiveSlug(item.slug) ? activeItemRef : null}
                    href={`/docs/${item.slug}`}
                    className={cn(
                      'font-semibold text-gray-dark-11 hover:text-gray-dark-12',
                      {
                        'text-gray-dark-12': isActiveSlug(item.slug),
                      },
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              );
            }

            // Render flat list for AI Agents view
            if (currentView === 'ai-agents') {
              return (
                <div className="flex flex-col border-l border-gray-dark-4">
                  {item.list.map(
                    (
                      sItem: GenerateSidebarResponse[number]['list'][number],
                      idx: number,
                    ) => (
                      <a
                        key={`${idx}-${sItem.slug}`}
                        ref={
                          isActiveCategory(item.category) &&
                          isActiveSlug(sItem.slug)
                            ? activeItemRef
                            : null
                        }
                        href={`/docs/${item.category}/${!sItem.index ? sItem.slug : ''}`}
                        className={cn(
                          'w-full border-gray-dark-10 py-4 pl-16 text-gray-dark-11 hover:-ml-[1px] hover:border-l hover:text-gray-dark-12',
                          {
                            '-ml-[1px] border-l border-yellow-dark-11 text-16 font-semibold text-gray-dark-12':
                              isActiveCategory(item.category) &&
                              isActiveSlug(sItem.slug),
                          },
                        )}
                      >
                        <span data-menu-item={`${generateSlug(sItem.title)}`}>
                          {sItem.title}
                        </span>
                      </a>
                    ),
                  )}
                </div>
              );
            }

            // Keep collapsible for other views
            if (item.category !== ROOT_FALLBACK_CATEGORY) {
              isOpen = isMd ? item.category === activeCategory : true;

              return (
                <li key={`${idx}-${item.slug}`}>
                  <details
                    className="group [&_summary::-webkit-details-marker]:hidden"
                    open={isOpen}
                  >
                    <summary className="rounded-lg hover hover flex cursor-pointer items-center justify-between py-2">
                      <a
                        ref={
                          isActiveSlug(item.slug) &&
                          isActiveCategory(item.category)
                            ? activeItemRef
                            : null
                        }
                        className="font-semibold capitalize text-gray-dark-11"
                        href={`/docs/${item.slug}`}
                      >
                        <span data-menu-item={`${generateSlug(item.slug)}`}>
                          {item.title}
                        </span>
                      </a>

                      <span className="shrink-0 text-gray-dark-6 opacity-60 transition duration-300 hover:opacity-100 group-open:rotate-90 group-open:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="none"
                        >
                          <title>Toggle visibility</title>
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="flex flex-col border-l border-gray-dark-4">
                      {item.list.map(
                        (
                          sItem: GenerateSidebarResponse[number]['list'][number],
                          idx: number,
                        ) => (
                          <a
                            key={`${idx}-${sItem.slug}`}
                            ref={
                              isActiveCategory(item.category) &&
                              isActiveSlug(sItem.slug)
                                ? activeItemRef
                                : null
                            }
                            href={`/docs/${item.category}/${!sItem.index ? sItem.slug : ''}`}
                            className={cn(
                              'w-full border-gray-dark-10 py-4 pl-16 text-gray-dark-11 hover:-ml-[1px] hover:border-l hover:text-gray-dark-12',
                              {
                                '-ml-[1px] border-l border-yellow-dark-11 text-16 font-semibold text-gray-dark-12':
                                  isActiveCategory(item.category) &&
                                  isActiveSlug(sItem.slug),
                              },
                            )}
                          >
                            <span
                              data-menu-item={`${generateSlug(sItem.title)}`}
                            >
                              {sItem.title}
                            </span>
                          </a>
                        ),
                      )}
                    </div>
                  </details>
                </li>
              );
            }
          },
        )}
      </ul>
    </div>
  );
};

export default SidebarMenu;
