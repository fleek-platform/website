export type ReferralName = 'agents' | 'dashboard' | 'auto.fun';

const referralKeyName = 'referral';

export const getReferralQueryKeyValuePair = (name: ReferralName) =>
  `${referralKeyName}=${name}`;

export const isReferralNamed = (name: ReferralName) => {
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has(referralKeyName)) return false;

  const val = urlParams.get(referralKeyName);

  if (val !== name) return false;

  return true;
};

export const setReferralQueryKeyValuePair = (name: ReferralName) => {
  try {
    const url = new URL(window.location.href);

    url.searchParams.set(referralKeyName, name);

    window.history.replaceState({}, '', url);
  } catch (err) {
    console.warn('Failed to set referral!');
  }
};
