import Button from "@components/Button";
import Container from "@components/Container";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

const features = [
  { icon: '/svg/vertical-waves-icon.svg', title: 'Anycast DNS'},
  { icon: '/svg/git-integration-icon.svg', title: 'Auto SSL'},
  { icon: '/svg/load-balancing-icon.svg', title: 'Load Balancing'},
  { icon: '/svg/vertical-waves-icon.svg', title: 'Accelerated Origins'},
  { icon: '/svg/ddos-icon.svg', title: 'DDOS Protection'},
  { icon: '/svg/cache-refresh-icon.svg', title: 'Automatic Cache Refreshes'},
];

const DomainsNeedsCovered = () => (
  <Container>
    <PageSection>
      <div className="flex flex-col items-center justify-center text-center px-40 py-80">
        <TextGlowHoverEffect style="h4">
          <Text style="h4" className="mb-24">We’ve Got All Your Domain Needs Covered</Text>
        </TextGlowHoverEffect>
          
        <Text style="xl" className="mb-40">We’ve got all the extra bells and whistles built in. Need something else custom?</Text>
        <a href="https://docs.fleek.xyz" className="mb-40 lg:mb-0" target="_blank" rel="noopener noreferrer">
        <Button className="w-fit">Read our docs</Button>
        </a>
        <div className="relative w-full flex items-center lg:h-[480px]">
          <div className="inline-flex w-full gap-16 justify-center relative flex-wrap">
            {features.map(({ icon, title }) => (
              <div key={title} className="flex items-center z-1 w-full md:w-[45%] lg:w-fit gap-16 bg-ui-black py-16 pl-24 pr-32 rounded-16 shadow-dark">
                <img
                  src={icon}
                  alt="Fleek Site Preview"
                  // TODO: check original intent as it was rel to next opt
                  // placeholder="blur"
                  className="h-[4rem]"
                  height={40}
                  width={40}
                />
                <Text style="caption-m" className="text-ui-white ml-16">{title}</Text>
              </div>
            ))}
          </div>
          <img
            src="/images/globe-with-bolt.jpg"
            alt="globe with bolt"
              // TODO: check original intent as it was rel to next opt
              // {480}
            className="absolute -top-0 left-0 right-0 m-auto hidden mix-blend-screen lg:block border-1 border-dashed border-ui-light-grey rounded-full p-30 transform-gpu h-480"
          />
        </div>
      </div>
    </PageSection>
  </Container>
);

export default DomainsNeedsCovered;
