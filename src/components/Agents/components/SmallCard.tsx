import type { FC } from 'react';

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

interface SmallCardListProps {
  cards: SmallCardProps[];
}

export const SmallCardsList: FC<SmallCardListProps> = ({ cards }) => {
  return (
    <div className="flex flex-col gap-8">
      {cards.map((item, index) => {
        const { title, icon } = item;

        return <SmallCard key={index} title={title} icon={icon} />;
      })}
    </div>
  );
};
