import { getCookie } from '@utils/cookies';

const getReferralIdFromCookie = () => {
  try {
    const promotekit_referral = getCookie('promotekit_referral');

    if (!promotekit_referral)
      throw Error('Promotekit referral cookie was not found!');

    return promotekit_referral;
  } catch (_err) {
    console.warn(`User session is not a Promotekit referral`);

    return '';
  }
};

export const getReferralId = () => {
  try {
    if (!(window as any)?.promotekit_referral)
      throw Error('Promotekit referral not found in global window object!');

    return (window as any)?.promotekit_referral;
  } catch (_err) {
    console.warn(`Promotekit referral is not available. Will check cookie`);
    return getReferralIdFromCookie();
  }
};
