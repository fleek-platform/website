import ImageWithTransparentCards from '@components/ImageWithTransparentCards';
import imgGlobeWithLocks from '@images/globe-with-locks.png';
import imgIpfsLogo from '@images/ipfs-logo.png';

const features = [
  {
    icon: {
      src: imgIpfsLogo.src,
      alt: 'IPFS Standard',
    },
    description: 'IPFS Standard for Trustless Gateway Specification',
  },
  {
    icon: {
      src: '/svg/hashing-icon.svg',
      alt: 'Blake3 Hashing',
    },
    description: 'Blake3 Hashing',
  },
  {
    icon: {
      src: '/svg/content-retrieval-icon.svg',
      alt: 'Content Retrieval',
    },
    description: 'Incremental Content Retrieval & Verification',
  },
];

const GatewayCryptoVerifiedDataDelivery = () => (
  <ImageWithTransparentCards
    image={imgGlobeWithLocks.src}
    features={features}
    kicker="GATEWAYS"
    headline="Cryptographically Verified Data Delivery"
    copy="Fleek gateways leverage Blake3 for efficient and verifiable content streams, providing strong cryptographic guarantees that the data being requested is what is being delivered."
    imageProps={{
      className: 'mix-blend-screen self-center transform-gpu',
      width: 480,
      height: 480,
    }}
  />
);

export default GatewayCryptoVerifiedDataDelivery;
