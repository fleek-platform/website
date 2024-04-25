import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import Text from '@components/Text';
import Button from '@components/Button';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
import ExternalLink from '@components/ExternalLink';
// @ts-ignore
import imgFleekGlobeMobile from '@images/fleek-globe.png?w=400&format=webp';
// @ts-ignore
import imgFleekGlobe from '@images/fleek-globe.png?w=1244&format=webp';

const GatewayDecentralized = () => (
  <Container>
    <PageSection>
      <GridLayout className="relative overflow-hidden lg:py-80">
        {/* Mobile Img */}
        <img
          src={imgFleekGlobeMobile}
          alt="Fleek Site Preview"
          className="col-span-12 col-start-3 w-full transform-gpu mix-blend-screen md:col-span-10 md:col-start-4 lg:hidden"
          // TODO: check what the intention was
          // placeholder="blur"
        />

        <img
          src={imgFleekGlobe}
          alt="Fleek Site Preview"
          className="absolute hidden max-h-[1244px] max-w-[1244px] transform-gpu mix-blend-screen lg:right-[-50%] lg:top-[-15%] lg:block xl:right-[-30%] xl:top-[-25%]"
          // placeholder="blur"
        />
        <div className="col-span-16 flex flex-col items-center gap-48 text-center lg:col-span-8 lg:items-start lg:text-start">
          <div className="flex flex-col gap-24">
            <TextGlowHoverEffect style="h4">
              <Text style="h4" as="h4" className="whitespace-pre-line">
                {`Decentralized Web3\nGateways (soon™)`}
              </Text>
            </TextGlowHoverEffect>
            <Text className="text-ui-light-grey">
              Soon the gateways will be powered by Fleek Network, which will
              enable decentralized, censorship resistant gateway access to
              multiple web3 protocols without sacrificing on cost, performance
              or web3 values.
            </Text>
          </div>
          <a
            href="https://docs.fleek.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-fit">Learn More</Button>
          </a>
          <Text style="m" as="p" className="text-ui-light-grey lg:self-end">
            Are you a web3 protocol interested in getting added to the
            Decentralized Web3 Gateway? Reach Out{' '}
            <ExternalLink
              href="https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=18990660014477"
              className="align-sub"
            />
          </Text>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default GatewayDecentralized;
