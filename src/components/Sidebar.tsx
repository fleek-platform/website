import type { FC } from 'react';
import {
  ROOT_FALLBACK_CATEGORY,
  type GenerateSidebarResponse,
} from '@utils/generateSidebarDS';
import { generateSlug } from '@utils/url';
import clsx from 'clsx';

interface Props {
  data: GenerateSidebarResponse;
  pathname: string;
}

const findBase = (splitted: string[]) => {
  if (splitted[0] === '/docs') return ROOT_FALLBACK_CATEGORY;

  if (splitted.length === 1) {
    return 'docs';
  }

  return splitted[1];
};

const SidebarMenu: FC<Props> = ({ data, pathname }) => {
  const splitted = pathname.split('/').filter(Boolean);
  const activeCategory = splitted.length > 2 ? splitted[1] : findBase(splitted);
  const activeSlug =
    splitted.length > 2
      ? splitted[2]
      : splitted.length === 2
        ? splitted[1]
        : splitted[0];
  const isHome = activeSlug === 'docs';
  const isActiveCategory = (category: string) => category === activeCategory;
  const isActiveSlug = (slug: string) => slug === activeSlug;
  const activeItemStyle = 'font-bold !opacity-100';

  return (
    <ul className="mb-80">
      <li className="">
        <a
          href="/docs"
          className={clsx(
            `font-plex-sans text-16 capitalize leading-loose opacity-80 transition duration-150 hover:opacity-100`,
            isHome && activeItemStyle,
          )}
        >
          Home
        </a>
      </li>

      {data.map((item, idx) => {
        if (item.category === ROOT_FALLBACK_CATEGORY) {
          return (
            <li key={`${idx}-${item.slug}`}>
              <a
                href={`/docs/${item.slug}`}
                className={`rounded-lg block w-full py-2 font-plex-sans text-16 capitalize leading-loose text-ui-light-grey opacity-80 transition duration-150 hover:opacity-100 ${isActiveSlug(item.slug) ? activeItemStyle : ''}`}
              >
                {item.title}
              </a>
            </li>
          );
        }

        if (item.category !== ROOT_FALLBACK_CATEGORY) {
          return (
            <li key={`${idx}-${item.slug}`}>
              <details
                className="group [&_summary::-webkit-details-marker]:hidden"
                open={item.category === activeCategory}
              >
                <summary className="rounded-lg hover hover flex cursor-pointer items-center justify-between py-2">
                  <a
                    className={`inline-block w-full font-plex-sans text-16 capitalize leading-loose text-ui-light-grey transition duration-150 hover:opacity-100 ${isActiveSlug(item.slug) && isActiveCategory(item.category) ? activeItemStyle : 'opacity-80'}`}
                    href={`/docs/${item.slug}`}
                  >
                    <span data-menu-item={`${generateSlug(item.slug)}`}>{item.title}</span>
                  </a>

                  <span className="shrink-0 opacity-60 transition duration-300 hover:opacity-100 group-open:rotate-90 group-open:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      fill="none"
                    >
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 border-l border-ui-dark-grey pl-20">
                  {item.list.map((sItem, idx) => (
                    <li key={`${idx}-${item.slug}`}>
                      <a
                        href={`/docs/${item.category}/${!sItem.index ? sItem.slug : ''}`}
                        className={`rounded-lg inline-block w-full py-2 font-plex-sans text-16 leading-loose transition duration-150 hover:opacity-100 ${isActiveCategory(item.category) && isActiveSlug(sItem.slug) ? 'font-bold opacity-100' : 'opacity-80'}`}
                      >
                        <span data-menu-item={`${generateSlug(sItem.title)}`}>{sItem.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default SidebarMenu;
