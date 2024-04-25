import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import Text from '@components/Text';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
// @ts-ignore
import imgStorageLayersImage from '@images/storage-layers.png?w=626&format=webp';

const FEATURES = [
  {
    label: 'IPFS CONTENT ADDRESSING',
    icon: {
      src: '/svg/content-addressing-icon.svg',
      alt: 'Improve your SEO',
    },
  },
  {
    label: 'Storage Layer Agnostic',
    icon: {
      src: '/svg/storage-icon.svg',
      alt: 'Storage Layer Agnostic',
    },
  },
  {
    label: 'Decentralized CDN/Edge',
    icon: {
      src: '/svg/edge-icon.svg',
      alt: 'Decentralized CDN/Edge',
    },
  },
  {
    label: 'No Vendor Lock-In',
    icon: {
      src: '/svg/multichain-icon.svg',
      alt: 'No Vendor Lock-In',
    },
  },
];

const StorageSection6 = () => (
  <Container>
    <PageSection>
      <GridLayout className="px-16 py-50 lg:py-80 lg:pl-48">
        <img
          className="col-span-10 col-start-4 self-end lg:col-span-8 lg:col-start-9"
          src={imgStorageLayersImage}
          alt="Fleek Globe"
          // TODO: verify what the itention was here as original was vercel img optimizer
          // placeholder="blur"
        />
        <div className="col-span-16 flex flex-col gap-30 text-center lg:col-span-8 lg:text-start">
          <div className="flex flex-col gap-15">
            <TextGlowHoverEffect style="h4">
              <Text style="h4">Web3 Storage, Done Right</Text>
            </TextGlowHoverEffect>
            <Text className="text-ui-light-grey">
              Fleek takes pride in pushing the limits of decentralized storage.
              We use a best in class decentralized stack. and we continuously
              optimize it to be both maximally decentralized and performant.
            </Text>
          </div>
          <div className="flex w-full flex-col gap-8 text-center lg:w-fit lg:text-start">
            {FEATURES.map(({ label, icon }) => (
              <div
                key={label}
                className="rounded-12 bg-gradient-to-b from-[rgba(75,75,75,0.8)] to-[rgba(75,75,75,0.2)] p-1"
              >
                <div className="flex items-center gap-16 self-stretch rounded-11 bg-ui-black py-12 pl-24 pr-32 shadow-dark">
                  <img {...icon} width={24} height={24} />
                  <Text style="caption-s" className="w-full">
                    {label}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default StorageSection6;
