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
    label: "Features",
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
      <div className="relative z-10 mb-16 flex select-none items-center gap-33 py-16 pl-16 lg:px-28">
        <Link href="/" className="pb-8">
          <img src="/svg/fleek-logo.svg" alt="fleek logo" />
        </Link>
        <nav className="hidden items-center pl-32 leading-10 gap-40 lg:flex">
          {NAV.map((navItem, index) =>
            navItem.children ? (
              <div className="transition hover:opacity-80">
                <NavItemWithSubMenu {...navItem} key={index} pathname={pathname} />
              </div>
            ) : (
              <div className="transition hover:opacity-80">
                <Link
                  href={navItem.url}
                  target={navItem.openInNewTab ? Target.Blank : Target.Self}
                  key={navItem.url}
                  className={isActivePath({ pathname, lookup: navItem.url }) ? 'font-bold' : ''}
                >
                  <Text style="nav-m">{navItem.label}</Text>
                </Link>
              </div>
            )
          )}
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto w-42 px-16 font-plex-sans text-25 leading-[150%] text-ui-white lg:hidden"
        >
          +
        </button>
        <div className="ml-auto hidden lg:block">
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
          "fixed left-0 top-0 z-20 flex h-full w-full flex-col bg-ui-fleek-black pb-50 transition duration-300",
          {
            "pointer-events-none opacity-0": !isOpen,
            "pointer-events-auto opacity-100": isOpen,
          }
        )}
      >
        <div className="flex py-8 pl-24">
          <img src="/svg/fleek-logo.svg" alt="fleek logo" />
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto mr-8 w-42 px-16 font-plex-sans text-25 leading-[150%] text-ui-white"
          >
            -
          </button>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center">
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
                    hidden: selectedItem !== null && selectedItem === index,
                  })} hover:opacity-80`}
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
              <div className="flex flex-col items-center gap-16 rounded-12 bg-fleek-gradient p-12">
                {navChildren()?.map((item, index) => (
                  <div
                    className="font-plex-sans text-13 font-medium leading-[150%]"
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
        <div className="mx-auto">
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
