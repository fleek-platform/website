import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import Text from "@components/Text";

import TransparentCard from "@components/TransparentCard";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

// TODO: Move to settings
const features = [
  {
    description: 'IPFS Content Addressing',
    icon: { src: '/svg/content-addressing-icon.svg', alt: 'IPFS Content Addressing' },
  },
  {
    description: 'ENS Domains',
    icon: { src: '/svg/ens-domains-icon.svg', alt: 'ENS Domains' },
  },
  {
    description: 'Decentralized Storage \n(Filecoin, Arweave)',
    icon: { src: '/svg/storage-icon.svg', alt: 'Decentralized Storage' },
  },
  {
    description: 'Decentralized Edge \n(Fleek Network soonTM)',
    icon: { src: '/svg/edge-icon.svg', alt: 'Decentralized Edge' },
  },
  {
    description: 'NFA’s (Non-Fungible Apps soomTM)',
    icon: { src: '/svg/nfas-icon.svg', alt: 'NFA’s' },
  },
  {
    description: 'Works with every chain/protocol',
    icon: { src: '/svg/multichain-icon.svg', alt: 'Multi-chain' },
  },
];

const TrueWeb3Hosting = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-50">
        <div className="flex flex-col gap-48 col-span-16 xl:col-start-4 xl:col-span-10">
          <div className="flex flex-col gap-24 text-center">
            <TextGlowHoverEffect style="h4" align="center">
              <Text style="h4">True Web3 Hosting</Text>
            </TextGlowHoverEffect>
            <Text className="text-ui-light-grey">We don’t just take speed seriously, but also web3. We combine multiple web3 technologies/protocols to help create a true decentralized modern web stack and services.</Text>
          </div>
          <div className="grid grid-dense-cols md:grid-cols-2 lg:grid-cols-3 gap-16">
            {features.map((feature, index) => (
              <TransparentCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default TrueWeb3Hosting;
