import TableCell from '@components/Pricing/Table/TableCell';
import { features, frameworks } from './constants';
import type { FeatureSupport } from './types';

const FrameworkComparisonTable: React.FC = () => {
  const renderFeatureIcon = (
    supported: FeatureSupport,
    featureName: string,
  ) => {
    if (supported === true) {
      return '✅';
    } else if (supported === false) {
      return '❌';
    } else {
      return '―';
    }
  };
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Legend */}
      <div className="mb-6 flex items-center justify-end space-x-10">
        <div className="flex items-center">
          {'✅'}
          <span className="ml-4 text-[14px]">Supported</span>
        </div>
        <div className="flex items-center">
          {'❌'}
          <span className="ml-4 text-[14px]">Not Supported</span>
        </div>
        <div className="flex items-center">
          {'―'}
          <span className="ml-4 text-[14px] ">Not Applicable</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="rounded-lg w-full border-collapse overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-[14px] font-medium lg:text-[17px]">
                Framework
              </th>
              {features.map((feature) => (
                <th
                  key={feature.key}
                  className="px-4 py-3 text-center text-[14px] font-medium lg:text-[17px]"
                >
                  {feature.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {frameworks.map((framework) => (
              <tr key={framework.name}>
                <td>
                  <TableCell
                    className={`whitespace-pre-wrap text-[14px] lg:text-[17px]`}
                  >
                    {framework.name}
                  </TableCell>
                </td>
                {features.map((feature) => (
                  <td>
                    <TableCell
                      className={`whitespace-pre-wrap text-[14px] lg:text-[17px]`}
                    >
                      {renderFeatureIcon(
                        framework[feature.key as keyof FeatureSupport],
                        feature.key,
                      )}
                    </TableCell>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrameworkComparisonTable;
