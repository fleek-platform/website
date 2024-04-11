import type { FC } from "react";
import { ROOT_FALLBACK_CATEGORY, type GenerateSidebarResponse } from "@utils/generateSidebarDS";

interface Props {
  data: GenerateSidebarResponse;
  pathname: string;
}

const SidebarMenu: FC<Props> = ({ data, pathname }) => {
  const splitted = pathname.split('/').filter(Boolean);
  const activeCategory = splitted.length > 2 ? splitted[1] : ROOT_FALLBACK_CATEGORY;
  const activeSlug = splitted.length > 2 ? splitted[2] : splitted[1];
  const isHome = (activeSlug: string) => !activeSlug ? 'font-bold' : '';

  const isActiveCategory = (category: string) => category === activeCategory;
  const isActiveSlug = (slug: string) => slug === activeSlug ? 'font-bold' : '';

  return (
    <ul>
      <li className="text-16 font-plex-sans capitalize">
        <a href="/docs" className={`${isHome(activeSlug)}`}>
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
                  className={`block rounded-lg py-2 text-16 font-plex-sans capitalize hover hover ${isActiveSlug(item.slug)}`}
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
                    <span className="text-16 font-plex-sans capitalize">{item.title}</span>

                    <span className="shrink-0 transition duration-300 group-open:rotate-90">
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

                  <ul className="mt-2 space-y-1">
                    {
                      item.list.map((sItem, idx) => (
                        <li key={`${idx}-${item.slug}`}>
                          <a
                            href={`/docs/${item.category}/${sItem.slug}`}
                            className={`block rounded-lg py-2 text-16 font-plex-sans hover hover ${isActiveCategory(item.category) && isActiveSlug(sItem.slug)}`}
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
