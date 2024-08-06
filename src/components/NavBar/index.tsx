import './component.css';
import Link, { Target } from '@components/Link';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { up } from '@utils/screens';
import ButtonYellowOutline from '@components/ButtonYellowOutline';
import Container from '@components/Container';
import Text from '@components/Text';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';

import { hasSecondaryMenuItem, isActivePath } from '@utils/url';

import { NavBarDefault } from './config';

import ButtonYellow from '@components/ButtonYellow';
import ButtonGray from '@components/ButtonGray';
import SupportMenu from '@components/Support/SupportMenu';

export type NavProps = { pathname: string };
export type NavSubMenuCtaProps = Omit<MenuSettingsItem, 'subMenu'>;
export type NavSubMenuNavColProps = {
  label: string;
  items: NavSubMenuNavColItem[];
};

export type MenuSettingsItem = {
  label?: string;
  subMenu?: NavSubMenuProps[];
  url?: string;
  description?: string;
  icon?: string;
  openInNewTab?: boolean;
};
export type NavSubMenuNavColItem = Omit<MenuSettingsItem, 'subMenu'>;

export type NavSubMenuProps = {
  label: string;
  url: string;
  description: string;
  icon: string;
  openInNewTab?: boolean;
};

const NavSubMenuNavCol = ({
  label,
  url,
  description,
  icon,
}: NavSubMenuNavColItem) => {
  return (
    <Link href={url}>
      <div className="flex items-center gap-12 rounded-12 p-12 hover:bg-[#111111]">
        <div>
          <img src={icon} />
        </div>
        <div>
          <div className="typo-m-strong text-gray-dark-12">{label}</div>
          <div className="typo-s text-gray-dark-11">{description}</div>
        </div>
      </div>
    </Link>
  );
};

