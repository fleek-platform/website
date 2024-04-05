import { useState } from "react";
import type { FC } from "react";
import type { GenerateSidebarResponse } from "@utils/generateSidebarDS";

interface Props {
  data: GenerateSidebarResponse;
}

const DEFAULT = "";

const SidebarMenu: FC<Props> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string>(DEFAULT);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? DEFAULT : category);
  };

  const handleNestedClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <ul className="flex flex-col gap-6">
      {data.map((menuItem, index) => (
        <li
          key={index}
          className="cursor-pointer"
          onClick={() => handleCategoryClick(menuItem.category)}
        >
          <div className="font-plex-sans text-16 font-light">
            {menuItem.category !== "root" && menuItem.list.length > 0
              ? menuItem.title
              : (
                <a href={`docs/${menuItem.slug}`}>{menuItem.title}</a>
              )}
          </div>

          {menuItem.category !== "root" && menuItem.list.length > 0 && (
            <ul
              className={`${activeCategory === menuItem.category ? "block" : "hidden"} space-y-1 ml-4`}
            >
              {menuItem.list.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="font-plex-sans text-16 font-light"
                  onClick={handleNestedClick}
                >
                  <a href={`docs/${menuItem.category}/${item.slug}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SidebarMenu;
