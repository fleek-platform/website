import type { FC } from 'react';
import type { CardData } from '../data/cards';
import { cn } from '@utils/cn';

interface CardProps extends CardData {}

export const Card: FC<CardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="flex flex-col gap-16 rounded-16 border-t border-gray-dark-5 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-28 text-left">
      <div>
        <Icon className="size-24 text-yellow-dark-11" alt={title} />
      </div>
      <div>
        <p className="w-2/3 font-sans text-24 font-medium leading-tight -tracking-1 text-gray-dark-12 lg:text-34">
          {title}
        </p>
      </div>
      <div>
        <p className="typo-m text-balance text-gray-dark-11">{description}</p>
      </div>
    </div>
  );
};

interface CardListProps {
  cards: CardData[];
  hasFourColumns?: boolean;
}

export const CardsList: FC<CardListProps> = ({
  cards,
  hasFourColumns = false,
}) => {
  return (
    <div
      className={cn('grid grid-cols-1 gap-32 md:grid-cols-2 lg:grid-cols-3', {
        'lg:grid-cols-4': hasFourColumns,
      })}
    >
      {cards.map((item, index) => {
        const { title, description, icon } = item;

        return (
          <Card
            key={index}
            title={title}
            description={description}
            icon={icon}
          />
        );
      })}
    </div>
  );
};
