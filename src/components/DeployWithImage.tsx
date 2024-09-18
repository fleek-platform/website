import clsx from 'clsx';
import { down } from '@utils/screens';
import type { RoundedType } from '@components/PageSection';
import { Text } from './v2/LandingPage/Text/Text';
import { Container } from './v2/LandingPage/Container/Container';

const IconList = [
  {
    icon: '/svg/git-integration-icon.svg',
    description: 'Git integration, actions & check runs',
  },
  {
    icon: '/svg/zig-zag-icon.svg',
    description: 'Deploy previews with every pull request',
  },
  {
    icon: '/svg/ns-icon.svg',
    description: 'automatic updates on every push, with zero downtime ',
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
  description: string;
};

const Card: React.FC<CardProp> = (props) => {
  return (
    <div className="basis-1/3 rounded-16 bg-gray-dark-3 p-16">
      <div className=" w-fit rounded-16 bg-gray-dark-6 p-1">
        <div className="flex min-w-60 justify-center rounded-16 bg-gray-dark-1 p-8">
          <img src={props.icon} />
        </div>
      </div>
      <div className="mt-16 font-plex-sans text-[1.28rem] font-medium uppercase tracking-[0.256rem] text-gray-dark-12">
        {props.description}
      </div>
    </div>
  );
};

const DeployWithImage: React.FC<Props & OptionalProps> = (props) => {
  return (
    <Container
      lightSide="left"
      className="flex flex-col-reverse gap-44 lg:flex-row"
    >
      <div className="col-span-16 flex basis-7/12 flex-col items-center justify-center lg:col-span-8 lg:items-start">
        <div className="space-y-24">
          <Text as="h3">{props.headline}</Text>
          <Text variant="description">{props.copy}</Text>
        </div>
        <div className="flex flex-col gap-20 text-gray-dark-12 lg:mt-48 lg:flex-row">
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
          'col-span-16 flex basis-5/12 justify-center lg:col-span-8',
          props.inverse && 'lg:col-start-9',
        )}
      >
        <img
          className=""
          src={'/svg/deploy-to-repo.svg'}
          alt=""
          sizes={`${down('lg')} 100vw, 50vw`}
          width={600}
        />
      </div>
      <div className="col-span-16 flex basis-7/12 flex-col items-center justify-center lg:col-span-8 lg:hidden lg:items-start">
        <h3 className="typo-h5 mb-24 mr-64 text-left text-gray-dark-12 lg:typo-h4 lg:text-start">
          {props.headline}
        </h3>

        <p className="typo-m mr-64 text-left lg:typo-l lg:text-start">
          {props.copy}
        </p>
      </div>
    </Container>
  );
};

export default DeployWithImage;
