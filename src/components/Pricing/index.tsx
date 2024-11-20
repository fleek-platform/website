import TableMobile from './Table/TableMobile';
import TableDesktop from './Table/TableDesktop';
import { PricingInfo } from '../../content/pricing/config';
import PricingCard from '@components/PricingCard';
import { Text } from '@components/LandingPage/Text';
import Accordion from '@components/Accordion';
import settings from '@base/settings.json';
import data from './data.json';
import { parseContentWithLinkPlaceholders } from '@utils/parseContentWithLinkPlaceholders';

const resources = settings.support.resources || {};

const processedFaqs = data.faqs.map(
  ({ label, content }: { label: string; content: string }) => ({
    label,
    contentElements: parseContentWithLinkPlaceholders(content, resources),
  }),
);

const Pricing = () => {
  return (
    <>
      <div className="grid grid-flow-dense grid-cols-16 gap-x-16 pb-80 pt-50">
        <div className="col-span-16 text-center">
          <Text className="mb-24">Pricing you can get pumped about</Text>
          <Text variant="description" className="mb-76">
            Try for free and only pay for what you use. Transparent, simple and
            flexible.
          </Text>
          <div className="mb-24 mt-44 flex flex-col justify-between gap-20 lg:flex-row">
            {PricingInfo.map((item, index) => {
              return <PricingCard key={index} {...item} />;
            })}
          </div>
          <TableMobile />
          <TableDesktop />

          <div className="mt-30">
            <Text as="h3" className="mb-24 text-left">
              Pricing FAQs
            </Text>
            <Accordion items={processedFaqs} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
