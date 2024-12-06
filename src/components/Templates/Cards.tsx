import ContentBox from '@components/About/ContentBox';
import type { Category, Framework, Template } from './types';
import Accordion from '@components/Accordion';
import { useMemo, useState } from 'react';
import Checkbox from '@components/Checkbox/Checkbox';
import Text from '@components/Text';
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface CardsProps {
  templates: Template[];
}

const Cards: React.FC<CardsProps> = ({ templates }) => {
  const [frameworkFilter, setFrameworkFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [searchFilter, setSearchFilter] = useState<string | undefined>();
  const frameworks = useMemo(
    () =>
      templates.reduce((acc: (Framework & { amount: number })[], template) => {
        const current = acc.find((el) => el.name === template.framework.name);
        if (!current) {
          acc.push({ ...template.framework, amount: 1 });
        } else {
          current.amount += 1;
        }
        return acc;
      }, []),
    [templates],
  );
  const categories = useMemo(
    () =>
      templates.reduce((acc: (Category & { amount: number })[], template) => {
        const current = acc.find((el) => el.name === template.category.name);
        if (!current) {
          acc.push({ ...template.category, amount: 1 });
        } else {
          current.amount += 1;
        }
        return acc;
      }, []),
    [templates],
  );
  const filteredTemplates = useMemo(
    () =>
      templates
        .filter((el) =>
          frameworkFilter ? el.framework.name === frameworkFilter : true,
        )
        .filter((el) =>
          categoryFilter ? el.category.name === categoryFilter : true,
        )
        .filter((el) =>
          searchFilter
            ? el.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
              el.description.toLowerCase().includes(searchFilter.toLowerCase())
            : true,
        ),
    [templates, frameworkFilter, categoryFilter, searchFilter],
  );

  return (
    <>
      <div className="mt-50 flex w-full flex-col gap-40 sm:flex-row">
        <aside className="min-w-[220px]">
          <Text
            as="p"
            style="l"
            className="w-full border-b-1 border-b-neutral-2 pb-10 pr-20 !text-16 font-bold text-neutral-12 md:!text-16"
          >
            Filter By
          </Text>

          <Accordion
            headerClassName="min-h-35 text-sm"
            items={[
              {
                label: 'Frameworks',
                contentElements: frameworks.map((framework) => (
                  <Checkbox
                    className="mb-10"
                    key={framework.name}
                    id={framework.name}
                    label={framework.name}
                    checked={frameworkFilter === framework.name}
                    labelElement={
                      <div className="flex flex-row items-center justify-center">
                        <img
                          className="mx-10 inline-block h-20 w-20 rounded-full bg-neutral-6"
                          src={framework.avatar}
                          alt={framework.name}
                        />
                        <span className="text-[14px]">{framework.name}</span>
                        <span className="ml-10 h-20 w-20 rounded-full bg-neutral-4 text-center text-[10px] leading-20">
                          {framework.amount}
                        </span>
                      </div>
                    }
                    onChange={() =>
                      setFrameworkFilter(
                        frameworkFilter && frameworkFilter === framework.name
                          ? undefined
                          : framework.name,
                      )
                    }
                  />
                )),
              },
              {
                label: 'Categories',
                contentElements: categories.map((category, index) => (
                  <Checkbox
                    className="mb-10"
                    key={category.name}
                    id={category.name}
                    label={category.name}
                    checked={categoryFilter === category.name}
                    labelElement={
                      <div className="flex flex-row items-center justify-center">
                        <span className="ml-10 text-[14px]">
                          {category.name}
                        </span>
                        <span className="ml-10 h-20 w-20 rounded-full bg-neutral-4 text-center text-[10px] leading-20">
                          {category.amount}
                        </span>
                      </div>
                    }
                    onChange={() =>
                      setCategoryFilter(
                        categoryFilter && categoryFilter === category.name
                          ? undefined
                          : category.name,
                      )
                    }
                  />
                )),
              },
            ]}
          />
        </aside>

        <div className="flex w-full flex-col">
          <div className="relative w-full">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="mb-20 w-full rounded-10 border-1 border-neutral-6 bg-transparent pl-30 pr-10 text-[14px] leading-[30px] outline-none placeholder:text-neutral-6"
              placeholder="Search Templates"
            />
            <span className="absolute left-10 top-10">
              <FaMagnifyingGlass className="h-15 w-15 text-neutral-6" />
            </span>
          </div>

          <div className="grid flex-grow grid-cols-[repeat(auto-fit,272px)] justify-center gap-[30px]">
            {filteredTemplates.map((template) => {
              const contributor = template.repository.contributors?.[0];

              return (
                <a
                  key={template.id}
                  href={`/templates/${template.slug}`}
                  className="block transition-colors"
                >
                  <ContentBox
                    variant="narrow"
                    className="flex flex-col transition-all duration-200 hover:border-neutral-9"
                    footerComponent={
                      <div className="relative font-plex-sans">
                        <h3 className="mb-[1rem] text-[16px] font-bold leading-[22px] text-neutral-12 ">
                          {template.name}
                        </h3>

                        {template.framework && (
                          <img
                            className="absolute right-0 top-0 h-28 w-28 rounded-full"
                            src={template.framework.avatar}
                            alt={`${template.framework.name} icon`}
                          />
                        )}

                        <p className="mt-12 line-clamp-2 break-words text-[14px] font-normal leading-[20px] text-neutral-11 lg:text-[14px]">
                          {template.description}
                        </p>

                        {contributor && (
                          <div className="mt-12">
                            <div className="flex items-center text-[12px] font-normal leading-[16px]">
                              <span className=" text-neutral-11">Added by</span>

                              <img
                                className="mx-6 h-24 w-24 rounded-full"
                                src={contributor.avatar_url}
                                alt={`${contributor.name} avatar`}
                              />

                              <span className="text-neutral-12">
                                {contributor.name}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    }
                    contentClassName="!p-0"
                  >
                    <img
                      className="h-[128px] w-full object-cover"
                      src={template.banner}
                      alt={`${template.name} banner image`}
                    />
                  </ContentBox>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
