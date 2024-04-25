import Button from '@components/Button';
import Container from '@components/Container';
import PageSection from '@components/PageSection';
import Text from '@components/Text';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
// @ts-ignore
import imgGlobeWithBolt from '@images/globe-with-bolt.jpg?w=420&format=webp';

const features = [
  { icon: '/svg/vertical-waves-icon.svg', title: 'Anycast DNS' },
  { icon: '/svg/git-integration-icon.svg', title: 'Auto SSL' },
  { icon: '/svg/load-balancing-icon.svg', title: 'Load Balancing' },
  { icon: '/svg/vertical-waves-icon.svg', title: 'Accelerated Origins' },
  { icon: '/svg/ddos-icon.svg', title: 'DDOS Protection' },
  { icon: '/svg/cache-refresh-icon.svg', title: 'Automatic Cache Refreshes' },
];

const DomainsNeedsCovered = () => (
  <Container>
    <PageSection>
      <div className="flex flex-col items-center justify-center px-40 py-80 text-center">
        <TextGlowHoverEffect style="h4">
          <Text style="h4" className="mb-24">
            We’ve Got All Your Domain Needs Covered
          </Text>
        </TextGlowHoverEffect>

        <Text style="xl" className="mb-40">
          We’ve got all the extra bells and whistles built in. Need something
          else custom?
        </Text>
        <a
          href="https://docs.fleek.xyz"
          className="mb-40 lg:mb-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-fit">Read our docs</Button>
        </a>
        <div className="relative flex w-full items-center lg:h-[480px]">
          <div className="relative inline-flex w-full flex-wrap justify-center gap-16">
            {features.map(({ icon, title }) => (
              <div
                key={title}
                className="z-1 flex w-full items-center gap-16 rounded-16 bg-ui-black py-16 pl-24 pr-32 shadow-dark md:w-[45%] lg:w-fit"
              >
                <img
                  src={icon}
                  alt="Fleek Site Preview"
                  // TODO: check original intent as it was rel to next opt
                  // placeholder="blur"
                  className="h-[4rem]"
                  height={40}
                  width={40}
                />
                <Text style="caption-m" className="ml-16 text-ui-white">
                  {title}
                </Text>
              </div>
            ))}
          </div>
          <img
            src={imgGlobeWithBolt}
            alt="globe with bolt"
            // TODO: check original intent as it was rel to next opt
            // {480}
            className="absolute -top-0 left-0 right-0 m-auto hidden h-480 transform-gpu rounded-full border-1 border-dashed border-ui-light-grey p-30 mix-blend-screen lg:block"
          />
        </div>
      </div>
    </PageSection>
  </Container>
);

export default DomainsNeedsCovered;
