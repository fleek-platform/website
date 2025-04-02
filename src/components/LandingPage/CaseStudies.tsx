import type React from 'react';
import { Badge } from './Badge';
import { IoArrowForward, IoBook } from 'react-icons/io5';
import { Text } from './Text';
import { Button } from '@components/Button';
import settings from '@base/settings.json';
import { Target } from '@components/Link';

export const CaseStudies: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-[800px] flex-col items-center gap-24 px-24 py-100 text-center sm:text-left">
      <Badge>
        <IoBook className="size-16" />
        Case studies
      </Badge>
      <Text className="text-center">
        How companies are using Fleek
        <br />
        <span className="text-yellow-dark-11">to boost their business</span>
      </Text>
      <Text variant="description" className="font-normal">
        Join others in making the agents to ease your life.
      </Text>
      <div className="grid max-w-[800px] grid-cols-3 gap-24 pt-24">
        <div className="flex flex-col justify-between rounded-8 border border-gray-dark-6 p-16">
          <div className="flex flex-col gap-8">
            <Text variant="subtitle">We're enterprise-ready</Text>
            <Text variant="paragraph">
              Lots of businesses are jumping on board with Fleek for their
              agents. We'd love to hear how you're planning to use it, so feel
              free to reach out!
            </Text>
          </div>
          <Button
            href={settings.support.resources.newRequest}
            target={Target.Blank}
            variant="app-primary"
            size="sm"
          >
            Contact sales
          </Button>
        </div>
        <div className="col-span-2 flex flex-col gap-24">
          <div className="flex rounded-8 border border-gray-dark-6 bg-gray-dark-1">
            <div className="flex flex-col justify-between gap-14 p-16">
              <div className="flex flex-col">
                <Text variant="subtitle">ElizaOS</Text>
                <Text variant="paragraph">
                  ElizaOS uses Fleek to improve their agent launchpad for over
                  15,000 developers.
                </Text>
              </div>
              <Button variant="secondary" size="sm" className="mr-auto">
                Read the case study <IoArrowForward />
              </Button>
            </div>
            <img
              alt="ElizaOS"
              src="/images/case-studies/eliza.png"
              width={218}
              height={168}
            />
          </div>
          <div className="flex rounded-8 border border-gray-dark-6 bg-gray-dark-1">
            <div className="flex flex-col justify-between gap-14 p-16">
              <div className="flex flex-col">
                <Text variant="subtitle">Venice</Text>
                <Text variant="paragraph">
                  Using Fleek to protect AI agents' data integrity and
                  confidentiality.
                </Text>
              </div>
              <Button variant="secondary" size="sm" className="mr-auto">
                Read the case study <IoArrowForward />
              </Button>
            </div>
            <img
              alt="ElizaOS"
              src="/images/case-studies/venice.png"
              width={218}
              height={168}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
