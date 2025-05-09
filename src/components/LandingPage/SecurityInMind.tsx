import type React from 'react';
import { CardWithIcon } from './CardWithIcon';
import { Text } from './Text';
import {
  IoAnalytics,
  IoLayers,
  IoLockClosed,
  IoShieldCheckmark,
} from 'react-icons/io5';
import { Badge } from './Badge';

export const SecurityInMind: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center gap-24 px-24 py-48 text-center sm:py-100 sm:text-left">
      <Badge>
        <IoShieldCheckmark className="size-16" />
        Security
      </Badge>
      <Text className="max-w-[600px] text-center">
        We keep <span className="text-yellow-dark-11">security in mind</span>{' '}
        for working with AI agents
      </Text>
      <Text variant="description" className="font-normal">
        Join others in making the agents to ease your life.
      </Text>
      <div className="grid max-w-[800px] gap-24 pt-24 sm:grid-cols-3">
        <CardWithIcon
          title="No training on your data"
          description="Your data remains private and is never utilized for model training purposes."
          icon={IoLayers}
        />
        <CardWithIcon
          title="TEEs"
          description="Deploy your agents under trusted execution environments (TEEs), enhancing security and privacy."
          icon={IoLockClosed}
        />
        <CardWithIcon
          title="Access Control"
          description="Implement precise user permissions and role-based access for authorized users only."
          icon={IoAnalytics}
        />
      </div>
    </div>
  );
};
