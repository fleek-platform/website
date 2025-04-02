import type React from 'react';
import settings from '@base/settings.json';
import Link from '@components/Link';

type PartnerProps = {
  name: string;
  logo: string;
  caseStudyUrl: string;
};

export const LLMs: React.FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1048px] flex-col items-center px-24 py-48 sm:py-100">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <h3 className="mt-48 max-w-480 text-balance text-center font-plex-sans text-20 font-medium leading-tight text-gray-dark-11 sm:text-18">
        Making use of the most known LLMs
      </h3>
      <div className="mt-36 grid w-full max-w-[616px] grid-cols-2 items-center justify-center gap-46 sm:grid-cols-4">
        {settings.landingPage.LLMs.map((partner) => (
          <img
            key={partner.name}
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
          />
        ))}
      </div>
      <div className="mt-50 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};
