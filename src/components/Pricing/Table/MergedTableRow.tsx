import TableCell from './TableCell';

import type { FeaturePricing } from './types';

const MergedTableRows = ({
  headers,
  features,
}: {
  features: FeaturePricing;
  headers: string[];
}) => (
  <div className="flex">
    <div className="flex w-1/3 flex-col">
      {headers.map((feature, index) => (
        <TableCell key={index}>{feature}</TableCell>
      ))}
    </div>
    <TableCell className="w-2/3 justify-center whitespace-pre-wrap text-center">
      {features.sharedPricing}
    </TableCell>
  </div>
);

export default MergedTableRows;
