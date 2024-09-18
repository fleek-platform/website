import type React from 'react';
import settings from '@base/settings.json';
import Link from '@components/Link';

type PartnerProps = {
  name: string;
  logo: string;
  caseStudyUrl: string;
};

const Partner: React.FC<PartnerProps> = ({ name, logo, caseStudyUrl }) => {
  const className = 'flex h-80 items-center justify-center sm:h-116';

  if (caseStudyUrl)
    return (
      <Link className={className} href={caseStudyUrl}>
        <img
          src={logo}
          alt={name}
          className="scale-75 transition-all sm:scale-100"
        />
      </Link>
    );

  return (
    <div className={className}>
      <img
        src={logo}
        alt={name}
        className="scale-75 transition-all sm:scale-100"
      />
    </div>
  );
};

export const Partners: React.FC = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1048px] flex-col items-center gap-24 px-24 pb-52">
      <h3 className="max-w-480 text-balance text-center font-plex-sans text-20 leading-tight text-gray-dark-11 sm:text-24">
        Join <span className="font-bold text-gray-dark-12">100,000+</span>
        &nbsp;developers who rely on Fleek to power their Web apps and tools.
      </h3>
      <div className="grid w-full grid-cols-2 items-center justify-center sm:grid-cols-3">
        {settings.landingPage.partners.map((partner) => (
          <Partner key={partner.name} {...partner} />
        ))}
      </div>
    </section>
  );
};
