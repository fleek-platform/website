import type React from 'react';
import { FAQ_ITEMS, type FaqItem } from './config';
import { useRef, useState } from 'react';
import { Text } from '../Text';
import Link, { Target } from '@components/Link';
import settings from '@base/settings.json';
import { FaChevronDown } from 'react-icons/fa6';
import { cn } from '@utils/cn';

type ItemProps = {
  item: FaqItem;
};

const Item: React.FC<ItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'flex flex-col border-b  border-gray-dark-6 p-16 text-left transition-colors last:border-none hover:bg-gray-dark-2',
        {
          'bg-gray-dark-2': isOpen,
        },
      )}
    >
      <div className="flex items-center justify-between gap-36">
        <Text variant="subtitle" className="font-medium">
          {item.question}
        </Text>
        <FaChevronDown
          className={cn('transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </div>
      <div
        ref={contentRef}
        className="grid overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
      >
        <Text variant="paragraph" className="pt-8">
          {item.answer}
        </Text>
      </div>
    </button>
  );
};

export const Faq: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center gap-24 px-24 py-48 text-center sm:py-100 sm:text-left">
      <Text>Frequently asked questions</Text>
      <Text variant="description" className="font-normal">
        Can't find the answer here?{' '}
        <Link
          href={settings.support.resources.newRequest}
          target={Target.Blank}
          className="underline hover:text-gray-dark-12"
        >
          Contact our support team
        </Link>
        .
      </Text>
      <div className="mt-24 flex w-full max-w-[800px] flex-col overflow-hidden rounded-8 border border-gray-dark-6 bg-gray-dark-1">
        {FAQ_ITEMS.map((item) => (
          <Item key={item.question} item={item} />
        ))}
      </div>
    </div>
  );
};
