import type { FC } from "react";
import { ROOT_FALLBACK_CATEGORY, type GenerateSidebarResponse } from "@utils/generateSidebarDS";

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
}

const SidebarMenu: FC<Props> = ({ data, pathname }) => {
  const splitted = pathname.split('/').filter(Boolean);
  const activeCategory = splitted.length > 2 ? splitted[1] : findBase(splitted);
  const activeSlug = splitted.length > 2 ? splitted[2] : splitted[1];
  const isHome = (activeSlug: string) => !activeSlug ? 'font-bold' : '';

  const isActiveCategory = (category: string) => category === activeCategory;
  const isActiveSlug = (slug: string) => slug === activeSlug;

  return (
    <ul>
      <li className="text-16 font-plex-sans capitalize">
        <a href="/docs" className={`leading-loose ${isHome(activeSlug)}`}>
          Home
        </a>
      </li>

      {
        data.map((item, idx) => {
          if (item.category === ROOT_FALLBACK_CATEGORY) {
            return (
              <li key={`${idx}-${item.slug}`}>
                <a
                  href={`/docs/${item.slug}`}
                  className={`leading-loose block rounded-lg py-2 text-16 font-plex-sans capitalize w-full ${isActiveSlug(item.slug) ? 'font-bold' : ''}`}
                >
                  {item.title}
                </a>
              </li>
            );
          }

          if (item.category !== ROOT_FALLBACK_CATEGORY) {
            return (
              <li key={`${idx}-${item.slug}`}>
                <details className="group [&_summary::-webkit-details-marker]:hidden" open={item.category === activeCategory}>
                  <summary
                    className="flex cursor-pointer items-center justify-between rounded-lg py-2 hover hover"
                  >
                    <a className={`leading-loose text-16 font-plex-sans capitalize inline-block w-full duration-150 transition hover:opacity-100 ${isActiveSlug(item.slug) && isActiveCategory(item.category) ? 'opacity-100 font-bold' : 'opacity-80'}`} href={`/docs/${item.slug}`}>{item.title}</a>

                    <span className="shrink-0 transition duration-300 opacity-60 hover:opacity-100 group-open:opacity-100 group-open:rotate-90">
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

                  <ul className="mt-2 space-y-1 pl-20 border-l border-ui-dark-grey">
                    {
                      item.list.map((sItem, idx) => (
                        <li key={`${idx}-${item.slug}`}>
                          <a
                            href={`/docs/${item.category}/${sItem.slug}`}
                            className={`leading-loose block rounded-lg py-2 text-16 font-plex-sans inline-block transition duration-150 hover:opacity-100 w-full ${isActiveCategory(item.category) && isActiveSlug(sItem.slug) ? 'opacity-100 font-bold' : 'opacity-80'}`}
                          >
                            {sItem.title}
                          </a>
                        </li>                      
                      ))
                    }
                  </ul>
                </details>
              </li>
            );
          }
        })
      }
    </ul>
  );
};

export default SidebarMenu;
