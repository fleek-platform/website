import {
  IoBulb,
  IoColorWand,
  IoHappy,
  IoLogoUsd,
  IoSettings,
  IoThumbsUp,
  IoTime,
} from 'react-icons/io5';
import { CardWithIcon } from './CardWithIcon';
import { Badge } from './Badge';
import { Text } from './Text';

export const Benefits = () => {
  return (
    <div className="mx-auto flex max-w-[800px] flex-col items-center py-48 text-center sm:py-100">
      <Badge>
        <IoThumbsUp className="size-16" />
        Benefits
      </Badge>
      <Text className="pt-24">
        What agents can do <span className="text-yellow">for you</span>
      </Text>
      <p className="mt-24 max-w-[600px] text-18 text-neutral-11">
        Work smarter, move faster, and let agents handle the grind so you can
        focus on what matters.
      </p>

      <div className="mt-36 grid grid-cols-3 gap-24 text-start">
        <CardWithIcon
          title="Make money"
          description="Use agents to find leads, convert users, or even run micro-businesses while you sleep."
          icon={IoLogoUsd}
        />

        <CardWithIcon
          title="Save time"
          description="Agents take care of the repetitive stuff so you can spend time on what actually matters."
          icon={IoTime}
        />

        <CardWithIcon
          title="Automate tasks"
          description="From reminders to reports to full workflows—set it once, and let agents handle it forever."
          icon={IoSettings}
        />

        <CardWithIcon
          title="Reduce costs"
          description="No need to hire or subscribe to dozens of tools. Agents do more with less."
          icon={IoBulb}
        />

        <CardWithIcon
          title="Gain superpowers"
          description="Need a researcher, assistant, or coder? Agents scale you like a team of ten."
          icon={IoColorWand}
        />

        <CardWithIcon
          title="Zero drama"
          description="Agents show up, don’t flake, and don’t talk back. Get things done—without the people problems."
          icon={IoHappy}
        />
      </div>
    </div>
  );
};
