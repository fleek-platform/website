import type React from 'react';
import { navbarMenu } from './config';
import Link from '@components/Link';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between rounded-12 border border-gray-dark-3 px-12 py-8 text-14 font-medium text-gray-dark-11">
      <img src="/svg/fleek-logo.svg" width={66} alt="fleek logo" />
      <div className="flex items-center gap-36">
        {navbarMenu.map((navbarItem) => (
          <Link>{navbarItem.label}</Link>
        ))}
      </div>
      <div>
        <button>Log in</button>
        <button>Sign up</button>
      </div>
    </nav>
  );
};
