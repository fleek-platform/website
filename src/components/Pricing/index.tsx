import TableMobile from './Table/TableMobile';
import TableDesktop from './Table/TableDesktop';
import { Text } from '@components/LandingPage/Text';
import Accordion from '@components/Accordion';
import settings from '@base/settings.json';
import data from './data.json';
import { parseContentWithLinkPlaceholders } from '@utils/parseContentWithLinkPlaceholders';
import { Button } from '@components/Button';
import { PricingPlanHero } from './PricingPlanHero';
import { useState } from 'react';
import { TabbedButtons } from '@components/TabbedButtons';

const resources = settings.support.resources || {};

const processedFaqs = data.faqs.map(
  ({ label, content }: { label: string; content: string }) => ({
    label,
    contentElements: parseContentWithLinkPlaceholders(content, resources),
  }),
);

const Pricing = () => {
  const [priceFocus, setPriceFocus] = useState<'ai-agents' | 'hosting'>(
    'ai-agents',
  );
  return (
    <>
      <div className="grid grid-flow-dense grid-cols-16 gap-x-16 pb-80 pt-50">
        <div className="col-span-16">
          <div className="text-center">
            <Text as="h1" className="mb-24">
              Pricing you can get pumped about
            </Text>
            <Text variant="description" className="mb-76">
              {priceFocus === 'ai-agents'
                ? 'Create, manage and monetize AI agents using Fleek.'
                : "Create, deploy and manage your Web apps on Fleek's platform."}
            </Text>
          </div>
          <div className="mb-40 flex w-full justify-center gap-4">
            <TabbedButtons
              buttons={[
                <Button
                  key="ai-agents"
                  className="text-[1.4rem] sm:text-[1.9rem]"
                  variant={
                    priceFocus === 'ai-agents'
                      ? 'primary-ghost'
                      : 'secondary-ghost'
                  }
                  onClick={() => {
                    setPriceFocus('ai-agents');
                  }}
                >
                  AI agent plans
                </Button>,
                <Button
                  key="hosting"
                  className="text-[1.4rem] sm:text-[1.9rem]"
                  variant={
                    priceFocus === 'hosting'
                      ? 'primary-ghost'
                      : 'secondary-ghost'
                  }
                  onClick={() => {
                    setPriceFocus('hosting');
                  }}
                >
                  Web app hosting plans
                </Button>,
              ]}
            />
          </div>

          <PricingPlanHero priceFocus={priceFocus} />

          {priceFocus === 'hosting' && (
            <>
              <TableMobile />
              <TableDesktop />
            </>
          )}

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
