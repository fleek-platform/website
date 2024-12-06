import { cn } from '@utils/cn';
import { Fragment } from 'react';

interface AccordionItem {
  label: string;
  contentElements: (string | JSX.Element)[];
}
interface AccordionProps {
  items: AccordionItem[];
  headerClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items = [],
  headerClassName,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={`overflow-hidden`}>
      {items.map((item, index) => (
        <div key={index} className="relative">
          <div className="flex flex-col justify-center border-b border-b-gray-dark-3 p-6">
            <input
              type="checkbox"
              id={`cb-${index}`}
              className="accordion-toggle absolute z-[-1] opacity-0"
            />
            <label
              htmlFor={`cb-${index}`}
              className={cn(
                'group typo-m flex min-h-52 border-collapse cursor-pointer items-center justify-between px-2 text-gray-dark-11',
                headerClassName,
              )}
            >
              {item.label}
              <span className="rotate-90 transform transition-transform duration-300">
                ❯
              </span>
            </label>
            <div className="accordion-content flex h-0 items-center overflow-hidden rounded-b-8 text-left text-gray-dark-11 transition-all duration-300">
              <div>
                <p className="py-10 text-15">
                  {item.contentElements.map((element, i) => (
                    <Fragment key={i}>{element}</Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Accordion;
