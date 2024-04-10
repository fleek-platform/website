import Link, { Target } from "@components/Link";

import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import FlyingToken from "@components/FlyingToken";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import Container from "@components/Container";
import Button from "@components/Button";
import Text from "@components/Text";

import ArweaveTokenImage from "public/images/arweave-token.png";
import FilecoinTokenImage from "public/images/filecoin-token.png";
import IPFSTokenImage from "public/images/ipfs-token.png";

const StorageSection4 = () => (
  <Container>
      <PageSection>
        <GridLayout className="py-25">
          <div className="col-start-2 col-span-12 mb-16 relative h-[200px] md:h-[305px] lg:col-span-8 lg:col-start-9 lg:h-[375px]">
            <FlyingToken icon={ArweaveTokenImage.src} alt="Arweave Token" className="top-0 right-1/4" />
            <FlyingToken icon={FilecoinTokenImage.src} alt="Filecoin Token" className="top-1/3 right-1/2" />
            <FlyingToken icon={IPFSTokenImage.src} alt="IPFS Token" className="top-1/2 right-0" />
          </div>
          <div className="col-span-16 flex flex-col items-center justify-center gap-15 lg:col-span-8 lg:items-start">
            <TextGlowHoverEffect style="h5">
              <Text as="h5" style="h5" className="text-center text-ui-white whitespace-pre lg:text-start">
                IPFS, Filecoin, Arweave, OH MY.
              </Text>
            </TextGlowHoverEffect>
            <Text as="p" className="text-center mb-30 text-ui-light-grey lg:text-start">
              Multiple storage layer options. Everything IPFS content addressed. In just 3 lines of code.
            </Text>
            <Link
              href="https://app.fleek.xyz/"
              className="inline-block"
              target={Target.Blank}
            >
              <Button>TRY IT OUT</Button>
            </Link>
          </div>
        </GridLayout>
      </PageSection>
    </Container>
);

export default StorageSection4;
