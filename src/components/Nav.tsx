import '@styles/nav.css';
import Link, { Target } from '@components/Link';
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { up } from "@utils/screens";

import Container from "@components/Container";
import NavItemWithSubMenu from "@components/NavItemWithSubMenu";
import Text from "@components/Text";
import ButtonRainbowOutlined from "@components/ButtonRainbowOutlined";
import { isActivePath } from '@utils/url';

type NavItemSimple = {
  label: string | JSX.Element;
  url: string;
  openInNewTab?: boolean;
  children?: never;
};

export type NavItemWithChildren = {
  label: string | JSX.Element;
  url?: never;
  openInNewTab?: boolean;
  pathname?: string;
  children: Array<{
    label: string | JSX.Element;
    url: string;
    openInNewTab?: boolean;
  }>;
};

type NavItem = NavItemSimple | NavItemWithChildren;

type Nav = Array<NavItem>;

const NAV: Nav = [
  {
    label: "Product",
    children: [
      {
        label: "Hosting",
        url: "/hosting",
      },
      {
        label: "Storage",
        url: "/storage",
      },
      {
        label: "Domains",
        url: "/domains",
      },
      {
        label: "Gateways",
        url: "/gateways",
      },
      {
        label: (
          <span className="flex items-center gap-4">
            <span className="flex-shrink-0">Fleek Network</span>
            <img src="/svg/external-link-icon-alt.svg" />
          </span>
        ),
        url: "https://fleek.network",
        openInNewTab: true,
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        label: "Github",
        url: "https://github.com/fleekxyz",
      },
      {
        label: "Knowledge Base",
        url: "https://support.fleek.xyz/",
      },
      {
        label: "Templates",
        url: "https://app.fleek.xyz/templates/",
      },
    ],
  },
  {
    label: "Blog",
    url: "/blog",
  },
  {
    label: "Docs",
    url: "/docs",
  },
  {
    label: "Pricing",
    url: "/pricing",
  },
];

type Props = {
  pathname: string;
}

const NavSubMenu: React.FC<Props> = () => {
  return (
    <div className="nav-sub-menu-container">
      <div className="nav-sub-menu-wrap">
        <div className="nav-sub-menu-main-col">
          <div className="nav-sub-menu-nav-cols">
            <div className="nav-sub-menu-nav-col">
              <div className="nav-sub-menu-nav-col-title">Features</div>
              <ul className="nav-sub-menu-nav-col-list">
                <li>
                  <a href="/hosting">Hosting</a>
                </li>
                <li>
                  <a href="/storage">Storage</a>
                </li>
                <li>
                  <a href="/hosting">Domains</a>
                </li>
                <li>
                  <a href="/hosting">Gateways</a>
                </li>
              </ul>
            </div>
            <div className="nav-sub-menu-nav-col">
              <div className="nav-sub-menu-nav-col-title">Features</div>
              <ul className="nav-sub-menu-nav-col-list">
                <li>
                  <a href="TODO:github">GitHub</a>
                </li>
                <li>
                  <a href="TODO:templates">Templates</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-sub-menu-cta-items">
            <div className="nav-sub-menu-cta-items-col">
              <a href="" className="nav-sub-menu-cta">
                <span>Comparison</span>
              </a>
            </div>
            <div className="nav-sub-menu-cta-items-col">
              <a href="" className="nav-sub-menu-cta">
                <span>Support</span>
              </a>
            </div>
          </div>
        </div>
        <div className="nav-sub-menu-side-container">
          <div className="nav-sub-menu-nav-col">
            <div className="nav-sub-menu-nav-col-title">Protocols</div>
            <ul className="nav-sub-menu-nav-col-list">
              <li>
                <a href="TODO:FN">Fleek Network</a>
              </li>
              <li>
                <a href="TODO:AR">Arweave</a>
              </li>
              <li>
                <a href="TODO:IPFS">IPFS</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Nav: React.FC<Props> = ({ pathname }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const isLg = useMediaQuery(up("lg"));

  useEffect(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, [pathname]);

  useEffect(() => {
    if (isLg) {
      setIsOpen(false);
    }
  }, [isLg]);

  const navChildren = () =>
    selectedItem !== null ? NAV[selectedItem].children : null;

 return (
    <Container>
      <div className="nav-container">
        <Link href="/" className="pb-8">
          <img src="/svg/fleek-logo.svg" alt="fleek logo" />
        </Link>
        <nav className="hidden items-center pl-32 leading-10 gap-40 lg:flex">
          {NAV.map((navItem, index) =>
            navItem.children ? (
              <div className="nav-link py-20 nav-drop-down-container relative group">
                <Text style="nav-m" className="nav-text-item">
                  {navItem.label}
                </Text>
                <NavSubMenu />
              </div>
            ) : (
              <div className="nav-link py-20">
                <Link
                 href={navItem.url}
                 target={navItem.openInNewTab ? Target.Blank : Target.Self}
                 key={navItem.url}
                 className={isActivePath({ pathname, lookup: navItem.url }) ? 'font-bold' : 'nav-text-item'}
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
        <div className="nav-menu-nav">
          <nav>
            <div
              className={clsx("flex flex-col items-center gap-16", {
                "mb-24": selectedItem !== null,
              })}
            >
              {NAV.map((navItem, index) => (
                <div
                 key={index}
                 onClick={() =>
                    (!navItem.children || selectedItem) === index
                      ? setSelectedItem(null)
                      : setSelectedItem(index)
                 }
                 className={`${clsx({
                    "nav-menu-item-selected": selectedItem !== null && selectedItem === index,
                 })} nav-menu-item`}
                >
                 {navItem.children ? (
                    <Text style="nav-m">
                      {navItem.label}
                      {navItem.children && (
                        <span className="ml-4 inline-block w-8">
                          {selectedItem === index ? "-" : "+"}
                        </span>
                      )}
                    </Text>
                 ) : (
                    <Link
                      href={navItem.url}
                      target={navItem.openInNewTab ? Target.Blank : Target.Self }
                      key={navItem.url}
                    >
                      <Text style="nav-m">{navItem.label}</Text>
                    </Link>
                 )}
                </div>
              ))}
            </div>
            {navChildren() && (
              <div className="nav-menu-item-children">
                {navChildren()?.map((item, index) => (
                 <div
                    className="nav-menu-item-children-link"
                    key={index}
                 >
                    <Link
                      href={item.url}
                      target={item.openInNewTab ? Target.Blank : Target.Self}
                    >
                      {item.label}
                    </Link>
                 </div>
                ))}
              </div>
            )}
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
