"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Text from "@components/Text";
import useClickOutside from "@hooks/useClickOutside";
import type { NavItemWithChildren } from "@components/Nav";

const NavItemWithSubMenu: React.FC<NavItemWithChildren> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative px-20" ref={wrapperRef}>
      <div onClick={handleClick} className="cursor-pointer">
        <Text style="nav-m">
          {props.label}
          <span className="ml-4 inline-block w-8">{isOpen ? "-" : "+"}</span>
        </Text>
      </div>
      <div
        className={clsx(
          "pointer-events-none absolute right-0 top-full pt-24 opacity-0 transition-opacity",
          {
            "pointer-events-auto opacity-100": isOpen,
          }
        )}
      >
        <ul className="flex flex-col gap-8 rounded-12 bg-ui-fleek-black p-12">
          {props.children.map((item) => (
            <li key={item.url} className="flex items-start">
              <Link href={item.url} target={item.openInNewTab ? "_blank" : ""}>
                <Text style="caption-text" className="whitespace-nowrap lg:text-14">
                  {item.label}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavItemWithSubMenu;
