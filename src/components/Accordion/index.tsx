import settings from '@base/settings.json';

interface AccordionItem {
  label: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={`rounded-lg overflow-hidden`}>
      {items.map((item, index) => (
        <div key={index} className="relative mb-10">
          <div className="tab">
            <input
              type="checkbox"
              id={`cb-${index}`}
              className="accordion-toggle absolute z-[-1] opacity-0"
            />
            <label
              htmlFor={`cb-${index}`}
              className="group typo-m flex min-h-52 border-collapse cursor-pointer items-center justify-between bg-gray-dark-1 p-12"
            >
              {item.label}
              <span className="rotate-90 transform transition-transform duration-300">
                ❯
              </span>
            </label>
            <div className="accordion-content checked: max-h-0 overflow-hidden bg-gray-dark-3 text-left transition-all duration-300">
              <p className="px-10 py-6 text-15 text-white">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Accordion;
