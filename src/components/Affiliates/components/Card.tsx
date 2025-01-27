import type { FC } from 'react';

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-16 rounded-16 border-t border-gray-dark-5 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-28">
      <div>
        <img src={icon} className="h-32 sm:h-60" alt={title} loading="lazy" />
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

export default Card;
