import { cn } from '@utils/cn';
import { Box } from './Box';
import { Text } from './Text';

interface StepProps {
  title: string;
  description: string | React.ReactNode;
  className?: string;
  customTopElement?: string | React.ReactNode;
  children?: React.ReactNode;
}

const Step: React.FC<StepProps> = ({
  title,
  description,
  className,
  customTopElement,
  children,
}) => {
  return (
    <Box className={cn('gap-16', className)}>
      {customTopElement && <Box className="mr-auto">{customTopElement}</Box>}
      <Text as="h1">{title}</Text>
      {typeof description === 'string' ? (
        <Text as="h2" variant="description">
          {description}
        </Text>
      ) : (
        description
      )}

      <Box>{children}</Box>
      <noscript>
        <div className="text-center text-[14px] font-bold leading-[20px] text-[#F5E147]">
          Please enable JavaScript to continue
        </div>
      </noscript>
    </Box>
  );
};

export default Step;
