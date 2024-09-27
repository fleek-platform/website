import React from 'react';
import { Button, buttonVariants } from './v2/Button/Button';
import type { VariantProps } from 'class-variance-authority';

export type Props = {
  title: string;
  description: string;
  cost: number | String;
  features: string[];
  cta?: string;
  variant: VariantProps<typeof buttonVariants>['variant'];
  url?: string;
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
      <div className="flex w-full flex-col gap-12 rounded-16 border-t border-gray-dark-5 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-20">
        <div>
          <h3 className="typo-xl-bold text-left text-gray-dark-12">
            {props.title}
          </h3>
        </div>
        <div className="w-4/5">
          <p className="typo-m text-left text-gray-dark-11">
            {props.description}
          </p>
        </div>
        <div>
          <p className="typo-m text-left text-gray-dark-12">
            $ <span className="typo-h5">{props.cost}</span> /mo
          </p>
        </div>
        <div className="my-12 bg-gray-dark-6 p-[1px]" />
        <div className="mb-16">
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
