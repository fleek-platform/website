import Container from '@components/Container';
import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

const SupportFormMenu: React.FC = () => {
  return (
    <div className="container relative">
      <Container>
        <nav className="md:static md:w-auto">
          <SupportFormMenuMobile />
          <SupportFormMenuDesktop />
        </nav>
      </Container>
    </div>
  );
};

function SupportFormMenuDesktop() {
  return (
    <ul
      className={`hidden border-b-2 border-gray-700 px-[40px] md:flex md:items-center`}
    >
      <li
        className={`mb-[1rem] cursor-pointer px-[10px] py-[4px] text-[1.4rem] font-semibold hover:text-gray-600   xl:my-[1.5rem]`}
      >
        <a href="/support/troubleshooting">Troubleshooting</a>
      </li>
      <li
        className={`mb-[1rem] cursor-pointer px-[10px] py-[4px] text-[1.4rem] font-semibold  hover:text-gray-600  xl:my-[1.5rem]`}
      >
        <a href="/guides">Guides</a>
      </li>
      <li
        className={`mb-[1rem] cursor-pointer px-[10px] py-[4px] text-[1.4rem] font-semibold hover:text-gray-600  xl:my-[1.5rem]`}
      >
        <a href="/support/billing">Billing</a>
      </li>
    </ul>
  );
}

function SupportFormMenuMobile() {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <li className={`cursor-pointer p-4 text-[1.3rem]  hover:text-gray-700`}>
          <a href="/support/troubleshooting">Troubleshooting</a>
        </li>
        <li className={`cursor-pointer p-4 text-[1.3rem]  hover:text-gray-700`}>
          <a href="/guides">Guides</a>
        </li>
        <li className={`cursor-pointer p-4  text-[1.3rem] hover:text-gray-700`}>
          <a href="/support/billing">Billing</a>
        </li>
      </ul>
    </>
  );
}

export default SupportFormMenu;
