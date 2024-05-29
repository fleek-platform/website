import React from 'react';
import ButtonGray from './ButtonGray';
import PricingButton from './PricingButton';

export type Props = {
  title: string;
  description: string;
  cost: number | String;
  features: string[];
  border?: string;
  cta?: string;
  coloredBtn?: boolean;
  btnBg?: string;
  fontColor?: string;
};

const PricingCard: React.FC<Props> = (props) => {
  return (
    <>
      <style>
        {`
            .mb-16 ul li:last-child {
              padding-bottom: 0;
            }
          `}
      </style>
      <div className="flex flex-col gap-12 rounded-16 border border-gray-dark-6 bg-gray-dark-2 p-20">
        <div>
          <h3 className="typo-xl-bold text-left text-gray-dark-12">
            {props.title}
          </h3>
        </div>
        <div className="w-4/5">
          <p className="typo-m text-left text-gray-dark-11">
            {props.description}
          </p>
        </div>
        <div>
          <p className="typo-m text-left text-gray-dark-12">
            $ <span className="typo-h5">{props.cost}</span> /mo
          </p>
          <p className="typo-s mt-3 text-left">+ Overage</p>
        </div>
        <div className="my-12 bg-gray-dark-6 p-[1px]" />
        <div className="mb-16">
          <ul>
            {props.features.map((item, index) => {
              return (
                <li key={index} className="flex items-center gap-12 pb-12">
                  <img
                    src={'/svg/bolt-white.svg'}
                    alt="fleek bolt icon"
                    className="h-20"
                  />
                  <p className="typo-s">{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
        {props.coloredBtn ? (
          <PricingButton bg={props.btnBg} fontColor={props.fontColor}>
            <p className="typo-s capitalize">{props.cta}</p>
          </PricingButton>
        ) : (
          <ButtonGray
            border={props.border}
            className="flex items-center justify-center gap-12 px-10 "
          >
            <div>{props.cta}</div>
          </ButtonGray>
        )}
      </div>
    </>
  );
};

export default PricingCard;
