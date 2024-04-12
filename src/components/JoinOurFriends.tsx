import LoopingCardSlider from "@components/LoopingCardSlider";
import imgSnapshotBanner from "@images/snapshot-banner.jpg";
import imgSnapshotIcon from "@images/snapshot-icon.png";
import imgVitalikButerinBanner from "@images/vitalik-buterin-banner.jpg";
import imgEthIcon from "@images/eth-icon.png";
import imgDappRadar from "@images/dappradar-banner.jpg";
import imgDappRadarIcon from "@images/dappradar-icon.png";
import imgSynthetixBanner from "@images/synthetix-banner.jpg";
import imgSynthetixIcon from "@images/synthetix-icon.png";
import imgEnsAppBanner from "@images/ensapp-banner.jpg";
import imgEnsAppIcon from "@images/ens-icon.png";

const JoinOurFriends = () => (
      <LoopingCardSlider
        headline="Join your friends"
        cards={[
          {
            bannerImage: imgSnapshotBanner.src,
            icon: imgSnapshotIcon.src,
            title: "snapshot",
            domain: "snapshot.org",
            cta: {
              url: "https://snapshot.org/",
            },
          },
          {
            bannerImage: imgVitalikButerinBanner.src,
            icon: imgEthIcon.src,
            title: "Vitalik Buterin",
            domain: "vitalik.eth",
            cta: {
              url: "https://vitalik.eth.limo/",
            },
          },
          {
            bannerImage: imgDappRadar.src,
            icon: imgDappRadarIcon.src,
            title: "dappradar",
            domain: "dappradar.com",
            cta: {
              url: "https://dappradar.com/",
            },
          },
          {
            bannerImage: imgSynthetixBanner.src,
            icon: imgSynthetixIcon.src,
            title: "Synthetix",
            domain: "staking.synthetix.io",
            cta: {
              url: "https://staking.synthetix.io/",
            },
          },
          {
            bannerImage: imgEnsAppBanner.src,
            icon: imgEnsAppIcon.src,
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
