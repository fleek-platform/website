import ImageWithCopy from '@components/ImageWithCopy';
import imgFleekBoltGateway from '@images/fleek-bolt-gateway.png';

const GatewaysOwn = () => (
  <ImageWithCopy
    kicker="Gateways"
    headline="The Ultimate Web3 Gateways"
    copy="With Fleek you can surface data from multiple web3 protocols using just one gateway (public or private). Supports IPFS, Filecoin, Arweave, Bundlr, and continuously adding more protocols."
    cta={{ url: 'https://app.fleek.xyz', text: 'Deploy your own gateway' }}
    inverse
    className="py-50 lg:pl-40"
  >
    <img
      className="transform-gpu object-contain mix-blend-screen"
      src={imgFleekBoltGateway.src}
      alt="Fleek Gateway"
    />
  </ImageWithCopy>
);

export default GatewaysOwn;
