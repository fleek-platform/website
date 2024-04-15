import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
import Button from "@components/Button";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import ExternalLink from "@components/ExternalLink";
import type { ReactNode } from 'react';

type Props = {
  optImgFleekGlobeMobile: ReactNode;
  optImgFleekGlobe: ReactNode;
}

const GatewayDecentralized = ({
  optImgFleekGlobeMobile,
  optImgFleekGlobe,
}: Props) => (
  <Container>
    <PageSection>
      <GridLayout className="relative lg:py-80 overflow-hidden">
          {/* Mobile Img */}
          {optImgFleekGlobeMobile}
          {optImgFleekGlobe}
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
