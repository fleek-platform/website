import type { FC } from 'react';

interface CardProps {
  icon: string;
  title: string;
}

export const Card: FC<CardProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-col gap-16 rounded-16 border border-gray-dark-5 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-28 text-left">
      <div>
        <img src={icon} alt={title} className="h-32 sm:h-60" loading="lazy" />
      </div>
      <div>
        <p className="w-2/3 font-sans text-24 font-medium leading-tight -tracking-1 text-gray-dark-12 lg:text-34">
          {title}
        </p>
      </div>
    </div>
  );
};

interface CardListProps {
  cards: CardProps[];
}

export const CardsList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 gap-32 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((item, index) => {
        const { title, icon } = item;

        return <Card key={index} title={title} icon={icon} />;
      })}
    </div>
  );
};
