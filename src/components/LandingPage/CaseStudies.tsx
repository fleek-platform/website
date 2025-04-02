import type React from 'react';
import { Badge } from './Badge';
import { IoArrowForward, IoBook } from 'react-icons/io5';
import { Text } from './Text';
import { Button } from '@components/Button';
import settings from '@base/settings.json';
import { Target } from '@components/Link';

export const CaseStudies: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center gap-24 px-24 py-48 sm:py-100 sm:text-left">
      <Badge>
        <IoBook className="size-16" />
        Case studies
      </Badge>
      <Text className="max-w-[580px] text-center">
        How companies are using Fleek to{' '}
        <span className="text-yellow-dark-11">boost their business</span>
      </Text>
      <Text variant="description" className="text-center">
        Join others in making the agents to ease your life.
      </Text>
      <div className="grid w-full max-w-[800px] gap-24 pt-24 md:grid-cols-3">
        <div className="flex flex-col justify-between gap-24 rounded-8 border border-gray-dark-6 p-16">
          <div className="flex flex-col gap-8">
            <Text variant="subtitle">We're enterprise-ready</Text>
            <Text variant="paragraph">
              Lots of businesses are jumping on board with Fleek for their
              agents.
              <br />
              <br />
              We'd love to hear how you're planning to use it, so feel free to
              reach out!
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
        <div className="flex flex-col gap-24 md:col-span-2">
          <div className="flex rounded-8 border border-gray-dark-6 bg-gray-dark-1">
            <div className="flex flex-1 flex-col justify-between gap-24 p-16 sm:gap-0">
              <div className="flex flex-col gap-8">
                <Text variant="subtitle">ElizaOS</Text>
                <Text variant="paragraph">
                  ElizaOS uses Fleek to improve their agent launchpad for over
                  15,000 developers.
                </Text>
              </div>
              <Button variant="secondary" size="sm" className="mr-auto">
                Read the case study <IoArrowForward className="size-16" />
              </Button>
            </div>
            <img
              alt="ElizaOS"
              src="/images/case-studies/eliza.png"
              className="hidden sm:block"
              width={218}
              height={168}
            />
          </div>
          <div className="flex rounded-8 border border-gray-dark-6 bg-gray-dark-1">
            <div className="flex flex-1 flex-col justify-between gap-24 p-16 sm:gap-0">
              <div className="flex flex-col gap-8">
                <Text variant="subtitle">Venice</Text>
                <Text variant="paragraph">
                  Using Fleek to protect AI agents' data integrity and
                  confidentiality.
                </Text>
              </div>
              <Button variant="secondary" size="sm" className="mr-auto">
                Read the case study <IoArrowForward className="size-16" />
              </Button>
            </div>
            <img
              alt="ElizaOS"
              src="/images/case-studies/venice.png"
              className="hidden sm:block"
              width={218}
              height={168}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
