import React from 'react';
import { Button, buttonVariants } from './Button';
import type { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

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
          <h3 className="typo-xl-bold text-left text-gray-dark-12">
            {props.title}
          </h3>
          <p className="typo-m text-left text-gray-dark-11">
            {renderDescription()}
          </p>
          <div className="typo-m flex flex-col gap-1 text-left font-medium text-gray-dark-12">
            <p>
              {props.cost?.prefix ?? '$'}
              <span className="typo-h5">{props.cost.amount}</span>
              {props.cost?.suffix ?? ' /month'}
            </p>
            <p className="block min-h-22 font-normal text-gray-dark-11">
              {props.cost?.bottomText}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-18">
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
                  <p className="typo-s text-gray-dark-12">{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <Button href={props.url} variant={props.variant} size="lg">
          {props.cta}
        </Button>
      </div>
    </>
  );
};

export default PricingCard;
