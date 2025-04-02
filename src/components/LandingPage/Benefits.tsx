import {
  IoBulb,
  IoColorWand,
  IoHappy,
  IoLogoUsd,
  IoSettings,
  IoTime,
} from 'react-icons/io5';
import type { IconType } from 'react-icons/lib';

export const Benefits = () => {
  return (
    <div className="mx-auto flex max-w-[800px] flex-col items-center py-100 text-center">
      <p className="max-w-[600px] text-36 font-semibold text-neutral-12">
        What agents can do <span className="text-yellow">for you</span>
      </p>
      <p className="mt-24 text-18 text-neutral-11">
        Work smarter, move faster, and let agents handle the grind so you can
        focus on what matters.
      </p>

      <div className="mt-36 grid grid-cols-3 gap-24 text-start">
        <BenefitCard
          title="Make money"
          description="Use agents to find leads, convert users, or even run micro-businesses while you sleep."
          icon={IoLogoUsd}
        />

        <BenefitCard
          title="Save time"
          description="Agents take care of the repetitive stuff so you can spend time on what actually matters."
          icon={IoTime}
        />

        <BenefitCard
          title="Automate tasks"
          description="From reminders to reports to full workflows—set it once, and let agents handle it forever."
          icon={IoSettings}
        />

        <BenefitCard
          title="Reduce costs"
          description="No need to hire or subscribe to dozens of tools. Agents do more with less."
          icon={IoBulb}
        />

        <BenefitCard
          title="Gain superpowers"
          description="Need a researcher, assistant, or coder? Agents scale you like a team of ten."
          icon={IoColorWand}
        />

        <BenefitCard
          title="Zero drama"
          description="Agents show up, don’t flake, and don’t talk back. Get things done—without the people problems."
          icon={IoHappy}
        />
      </div>
    </div>
  );
};

const BenefitCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: IconType;
}) => {
  const IconComp = icon;
  return (
    <div className="relative flex flex-col overflow-hidden rounded-8 border border-neutral-6 bg-neutral-1 p-12">
      <IconComp className="absolute -top-14 right-0 size-76 text-neutral-2" />
      <IconComp className="size-34" />
      <p className="mt-12 text-18 font-bold text-neutral-12">{title}</p>
      <p className="mt-4">{description}</p>
    </div>
  );
};
