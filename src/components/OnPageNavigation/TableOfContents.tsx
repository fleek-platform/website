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

const THROTTLE_MS = 300;

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
        if (sectionTop <= 0) {
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
  };

  return (
    <>
      <ul>
        <li className="leading-normal">
          <a href="" className="font-plex-sans text-18 font-bold">
            Content
          </a>
        </li>
        {headings
          .filter(({ depth }) => depth > 1 && depth < 4)
          .map((heading) =>
            heading.depth == 2 ? (
              <li
                key={heading.slug}
                className={`leading-normal ${activeId === heading.slug ? 'font-bold' : ''}`}
                onClick={() => onClickHandler(heading.slug)}
              >
                <a className="font-plex-sans text-13" href={`#${heading.slug}`}>
                  {heading.text}
                </a>
              </li>
            ) : (
              <li key={`${heading.depth}-${heading.slug}`}>
                <ul>
                  <li
                    key={heading.slug}
                    className={`leading-normal ${activeId === heading.slug ? 'font-bold' : ''}`}
                    onClick={() => onClickHandler(heading.slug)}
                  >
                    <a
                      className="font-plex-sans text-13 leading-normal"
                      href={`#${heading.slug}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                </ul>
              </li>
            ),
          )}
      </ul>
    </>
  );
};

export default TableOfContents;
