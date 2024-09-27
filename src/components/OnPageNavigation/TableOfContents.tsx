import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { MarkdownHeading } from 'astro';
import { throttle } from 'lodash-es';

type ItemOffsets = {
  id: string;
  topOffset: number;
};

type Props = {
  headings: MarkdownHeading[];
};

const THROTTLE_MS = 100;
const SECTION_OFFSET = 50;

const TableOfContents: FC<Props> = ({ headings = [] }) => {
  const itemOffsets = useRef<ItemOffsets[]>([]);
  const [activeId, setActiveId] = useState<string>('');

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
      const isAtBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= SECTION_OFFSET) {
          currentSectionId = section.id;
        }
      });

      if (!currentSectionId) {
        currentSectionId = sections[0].id;
      }

      if (isAtBottom) {
        currentSectionId = sections[sections.length - 1].id;
      }

      setActiveId(currentSectionId);
    }, THROTTLE_MS);

    window.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('scroll', update);
    };
  }, []);

  const onClickHandler = (activeId: string) => {
    setActiveId(activeId);

    const targetElement = document.getElementById(activeId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      console.log(elementPosition, scrollY);
      const offsetPosition = elementPosition + window.scrollY + 200; // Adjust by 100px
      window.scrollTo({
        top: offsetPosition,
      });
    }
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
              className={`leading-normal ${activeId === heading.slug ? 'font-semibold text-gray-dark-12' : 'opacity-90'}`}
              onClick={() => onClickHandler(heading.slug)}
            >
              <a
                className="font-plex-sans text-13"
                href={`#${heading.slug}`}
                onClick={(e) => e.preventDefault()}
              >
                {heading.text}
              </a>
            </li>
          ) : (
            <li key={`${heading.depth}-${heading.slug}`}>
              <ul>
                <li
                  key={heading.slug}
                  className={`pl-6 leading-normal ${activeId === heading.slug ? 'font-semibold text-gray-dark-12' : 'opacity-90'}`}
                  onClick={() => onClickHandler(heading.slug)}
                >
                  <a
                    className="font-plex-sans text-13 leading-normal"
                    href={`#${heading.slug}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    - {heading.text}
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
