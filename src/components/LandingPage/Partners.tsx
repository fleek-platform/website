import type React from 'react';
import settings from '@base/settings.json';
import Link from '@components/Link';

type PartnerProps = {
  name: string;
  logo: string;
  caseStudyUrl: string;
};

const Partner: React.FC<PartnerProps> = ({ name, logo }) => {
  return (
    <img
      src={logo}
      alt={name}
      loading="lazy"
      className="scale-[.65] last:col-span-2 last:mx-auto sm:scale-100 sm:last:col-span-1"
    />
  );
};

export const Partners: React.FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1048px] flex-col items-center px-24 pb-52 pt-100">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <h3 className="mt-48 max-w-480 text-balance text-center font-plex-sans text-20 font-medium leading-tight text-gray-dark-11 sm:text-18">
        Trusted by industry leaders and developers
      </h3>
      <div className="mt-36 grid w-full max-w-[650px] grid-cols-2 items-center justify-center gap-24 sm:grid-cols-5 sm:gap-46">
        {settings.landingPage.partners.map((partner) => (
          <Partner key={partner.name} {...partner} />
        ))}
      </div>
      <div className="mt-50 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};
