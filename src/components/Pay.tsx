import React from 'react';

const PayConfig: Prop[] = [
  {
    img: '/svg/pay1.svg',
    description: 'Mastercard',
  },
  {
    img: '/svg/pay6.svg',
    description: 'AMEX',
  },
  {
    img: '/svg/pay5.svg',
    description: 'VISA',
  },
  {
    img: '/svg/pay7.svg',
    description: 'Discover',
  },
  {
    img: '/svg/pay8.svg',
    description: 'Ethereum',
  },
  {
    img: '/svg/pay4.svg',
    description: 'Dai',
  },
  {
    img: '/svg/pay2.svg',
    description: 'USDC',
  },
  {
    img: '/svg/pay3.svg',
    description: 'USDT',
  },
];

export type Prop = {
  img: string;
  description: string;
};

const Card = (props: Prop) => {
  return (
    <div className="flex h-full flex-col justify-between gap-12 text-center">
      <img
        src={props.img}
        alt={props.description}
        className="max-h-[50px] min-h-[50px]"
      />
      <p className="typo-m-normal text-ui-faded-gray">{props.description}</p>
    </div>
  );
};

export default function Pay() {
  return (
    <div>
      <h2 className="typo-h5 text-center text-gray-dark-12 lg:typo-h4">
        Seamlessly Pay With Card or Crypto
      </h2>
      <div className="grid grid-cols-4 justify-items-center gap-20 px-24 py-48 lg:grid-cols-8 lg:gap-0">
        {PayConfig.map((item, index) => (
          <Card img={item.img} description={item.description} key={index} />
        ))}
      </div>
    </div>
  );
}
