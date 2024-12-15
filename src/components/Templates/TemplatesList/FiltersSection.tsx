import Accordion from '@components/Accordion';
import type { Category, Filters, Framework, Template } from '../types';
import Text from '@components/Text';
import { FilterList } from './FilterList';
import { useMemo } from 'react';

type FilterItem = (Framework | Category) & { amount: number; avatar?: string };

function groupByWithAmount<K extends 'framework' | 'category'>(
  templates: Template[],
  key: K,
): (Template[K] & { amount: number })[] {
  return Object.values(
    templates.reduce(
      (groups, template) => {
        const item = template[key];

        if (!item?.name) return groups;

        const amount = (groups[item.name]?.amount || 0) + 1;
        groups[item.name] = {
          ...item,
          amount,
        };

        return groups;
      },
      {} as Record<string, Template[K] & { amount: number }>,
    ),
  );
}

const FilterLabel: React.FC<{ item: FilterItem }> = ({ item }) => {
  const icon = item.avatar;

  return (
    <div className="ml-10 flex flex-row items-center justify-center">
      {icon && (
        <img
          className="mr-10 inline-block h-16 w-16 rounded-full bg-neutral-6 lg:h-20 lg:w-20"
          src={icon}
          alt={item.name}
        />
      )}
      <span className="text-[12px] lg:text-[14px]">{item.name}</span>
      <span className="ml-10 h-16 w-16 rounded-full bg-neutral-4 text-center text-[10px] leading-16 lg:h-20 lg:w-20 lg:leading-20">
        {item.amount}
      </span>
    </div>
  );
};

interface FiltersSectionProps {
  templates: Template[];
  filters: Filters;
  updateFilter: (
    key: 'framework' | 'category' | 'search',
    value?: string,
  ) => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  updateFilter,
  templates,
}) => {
  const frameworks = useMemo(
    () => groupByWithAmount(templates, 'framework'),
    [templates],
  );
  const categories = useMemo(
    () => groupByWithAmount(templates, 'category'),
    [templates],
  );

  return (
    <>
      <Text
        as="p"
        style="l"
        className="w-full border-b-1 border-b-neutral-6 pb-10 pr-20 !text-[14px] font-bold text-neutral-12 lg:!text-[16px]"
      >
        Filter By
      </Text>

      <Accordion
        headerClassName="min-h-38 text-[12px] md:text-[14px]"
        items={[
          {
            label: 'Frameworks',
            contentElements: [
              <FilterList
                items={frameworks}
                selectedItem={filters.framework}
                renderLabel={(item) => <FilterLabel item={item} />}
                onChange={(itemName) => updateFilter('framework', itemName)}
              />,
            ],
          },
          {
            label: 'Categories',
            contentElements: [
              <FilterList
                items={categories}
                selectedItem={filters.category}
                renderLabel={(item) => <FilterLabel item={item} />}
                onChange={(itemName) => updateFilter('category', itemName)}
              />,
            ],
          },
        ]}
      />
    </>
  );
};
