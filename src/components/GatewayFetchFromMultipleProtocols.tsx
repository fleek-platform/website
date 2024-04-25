import ImageWithTransparentCards from '@components/ImageWithTransparentCards';

const features = [
  {
    icon: {
      src: '/svg/edge-icon.svg',
      alt: 'Git Integration',
    },
    description: 'Built in Edge/CDN',
  },
  {
    icon: {
      src: '/svg/gateways-icon.svg',
      alt: 'Multi Gateways',
    },
    description: 'Multiple Web3 Gateways in One',
  },
  {
    icon: {
      src: '/svg/theta-icon.svg',
      alt: 'Zero Configuration',
    },
    description: 'Zero Configuration',
  },
];

const GatewayFetchFromMultipleProtocols = () => (
  <ImageWithTransparentCards
    image="/images/domain-management-card.png"
    features={features}
    kicker="GATEWAYS"
    headline={`Fetch Data from Multiple \nProtocols. Fast as Fleek`}
    copy="Fleek’s gateways are edge-optimized and automatically chunk and parallelize the serving of data to make it lightning fast."
    imageProps={{
      className: 'self-center',
      width: 662,
      height: 310,
    }}
    inverse
  />
);

export default GatewayFetchFromMultipleProtocols;
