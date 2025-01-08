import React from 'react';
import { Box, type BoxProps } from './Box';
import { cn } from '@utils/cn';
import { Text } from './Text';
import { FaArrowRight } from 'react-icons/fa6';
import { LinkBox } from './LinkBox';

type ActionBoxProps = BoxProps & {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
};

export const ActionBox: React.FC<ActionBoxProps> = ({
  title,
  description,
  icon,
  className,
  href,
  ...props
}) => {
  if (href) {
    return (
      <LinkBox href={href} className={cn('w-full', className)}>
        <Box className="flex-row items-center gap-16">
          {icon}
          <Box className="gap-4">
            <Text variant="primary" size="xl" weight={700}>
              {title}
            </Text>
            <Text variant="secondary">{description}</Text>
          </Box>
          <FaArrowRight className="ml-auto size-24 text-elz-neutral-11" />
        </Box>
      </LinkBox>
    );
  }

  return (
    <Box
      {...props}
      variant="container"
      className={cn(
        'w-full cursor-pointer select-none hover:border-elz-neutral-8',
        className,
      )}
    >
      <Box className="flex-row items-center gap-16">
        {icon}
        <Box className="gap-4">
          <Text variant="primary" size="xl" weight={700}>
            {title}
          </Text>
          <Text variant="secondary">{description}</Text>
        </Box>
        <FaArrowRight className="ml-auto size-24 text-elz-neutral-11" />
      </Box>
    </Box>
  );
};
