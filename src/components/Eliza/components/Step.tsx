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
    <div
      className={cn(
        'm-auto mt-[25px] flex w-full max-w-screen-md flex-col items-center p-[30px] pb-[60px] md:mt-[50px]',
        className,
      )}
    >
      {customTopElement && (
        <div className="mb-[8px] w-full text-[14px] leading-[20px] md:mb-[12px]">
          {customTopElement}
        </div>
      )}

      <h1 className="w-full text-left text-[40px] font-semibold leading-normal text-[#FFF] md:text-[52px]">
        {title}
      </h1>

      <h2 className="mb-[24px] w-full text-left text-[16px] font-medium leading-[24px] text-[#b4b4b4] md:mb-[38px]">
        {description}
      </h2>

      <div className="flex w-full flex-col items-center font-plex-sans">
        {children}
      </div>

      <noscript>
        <div className="text-center text-[14px] font-bold leading-[20px] text-[#F5E147]">
          Please enable JavaScript to continue
        </div>
      </noscript>
    </div>
  );
};

export default Step;
