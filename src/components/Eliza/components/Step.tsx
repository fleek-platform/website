import { Box } from '@components/ElizaForm/components/Box';
import { Text } from '@components/ElizaForm/components/Text';
import { cn } from '@utils/cn';

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
    <>
      <Box className="gap-16">
        {customTopElement && <Box className="w-fit">{customTopElement}</Box>}
        <Text>{title}</Text>
        <Text variant="description" className="text-wrap">
          {description}
        </Text>
      </Box>
      <Box>{children}</Box>
      <noscript>
        <Box className="text-center text-[14px] font-bold leading-[20px] text-[#F5E147]">
          Please enable JavaScript to continue
        </Box>
      </noscript>
    </>
  );
};

export default Step;
