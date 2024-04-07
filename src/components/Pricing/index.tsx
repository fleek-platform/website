import TableMobile from "./Table/TableMobile";
import Container from "@components/Container";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
import TableDesktop from "./Table/TableDesktop";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

const Pricing = () => (
  <Container>
    <PageSection>
      <div className="grid grid-flow-dense grid-cols-16 gap-x-16 px-8 py-80 px-20">
        <div className="col-span-14 col-start-2 text-center">
          <TextGlowHoverEffect style="h2">
            <Text style="h2" className="text-white mb-24"><h1>Pricing You Can Get Pumped About</h1></Text>
          </TextGlowHoverEffect>
          <Text style="l" className="mb-76">Try for free and only pay for what you use. Transparent, simple and flexible. </Text>
          <TableMobile />
          <TableDesktop />
        </div>
      </div>
    </PageSection>
  </Container>
);

export default Pricing;
