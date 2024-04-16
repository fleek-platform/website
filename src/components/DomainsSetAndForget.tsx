import Container from "@components/Container";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
// @ts-ignore
import imgMetamaskIcon from "@images/metamask-icon.png?w=40&format=webp";
// @ts-ignore
import imgPagePreviewImage from '@images/page-preview-screen.png?w=40&format=webp'
// @ts-ignore
import imgRainbowIcon from "@images/rainbow-icon.png?w=40&format=webp";
// @ts-ignore
import imgGnosisIcon from "@images/gnosis-icon.png?w=40&format=webp";
// @ts-ignore
import imgWalletConnectIcon from "@images/walletconnect-icon.png?w=40&format=webp";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import TransparentCardLarge from "@components/TransparentCardLarge";
import WalletItem from "@components/WalletItem";
// @ts-ignore
import imgBoltYellow from "@images/bolt-yellow.png?w=32&format=webp";

const WALLET_ITEMS = [
  {
    icon: imgMetamaskIcon,
    label: "Metamask",
  },
  {
    icon: imgRainbowIcon,
    label: "Rainbow",
  },
  {
    icon: imgGnosisIcon,
    label: "Gnosis",
  },
  {
    icon: imgWalletConnectIcon,
    label: "Walletconnect",
  },
]

const DomainsSetAndForget = () => (
  <Container>
    <PageSection>
      <div className="flex flex-col items-center justify-center text-center px-16 lg:px-40 py-80">
        <TextGlowHoverEffect style="h4">
          <Text style="h4" className="mb-20 text-ui-white">Set it and forget it</Text>
        </TextGlowHoverEffect>
        <Text style="xl" className="mb-48">Link your domain once we’ll handle the rest.</Text>
        <div className="flex flex-col lg:flex-row justify-center w-full mb-18 gap-24 xl:gap-0">
          <TransparentCardLarge title="1. Link your domain">
            <div className="flex items-center bg-ui-black gap-24 rounded-20 p-24">
              <img
                src="/svg/ens-domains-icon.svg"
                alt="ENS"
                width={64}
                height={64}
              />
              <div className="flex flex-col justify-between text-start">
                <Text style="caption-m" className="text-white">ENS MANAGEMENT</Text>
                <Text style="caption-m" className="lowercase text-white">⚡️⚡️⚡️.eth</Text>
              </div>
            </div>
          </TransparentCardLarge>
          <div className="relative xl:w-64 hidden xl:block">
            <img
              src="/svg/squiggly-lines-left-1.svg"
              alt="ENS"
              width={65}
              height={98}
              className="absolute w-fit left-0 top-[45%]"
            />
            <img
              src="/svg/squiggly-lines-left-2.svg"
              alt="ENS"
              width={65}
              height={53}
              className="absolute left-0 top-[45%]"
            />
          </div>
          <TransparentCardLarge title="2. Connect your wallet">
            <div className="grid grid-flow-dense grid-cols-16 gap-x-16 px-8 gap-y-24">
              {WALLET_ITEMS.map((item) => <WalletItem {...item} key={item.label} />)}
            </div>
          </TransparentCardLarge>
          <div className="relative xl:w-64 hidden xl:block">
            <img
              src="/svg/squiggly-lines-right-1.svg"
              alt="ENS"
              width={65}
              height={135}
              className="absolute w-fit left-0 top-[45%]"
            />
            <img
              src="/svg/squiggly-lines-right-2.svg"
              alt="ENS"
              width={65}
              height={65}
              className="absolute left-0 top-[45%]"
            />
          </div>
          <TransparentCardLarge title="3. Keep building and shipping">
            <div className="flex flex-col rounded-16 bg-ui-black">
              <img
                src={imgPagePreviewImage.src}
                alt="Metamask"
                // TODO: see what the idea was as original was next img optimizer
                // placeholder="blur"
                className="rounded-16 self-stretch flex-[1_0_0]"
              />
              <div className="flex flex-col p-16 gap-16">
              <div className="flex items-center gap-8">
                  <img
                    src={imgBoltYellow}
                    alt="ENS"
                    width={32}
                    height={32}
                  />
                  <img
                    src={imgBoltYellow}
                    alt="ENS"
                    width={32}
                    height={32}
                  />
                  <img
                    src={imgBoltYellow}
                    alt="ENS"
                    width={32}
                    height={32}
                  />
                  <Text style="caption-m" className="text-white">.eth</Text>
                </div>
                <Text style="caption-s" className="self-start">fleek.xyz</Text>
              </div>
            </div>
          </TransparentCardLarge>
        </div>
        <div className="inline-flex items-center justify-center p-16 rounded-24 bg-black-transparent shadow-dark w-full max-w-[1150px]">
          <Text>🤙  We’ll auto handle updates every deploy 🤙</Text>
        </div>
      </div>
    </PageSection>
  </Container>
);

export default DomainsSetAndForget;
