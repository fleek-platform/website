import type React from 'react';
import { navbarMenu, type NavMenuItem, type NavSubMenuItem } from './config';
import Link, { Target } from '@components/Link';
import { useCallback, useState } from 'react';
import { FaArrowRight, FaDiscord, FaXmark, FaXTwitter } from 'react-icons/fa6';
import { cn } from '@utils/cn';
import { RxHamburgerMenu } from 'react-icons/rx';
import { isActivePath } from '@utils/url';
import { Button } from '../Button/Button';

const NavbarMobileItem: React.FC<NavMenuItem> = ({
  label,
  subMenu,
  url,
  openInNewTab,
}) => {
  if (!subMenu)
    return (
      <Link
        href={url}
        target={openInNewTab ? Target.Blank : Target.Self}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className="text-16 font-semibold text-gray-dark-12"
      >
        {label}
      </Link>
    );

  return (
    <div className="flex flex-col gap-8">
      <span className="text-16 font-semibold text-gray-dark-12">{label}</span>
      <div className="grid gap-8">
        {subMenu.map((subMenuItem) => (
          <Link
            href={subMenuItem.url}
            key={subMenuItem.label}
            target={subMenuItem.openInNewTab ? Target.Blank : Target.Self}
            rel={subMenuItem.openInNewTab ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-8 rounded-8 border-t border-gray-dark-4 bg-gradient-to-br from-gray-dark-3 via-gray-dark-2 to-gray-dark-2 p-12 shadow-soft active:bg-gray-dark-3"
          >
            <img src={subMenuItem.icon} width={14} className="opacity-50" />
            <span className="text-gray-dark-12">{subMenuItem.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const NavbarMobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <RxHamburgerMenu
        className="size-20 cursor-pointer text-gray-dark-11"
        onClick={toggle}
      />
      {isOpen && (
        <section className="fixed inset-0 flex animate-fade-in flex-col overflow-auto bg-gray-dark-1/90 px-[37px] pb-60 text-gray-dark-11 backdrop-blur-lg">
          <div className="sticky top-0 z-10 -mx-[37px] flex items-center justify-between bg-gray-dark-1/80 px-[37px] py-30 backdrop-blur-xl">
            <img src="/svg/fleek-logo.svg" width={66} alt="fleek logo" />
            <FaXmark className="size-20 cursor-pointer" onClick={toggle} />
          </div>
          <div className="flex flex-col gap-24 pb-80">
            {navbarMenu.map((navbarItem) => (
              <NavbarMobileItem key={navbarItem.label} {...navbarItem} />
            ))}
          </div>
          <div className="flex items-center gap-32 text-white *:size-24">
            <FaDiscord />
            <FaXTwitter />
          </div>
        </section>
      )}
    </>
  );
};

type PopoverDimensions = {
  left: number;
  height: number | string;
};

type OnMouseEnterSubMenuProps = PopoverDimensions & {
  idx: number;
};

const NavbarSubMenuItem: React.FC<NavSubMenuItem> = ({
  url,
  icon,
  label,
  description,
  openInNewTab,
}) => {
  return (
    <Link
      tabIndex={0}
      href={url}
      className="group flex items-center gap-16 rounded-6 border-t border-t-transparent from-gray-dark-4 to-gray-dark-3 p-16  outline-none ring-0 hover:border-t-gray-dark-5 hover:bg-gradient-to-br hover:shadow-soft focus-visible:border-t-gray-dark-5 focus-visible:bg-gradient-to-br focus-visible:shadow-soft"
      target={openInNewTab ? Target.Blank : Target.Self}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      <div className="flex size-18 items-center justify-center">
        <FaArrowRight className="absolute size-14 -translate-x-5 text-gray-dark-11 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
        <img
          src={icon}
          width={18}
          className="absolute translate-x-0 transition-all group-hover:translate-x-5 group-hover:opacity-0 group-focus-visible:translate-x-5 group-focus-visible:opacity-0"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-14 font-semibold text-gray-dark-12">{label}</span>
        <span className="text-14 text-gray-dark-11 group-hover:text-gray-dark-12 group-focus-visible:text-gray-dark-12">
          {description}
        </span>
      </div>
    </Link>
  );
};

type NavbarItemProps = NavMenuItem & {
  idx: number;
  pathname: string;
  hovering: number | null;
  popoverDimensions: PopoverDimensions | null;
  onMouseEnterSubMenu: ({
    idx,
    left,
    height,
  }: OnMouseEnterSubMenuProps) => void;
  removeHovering: () => void;
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  idx,
  pathname,
  subMenu,
  url,
  label,
  hovering,
  popoverDimensions,
  onMouseEnterSubMenu,
  removeHovering,
}) => {
  const isActivePage = isActivePath({ lookup: url || '', pathname });

  if (!subMenu)
    return (
      <Link
        href={url}
        className={cn(
          'flex h-48 cursor-pointer items-center outline-none ring-0 transition-colors hover:text-white focus-visible:bg-gray-dark-3 focus-visible:text-white md:px-14 lg:px-18',
          { 'text-white': isActivePage },
        )}
        onFocus={removeHovering}
        onMouseEnter={removeHovering}
      >
        {label}
      </Link>
    );

  const isActiveSubMenu = hovering === idx + 1;

  return (
    <>
      <section
        tabIndex={0}
        className={cn(
          'relative flex h-48 cursor-pointer items-center outline-none ring-0 transition-colors hover:text-white focus-visible:bg-gray-dark-3 focus-visible:text-white md:px-14 lg:px-18',
          {
            'text-white': isActiveSubMenu,
          },
        )}
        onFocus={(e) =>
          onMouseEnterSubMenu({
            idx,
            left: e.currentTarget.offsetLeft,
            height: 'auto',
          })
        }
        onMouseEnter={(e) =>
          onMouseEnterSubMenu({
            idx,
            left: e.currentTarget.offsetLeft,
            height: 'auto',
          })
        }
      >
        {label}
      </section>
      <section
        style={{
          left: popoverDimensions?.left,
          height: popoverDimensions?.height,
        }}
        className="absolute top-46 grid min-w-256 transition-all"
      >
        {isActiveSubMenu && (
          <div className="rounded-8 border border-gray-dark-4 bg-gray-dark-2/80 p-6 backdrop-blur-md">
            {subMenu.map((item, idx) => (
              <NavbarSubMenuItem key={idx} {...item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

type NavbarProps = {
  pathname: string;
};

export const Navbar: React.FC<NavbarProps> = ({ pathname }) => {
  const [hovering, setHovering] = useState<number | null>(null);
  const [popoverDimensions, setPopoverDimensions] =
    useState<PopoverDimensions | null>(null);

  const onMouseEnterSubMenu = useCallback(
    ({ idx, left, height }: OnMouseEnterSubMenuProps) => {
      setHovering(idx + 1);
      setPopoverDimensions({ left, height });
    },
    [],
  );

  return (
    <nav
      onMouseLeave={() => setHovering(null)}
      className="relative z-10 flex h-50 items-center justify-between rounded-12 border border-gray-dark-3 bg-gray-dark-1 pr-12 font-plex-sans text-14 font-medium text-gray-dark-11"
    >
      <Link
        tabIndex={0}
        href="/"
        className="flex h-48 items-center rounded-l-12 px-12 outline-none ring-0 focus-visible:bg-gray-dark-3"
        onFocus={() => setHovering(null)}
        onMouseEnter={() => setHovering(null)}
      >
        <img src="/svg/fleek-logo.svg" width={66} alt="fleek logo" />
      </Link>
      <section className="hidden md:block">
        <div className="flex items-center">
          {navbarMenu.map((navbarItem, idx) => (
            <NavbarItem
              idx={idx}
              key={navbarItem.label}
              pathname={pathname}
              hovering={hovering}
              popoverDimensions={popoverDimensions}
              onMouseEnterSubMenu={onMouseEnterSubMenu}
              removeHovering={() => setHovering(null)}
              {...navbarItem}
            />
          ))}
        </div>
      </section>
      <section className="flex items-center gap-8">
        <Button variant="secondary" size="sm">
          Log in
        </Button>
        <Button variant="tertiary" size="sm">
          Sign up
        </Button>
        <div className="md:hidden">
          <NavbarMobile />
        </div>
      </section>
    </nav>
  );
};
