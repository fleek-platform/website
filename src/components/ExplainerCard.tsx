import type { Props } from 'astro';
import React from 'react';
import Text from './Text';

type CardProp = {
  icon: string;
  title: string;
  description: string;
};

const ExplainerCard: React.FC<CardProp> = (props) => {
  return (
    <div className="rounded-16 bg-gray-dark-6 p-1">
      <div className=" flex flex-col gap-16 rounded-16 bg-gray-dark-2 p-28">
        <div>
          <img src={props.icon} className="h-60" />
        </div>
        <div>
          <h3 className="typo-xl w-2/3 text-gray-dark-12 lg:typo-h5">
            {props.title}
          </h3>
        </div>
        <div>
          <h3 className="typo-m w-4/5 text-gray-dark-11">
            {props.description}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ExplainerCard;
