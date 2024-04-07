import TableCell from "./TableCell";

import type { FeaturePricing } from "./types";

const MergedTableRows = ({ headers, features }: { features: FeaturePricing; headers: string[] }) => (
  <div className="flex">
    <div className="flex flex-col w-1/3">
      {headers.map((feature, index) => <TableCell key={index}>{feature}</TableCell>)}
    </div>
    <TableCell className="w-2/3 text-center whitespace-pre-wrap justify-center">{features.sharedPricing}</TableCell>
  </div>
);

export default MergedTableRows;
