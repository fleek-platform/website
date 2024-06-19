import Container from '@components/Container';
import React, { useCallback, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { SupportMenuItems } from './config';
import clsx from 'clsx';

type SupportMenuProps = {
  pathName: string;
};

const SupportMenu: React.FC<SupportMenuProps> = ({ pathName }) => {
  return (
    <div className="container relative mb-[3.5rem] xl:mb-[5rem]">
      <Container>
        <nav className="md:static md:w-auto">
          <SupportMenuMobile pathName={pathName} />
          <SupportMenuDesktop pathName={pathName} />
        </nav>
      </Container>
    </div>
  );
};

function SupportMenuDesktop({ pathName }: SupportMenuProps) {
  const getActivePath = useCallback(
    (path: string) => {
      if (
        pathName.includes('?ticket_form_id=phishing-form') &&
        path.includes('?ticket_form_id=phishing-form')
      ) {
        return true;
      }

      return pathName.includes(path);
    },
    [pathName],
  );

  const activePath = useCallback(
    () =>
      SupportMenuItems.reduce((longestPath, item) => {
        if (getActivePath(item.path) && item.path.length > longestPath.length) {
          return item.path;
        }
        return longestPath;
      }, ''),
    [pathName],
  );

  return (
    <ul
      className={`hidden border-b-2 border-gray-700  pl-16 md:flex  md:items-center lg:px-28`}
    >
      {SupportMenuItems.map((item) => (
        <li
          key={item.id}
          className={clsx(
            'mb-[1rem] cursor-pointer px-[10px] py-[4px] text-[1.5rem] font-semibold hover:text-[#2294ff] xl:my-[1.5rem]   xl:text-[1.6rem]',
            {
              'text-[#2294ff]': item.path === activePath(),
            },
          )}
        >
          <a href={item.path}>{item.pathName}</a>
        </li>
      ))}
    </ul>
  );
}

function SupportMenuMobile({ pathName }: SupportMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActivePath = useCallback(
    (path: string) => {
      if (
        pathName.includes('?ticket_form_id=phishing-form') &&
        path.includes('?ticket_form_id=phishing-form')
      ) {
        return true;
      }

      `      console.log(fullPath.startsWith(path));`;
      return pathName.startsWith(path);
    },
    [pathName],
  );

  const activePath = useCallback(
    () =>
      SupportMenuItems.reduce((longestPath, item) => {
        if (getActivePath(item.path) && item.path.length > longestPath.length) {
          return item.path;
        }
        return longestPath;
      }, ''),
    [pathName],
  );

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="flex w-full items-center justify-between px-[20px] md:hidden">
        <p className="my-[.6rem]  text-[1.3rem] font-semibold">Categories</p>
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
        className={`flex flex-col border-b-2 border-gray-700 px-[20px]   ${isExpanded ? '' : 'h-[10px] overflow-y-scroll'} md:hidden`}
      >
        {SupportMenuItems.map((item) => (
          <li
            key={item.id}
            className={clsx(
              'cursor-pointer p-4 text-[1.3rem]  hover:text-[#2294ff]',
              {
                'text-[#2294ff]': item.path === activePath(),
              },
            )}
          >
            <a href={item.path}>{item.pathName}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SupportMenu;
