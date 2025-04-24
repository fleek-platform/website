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
    <div className="mx-auto flex w-full max-w-[1048px] flex-col items-center px-24 pb-56 pt-[75px]">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <h3 className="mt-48 text-balance text-center text-16 leading-tight text-gray-dark-11">
        Trusted by 100,000+ users, industry leaders, and companies.
      </h3>
      <div className="mt-36 grid w-full max-w-[730px] grid-cols-2 items-center justify-center gap-24 sm:grid-cols-5 sm:gap-20">
        {settings.landingPage.partners.map((partner) => (
          <Partner key={partner.name} {...partner} />
        ))}
      </div>
      <div className="mt-50 hidden h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};
