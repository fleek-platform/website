import Container from '@components/Container';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import Text from '@components/Text';
import ExternalLink from '@components/ExternalLink';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
// @ts-ignore
import imgFleekGlobe from '@images/fleek-globe.png?w=1200&format=webp';

// TODO: Move to settings
const FEATURES = [
  {
    label: 'IMPROVE SEO',
    icon: {
      src: '/svg/seo-icon.svg',
      alt: 'Improve your SEO',
    },
  },
  {
    label: 'REDUCE BOUNCE RATES',
    icon: {
      src: '/svg/bounce-icon.svg',
      alt: 'Reduce bounce rates',
    },
  },
  {
    label: 'GET MORE USERS',
    icon: {
      src: '/svg/hosting-icon.svg',
      alt: 'Get more users',
    },
  },
];

const FastAsFleek = () => (
  <Container>
    <PageSection className="overflow-hidden rounded-48">
      <GridLayout className="h-[540px] py-40">
        <div className="absolute left-[-300px] top-[-200px]">
          <img
            src={imgFleekGlobe}
            alt="Fleek Globe"
            width={1177}
            height={1177}
            className="hidden transform-gpu mix-blend-screen md:block"
          />
        </div>
        <div className="col-span-14 col-start-2 flex flex-col justify-center gap-30 lg:col-span-7 lg:col-start-9">
          <div className="flex flex-col gap-15 text-center lg:text-start">
            <TextGlowHoverEffect style="h4">
              <Text style="h4" className="text-ui-white">
                Fast as Fleek
              </Text>
            </TextGlowHoverEffect>
            <Text className="text-ui-light-grey">
              Your users hate slow loading
              <ExternalLink
                href="https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/"
                className="ml-5"
              />
              . {''}
              That’s why we deploy everything to the Fleek Edge, making your app
              lightning fast all over the world.
            </Text>
          </div>
          <div className="flex w-full flex-col gap-5">
            {FEATURES.map(({ label, icon }) => (
              <div
                key={label}
                className="z-1 flex w-full items-center gap-10 self-stretch rounded-full border-1 border-ui-dark-grey bg-ui-black py-5 pl-15 pr-20 lg:max-w-[304px]"
              >
                <img {...icon} width={40} height={40} />
                <Text style="caption-s">{label}</Text>
              </div>
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default FastAsFleek;
