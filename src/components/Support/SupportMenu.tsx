import Container from '@components/Container';
import React, { useCallback, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import settings from '@base/settings.json';
import clsx from 'clsx';
import { pathContains } from '@utils/url';
import { Button } from '@components/Button';

const supportMenu = settings.support.supportMenu;

type SupportMenuProps = {
  currentPagePath: string;
};

const SupportMenu: React.FC<SupportMenuProps> = ({ currentPagePath }) => {
  return (
    <div className="container relative mb-[3.5rem] font-plex-sans xl:mb-[5rem]">
      <nav className="md:static md:w-auto">
        <SupportMenuMobile currentPagePath={currentPagePath} />
        <SupportMenuDesktop currentPagePath={currentPagePath} />
      </nav>
    </div>
  );
};

function SupportMenuDesktop({ currentPagePath }: SupportMenuProps) {
  return (
    <div className="flex items-center gap-40">
      <h1 className="hidden text-24 font-semibold text-white md:block lg:text-27 xl:text-32">
        Support
      </h1>
      <ul className="hidden items-center gap-10 md:flex">
        {supportMenu.map((item) => (
          <Button
            key={item.id}
            href={item.path}
            size="sm"
            variant={
              pathContains(item.path, currentPagePath)
                ? 'app-primary'
                : 'secondary'
            }
          >
            {item.title}
          </Button>
        ))}
      </ul>
    </div>
  );
}

function SupportMenuMobile({ currentPagePath }: SupportMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <>
      <div className="flex w-full items-center justify-between px-[20px] md:hidden">
        <p className="my-[.6rem] text-[1.3rem] font-semibold">Categories</p>
        <div>
          <button
            className="block p-1 text-gray-400 hover:text-gray-700 md:hidden"
            onClick={handleExpandClick}
          >
            {isExpanded ? (
              <MdOutlineKeyboardArrowUp fontSize={20} />
            ) : (
              <MdKeyboardArrowDown fontSize={20} />
            )}
          </button>
        </div>
      </div>
      <ul
        className={clsx(
          'flex flex-col border-b-2 border-gray-dark-6 px-[20px] py-[4px]',
          { 'h-[.4px] overflow-y-hidden': !isExpanded },
          'md:hidden',
        )}
      >
        {supportMenu.map((item) => (
          <a key={item.id} href={item.path}>
            <li
              className={clsx(
                'cursor-pointer p-4 text-[1.3rem] hover:text-yellow-dark-11',
                {
                  'text-yellow-dark-11': pathContains(
                    item.path,
                    currentPagePath,
                  ),
                },
              )}
            >
              {item.title}
            </li>
          </a>
        ))}
      </ul>
    </>
  );
}

export default SupportMenu;
