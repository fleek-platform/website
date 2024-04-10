import ImageWithTransparentCards from "@components/ImageWithTransparentCards";

const features = [
  {
    icon: {
      src: "/images/ipfs-logo.png",
      alt: "IPFS Standard",
    },
    description: "IPFS Standard for Trustless Gateway Specification",
  },
  {
    icon: {
      src: "/svg/hashing-icon.svg",
      alt: "Blake3 Hashing",
    },
    description: "Blake3 Hashing",
  },
  {
    icon: {
      src: "/svg/content-retrieval-icon.svg",
      alt: "Content Retrieval",
    },
    description: "Incremental Content Retrieval & Verification",
  },
];

const GatewayCryptoVerifiedDataDelivery = () => <ImageWithTransparentCards
  image="/images/globe-with-locks.png"
  features={features}
  kicker="GATEWAYS"
  headline="Cryptographically Verified Data Delivery"
  copy="Fleek gateways leverage Blake3 for efficient and verifiable content streams, providing strong cryptographic guarantees that the data being requested is what is being delivered."
  imageProps={{
    className: "mix-blend-screen self-center transform-gpu",
    width: 480,
    height: 480
  }}
/>;

export default GatewayCryptoVerifiedDataDelivery;
