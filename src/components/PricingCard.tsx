import React from 'react';
import { Button, buttonVariants } from './Button';
import type { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { Text } from './LandingPage/Text';
import { getCookie } from '@utils/cookies';
import { isClient } from '@utils/common';

export type Props = {
  title: string;
  description: string;
  cost: {
    amount: number | string;
    bottomText?: string;
    prefix?: string;
    suffix?: string;
  };
  features: string[];
  featuresDescription?: string;
  cta?: string;
  variant: VariantProps<typeof buttonVariants>['variant'];
  url?: string;
  splitDescription?: boolean;
};

const PricingCard: React.FC<Props> = (props) => {
  const renderDescription = () => {
    if (props.splitDescription) {
      const [firstPart, secondPart] = props.description.split('\n');
      return (
        <>
          <span>{firstPart}</span>
          <br />
          <span>{secondPart}</span>
        </>
      );
    }
    return props.description;
  };

  const replaceProjectIdInUrl = (url: string | undefined) => {
    if (url?.includes('typeform')) {
      window.location.href = url;

      return;
    }

    const projectId = getCookie('projectId');

    if (!url || !projectId) {
      if (typeof (window as any).__DYNAMIC_TOGGLE_LOGIN__ === 'function') {
        (window as any).__DYNAMIC_TOGGLE_LOGIN__();
      }

      return;
    }

    window.location.href = url.replace('[projectId]', projectId);
  };

  return (
    <>
      <style>
        {`
            .mb-16 ul li:last-child {
              padding-bottom: 0;
            }

            .placeholder:empty::before {
              content: " ";
              display: block;
              height: 100%;
            }
          `}
      </style>
      <div
        className={clsx(
          'flex min-h-full w-full flex-col justify-end gap-24 rounded-12 border p-16',
          {
            'border-yellow-dark-9 bg-pro-pricing-card':
              props.variant === 'primary',
            'border-gray-dark-6 bg-pricing-card': props.variant !== 'primary',
          },
        )}
      >
        <div className="flex flex-col gap-16 border-b border-b-gray-dark-6 pb-20">
          <div className="space-y-6">
            <Text as="h3" variant="subtitle">
              {props.title}
            </Text>
            <Text variant="paragraph" className="min-h-[42px]">
              {renderDescription()}
            </Text>
          </div>
          <div>
            <Text variant="subtitle">
              <span>{props.cost?.prefix ?? '$'}</span>
              <span>{props.cost.amount}</span>
              <span>{props.cost?.suffix ?? ' /month'}</span>
            </Text>
            <Text variant="paragraph">{props.cost?.bottomText}</Text>
          </div>
        </div>
        <div className="flex grow-[1] flex-col gap-18">
          <p className="typo-m block text-left text-gray-dark-12">
            {props?.featuresDescription}
          </p>
          <ul>
            {props.features.map((item, index) => {
              return (
                <li key={index} className="flex items-center gap-12 pb-12">
                  <img
                    src={'/svg/bolt-white.svg'}
                    alt="fleek bolt icon"
                    className="h-20"
                    loading="lazy"
                  />
                  <Text variant="paragraph">{item}</Text>
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          disabled={!!props.url}
          className={!props.url ? 'pointer-events-none' : ''}
          href="#"
          variant={props.url ? props.variant : 'secondary-ghost'}
          size="lg"
          onClick={() => replaceProjectIdInUrl(props.url)}
        >
          {props.cta}
        </Button>
      </div>
    </>
  );
};

export default PricingCard;
