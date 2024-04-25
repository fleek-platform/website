import Link, { Target } from '@components/Link';

import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
import FlyingToken from '@components/FlyingToken';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import Container from '@components/Container';
import Button from '@components/Button';
import Text from '@components/Text';

// @ts-ignore
import ArweaveTokenImage from '@images/arweave-token.png?w=220&format=webp';
// @ts-ignore
import FilecoinTokenImage from '@images/filecoin-token.png?w=220&format=webp';
// @ts-ignore
import IPFSTokenImage from '@images/ipfs-token.png?w=220&format=webp';

const StorageSection4 = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-25">
        <div className="relative col-span-12 col-start-2 mb-16 h-[200px] md:h-[305px] lg:col-span-8 lg:col-start-9 lg:h-[375px]">
          <FlyingToken
            icon={ArweaveTokenImage}
            alt="Arweave Token"
            className="right-1/4 top-0"
          />
          <FlyingToken
            icon={FilecoinTokenImage}
            alt="Filecoin Token"
            className="right-1/2 top-1/3"
          />
          <FlyingToken
            icon={IPFSTokenImage}
            alt="IPFS Token"
            className="right-0 top-1/2"
          />
        </div>
        <div className="col-span-16 flex flex-col items-center justify-center gap-15 lg:col-span-8 lg:items-start">
          <TextGlowHoverEffect style="h5">
            <Text
              as="h5"
              style="h5"
              className="whitespace-pre text-center text-ui-white lg:text-start"
            >
              IPFS, Filecoin, Arweave, OH MY.
            </Text>
          </TextGlowHoverEffect>
          <Text
            as="p"
            className="mb-30 text-center text-ui-light-grey lg:text-start"
          >
            Multiple storage layer options. Everything IPFS content addressed.
            In just 3 lines of code.
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
