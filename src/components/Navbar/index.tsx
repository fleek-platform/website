import '@fleek-platform/login-button/styles';

import { useEffect } from 'react';
import {
  LoginProvider,
  ProductDropdown,
  setDefined,
} from '@fleek-platform/login-button';
import {
  getAuthenticationMenu,
  navbarMenu,
  type NavMenuItem,
  type NavMenuItemRoot,
} from './config';
import Link, { Target } from '@components/Link';
import { useCallback, useState } from 'react';
import { FaArrowRight, FaDiscord, FaXmark, FaXTwitter } from 'react-icons/fa6';
import { cn } from '@utils/cn';
import { RxHamburgerMenu } from 'react-icons/rx';
import { isActivePath } from '@utils/url';
import { Button } from '../Button';
import type { Project } from '@fleek-platform/sdk/browser';
import { isClient } from '../../utils/common';
import { useSession } from '@hooks/useSession';
import { isReferralName } from '@utils/referrals';

// Override login-button defaults
setDefined({
  PUBLIC_APP_HOSTING_URL: import.meta.env.PUBLIC_APP_HOSTING_URL,
  PUBLIC_APP_AGENTS_URL: import.meta.env.PUBLIC_APP_AGENTS_URL,
});

const agentsUrl = import.meta.env.PUBLIC_APP_AGENTS_URL;

const onAuthenticationSuccess = () => {
  if (!isClient || isReferralName('agents')) return;

  const currentParams = new URLSearchParams(window.location.search);

  const targetUrl = new URL(agentsUrl);

  currentParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  window.location.assign(targetUrl.toString());
};

