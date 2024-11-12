import React from 'react';
import { Button, buttonVariants } from './Button';
import type { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export type Props = {
  title: string;
  description: string;
  cost: number | String;
  features: string[];
  cta?: string;
  variant: VariantProps<typeof buttonVariants>['variant'];
  url?: string;
  costOptions?: { prefix?: string; suffix?: string };
};

const PricingCard: React.FC<Props> = (props) => {
  return (
    <>
      <style>
        {`
            .mb-16 ul li:last-child {
              padding-bottom: 0;
            }
          `}
      </style>
      <div
        className={clsx('flex w-full flex-col gap-24 rounded-12 border p-16', {
          'border-yellow-dark-9 bg-pro-pricing-card':
            props.variant === 'primary',
          'border-gray-dark-6 bg-pricing-card': props.variant !== 'primary',
        })}
      >
        <div className="flex flex-col gap-16 border-b border-b-gray-dark-6 pb-20">
          <h3 className="typo-xl-bold text-left text-gray-dark-12">
            {props.title}
          </h3>
          <p className="typo-m text-left text-gray-dark-11">
            {props.description}
          </p>
          <p className="typo-m text-left font-medium text-gray-dark-12">
            {props.costOptions?.prefix ?? '$'}{' '}
            <span className="typo-h5">{props.cost}</span>
            {props.costOptions?.suffix ?? ' /mo'}{' '}
          </p>
        </div>
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
        <Button href={props.url} variant={props.variant} size="lg">
          {props.cta}
        </Button>
      </div>
    </>
  );
};

export default PricingCard;
