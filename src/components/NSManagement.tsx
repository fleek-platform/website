import ImageWithCopy from "@components/ImageWithCopy";
// @ts-ignore
import imgDnsEnsIpnsManagement from "@images/dns-ens-ipns-management.png?w=450&format=webp";

const NSManagement = ({ cta }: { cta: string }) => (
  <ImageWithCopy
    kicker="domains"
    floatingImageEffect
    rounded="top-small-bottom-big"
    headline="Seamless DNS, ENS and IPNS Management"
    copy="With Fleek you can easily hook up DNS & ENS domains to your apps, or use the CLI/SDK to programmatically assign IPNS names to any IPFS hashes or files."
    cta={{ url: "https://fleek.xyz/domains/", text: cta }}
  >
    <div className="my-24 px-48 md:px-128 lg:my-0 lg:px-64 2xl:px-128">
      <img
        className="object-contain mix-blend-screen"
        src={imgDnsEnsIpnsManagement}
        alt="DNS/ENS/IPNS Management"
      />
    </div>
  </ImageWithCopy>
);

export default NSManagement;
