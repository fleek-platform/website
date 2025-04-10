// http://localhost:4321/autofun?autofun_token_id=23423sdf&referral=auto.fun

import type { PropsWithChildren } from 'react';
import type React from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center font-plex-sans text-14 text-gray-dark-11">
      {children}
    </div>
  );
};

export const AutofunHero: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const tokenId = params.get('autofun_token_id');
  const referral = params.get('referral');

  if (!tokenId || !referral)
    return (
      <Layout>
        Sorry, there's no autofun token id here. Please request the URL again.
      </Layout>
    );

  console.log(tokenId, referral);
  return <Layout>Hello world</Layout>;
};
