import Text from '@components/Text';
import clsx from 'clsx';
import PricingButton from '@components/PricingButton';

import type { PlanHeader } from './types';

const TableHeader = ({
  title,
  titleClassName,
  subtitle,
  description,
  cta,
  btnBg,
  fontColor,
}: PlanHeader) => (
  <div
    className={`flex h-full w-full flex-col items-center justify-between gap-16  border-1 border-b-0 ${title == 'Enterprise' ? 'rounded-tr-12' : ''}  border-ui-mid-grey  px-20 py-20 lg:max-w-[345px]`}
  >
    <div className=" w-full ">
      <h3 className="typo-m-normal text-left">{title}</h3>
    </div>
    <a
      href={cta.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
    >
      <PricingButton bg={btnBg} fontColor={fontColor}>
        <p className="typo-s capitalize">{cta.text}</p>
      </PricingButton>
    </a>
  </div>
);

export default TableHeader;
