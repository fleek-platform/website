import type React from 'react';
import { navbarMenu } from './config';
import Link from '@components/Link';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between rounded-12 border border-gray-dark-3 bg-gray-dark-1 px-12 py-8 font-plex-sans text-14 font-medium text-gray-dark-11">
      <img src="/svg/fleek-logo.svg" width={66} alt="fleek logo" />
      <div className="flex items-center gap-36">
        {navbarMenu.map((navbarItem) => (
          <Link
            key={navbarItem.label}
            href={navbarItem.url}
            className="cursor-pointer hover:text-gray-dark-12"
          >
            {navbarItem.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-8">
        <button className="h-32 rounded-8 bg-gray-dark-3 px-8 text-gray-dark-11">
          Log in
        </button>
        <button className="h-32 rounded-8 bg-white px-8 text-gray-dark-1">
          Sign up
        </button>
      </div>
    </nav>
  );
};