const NavSubMenu = ({ subMenu }: MenuSettingsItem) => {
  return (
    <div className="nav-sub-menu-container">
      <div className="nav-sub-menu-wrap">
        <div className="nav-sub-menu-main-col">
          <div className="nav-sub-menu-nav-cols">
            {subMenu?.map(({ label, url, description, icon }, index) => (
              <NavSubMenuNavCol
                key={`${index}-${label}`}
                label={label}
                url={url}
                description={description}
                icon={icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Nav = ({ pathname }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSecondaryMenu = hasSecondaryMenuItem(pathname);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
  }, [isOpen]);

  const isLg = useMediaQuery(up('lg'));

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isLg) {
      setIsOpen(false);
    }
  }, [isLg]);

  const docsPaths = [
    '/docs',
    '/guides',
    '/references',
    '/templates',
    '/support',
  ];

  return (
    <Container>
      <div className={clsx('nav-container', 'mb-[2px]')}>
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0 ">
            <img
              className="w-full"
              src="/svg/fleek-logo.svg"
              alt="fleek logo"
            />
          </Link>
          <nav className="ml-26 mt-3">
            {NavBarDefault.map((navItem, index) =>
              navItem.subMenu ? (
                <div
                  key={index}
                  className="nav-link nav-drop-down-container group"
                >
                  <Link
                    href={navItem.url}
                    target={navItem.openInNewTab ? Target.Blank : Target.Self}
                    key={navItem.url}
                    className={
                      isActivePath({ pathname, lookup: navItem.url || '' })
                        ? 'font-bold'
                        : 'nav-text-item'
                    }
                  >
                    <Text
                      style="nav-m"
                      className="nav-text-item  flex capitalize "
                    >
                      {navItem.label}
                    </Text>
                  </Link>
                  <NavSubMenu subMenu={navItem.subMenu} />
                </div>
              ) : (
                <div key={index} className="nav-link py-20">
                  <Link
                    href={navItem.url}
                    target={navItem.openInNewTab ? Target.Blank : Target.Self}
                    key={navItem.url}
                    className={
                      isActivePath({ pathname, lookup: navItem.url || '' })
                        ? 'font-bold'
                        : 'nav-text-item'
                    }
                  >
                    <Text style="nav-m" className="capitalize">
                      {navItem.label}
                    </Text>
                  </Link>
                </div>
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center gap-10">
          <div className="nav-button-launch hidden md:inline-block">
            <a
              href="https://twitter.com/fleek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter
                fontSize={25}
                className="text-gray-dark-8 hover:text-yellow"
              />
            </a>
          </div>
          <div className="nav-button-launch hidden md:inline-block">
            <a
              href="https://discord.gg/fleek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord
                fontSize={25}
                className="text-gray-dark-8 hover:text-yellow"
              />
            </a>
          </div>
          <div className="nav-button-launch hidden md:inline-block">
            <a
              href="https://app.fleek.xyz"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <ButtonYellowOutline>Log in</ButtonYellowOutline>
            </a>
          </div>
          <div className="nav-button-launch hidden sm:inline-block">
            <a
              href="https://app.fleek.xyz"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <ButtonYellowOutline color="yellow">
                Get started
              </ButtonYellowOutline>
            </a>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="mr-5 self-stretch font-plex-sans text-28 leading-[150%] text-ui-white xl:hidden"
          >
            <RxHamburgerMenu className="h-full rounded-8 bg-gray-dark-4 p-5 text-32 text-gray-dark-11" />
          </button>
        </div>
      </div>

      <div
        className={clsx('nav-menu', {
          'nav-menu-open': isOpen,
          'nav-menu-closed': !isOpen,
        })}
      >
        <div className="nav-menu-logo">
          <img src="/svg/fleek-logo.svg" alt="fleek logo" />
          <button
            onClick={() => setIsOpen(false)}
            className="nav-menu-close-button"
          >
            <RxCross2 className="h-full rounded-8 bg-gray-dark-4 p-5 text-32 text-gray-dark-11" />
          </button>
        </div>

        <div className="mx-15 flex justify-start gap-16">
          <div className="typo-btn-l">
            <a
              href="https://app.fleek.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <ButtonYellow>Get started</ButtonYellow>
            </a>
          </div>
          <div className="typo-btn-l">
            <a
              href="https://app.fleek.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <ButtonGray>Log in</ButtonGray>
            </a>
          </div>
        </div>
        <div className="nav-menu-mobile pt-10">
          <nav className="w-full border-t border-[#3A3A3A] pt-16">
            <div className={clsx('flex w-full flex-col items-center gap-16')}>
              {NavBarDefault.map((navItem, index) => (
                <div
                  key={index}
                  className={clsx('nav-menu-item group w-full', {
                    'border-b border-[#3A3A3A] pb-6': navItem.subMenu,
                  })}
                >
                  {navItem.subMenu ? (
                    <>
                      <div className="nav-m mx-15 flex justify-between">
                        {navItem.label}
                      </div>
                      <div className="flex flex-wrap px-5 py-10">
                        {navItem?.subMenu.map(({ label, url, icon }, index) => (
                          <div
                            key={`${index}-${label}`}
                            className="nav-menu-mobile-sub-menu-container relative"
                          >
                            <Link
                              href={url}
                              target={
                                navItem.openInNewTab
                                  ? Target.Blank
                                  : Target.Self
                              }
                              key={navItem.url}
                              className={
                                isActivePath({
                                  pathname,
                                  lookup: navItem.url || '',
                                })
                                  ? 'font-bold'
                                  : 'nav-text-item'
                              }
                            >
                              <div className="nav-menu-mobile-sub-menu-label nav-m-mid flex items-start justify-start gap-8 py-8">
                                <img src={icon} className="mt-3 w-20" />
                                <span>{label}</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={navItem.url || ''}
                      target={navItem.openInNewTab ? Target.Blank : Target.Self}
                      key={navItem.url}
                    >
                      <div className="nav-m mx-15">{navItem.label}</div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
        <div className="mx-15 flex justify-start pt-12">
          <div className="nav-button-launch pr-10">
            <a
              href="https://twitter.com/fleek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter
                fontSize={23}
                className="text-gray-dark-8 hover:text-yellow"
              />
            </a>
          </div>
          <div className="nav-button-launch pr-10">
            <a
              href="https://discord.gg/fleek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord
                fontSize={25}
                className="text-gray-dark-8 hover:text-yellow"
              />
            </a>
          </div>
        </div>
      </div>

      {hasSecondaryMenu && <SupportMenu currentPagePath={pathname} />}
    </Container>
  );
};

export default Nav;
