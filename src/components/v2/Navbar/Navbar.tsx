import type React from 'react';
import { navbarMenu } from './config';
import Link from '@components/Link';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between">
      <p>Fleek</p>
      <div>
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
