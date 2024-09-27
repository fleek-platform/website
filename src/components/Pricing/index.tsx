import TableMobile from './Table/TableMobile';
import Container from '@components/Container';
import TableDesktop from './Table/TableDesktop';
import { PricingInfo } from '../../content/pricing/config';
import PricingCard from '@components/PricingCard';
import Pay from '@components/Pay';
import { Text } from '@components/v2/LandingPage/Text/Text';

const Pricing = () => {
  return (
    <Container>
      <>
        <div className="grid grid-flow-dense grid-cols-16 gap-x-16  px-8 py-80">
          <div className="col-span-14 col-start-2 text-center">
            <Text className="mb-24">Pricing you can get pumped about</Text>
            <Text variant="description" className="mb-76">
              Try for free and only pay for what you use. Transparent, simple
              and flexible.
            </Text>
            <div className="mb-24 mt-44 flex flex-col justify-between gap-20 lg:flex-row">
              {PricingInfo.map((item, index) => {
                return (
                  <PricingCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    features={item.features}
                    cta={item.cta}
                    cost={item.cost}
                    variant={item.variant}
                    url={item.url}
                  />
                );
              })}
            </div>
            <TableMobile />
            <TableDesktop />
          </div>
        </div>
        <Pay />
      </>
    </Container>
  );
};

export default Pricing;
