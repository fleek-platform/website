import { Target } from '@components/Link';
import type { PlanHeader } from './types';
import { Button } from '@components/Button/Button';

const TableHeader = ({ title, cta }: PlanHeader) => (
  <div
    className={`flex h-full w-full flex-col items-center justify-between gap-16 border-r-1 border-t-1  ${title == 'Enterprise' ? 'rounded-tr-12' : ''}  border-ui-mid-grey bg-gray-dark-1  px-20 py-20 lg:max-w-[345px]`}
  >
    <div className=" w-full ">
      <h3 className="typo-m-normal text-left">{title}</h3>
    </div>

    <Button
      href={cta.href}
      target={Target.Blank}
      rel="noopener noreferrer"
      variant={cta.variant}
      className="w-full"
    >
      {cta.text}
    </Button>
  </div>
);

export default TableHeader;
