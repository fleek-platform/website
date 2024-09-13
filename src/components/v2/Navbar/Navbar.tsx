import type React from 'react';
import {
  navbarMenu,
  type MenuSettingsItem,
  type NavSubMenuItem,
} from './config';
import Link, { Target } from '@components/Link';
import { useRef, useState } from 'react';
import { FaArrowRight, FaDiscord, FaXmark, FaXTwitter } from 'react-icons/fa6';
import { cn } from '@utils/cn';
import { RxHamburgerMenu } from 'react-icons/rx';

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
      tabIndex={0}
      href={url}
      className="group flex items-center gap-16 rounded-6 border-t border-t-transparent from-gray-dark-4 to-gray-dark-3 p-16 outline-none ring-0 hover:border-t-gray-dark-5 hover:bg-gradient-to-br hover:shadow-soft focus:ring-2"
      onMouseEnter={() => {
        setHoveringSubMenuItem(true);
      }}
      onMouseLeave={() => {
        setHoveringSubMenuItem(false);
      }}
      target={openInNewTab ? Target.Blank : Target.Self}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      <div className="flex size-18 items-center justify-center">
        <FaArrowRight
          className={cn(
            'absolute size-14 -translate-x-5 text-gray-dark-11 opacity-0 transition-all',
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
        <span className="text-14 font-semibold text-gray-dark-12">{label}</span>
        <span className="text-14 text-gray-dark-11 group-hover:text-gray-dark-12">
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

  const subMenuItems = navbarMenu[hovering - 1].subMenu;

  if (!subMenuItems) return null;

  return (
    <section
      onMouseLeave={onMouseLeave}
      style={{
        left: popoverDimensions?.left,
        height: popoverDimensions?.height,
      }}
      className="absolute top-46 grid min-w-256 animate-fade-in-down rounded-8 border border-gray-dark-4 bg-gray-dark-2/80 p-6 backdrop-blur-md transition-all"
    >
      {subMenuItems.map((subMenuItem, idx) => (
        <NavbarSubMenuItem key={idx} {...subMenuItem} />
      ))}
    </section>
  );
};

const NavbarMobileItem: React.FC<MenuSettingsItem> = ({
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
            className="flex items-center gap-8 rounded-8 bg-gray-dark-2 p-12 active:bg-gray-dark-3"
          >
            <img src={subMenuItem.icon} width={14} />
            {subMenuItem.label}
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
      <RxHamburgerMenu className="size-20 text-gray-dark-11" onClick={toggle} />
      {isOpen && (
        <section className="fixed inset-0 flex animate-fade-in flex-col overflow-auto bg-gray-dark-1 px-[37px] pb-60 text-gray-dark-11">
          <div className="sticky top-0 -mx-[37px] flex items-center justify-between bg-gray-dark-1/70 px-[37px] py-30 backdrop-blur-xl">
            <img src="/svg/fleek-logo.svg" width={66} alt="fleek logo" />
            <FaXmark onClick={toggle} className="size-20" />
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

type NavbarProps = {
  pathname: string;
};

export const Navbar: React.FC<NavbarProps> = ({ pathname }) => {
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
      className="relative z-10 flex h-50 items-center justify-between rounded-12 border border-gray-dark-3 bg-gray-dark-1 px-12 font-plex-sans text-14 font-medium text-gray-dark-11"
    >
      <img src="/svg/fleek-logo.svg" width={66} alt="fleek logo" />
      <section className="hidden md:block">
        <div className="flex items-center">
          {navbarMenu.map((navbarItem, idx) => (
            <Link
              tabIndex={0}
              key={navbarItem.label}
              href={navbarItem.url}
              className={cn(
                'flex h-48 cursor-pointer items-center outline-none ring-0 transition-colors hover:text-white focus-visible:bg-gray-dark-2 focus-visible:text-white md:px-14 lg:px-18',
                {
                  'text-white': hovering === idx + 1,
                },
              )}
              onFocus={(e) =>
                navbarItem.subMenu
                  ? handleSubMenuHover({
                      idx,
                      left: e.currentTarget.offsetLeft,
                      height: 'auto',
                    })
                  : setHovering(null)
              }
              onMouseEnter={(e) =>
                navbarItem.subMenu
                  ? handleSubMenuHover({
                      idx,
                      left: e.currentTarget.offsetLeft,
                      height: 'auto',
                    })
                  : setHovering(null)
              }
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setHovering(null);
                }
              }}
            >
              {navbarItem.label}
            </Link>
          ))}
          <NavbarSubMenu
            hovering={hovering}
            popoverDimensions={popoverDimensions}
            onMouseLeave={() => setHovering(null)}
          />
        </div>
      </section>
      <div className="flex items-center gap-8">
        <button className="h-32 rounded-8 bg-gray-dark-3 px-8 text-gray-dark-11">
          Log in
        </button>
        <button className="h-32 rounded-8 bg-white px-8 text-gray-dark-1">
          Sign up
        </button>
        <section className="md:hidden">
          <NavbarMobile />
        </section>
      </div>
    </nav>
  );
};
