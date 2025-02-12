import type { Filters } from '../types';
import type { Template } from '@utils/graphql-client/fetchTemplates';
import { useMemo, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { QuestionMark } from '@components/Icons';
import { TemplateCard } from './TemplateCard';
import { FiltersSection } from './FiltersSection';

interface CardsProps {
  templates: Template[];
}

export const List: React.FC<CardsProps> = ({ templates }) => {
  const [filters, setFilters] = useState<Filters>({});

  const filteredTemplates = useMemo(
    () =>
      templates.filter((template) => {
        const matchesFramework = filters.framework
          ? template.framework?.name === filters.framework
          : true;
        const matchesCategory = filters.category
          ? template.category.name === filters.category
          : true;
        const matchesSearch = filters.search
          ? `${template.name} ${template.description}`
              .toLowerCase()
              .includes(filters.search.toLowerCase())
          : true;

        return matchesFramework && matchesCategory && matchesSearch;
      }),
    [templates, filters],
  );

  const updateFilter = (
    key: 'framework' | 'category' | 'search',
    value: string | undefined,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="mt-50 flex w-full flex-col gap-20 md:flex-row lg:gap-40">
        <aside className="min-w-[180px] lg:min-w-[220px]">
          <FiltersSection
            filters={filters}
            updateFilter={updateFilter}
            templates={templates}
          />
        </aside>

        <div className="flex w-full flex-col">
          <div className="relative w-full">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="mb-20 w-full rounded-10 border-1 border-neutral-8 bg-transparent pl-30 pr-10 text-[14px] leading-[30px] outline-none placeholder:text-neutral-8"
              placeholder="Search Templates"
            />
            <span className="absolute left-10 top-8">
              <FaMagnifyingGlass className="h-15 w-15 text-neutral-8" />
            </span>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="flex flex-col items-center gap-10 pt-40">
              <span className="block h-24 w-24">
                <QuestionMark />
              </span>
              <h2 className="text-18 font-bold leading-24 text-neutral-12">
                No Results
              </h2>
              <p className="text-14 font-normal leading-20 text-neutral-11">
                We found no template results.
              </p>
            </div>
          )}

          {filteredTemplates.length > 0 && (
            <div className="grid flex-grow grid-cols-1 justify-center gap-[15px] sm:grid-cols-3 lg:grid-cols-3 lg:gap-[30px]">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
