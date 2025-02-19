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

interface SmallCardProps {
  icon: string;
  title: string;
}

export const SmallCard: FC<SmallCardProps> = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-16 rounded-full bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-1 px-24 py-8 sm:max-w-400">
      <img className="h-24 sm:h-40" src={icon} alt={title} loading="lazy" />
      <span className="font-plex-sans text-[1.2rem] font-medium uppercase tracking-[0.256rem] text-gray-dark-11">
        {title}
      </span>
    </div>
  );
};

export const SmallCardsList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className="flex flex-col gap-8">
      {cards.map((item, index) => {
        const { title, icon } = item;

        return <SmallCard key={index} title={title} icon={icon} />;
      })}
    </div>
  );
};
