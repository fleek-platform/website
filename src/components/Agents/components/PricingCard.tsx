import type { FC } from 'react';
import { Button, buttonVariants } from '@components/Button';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@utils/cn';

export type PricingInfo = {
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

export type PricingCardProps = PricingInfo;

const PricingCard: FC<PricingCardProps> = (props) => {
  const isCustomPrice = props.cost?.prefix === '' && props.cost?.suffix === '';

  return (
    <div
      className={cn(
        'flex min-h-full w-full flex-col justify-end gap-16 rounded-12 border p-16 ',
        {
          'border-yellow-dark-9 bg-pro-pricing-card':
            props.variant === 'primary',
          'border-gray-dark-6 bg-pricing-card': props.variant !== 'primary',
        },
      )}
    >
      <div className="flex flex-col gap-10 border-b border-b-gray-dark-6 pb-16">
        <div className="space-y-6">
          <h3 className="font-plex-sans text-[1.8rem] font-semibold text-gray-dark-12">
            {props.title}
          </h3>
          <p className="font-plex-sans text-[1.4rem] text-gray-dark-11">
            {props.description}
          </p>
        </div>
        <div>
          <p className="space-x-2">
            <span className="font-plex-sans text-[1.8rem] font-medium text-gray-dark-12">
              {props.cost?.prefix ?? '$'}
            </span>
            <span
              className={cn(
                'font-plex-sans text-[3rem] font-semibold leading-[1.125] text-gray-dark-12',
                {
                  'text-[1.8rem]': isCustomPrice,
                },
              )}
            >
              {props.cost.amount}
            </span>
            <span className="font-plex-sans text-[1.8rem] font-medium text-gray-dark-11">
              {props.cost?.suffix ?? ' /month'}
            </span>
          </p>
          <p>{props.cost?.bottomText}</p>
        </div>
      </div>
      <div className="flex flex-col gap-18">
        {props?.featuresDescription && (
          <p className="typo-m block text-left text-gray-dark-12">
            {props?.featuresDescription}
          </p>
        )}
        <ul>
          {props.features.map((item, index) => {
            return (
              <li key={index} className="mb-10 flex items-center gap-12">
                <span className="text-yellow-dark-9">•</span>
                <p className="font-plex-sans text-[1.4rem] text-gray-dark-11">
                  {item}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <Button href={props.url} variant={props.variant} size="lg">
        {props.cta}
      </Button>
    </div>
  );
};

export default PricingCard;

interface PricingCardListProps {
  cards: PricingCardProps[];
}

export const PricingCardsList: FC<PricingCardListProps> = ({ cards }) => {
  return (
    <div className="mb-24 flex flex-col justify-between gap-20 pt-16 lg:flex-row">
      {cards.map((item, index) => {
        return <PricingCard key={index} {...item} />;
      })}
    </div>
  );
};
