import clsx from 'clsx';

import Container from '@components/Container';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import Button from '@components/Button';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
import Text from './Text';
import type { RoundedType } from '@components/PageSection';
import Link, { Target } from '@components/Link';

import { down } from '@utils/screens';

const list = [
  {
    icon: '/svg/serverless-icon.svg',
    title: 'DECENTRALIZED STORAGE',
  },
  {
    icon: '/svg/compute-icon.svg',
    title: 'VERIFIABLE COMPUTE',
  },
  {
    icon: '/svg/gateways-icon.svg',
    title: 'DECENTRALIZED CDN',
  },
];

type OptionalProps =
  | {
      // TODO: Verify as original was import type { StaticImageData } from "next/image";
      image: string;
      children?: never;
    }
  | {
      image?: never;
      children: React.ReactNode;
    };

type Props = {
  kicker: string;
  headline: string | JSX.Element;
  copy: string;
  cta?: {
    url: string;
    text: string;
  };
  floatingImageEffect?: boolean;
  inverse?: boolean;
  className?: string;
  rounded?: RoundedType;
};

type CardProp = {
  icon: string;
  title: string;
};

const Card: React.FC<CardProp> = (props) => {
  return (
    <div className="basis-1/3 rounded-16 bg-gray-dark-3 p-16">
      <div className="flex  w-full justify-center">
        <div className=" w-fit rounded-16 bg-gray-dark-6 p-1">
          <div className="flex min-w-60 justify-center rounded-16 bg-gray-dark-1 p-12 px-12 ">
            <img src={props.icon} />
          </div>
        </div>
      </div>
      <div className="mt-16 text-center text-gray-dark-12">
        <Text style="caption-s">{props.title}</Text>
      </div>
    </div>
  );
};

const ImageWithCopy: React.FC<Props & OptionalProps> = (props) => {
  return (
    <Container>
      <PageSection rounded={props.rounded}>
        <div className={props?.className || 'pb-64 pt-64 lg:py-80'}>
          <GridLayout>
            <div
              className={clsx(
                'col-span-16 flex justify-center lg:col-span-8',
                props.inverse && 'lg:col-start-9',
              )}
            >
              <div className="">
                {props.children}
                {!props.children && props.image && (
                  <img
                    className="object-contain mix-blend-screen"
                    src={props.image}
                    alt=""
                    sizes={`${down('lg')} 100vw, 50vw`}
                    width={600}
                  />
                )}
              </div>
            </div>
            <div className="col-span-16 flex flex-col items-center justify-center lg:col-span-8 lg:items-start">
              {/* <div className="typo-caption-m mb-12 text-ui-white">
                {props.kicker}
              </div> */}
              <h1 className="typo-h5 my-24 text-center text-gray-dark-12 lg:typo-h4 lg:text-start">
                {props.headline}
              </h1>
              <p className="typo-m text-center lg:typo-l lg:text-start">
                {props.copy}
              </p>
              <div className="mt-42 flex flex-col gap-20 lg:flex-row">
                {list.map((item, index) => {
                  return (
                    <Card icon={item.icon} title={item.title} key={index} />
                  );
                })}
              </div>
            </div>
          </GridLayout>
        </div>
      </PageSection>
    </Container>
  );
};

export default ImageWithCopy;
