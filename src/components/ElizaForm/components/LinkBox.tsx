import React, { type PropsWithChildren } from 'react';

import { boxVariants } from './Box';
import Link from './Link';
import { cn } from '@utils/cn';

type LinkBoxProps =
  | (PropsWithChildren &
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        isExternalLink: true;
        href: string;
        isDisabled?: boolean;
      })
  | (PropsWithChildren &
      React.ComponentProps<typeof Link> & {
        isExternalLink?: false;
        href: string;
        isDisabled?: boolean;
      });

export const LinkBox = React.forwardRef<HTMLAnchorElement, LinkBoxProps>(
  ({ children, href, className, isDisabled = false, ...props }, ref) => {
    const classNames = cn(
      boxVariants({ variant: 'container' }),
      'hover:border-elz-neutral-8 transition-colors',
      { 'pointer-events-none opacity-60': isDisabled },
      className,
    );

    return (
      <Link ref={ref} href={href} className={classNames} {...props}>
        {children}
      </Link>
    );
  },
);
