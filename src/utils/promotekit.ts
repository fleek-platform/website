import { getCookie } from '@utils/cookies';

const getReferralIdFromCookie = () => {
  console.log('[debug] eliza.astro: getReferralIdFromCookie: ', 1)

  try {
     const promotekit_referral = getCookie('promotekit_referral');

    if (!promotekit_referral) throw Error('Promotekit referral cookie was not found!');

    console.log('[debug] eliza.astro: getReferralIdFromCookie: ', promotekit_referral)

    return promotekit_referral;
  } catch (_err) {
    console.warn(
      `User session is not a Promotekit referral`
    );

    return '';
  }
}

export const getReferralId = () => {
  console.log('[debug] eliza.astro: getReferralId: ', 1)

  try {
    console.log('[debug] eliza.astro: getReferralId : ', window?.promotekit_referral)

    if (!window.promotekit_referral) throw Error('Promotekit referral not found in global window object!');

    return window.promotekit_referral;
  } catch (_err) {
    console.warn(
      `Promotekit referral is not available. Will check cookie`
    );
    return getReferralIdFromCookie();
  }
};
