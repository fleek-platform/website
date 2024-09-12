import type React from 'react';
import { navbarMenu, type NavSubMenuItem } from './config';
import Link, { Target } from '@components/Link';
import { useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { cn } from '@utils/cn';

type PopoverDimensions = {
  left: number;
  height: number | string;
};

type HandlerHoverProps = PopoverDimensions & {
  idx: number;
};

const NavbarSubMenuItem: React.FC<NavSubMenuItem> = ({
  url,
  icon,
  label,
  description,
  openInNewTab,
}) => {
  const [hoveringSubMenuItem, setHoveringSubMenuItem] = useState(false);

  return (
    <Link
      href={url}
      className="group flex items-center gap-16 rounded-8 from-gray-dark-12/40 via-gray-dark-12/70 to-gray-dark-11/40 p-16 hover:bg-gradient-to-br"
      onMouseEnter={() => setHoveringSubMenuItem(true)}
      onMouseLeave={() => setHoveringSubMenuItem(false)}
      target={openInNewTab ? Target.Blank : Target.Self}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      <div className="flex size-18 items-center justify-center">
        <FaArrowRight
          className={cn(
            'absolute size-14 -translate-x-5 text-gray-dark-8 opacity-0 transition-all',
            {
              'translate-x-0 opacity-100': hoveringSubMenuItem,
            },
          )}
        />
        <img
          src={icon}
          width={18}
          className={cn('absolute translate-x-0 transition-all', {
            'translate-x-5 opacity-0': hoveringSubMenuItem,
          })}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-14 font-semibold text-gray-dark-2 group-hover:text-gray-dark-1">
          {label}
        </span>
        <span className="text-14 text-gray-dark-8 group-hover:text-gray-dark-6">
          {description}
        </span>
      </div>
    </Link>
  );
};

type NavbarSubMenuProps = {
  hovering: number | null;
  popoverDimensions: PopoverDimensions | null;
  onMouseLeave: () => void;
};

const NavbarSubMenu: React.FC<NavbarSubMenuProps> = ({
  hovering,
  popoverDimensions,
  onMouseLeave,
}) => {
  if (typeof hovering !== 'number') return null;

  const subMenuItem = navbarMenu[hovering - 1].subMenu;

  if (!subMenuItem) return null;

  return (
    <section
      onMouseLeave={onMouseLeave}
      style={{
        left: popoverDimensions?.left,
        height: popoverDimensions?.height,
      }}
      className="absolute top-46 grid min-w-240 animate-fade-in-down rounded-8 bg-white p-6 text-gray-dark-1 transition-all"
    >
      {subMenuItem.map((subMenuItem, idx) => (
        <NavbarSubMenuItem
          key={idx}
          url={subMenuItem.url}
          icon={subMenuItem.icon}
          label={subMenuItem.label}
          description={subMenuItem.description}
          openInNewTab={subMenuItem.openInNewTab}
        />
      ))}
    </section>
  );
};

export const Navbar: React.FC = () => {
  const [hovering, setHovering] = useState<number | null>(null);
  const [popoverDimensions, setPopoverDimensions] =
    useState<PopoverDimensions | null>(null);

  const menuItemsRef = useRef<(HTMLElement | null)[]>([]);

  const handleSubMenuHover = ({ idx, left, height }: HandlerHoverProps) => {
    setHovering(idx + 1);
    setPopoverDimensions({ left, height });
  };

  return (
    <nav
      onMouseLeave={() => setHovering(null)}
      className="relative z-10 flex items-center justify-between rounded-12 border border-gray-dark-3 bg-gray-dark-1 px-12 font-plex-sans text-14 font-medium text-gray-dark-11"
    >
      <img src="/svg/fleek-logo.svg" width={66} alt="fleek logo" />
      <div className="flex items-center">
        {navbarMenu.map((navbarItem, idx) => (
          <Link
            tabIndex={0}
            key={navbarItem.label}
            href={navbarItem.url}
            className="flex h-48 cursor-pointer items-center px-18 transition-colors hover:text-white"
            onMouseEnter={(e) =>
              navbarItem.subMenu
                ? handleSubMenuHover({
                    idx,
                    left: e.currentTarget.offsetLeft,
                    height: 'auto',
                  })
                : setHovering(null)
            }
          >
            {navbarItem.label}
          </Link>
        ))}
      </div>
      <NavbarSubMenu
        hovering={hovering}
        popoverDimensions={popoverDimensions}
        onMouseLeave={() => setHovering(null)}
      />
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
