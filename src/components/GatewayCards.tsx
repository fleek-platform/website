import BlackFeatureCards from "@components/BlackFeatureCards";

const features = [
  {
    title: 'Fast',
    description: 'All Fleek gateways use the Fleek Edge/CDN to accelerate requests and delivery.',
    icon: '/svg/vertical-waves-icon.svg',
  },
  {
    title: 'Trustless',
    description: 'Follows the IPFS Standard for Trustless Gateway Specification',
    icon: '/svg/trustless-icon.svg',
  },
  {
    title: 'Decentralized',
    description: 'Soon the gateways will be powered by Fleek Network, on the road to true decentralization.',
    icon: '/svg/web3-app-icon.svg',
  }
];

const GatewayCards = () => <BlackFeatureCards features={features} />;

export default GatewayCards;
