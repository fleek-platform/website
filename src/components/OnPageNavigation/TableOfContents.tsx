import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { MarkdownHeading } from 'astro';
import { throttle } from 'lodash-es';
import { cn } from '@utils/cn';
import { FaChevronRight } from 'react-icons/fa6';
import { removeTitleHash } from '@utils/removeTitleHash';

type ItemOffsets = {
  id: string;
  topOffset: number;
};

type Props = {
  headings: MarkdownHeading[];
};

const THROTTLE_MS = 100;
const SECTION_OFFSET = 140;

const TableOfContents: FC<Props> = ({ headings = [] }) => {
  const itemOffsets = useRef<ItemOffsets[]>([]);
  const [activeSectionId, setActiveSectionId] = useState('');
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const doc = document.querySelector('.doc');
    let activeHash = window.location.hash.replace('#', '');

    if (!activeHash && !window.scrollY) {
      const el = doc?.querySelector('h1, h2, h3, h4');

      if (!el) return;

      activeHash = el.id;
    }

    setActiveId(activeHash);
  }, []);

  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');

      itemOffsets.current = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top + window.scrollY,
      }));
    };

    getItemOffsets();
    window.addEventListener('resize', getItemOffsets);

    return () => {
      window.removeEventListener('resize', getItemOffsets);
    };
  }, []);

  useEffect(() => {
    const doc = document.querySelector('.doc');

    if (!doc) return;

    const update = throttle(() => {
      const sections = doc.querySelectorAll('h1, h2, h3, h4');

      if (!sections) return;

      let currentSectionId;
      let currentActiveSectionId = '';
      let lastH2Id = '';

      const isAtBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= SECTION_OFFSET) {
          currentSectionId = section.id;

          // Keep track of the last `h2` heading
          if (section.tagName.toLowerCase() === 'h2') {
            lastH2Id = section.id;
          }

          // If an `h3` or `h4` is active, keep the nearest preceding `h2` active
          if (
            section.tagName.toLowerCase() === 'h3' ||
            section.tagName.toLowerCase() === 'h4'
          ) {
            currentActiveSectionId = lastH2Id;
          } else if (section.tagName.toLowerCase() === 'h2') {
            currentActiveSectionId = section.id;
          }
        }
      });

      if (!currentSectionId) {
        currentSectionId = sections[0].id;
      }

      if (isAtBottom) {
        currentSectionId = sections[sections.length - 1].id;
      }

      setActiveId(currentSectionId);
      setActiveSectionId(currentActiveSectionId);
    }, THROTTLE_MS);

    window.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('scroll', update);
    };
  }, []);

  const onClickHandler = (activeId: string) => {
    setActiveId(activeId);
  };

  return (
    <ul className="flex flex-col gap-4">
      <li className="leading-normal">
        <p className="pb-8 font-sans text-16 font-semibold text-gray-dark-12">
          On this page
        </p>
      </li>
      {headings
        .filter(({ depth }) => depth > 1 && depth < 4)
        .map((heading) =>
          heading.depth == 2 ? (
            <li
              key={heading.slug}
              className={cn(
                'hover-text-gray-dark-12 leading-normal text-gray-dark-11 opacity-90 hover:text-gray-dark-12',
                {
                  'font-medium text-gray-dark-12 opacity-100':
                    activeId === heading.slug ||
                    activeSectionId === heading.slug,
                },
              )}
              onClick={() => onClickHandler(heading.slug)}
            >
              <a className="font-plex-sans text-13" href={`#${heading.slug}`}>
                {removeTitleHash(heading.text)}
              </a>
            </li>
          ) : (
            <li key={`${heading.depth}-${heading.slug}`}>
              <ul>
                <li
                  key={heading.slug}
                  className={cn(
                    'hover-text-gray-dark-12 pl-6 leading-normal text-gray-dark-11 opacity-90 hover:text-gray-dark-12',
                    {
                      'font-medium text-gray-dark-12 opacity-100':
                        activeId === heading.slug,
                    },
                  )}
                  onClick={() => onClickHandler(heading.slug)}
                >
                  <a
                    className="flex items-start gap-8 font-plex-sans text-13 leading-normal"
                    href={`#${heading.slug}`}
                  >
                    <span
                      className={cn('shrink-0 opacity-50', {
                        'text-yellow-dark-11 opacity-100':
                          activeId === heading.slug,
                      })}
                    >
                      •
                    </span>
                    {removeTitleHash(heading.text)}
                  </a>
                </li>
              </ul>
            </li>
          ),
        )}
    </ul>
  );
};

export default TableOfContents;
