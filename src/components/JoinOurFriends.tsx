import LoopingCardSlider from "@components/LoopingCardSlider";
// import imgSnapshotBanner from "@images/snapshot-banner.jpg";
// import imgSnapshotIcon from "@images/snapshot-icon.png";
// import imgVitalikButerinBanner from "@images/vitalik-buterin-banner.jpg";
// import imgEthIcon from "@images/eth-icon.png";
// import imgDappRadar from "@images/dappradar-banner.jpg";
// import imgDappRadarIcon from "@images/dappradar-icon.png";
// import imgSynthetixBanner from "@images/synthetix-banner.jpg";
// import imgSynthetixIcon from "@images/synthetix-icon.png";
// import imgEnsAppBanner from "@images/ensapp-banner.jpg";
// import imgEnsAppIcon from "@images/ens-icon.png";

import type { ReactNode } from "react";

type Props = {
  optImgSnapshotBanner: ReactNode;  
  optImgSnapshotIcon: ReactNode;
  optImgVitalikButerinBanner: ReactNode;
  optImgEthIcon: ReactNode;
  optImgDappRadar: ReactNode;
  optImgDappRadarIcon: ReactNode;
  optImgSynthetixBanner: ReactNode;
  optImgSynthetixIcon: ReactNode;
  optImgEnsAppBanner: ReactNode;
  optImgEnsAppIcon: ReactNode;
};

const JoinOurFriends = ({
  optImgSnapshotBanner,
  optImgSnapshotIcon,
  optImgVitalikButerinBanner,
  optImgEthIcon,
  optImgDappRadar,
  optImgDappRadarIcon,
  optImgSynthetixBanner,
  optImgSynthetixIcon,
  optImgEnsAppBanner,
  optImgEnsAppIcon,
}: Props) => (
      <LoopingCardSlider
        headline="Join your friends"
        cards={[
          {
            bannerImage: optImgSnapshotBanner,
            icon: optImgSnapshotIcon,
            title: "snapshot",
            domain: "snapshot.org",
            cta: {
              url: "https://snapshot.org/",
            },
          },
          {
            bannerImage: optImgVitalikButerinBanner,
            icon: optImgEthIcon,
            title: "Vitalik Buterin",
            domain: "vitalik.eth",
            cta: {
              url: "https://vitalik.eth.limo/",
            },
          },
          {
            bannerImage: optImgDappRadar,
            icon: optImgDappRadarIcon,
            title: "dappradar",
            domain: "dappradar.com",
            cta: {
              url: "https://dappradar.com/",
            },
          },
          {
            bannerImage: optImgSynthetixBanner,
            icon: optImgSynthetixIcon,
            title: "Synthetix",
            domain: "staking.synthetix.io",
            cta: {
              url: "https://staking.synthetix.io/",
            },
          },
          {
            bannerImage: optImgEnsAppBanner,
            icon: optImgEnsAppIcon,
            title: "ENS App",
            domain: "app.ens.domains",
            cta: {
              url: "https://app.ens.domains/",
            },
          },
        ]}
      />
);

export default JoinOurFriends;
