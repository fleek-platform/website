import { Text } from '../Text';
import type React from 'react';
import Link, { Target } from '@components/Link';
import { Button } from '@components/Button';
import settings from '@base/settings.json';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { OPTIONS, PLANS, type Plan } from './config';
import { useDeployAgentCta } from '@hooks/useDeployAgentCta';
import { animate, useMotionValue, motion } from 'framer-motion';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

const Price: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text variant="tertiary" className="text-[3.4rem] font-bold leading-none">
      <motion.span>{children}</motion.span>
    </Text>
  );
};

const PRICE_ANIMATION_DURATION = 0.25;

export const PricingCalculator: React.FC = () => {
  const { deployAgentCta } = useDeployAgentCta();

  const [planConfig, setPlanConfig] = useState<Plan>({
    agentType: 'standard',
    plan: 1,
  });

  const selectedPlan = PLANS[planConfig.plan - 1];
  const multiplier =
    OPTIONS.find((option) => option.value === planConfig.agentType)
      ?.multiplier || 1;
  const price = selectedPlan.basePrice * multiplier;

  const animatedPrice = useMotionValue(price);
  const [formattedPrice, setFormattedPrice] = useState(formatPrice(price));

  useEffect(() => {
    const controls = animate(animatedPrice, price, {
      duration: PRICE_ANIMATION_DURATION,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setFormattedPrice(formatPrice(latest));
      },
    });

    return controls.stop;
  }, [animatedPrice, price]);

  const handlePlanChange = (params: Partial<Plan>) => {
    setPlanConfig((prev) => ({ ...prev, ...params }));
  };

  return (
    <div className="z-10 mx-auto flex w-full flex-col items-center gap-24 px-24 py-48 text-center sm:py-100 sm:text-left">
      <Text>Pricing that just makes sense</Text>
      <Text variant="description" className="font-normal">
        Can't find the answer here?{' '}
        <Link
          href={settings.support.resources.newRequest}
          target={Target.Blank}
          className="underline hover:text-gray-dark-12"
        >
          Contact our support team
        </Link>
        .
      </Text>
      <div className="mt-24 flex w-full max-w-[800px] flex-col gap-20 rounded-8 border border-gray-dark-6 bg-gray-dark-1 p-16">
        <div className="flex flex-col gap-8">
          <Text variant="tertiary">Type of agent</Text>
          <div className="flex flex-wrap items-center gap-8 *:flex-1">
            {OPTIONS.map((option) => {
              const buttonVariant =
                option.value === planConfig.agentType
                  ? 'secondary'
                  : 'secondary-ghost';
              return (
                <Button
                  size="sm"
                  key={option.value}
                  variant={buttonVariant}
                  onClick={() => handlePlanChange({ agentType: option.value })}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Text variant="tertiary">Number of agents</Text>
          <div className="flex flex-wrap items-center gap-8 *:flex-1 *:whitespace-nowrap">
            {PLANS.map((option) => {
              const buttonVariant =
                option.plan === planConfig.plan
                  ? 'secondary'
                  : 'secondary-ghost';
              return (
                <Button
                  key={option.plan}
                  size="sm"
                  variant={buttonVariant}
                  onClick={() => handlePlanChange({ plan: option.plan })}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="flex items-end justify-center gap-8 rounded-8 bg-gray-dark-2 p-24">
          {planConfig.plan !== 5 ? (
            <>
              <Price>{formattedPrice}</Price>
              <Text variant="description">/month</Text>
            </>
          ) : (
            <Price>Get in touch</Price>
          )}
        </div>
        <Button size="sm" onClick={deployAgentCta}>
          Create your first agent
        </Button>
      </div>
    </div>
  );
};
