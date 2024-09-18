import React from 'react';

type CardProp = {
  icon: string;
  title: string;
  description: string;
};

const ExplainerCard: React.FC<CardProp> = (props) => {
  return (
    <div className="flex flex-col gap-16 rounded-16 bg-gray-dark-2 p-28">
      <div>
        <img src={props.icon} className="h-60" alt={props.title} />
      </div>
      <div>
        <h3 className="w-2/3 font-sans text-24 font-medium leading-tight text-gray-dark-12 lg:text-34">
          {props.title}
        </h3>
      </div>
      <div>
        <h3 className="typo-m w-4/5 text-gray-dark-11">{props.description}</h3>
      </div>
    </div>
  );
};

export default ExplainerCard;
