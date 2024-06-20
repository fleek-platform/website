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
    icon: '/svg/bounce-icon.svg',
    description: 'Hosting, Storage, Functions',
  },
  {
    icon: '/svg/hosting-icon.svg',
    description: 'Deployment Insights ',
  },
  {
    icon: '/svg/seo-icon.svg',
    description: 'Build & Usage Logs',
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
    <div className="rounded-full bg-gray-dark-6 p-1 lg:w-2/3">
      <div className="flex items-center gap-12 rounded-full bg-gray-dark-3 p-16 ">
        <div>
          <img src={props.icon} />
        </div>

        <div className="text-gray-dark-12">
          <Text style="caption-s">{props.description}</Text>
        </div>
      </div>
    </div>
  );
};

const SeamlessUI: React.FC<Props & OptionalProps> = ({ rounded }) => {
  return (
    <Container>
      <PageSection rounded={rounded}>
        <div
          className={
            'relative flex flex-col gap-44 overflow-hidden p-10 pb-64 lg:flex-row-reverse lg:px-42 lg:py-80'
          }
        >
          <div
            className={clsx(
              'col-span-16 flex basis-6/12 justify-center overflow-hidden bg-blend-screen lg:col-span-8 lg:col-start-9',
            )}
          >
            <img
              src="/images/fleek-app.png"
              className="z-0 right-[10%] top-[80%] mr-12 hidden flex-shrink-0 translate-y-1/4 scale-[1.35] transform-gpu lg:absolute lg:right-[1%] lg:mr-0 lg:block lg:-translate-x-3/4 lg:-translate-y-[95%] lg:scale-[2.30] xl:right-[10%] xl:scale-[3.30]"
              width={200}
            />
          </div>
          <div className="relative col-span-16 flex basis-7/12 flex-col items-center justify-center  lg:col-span-8 lg:items-start">
            <h1 className="typo-h5 mb-24  text-start text-gray-dark-12 lg:typo-h4 ">
              All Your Tools,
              <br />
              One Workflow,
              <br />
              Zero Devops
            </h1>

            <p className="typo-m  mx-24 text-start lg:typo-l lg:mx-0 lg:w-3/4">
              Take your development to the next level with an easy-to-use
              interface. Focus on your code, we’ll take care of the rest.
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
          <div
            className={clsx(
              'over relative mb-[21.1rem] flex basis-6/12   justify-center rounded-48 bg-blend-screen lg:hidden',
            )}
          >
            <img
              src="/images/fleek-app-mobile.png"
              className="z-0 absolute translate-y-[0%] scale-95 transform-gpu  lg:hidden "
              height={580}
            />
          </div>
        </div>
      </PageSection>
    </Container>
  );
};

export default SeamlessUI;
