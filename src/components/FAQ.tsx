import Container from '@components/Container';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import Text from '@components/Text';
import { useState } from 'react';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
import { pricing } from '@base/settings.json';

import type { PropsWithChildren } from 'react';

const Dropdown = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border-b-1 border-ui-white py-16">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text style="xl" className="w-full pr-20 text-ui-white">
          {title}
        </Text>
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-1 border-ui-white pb-2">
          {isOpen ? <Text style="xl">-</Text> : <Text style="xl">+</Text>}
        </div>
      </div>
      {isOpen && <div className="mt-10 flex flex-col gap-8">{children}</div>}
    </div>
  );
};

const FAQ = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-64 lg:py-80">
        <div className="col-span-14 col-start-2 lg:col-span-8 lg:text-start">
          <TextGlowHoverEffect style="h4">
            <Text style="h4">Frequently Asked Questions</Text>
          </TextGlowHoverEffect>
        </div>
        <div className="col-span-14 col-start-2 flex flex-col lg:col-span-8">
          {pricing.faq.map(({ question, answer }) => (
            <Dropdown key={question} title={question}>
              <Text className="text-gray-dark-11">{answer}</Text>
            </Dropdown>
          ))}
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default FAQ;
