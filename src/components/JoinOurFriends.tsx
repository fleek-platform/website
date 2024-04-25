import LoopingCardSlider from '@components/LoopingCardSlider';

// @ts-ignore
import imgSnapshotBanner from '@images/snapshot-banner.jpg?w=240&format=webp';
// @ts-ignore
import imgSnapshotIcon from '@images/snapshot-icon.png?w=100&format=webp';
// @ts-ignore
import imgVitalikButerinBanner from '@images/vitalik-buterin-banner.jpg?w=240&format=webp';
// @ts-ignore
import imgEthIcon from '@images/eth-icon.png?w=100&format=webp';
// @ts-ignore
import imgDappRadar from '@images/dappradar-banner.jpg?w=240&format=webp';
// @ts-ignore
import imgDappRadarIcon from '@images/dappradar-icon.png?w=100&format=webp';
// @ts-ignore
import imgSynthetixBanner from '@images/synthetix-banner.jpg?w=240&format=webp';
// @ts-ignore
import imgSynthetixIcon from '@images/synthetix-icon.png?w=100&format=webp';
// @ts-ignore
import imgEnsAppBanner from '@images/ensapp-banner.jpg?w=240&format=webp';
// @ts-ignore
import imgEnsAppIcon from '@images/ens-icon.png?w=100&format=webp';

const JoinOurFriends = () => (
  <LoopingCardSlider
    headline="Join your friends"
    cards={[
      {
        bannerImage: imgSnapshotBanner,
        icon: imgSnapshotIcon,
        title: 'snapshot',
        domain: 'snapshot.org',
        cta: {
          url: 'https://snapshot.org/',
        },
      },
      {
        bannerImage: imgVitalikButerinBanner,
        icon: imgEthIcon,
        title: 'Vitalik Buterin',
        domain: 'vitalik.eth',
        cta: {
          url: 'https://vitalik.eth.limo/',
        },
      },
      {
        bannerImage: imgDappRadar,
        icon: imgDappRadarIcon,
        title: 'dappradar',
        domain: 'dappradar.com',
        cta: {
          url: 'https://dappradar.com/',
        },
      },
      {
        bannerImage: imgSynthetixBanner,
        icon: imgSynthetixIcon,
        title: 'Synthetix',
        domain: 'staking.synthetix.io',
        cta: {
          url: 'https://staking.synthetix.io/',
        },
      },
      {
        bannerImage: imgEnsAppBanner,
        icon: imgEnsAppIcon,
        title: 'ENS App',
        domain: 'app.ens.domains',
        cta: {
          url: 'https://app.ens.domains/',
        },
      },
    ]}
  />
);

export default JoinOurFriends;
