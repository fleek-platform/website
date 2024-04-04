import type { FC, PropsWithChildren } from 'react';

export enum Target {
 Blank = "_blank",
 Self = "_self",
 Parent = "_parent",
 Top = "_top",
}

interface Props {
 href: string;
 className?: string;
 target?: Target;
}

export const Link: FC<PropsWithChildren<Props>> = ({ href, className, target }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
);

export default Link;
