import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
import Button from "@components/Button";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import ExternalLink from "@components/ExternalLink";
// @ts-ignore
import imgFleekGlobeMobile from "@images/fleek-globe.png?w=400&format=webp";
// @ts-ignore
import imgFleekGlobe from "@images/fleek-globe.png?w=1244&format=webp";

const GatewayDecentralized = () => (
  <Container>
    <PageSection>
      <GridLayout className="relative lg:py-80 overflow-hidden">
          {/* Mobile Img */}
          <img
            src={imgFleekGlobeMobile}
            alt="Fleek Site Preview"
            className="lg:hidden mix-blend-screen w-full col-span-12 col-start-3 md:col-span-10 md:col-start-4 transform-gpu"
            // TODO: check what the intention was
            // placeholder="blur"
          />

          <img
            src={imgFleekGlobe}
            alt="Fleek Site Preview"
            className="absolute max-w-[1244px] max-h-[1244px] hidden lg:block lg:top-[-15%] lg:right-[-50%] xl:top-[-25%] xl:right-[-30%] mix-blend-screen transform-gpu"
            // placeholder="blur"
          />
        <div className="col-span-16 lg:col-span-8 gap-48 flex flex-col text-center items-center lg:items-start lg:text-start">
          <div className="flex flex-col gap-24">
            <TextGlowHoverEffect style="h4">
              <Text style="h4" as="h4" className="whitespace-pre-line">
                {`Decentralized Web3\nGateways (soon™)`}
              </Text>
            </TextGlowHoverEffect>
            <Text className="text-ui-light-grey">Soon the gateways will be powered by Fleek Network, which will enable decentralized, censorship resistant gateway access to multiple web3 protocols without sacrificing on cost, performance or web3 values.</Text>
          </div>
          <a href="https://docs.fleek.xyz" target="_blank" rel="noopener noreferrer">
          <Button className="w-fit">Learn More</Button>
          </a>
          <Text style="m" as="p" className="text-ui-light-grey lg:self-end">Are you a web3 protocol interested in getting added to the Decentralized Web3 Gateway? Reach Out <ExternalLink href="https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=18990660014477" className="align-sub"/></Text>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default GatewayDecentralized;
