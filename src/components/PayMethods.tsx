import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import Text from "@components/Text";
import WhiteIcon from "@components/WhiteIcon";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import settings from '@base/settings.json';

const PayMethods = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-64 lg:py-80">
        <div className="col-span-16 text-ui-light-grey text-center">
          <TextGlowHoverEffect style="h3">
            <Text as="h3" style="h3" className="text-ui-white mb-30">
              Seamlessly Pay With Card or Crypto
            </Text>
          </TextGlowHoverEffect>
          <Text as="p" style="xl" className="mb-48">
            Automatically refill your account by linking a card or a crypto wallet. Pay in your favourite cryptocurrency or token.
          </Text>
          <div className="flex flex-col items-center gap-16">
            <div className="flex flex-wrap justify-center gap-16">
              {settings.payMethods.cryptoPaymentsIcons.map((item) => (
                <WhiteIcon key={item.title} title={item.title} image={item.image} />
              ))}
            </div>
            <div className="flex">
              <WhiteIcon title="Visa" image="/svg/visa-icon.svg" />
              <WhiteIcon title="Mastercard" image="/svg/mastercard-icon.svg" />
            </div>
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default PayMethods;
