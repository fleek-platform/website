import './component.css';
import Link, { Target } from '@components/Link';
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { up } from "@utils/screens";

import Container from "@components/Container";
import Text from "@components/Text";
import ButtonRainbowOutlined from "@components/ButtonRainbowOutlined";
import { isActivePath } from '@utils/url';

import NAV from './config';

export type NavProps = Record<'pathname', string>;
export type NavSubMenuCtaProps = Omit<MenuSettingsItem, 'subMenu'>;
export type NavSubMenuNavColProps = {
  label: string;
  items: NavSubMenuNavColItem[];
};
export type NavSubMenuNavColItem = Omit<MenuSettingsItem, 'subMenu'>;
export type NavSubMenuProps = {
  main: {
    label: string;
    items: NavSubMenuNavColItem[];
  }[];
  side?: {
    label: string;
    items: NavSubMenuNavColItem[];
  };
  ctas?: NavSubMenuCtaProps[];
};
export type MenuSettingsItem = {
  label: string;
  subMenu?: NavSubMenuProps;
  url?: string;
  openInNewTab?: boolean;
};

const NavSubMenuNavCol = ({
  label,
  items,
}: NavSubMenuNavColProps) => {
  return (
    <div className="nav-sub-menu-nav-col">
      <div className="nav-sub-menu-nav-col-title">{label}</div>
      <ul className="nav-sub-menu-nav-col-list">
        {
          items.map(({ label, url, openInNewTab }, index) => (
              <li key={`${index}-${label}`} className="">
                <Link
                 href={url}
                 target={openInNewTab ? Target.Blank : Target.Self}
                >
                 <Text style="nav-item" className="nav-text-item">{label}</Text>
                </Link>
              </li>
            )
          )
        }
      </ul>
    </div>
  );
};

const NavSubMenuCta = ({
  label,
  url,
}: NavSubMenuCtaProps) => (
  <a href={url} className="nav-sub-menu-cta">
    <span>{label}</span>
  </a>
);

const NavSubMenu = ({
  main,
  side,
  ctas,
}: NavSubMenuProps) => {
  return (
    <div className={`nav-sub-menu-container ${!side || main.length < 2 ? 'minimal' : ''}`}>
      <div className="nav-sub-menu-wrap">
        <div className="nav-sub-menu-main-col">
          <div className={`nav-sub-menu-nav-cols ${!side || main.length < 2 ? 'hidden': ''}`}>
            {
              main.map(({ label, items }, index) => (
                  <NavSubMenuNavCol
                    key={`${index}-${label}`}
                    label={label}
                    items={items}
                  />
                )
              )
            }
          </div>
          <div className={`nav-sub-menu-cta-items ${!ctas ? 'hidden' : ''}`}>
            {
              ctas?.map(({ label, url }, index) => (
                  <div
                    key={`${index}-${label}`}
                    className="nav-sub-menu-cta-items-col"
                  >
                    <NavSubMenuCta
                      label={label}
                      url={url}
                    />
                  </div>
                )
              )
            }
          </div>
        </div>
        <div className={`nav-sub-menu-side-container ${!side ? 'hidden' : ''}`}>
          {
            side && (
              <NavSubMenuNavCol
                label={side.label}
                items={side.items}
              />
            ) || ''
          }
        </div>
      </div>
    </div>
  );
};

const Nav = ({ pathname }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isLg = useMediaQuery(up("lg"));

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
        <Link href="/" className="pb-8">
          <img src="/svg/fleek-logo.svg" alt="fleek logo" />
        </Link>
        <nav>
          {NAV.map((navItem, index) =>
            navItem.subMenu ? (
              <div key={index} className="nav-link nav-drop-down-container group">
                <Link
                 href={navItem.url || ''}
                 target={navItem.openInNewTab ? Target.Blank : Target.Self}
                 key={navItem.url}
                 className={isActivePath({ pathname, lookup: navItem.url || ''}) ? 'font-bold' : 'nav-text-item'}
                >
                 <Text style="nav-m" className="nav-text-item">{navItem.label}</Text>
                </Link>
                <NavSubMenu
                  main={navItem.subMenu.main}
                  side={navItem.subMenu.side}
                  ctas={navItem.subMenu.ctas}
                />
              </div>
            ) : (
              <div key={index} className="nav-link py-20">
                <Link
                 href={navItem.url || ''}
                 target={navItem.openInNewTab ? Target.Blank : Target.Self}
                 key={navItem.url}
                 className={isActivePath({ pathname, lookup: navItem.url || ''}) ? 'font-bold' : 'nav-text-item'}
                >
                 <Text style="nav-m">{navItem.label}</Text>
                </Link>
              </div>
            )
          )}
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="nav-button"
        >
          +
        </button>
        <div className="nav-button-launch">
          <a
            href="https://app.fleek.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonRainbowOutlined>Launch App</ButtonRainbowOutlined>
          </a>
        </div>
      </div>
      <div
        className={clsx(
          "nav-menu",
          {
            "nav-menu-open": isOpen,
            "nav-menu-closed": !isOpen,
          }
        )}
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
            <div
              className={clsx("flex flex-col items-center gap-16 mb-24")}
            >
              {NAV.map((navItem, index) => (
                <div
                 key={index}
                 className="nav-menu-item group"
                >
                 {navItem.subMenu ? (
                   <>
                    <Text style="nav-m">
                      {navItem.label}
                      {navItem.subMenu && (
                        <span className="ml-4 inline-block w-8">
                          +
                        </span>
                      )}
                    </Text>
                    {
                      navItem.subMenu?.main.map(({ label, items }, index) => (
                        <div className="nav-menu-mobile-sub-menu-container">
                          <Text
                            className="nav-menu-mobile-sub-menu-label"
                            style="nav-m"
                          >
                            {label}
                          </Text>
                          <ul className="nav-menu-mobile-sub-menu">{
                              items
                                .map(({
                                  label,
                                  url,
                                  openInNewTab
                                  }, index) => (
                                    <li key={index}>
                                      <Link
                                        href={url || ''}
                                        target={
                                          openInNewTab
                                          ? Target.Blank
                                          : Target.Self
                                        }
                                      >
                                        <Text
                                          style="nav-item"
                                        >
                                          {label}
                                        </Text>
                                      </Link>
                                    </li>
                                  )
                              )
                            }
                          </ul>
                        </div>
                        )
                      )
                    }
                  </>
                 ) : (
                    <Link
                      href={navItem.url || ''}
                      target={navItem.openInNewTab ? Target.Blank : Target.Self }
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
      </div>
    </Container>
 );
};

export default Nav;
