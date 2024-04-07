import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import Text from "@components/Text";
import { useState } from "react";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import { pricing } from '@base/settings.json';

import type { PropsWithChildren } from "react";

const Dropdown = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border-b-1 border-ui-white py-16">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text style="xl" className="text-ui-white pr-20 w-full">{title}</Text>
        <div className="rounded-full border-1 border-ui-white h-24 w-24 flex items-center justify-center pb-2">
          {isOpen ? <Text style="xl">-</Text>: <Text style="xl">+</Text>}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-8 mt-10">
          {children}
        </div>
      )}
    </div>
  );
}

const FAQ = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-64 lg:py-80">
        <div className="col-span-14 col-start-2 lg:col-span-8 lg:text-start">
          <TextGlowHoverEffect style="h4">
            <Text style="h4">
              Frequently Asked Questions
            </Text>
          </TextGlowHoverEffect>
        </div>
        <div className="col-span-14 col-start-2 lg:col-span-8 flex flex-col">
          {pricing.faq.map(({ question, answer }) => (
            <Dropdown key={question} title={question}>
              <Text className="text-ui-light-grey">
                {answer}
              </Text>
            </Dropdown>
          ))}
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default FAQ;
