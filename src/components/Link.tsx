import type { FC, PropsWithChildren } from 'react';

export enum Target {
  Blank = '_blank',
  Self = '_self',
  Parent = '_parent',
  Top = '_top',
}

interface Props {
  href?: string;
  className?: string;
  target?: Target;
  tabIndex?: number;
}

export const Link: FC<PropsWithChildren<Props>> = ({
  href,
  className,
  target,
  tabIndex,
  children,
}) => (
  <a href={href} target={target} className={className} tabIndex={tabIndex}>
    {children}
  </a>
);

export default Link;
