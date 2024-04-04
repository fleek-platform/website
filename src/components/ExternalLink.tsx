/* eslint-disable @next/next/no-img-element */

import clsx from "clsx";
import ExportedImage from "next-image-export-optimizer";

type ExternalLinkProps = {
  href: string;
  className?: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={clsx("inline-flex", className)}
  >
    <ExportedImage
      className="inline-block"
      src="/svg/external-link-icon.svg"
      alt="app and mobile statistics"
      width={20}
      height={20}
    />
  </a>
);

export default ExternalLink;
