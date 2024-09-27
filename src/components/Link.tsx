import React, { forwardRef } from 'react';
import type { PropsWithChildren } from 'react';

export enum Target {
  Blank = '_blank',
  Self = '_self',
  Parent = '_parent',
  Top = '_top',
}

const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>(({ children, ...props }, ref) => (
  <a ref={ref} {...props}>
    {children}
  </a>
));

export default Link;
