import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import Text from "@components/Text";
import { useState } from "react";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

import type { PropsWithChildren } from "react";

// TODO: Move to settings
const FAQs = [
  {
    question: "Can I change my payment method anytime?",
    answer: "Yes. You can switch from crypto to credit card payments, and any credit top-up model anytime.",
  },
  {
    question: "If I am in a paid/pro plan, do I still get the free monthly credits?",
    answer: "Yes! All users each month receive $5 worth of credits for free, regardless of their account type.",
  },
  {
    question: "What happens if I ran out of credits? Are accounts suspended?",
    answer: "You will be notified before and after you run out of credits, and we will only suspend your plan after a notice period, all data is saved and easy to restore.",
  },
  {
    question: "What happens if I want to cancel?",
    answer: "You can stop adding credits, or delete your account, anytime without restrictions.",
  }
];

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
          {FAQs.map(({ question, answer }) => (
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
