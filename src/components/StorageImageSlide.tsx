import CopyWithImageSwap from '@components/CopyWithImageSwap';

const StorageImageSlide = () => (
  <CopyWithImageSwap
    kicker="Storage"
    headline="Decentralized Storage Is Better Than You Think"
    copy="It’s not just the decentralization benefits. There are cost, security, availability and other benefits that make web3 storage better than cloud storage."
    cta={{
      text: 'try it out',
      url: 'https://app.fleek.xyz/',
    }}
  />
);

export default StorageImageSlide;
