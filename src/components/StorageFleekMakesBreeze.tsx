import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import Text from '@components/Text';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
import TransparentCard from '@components/TransparentCard';

const features = [
  {
    title: 'Integrate Seamlessly',
    description:
      'Bring a web3 storage layer to your project with a simple CLI/SDK. ',
    icon: {
      src: '/svg/integrate-icon.svg',
      alt: 'Integrate Seamlessly',
    },
  },
  {
    title: 'Store Flexibly',
    description:
      'Fleek stores information redundantly both in web3, and web2 infrastructure.',
    icon: {
      src: '/svg/storage-icon.svg',
      alt: 'Store Flexibly',
    },
  },
  {
    title: 'Scale With Ease',
    description:
      'Scale your storage up or down automatically and pay only for what you use.',
    icon: {
      src: '/svg/scale-icon.svg',
      alt: 'Scale With Ease',
    },
  },
];

const StorageFleekMakesBreeze = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-40 md:px-16 xl:py-80">
        <div className="col-span-16 flex flex-col items-center gap-30 text-center lg:col-span-12 lg:col-start-3 lg:text-start">
          <TextGlowHoverEffect style="h5" align="center">
            <Text style="h5">Fleek Makes Decentralized Storage a Breeze</Text>
          </TextGlowHoverEffect>
          <div className="grid-dense-flow grid gap-15 gap-x-16 lg:grid-cols-3 lg:px-10">
            {features.map((feature, index) => (
              <TransparentCard
                key={index}
                {...feature}
                className="lg:max-w-[325px]"
              />
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default StorageFleekMakesBreeze;
