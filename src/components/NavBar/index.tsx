import './component.css';
import Link, { Target } from '@components/Link';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { up } from '@utils/screens';
import ButtonYellowOutline from '@components/ButtonYellowOutline';
import Container from '@components/Container';
import Text from '@components/Text';
import ButtonRainbowOutlined from '@components/ButtonRainbowOutlined';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord } from 'react-icons/fa';

import { isActivePath } from '@utils/url';

import { NavBarDefault } from './config';

import { RxCaretDown } from 'react-icons/rx';

export type NavProps = Record<'pathname', string>;
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
    <div className={`nav-sub-menu-container `}>
      <div className="nav-sub-menu-wrap">
        <div className="nav-sub-menu-main-col">
          <div className={`nav-sub-menu-nav-cols `}>
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

  const isLg = useMediaQuery(up('lg'));

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isLg) {
      setIsOpen(false);
    }
  }, [isLg]);

  return (
    <Container>
      <div className="nav-container">
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
                      {navItem.label} <RxCaretDown className="mt-3" />
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

        <div className="flex items-center gap-10 ">
          <div className="nav-button-launch hidden pr-10 md:inline-block">
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
          <div className="nav-button-launch hidden pr-10 md:inline-block">
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
              href="https://app.fleek.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonYellowOutline>Log in</ButtonYellowOutline>
            </a>
          </div>
          <div className="nav-button-launch">
            <a
              href="https://app.fleek.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonYellowOutline color="yellow">
                Get started
              </ButtonYellowOutline>
            </a>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="mx-10 font-plex-sans text-28 leading-[150%] text-ui-white xl:hidden"
          >
            +
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
            -
          </button>
        </div>
        <div className="nav-menu-mobile">
          <nav>
            <div className={clsx('mb-24 flex flex-col items-center gap-16')}>
              {NavBarDefault.map((navItem, index) => (
                <div key={index} className="nav-menu-item group">
                  {navItem.subMenu ? (
                    <>
                      <Text style="nav-m">
                        {navItem.label}
                        {navItem.subMenu && (
                          <span className="ml-4 inline-block w-8">+</span>
                        )}
                      </Text>
                      {navItem?.subMenu.map(({ label, url }, index) => (
                        <div
                          key={`${index}-${label}`}
                          className="nav-menu-mobile-sub-menu-container"
                        >
                          <Link
                            href={url}
                            target={
                              navItem.openInNewTab ? Target.Blank : Target.Self
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
                            <Text
                              className="nav-menu-mobile-sub-menu-label"
                              style="nav-m"
                            >
                              {label}
                            </Text>
                          </Link>
                        </div>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={navItem.url || ''}
                      target={navItem.openInNewTab ? Target.Blank : Target.Self}
                      key={navItem.url}
                    >
                      <Text style="nav-m">{navItem.label}</Text>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
        <div className="nav-menu-launch-app">
          <a
            href="https://app.fleek.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonRainbowOutlined>Launch App</ButtonRainbowOutlined>
          </a>
        </div>
        <div className="flex justify-center pt-12">
          <div className="nav-button-launch pr-10 ">
            <a
              href="https://twitter.com/fleek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter fontSize={25} className="text-gray-dark-8" />
            </a>
          </div>
          <div className="nav-button-launch pr-10 ">
            <a
              href="https://discord.gg/fleek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord fontSize={25} className="text-gray-dark-8" />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Nav;
