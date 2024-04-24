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
    <div className="group-hover:block dropdown-menu absolute hidden h-auto ease absolute top-full hidden w-[45vw] min-w-[600px] gap-40 border-1 border-white bg-black">
      <div className="flex w-full">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-50 p-36">
            <div>
              <div className="text-12 pb-30 font-sans uppercase text-gray-600 dark:text-gray-500 typography text-caption-01 font-sans">Features</div>
              <ul className="flex flex-col gap-16 text-body-sm">
                <li>
                  <a className="text-16" href="/hosting">Hosting</a>
                </li>
                <li>
                  <a className="text-16" href="/storage">Storage</a>
                </li>
                <li>
                  <a className="text-16" href="/hosting">Domains</a>
                </li>
                <li>
                  <a className="text-16" href="/hosting">Gateways</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-12 pb-30 font-sans uppercase text-gray-600 dark:text-gray-500 typography text-caption-01 font-sans">Resources</div>
              <ul className="flex flex-col gap-20 text-body-sm">
                <li>
                  <a className="text-16" href="TODO:GITHUB_URL">GitHub</a>
                </li>
                <li>
                  <a className="text-16" href="TODO:TEMPLATES">Templates</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-36 pt-18 grid grid-cols-2 gap-50">
            <div>
              <a href="" className="inline-block w-auto col-span-auto group relative z-[1] cursor-pointer items-center justify-between overflow-hidden font-sans text-16 p-12 gap-15 bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:active:text-gray-100 rounded-2">
                <span className="text-16 relative z-[1] inline-block transition-transform">Comparison</span>
              </a>
            </div>
            <div>
              <a href="" className="inline-block w-auto col-span-auto group relative z-[1] cursor-pointer items-center justify-between overflow-hidden font-sans text-16 p-12 bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:active:text-gray-100 rounded-2">
                <span className="text-16 relative z-[1] inline-block transition-transform">Support</span>
              </a>
            </div>
          </div>
        </div>
        <div className="w-1/3 border-l-1 p-36 border-gray-300 bg-ui-fleek-black">
            <div>
              <div className="text-12 pb-30 font-sans uppercase text-gray-600 dark:text-gray-500 typography text-caption-01 font-sans">Protocols</div>
              <ul className="flex flex-col gap-20 text-body-sm">
                <li>
                  <a className="text-16" href="TODO:GITHUB_URL">Fleek Network</a>
                </li>
                <li>
                  <a className="text-16" href="TODO:TEMPLATES">Arweave</a>
                </li>
                <li>
                  <a className="text-16" href="TODO:TEMPLATES">IPFS</a>
                </li>
              </ul>
            </div>
        </div>
      </div>
      <div className="fixed w-100vw h-100vh z-0 bg-yellow opacity-05"></div>
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
