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

  return (
    <ul className="space-y-2">
      {data.map((menuItem, index) => (
        <li
          key={index}
          className="cursor-pointer"
          onClick={() => handleCategoryClick(menuItem.category)}
        >
          <div className="text-lg font-semibold">{menuItem.list.length > 1 ? menuItem.category : menuItem.list[0]}</div>
          {menuItem.list.length > 1 && (
            <ul
              className={`${activeCategory === menuItem.category ? "block" : "hidden"} space-y-1 ml-4`}
            >
              {menuItem.list.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  {item}
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
