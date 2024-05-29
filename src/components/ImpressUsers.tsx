import clsx from 'clsx';

import Container from '@components/Container';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import Button from '@components/Button';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';

import type { RoundedType } from '@components/PageSection';
import Link, { Target } from '@components/Link';

import { down } from '@utils/screens';
import Text from './Text';

const IconList = [
  {
    icon: '/svg/seo-icon.svg',
    description: 'improve seo',
  },
  {
    icon: '/svg/bounce-icon.svg',
    description: 'reduce bounce rates',
  },
  {
    icon: '/svg/hosting-icon.svg',
    description: 'get more users ',
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
      children?: React.ReactNode;
    };

type Props = {
  kicker?: string;
  headline?: string | JSX.Element;
  copy?: string;
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
  description: string;
};

const Card: React.FC<CardProp> = (props) => {
  return (
    <div className="rounded-full bg-gray-dark-6 p-1 lg:w-1/2">
      <div className="flex items-center gap-12 rounded-full bg-gray-dark-3 p-16 text-gray-dark-12 ">
        <div>
          <img src={props.icon} />
        </div>

        <div className="">
          <Text style="caption-s">{props.description}</Text>
        </div>
      </div>
    </div>
  );
};

const ImpressUsers: React.FC<Props & OptionalProps> = ({ rounded }) => {
  return (
    <Container>
      <PageSection rounded={rounded}>
        <div
          className={
            'flex flex-col gap-44 overflow-hidden p-10 pb-64 pt-24 lg:relative lg:flex-row lg:px-42 lg:py-80'
          }
        >
          <div
            className={clsx(
              'col-span-16 flex basis-6/12 justify-center overflow-hidden bg-blend-screen lg:col-span-8  lg:col-start-9',
            )}
          >
            <video
              src="https://fleek.network/media/globe_animation.mp4"
              className="z-0 scale-150 transform-gpu mix-blend-screen lg:absolute lg:left-[15%] lg:top-[65%] lg:block lg:-translate-x-1/2 lg:-translate-y-1/2 lg:scale-[2.4] "
              width={520}
              height={480}
              autoPlay
            />
          </div>
          <div className="col-span-16 flex basis-7/12 flex-col items-center justify-center lg:col-span-8 lg:items-start">
            <h1 className="typo-h5 mb-24 text-center text-gray-dark-12 lg:typo-h4 lg:text-start">
              Gain More Users
            </h1>

            <p className="typo-m text-center text-gray-dark-11 lg:typo-l lg:text-start">
              Your app needs to load fast, otherwise you'll lose customers.
              Fleek runs your app in 100+ edge locations to ensure fast loading
              worldwide.
            </p>

            <div className="mt-48 flex w-full flex-col gap-8">
              {IconList.map((item, index) => {
                return (
                  <Card
                    icon={item.icon}
                    description={item.description}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </PageSection>
    </Container>
  );
};

export default ImpressUsers;