const NavbarMobileItem: React.FC<NavMenuItemRoot> = (props) => {
  const { label, openInNewTab } = props;

  if (!('subMenu' in props))
    return (
      <Link
        href={props.url}
        target={openInNewTab ? Target.Blank : Target.Self}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className="text-16 font-semibold text-gray-dark-12"
      >
        {label}
      </Link>
    );

  const getIconComp = (subMenuItem: NavMenuItem) => {
    if (!subMenuItem.icon) return null;
    if (typeof subMenuItem.icon === 'string') {
      return (
        <img
          src={subMenuItem.icon}
          width={14}
          className="opacity-50"
          alt={subMenuItem.description}
        />
      );
    }
    const Icon = subMenuItem.icon;
    return <Icon className="size-16 opacity-50" />;
  };

  return (
    <div className="flex flex-col gap-8">
      <span className="text-16 font-semibold text-gray-dark-12">{label}</span>
      <div className="grid gap-8">
        {props.subMenu.map((subMenuItem) =>
          subMenuItem.url ? (
            <Link
              href={subMenuItem.url}
              key={subMenuItem.label}
              target={subMenuItem.openInNewTab ? Target.Blank : Target.Self}
              rel={subMenuItem.openInNewTab ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-8 rounded-8 border-t border-gray-dark-4 bg-gradient-to-br from-gray-dark-3 via-gray-dark-2 to-gray-dark-2 p-12 shadow-soft active:bg-gray-dark-3"
            >
              {getIconComp(subMenuItem)}
              <span className="text-gray-dark-12">{subMenuItem.label}</span>
            </Link>
          ) : (
            <button
              type="button"
              key={subMenuItem.label}
              className="flex items-center gap-8 rounded-8 border-t border-gray-dark-4 bg-gradient-to-br from-gray-dark-3 via-gray-dark-2 to-gray-dark-2 p-12 shadow-soft active:bg-gray-dark-3"
              onClick={subMenuItem.action}
            >
              {getIconComp(subMenuItem)}
              <span className="text-gray-dark-12">{subMenuItem.label}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
};

const NavbarMobileItems: React.FC<{}> = () => {
  const { isLoggedIn, handleLoginClick } = useSession();

  if (!isClient) {
    const authenticationMenu = getAuthenticationMenu(
      isLoggedIn,
      false,
      false,
      handleLoginClick,
      () => null,
    );

    return (
      <>
        {[authenticationMenu, ...navbarMenu].map((navbarItem) => (
          <NavbarMobileItem key={navbarItem.label} {...navbarItem} />
        ))}
      </>
    );
  }

  return (
    <>
      <LoginProvider
        graphqlApiUrl={import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}
        dynamicEnvironmentId={import.meta.env.PUBLIC_DYNAMIC_ENVIRONMENT_ID}
        onAuthenticationSuccess={onAuthenticationSuccess}
      >
        {(props) => {
          const { isLoading, error, login, logout } = props;

          const authenticationMenu = getAuthenticationMenu(
            isLoggedIn,
            isLoading,
            !!error,
            login,
            logout,
          );

          return (
            <NavbarMobileItem
              key={authenticationMenu.label}
              {...authenticationMenu}
            />
          );
        }}
      </LoginProvider>

      {navbarMenu.map((navbarItem) => (
        <NavbarMobileItem key={navbarItem.label} {...navbarItem} />
      ))}
    </>
  );
};

const NavbarMobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggle}
        aria-label="Toggle menu button"
      >
        <RxHamburgerMenu className="size-20 cursor-pointer text-gray-dark-11" />
      </Button>
      {isOpen && (
        <section className="fixed inset-0 flex animate-fade-in flex-col bg-gray-dark-1/95 p-[37px] pt-0 text-gray-dark-11 backdrop-blur">
          <div className="sticky top-0 -mx-[37px] flex items-center justify-between px-[37px] py-27">
            <img
              src="/svg/fleek-logo.svg"
              width={66}
              height={25}
              alt="fleek logo"
            />
            <Button variant="ghost" size="sm" onClick={toggle}>
              <FaXmark className="size-20 cursor-pointer" />
            </Button>
          </div>
          <div className="-mx-[37px] flex flex-col gap-24 overflow-auto px-[37px] pb-30 [&>div:empty]:hidden">
            <NavbarMobileItems />
          </div>
          <div className="flex items-center gap-32 pt-28 text-white *:size-24">
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

const NavbarSubMenuItem: React.FC<NavMenuItem> = ({
  url,
  icon,
  label,
  description,
  openInNewTab,
}) => {
  const getIconComp = () => {
    if (!icon) return null;
    const className =
      'absolute translate-x-0 transition-all group-hover:translate-x-5 group-hover:opacity-0 group-focus-visible:translate-x-5 group-focus-visible:opacity-0';
    if (typeof icon === 'string') {
      return (
        <img src={icon} width={18} className={className} alt={description} />
      );
    }
    const Icon = icon;
    return <Icon className={cn(className, 'size-22')} />;
  };

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
        {getIconComp()}
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

type NavbarItemProps = NavMenuItemRoot & {
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

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  const {
    idx,
    pathname,
    label,
    hovering,
    popoverDimensions,
    onMouseEnterSubMenu,
    removeHovering,
  } = props;

  if (!('subMenu' in props)) {
    const isActivePage = isActivePath({ lookup: props.url || '', pathname });

    return (
      <Link
        href={props.url}
        className={cn(
          'flex h-48 cursor-pointer items-center text-neutral-12 outline-none ring-0 transition-colors hover:text-white focus-visible:bg-gray-dark-3 focus-visible:text-white md:px-12',
          { 'text-white': isActivePage },
        )}
        onFocus={removeHovering}
        onMouseEnter={removeHovering}
      >
        {label}
      </Link>
    );
  }

  const isActiveSubMenu = hovering === idx + 1;

  return (
    <>
      <section
        tabIndex={0}
        className={cn(
          'relative flex h-48 cursor-pointer items-center text-neutral-12 outline-none ring-0 transition-colors hover:text-white focus-visible:bg-gray-dark-3 focus-visible:text-white md:px-12',
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
        className="absolute top-64 grid min-w-256 transition-all"
      >
        {isActiveSubMenu && (
          <div
            className={cn(
              'rounded-8 border border-gray-dark-4 bg-gray-dark-2/80 p-6 backdrop-blur-lg',
              props.subMenu.length >= 6 && 'grid grid-cols-2',
            )}
          >
            {props.subMenu.map((item, idx) => (
              <NavbarSubMenuItem key={idx} {...item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

type NavbarProps = {
  variant?: 'fixed' | 'sticky';
  pathname: string;
  className?: string;
  wrapperClassName?: string;
};

export const Navbar: React.FC<NavbarProps> = ({
  pathname,
  className,
  wrapperClassName,
  variant = 'sticky',
}) => {
  const [hovering, setHovering] = useState<number | null>(null);
  const [popoverDimensions, setPopoverDimensions] =
    useState<PopoverDimensions | null>(null);

  // TODO: This is causing re-renders
  // couldn't the hover drop-downs be CSS only?
  const onMouseEnterSubMenu = useCallback(
    ({ idx, left, height }: OnMouseEnterSubMenuProps) => {
      setHovering(idx + 1);
      setPopoverDimensions({ left, height });
    },
    [setHovering, setPopoverDimensions],
  );

  return (
    <div
      className={cn(
        'sticky top-0 z-50 w-full px-24',
        {
          fixed: variant === 'fixed',
        },
        wrapperClassName,
      )}
    >
      <div className="absolute top-0 -z-1 -mx-24 h-80 w-full bg-gray-dark-1/70 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,0))]"></div>
      <nav
        onMouseLeave={() => setHovering(null)}
        className={cn(
          'z-20 mx-auto mt-18 flex h-50 w-full max-w-[1000px] items-center justify-between rounded-12 pr-12 font-plex-sans text-[1.4rem] font-medium text-gray-dark-11',
          className,
        )}
      >
        <div className="flex items-center gap-6">
          <Link
            tabIndex={0}
            href="/"
            className="flex h-48 shrink-0 items-center rounded-l-12 px-12 outline-none ring-0 focus-visible:bg-gray-dark-3"
            onFocus={() => setHovering(null)}
            onMouseEnter={() => setHovering(null)}
          >
            <img
              src="/svg/fleek-logo.svg"
              width={75}
              height={30}
              alt="fleek logo"
            />
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
        </div>
        <section className="flex items-center gap-8">
          <SessionManagementActions />
          <div className="md:hidden">
            <NavbarMobile />
          </div>
        </section>
      </nav>
    </div>
  );
};

const SessionManagementActions: React.FC = () => {
  const {
    userProjects,
    activeProjectId,
    setActiveProject,
    fetchProjects,
    showProjectsDropDown,
    isLoggingIn,
    isLoggedIn,
    handleLoginClick,
    updateAccessTokenByProjectId,
  } = useSession();

  const [isLoadingProject, setLoadingProject] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    fetchProjects();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!activeProjectId || !isLoggedIn) return;

    handleProjectChanged();
  }, [activeProjectId]);

  const handleProjectChanged = async () => {
    setLoadingProject(true);
    await updateAccessTokenByProjectId(activeProjectId);
    setLoadingProject(false);
  };

  // TODO: Alternatively, could installing the package
  // `use-sync-external-store` prevent need for all this?
  // placeholder approach to prevent SSR issues
  if (!isClient) {
    const buttonText = 'Sign in';

    return (
      <>
        <ButtonContainer
          showProjectsDropDown={false}
          userProjects={userProjects || []}
          activeProjectId={activeProjectId}
          setActiveProject={setActiveProject}
          buttonText={buttonText}
          isLoggingIn={isLoggingIn}
          isLoggedIn={isLoggedIn}
          handleLoginClick={handleLoginClick}
          targetAppUrl={agentsUrl}
          isLoadingProject={isLoadingProject}
          handleClick={() => null}
        />
      </>
    );
  }

  // TODO: The loading process can be improved
  // in several states: initial, project queries, etc
  // it might be preferred to present an animation
  // instead of text based? Create design ticket
  return (
    <>
      <LoginProvider
        graphqlApiUrl={import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}
        dynamicEnvironmentId={import.meta.env.PUBLIC_DYNAMIC_ENVIRONMENT_ID}
        onAuthenticationSuccess={onAuthenticationSuccess}
      >
        {(props) => {
          const { isLoading, error, login, logout } = props;

          // TODO: This should be removed added temporary
          // due to an issue with the expectation for /prices
          // for users who aren't logged in
          // See src/components/PricingCard.tsx
          if (isClient) {
            (window as any).__DYNAMIC_TOGGLE_LOGIN__ = login;
          }

          const handleClick = () => {
            if (isLoggedIn) {
              logout();
            } else {
              login();
            }
          };

          // TODO: Move the button text computations
          // into the button container scope
          let buttonText = 'Sign in';

          if (error) {
            buttonText = 'Sign in failed';
          } else if (isLoading) {
            buttonText = 'Loading...';
          } else if (isLoggedIn) {
            buttonText = 'Sign out';
          }

          return (
            <>
              <ButtonContainer
                showProjectsDropDown={!!showProjectsDropDown}
                userProjects={userProjects || []}
                activeProjectId={activeProjectId}
                setActiveProject={setActiveProject}
                buttonText={buttonText}
                isLoggingIn={isLoggingIn}
                isLoggedIn={isLoggedIn}
                handleLoginClick={handleLoginClick}
                targetAppUrl={agentsUrl}
                isLoadingProject={isLoadingProject}
                handleClick={handleClick}
              />
            </>
          );
        }}
      </LoginProvider>
    </>
  );
};

type ButtonContainerProps = {
  showProjectsDropDown: boolean;
  userProjects: Project[];
  activeProjectId: string;
  setActiveProject: (projectId?: string) => Promise<void>;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  handleLoginClick: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  targetAppUrl: string;
  buttonText: string;
  isLoadingProject: boolean;
  handleClick: () => void;
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  showProjectsDropDown,
  userProjects,
  activeProjectId,
  setActiveProject,
  isLoggedIn,
  isLoggingIn,
  handleLoginClick,
  targetAppUrl,
  buttonText,
  isLoadingProject,
  handleClick,
}) => {
  return (
    <>
      {isLoggedIn && (
        <div className="login-button">
          <ProductDropdown />
        </div>
      )}
      <Button
        variant="light-outline"
        size="sm"
        className="hidden md:flex"
        onClick={handleClick}
      >
        {buttonText}
      </Button>
      {!isLoggedIn && (
        <Button
          disabled={isLoggingIn}
          variant="tertiary"
          size="sm"
          className="hidden md:flex"
          onClick={handleLoginClick}
          href={agentsUrl}
        >
          Sign up
        </Button>
      )}
    </>
  );
};
