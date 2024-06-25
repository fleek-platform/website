import Container from '@components/Container';
import React, { useCallback, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import settings from '@base/settings.json';
import clsx from 'clsx';
import { pathContains } from '@utils/url';

const supportMenu = settings.support.supportMenu;

type SupportMenuProps = {
  pathname: string;
};

const SupportMenu: React.FC<SupportMenuProps> = ({ pathname }) => {
  return (
    <div className="container relative mb-[3.5rem] xl:mb-[5rem]">
      <Container>
        <nav className="md:static md:w-auto">
          <SupportMenuMobile pathname={pathname} />
          <SupportMenuDesktop pathname={pathname} />
        </nav>
      </Container>
    </div>
  );
};

function SupportMenuDesktop({ pathname }: SupportMenuProps) {
  return (
    <ul
      className={`hidden border-b-2 border-gray-700 pl-16 md:flex md:items-center lg:px-28`}
    >
      {supportMenu.map((item) => (
        <li
          key={item.id}
          className={clsx(
            'mb-[1rem] cursor-pointer px-[10px] py-[4px] text-[1.5rem] font-semibold hover:opacity-50 xl:my-[1.5rem] xl:text-[1.6rem]',
            {
              'opacity-50': pathContains(item.path, pathname),
            },
          )}
        >
          <a href={item.path}>{item.pathname}</a>
        </li>
      ))}
    </ul>
  );
}

function SupportMenuMobile({ pathname }: SupportMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="flex w-full items-center justify-between px-[20px] md:hidden">
        <p className="my-[.6rem] text-[1.3rem] font-semibold">Categories</p>
        <div>
          <button
            className="block p-4 text-gray-400 hover:text-gray-700 md:hidden"
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
          'flex flex-col border-b-2 border-gray-700 px-[20px]',
          { 'h-[10px] overflow-y-scroll': !isExpanded },
          'md:hidden',
        )}
      >
        {supportMenu.map((item) => (
          <li
            key={item.id}
            className={clsx(
              'cursor-pointer p-4 text-[1.3rem] hover:opacity-50',
              {
                'opacity-50': pathContains(item.path, pathname),
              },
            )}
          >
            <a href={item.path}>{item.pathname}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SupportMenu;
