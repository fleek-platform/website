import React from 'react';
import { Container } from './Container';
import { Text } from './Text';

const List = [
  {
    icon: '/svg/edge-icon.svg',
    title: 'Build Seamlessly',
    description:
      'Using either the Platform, CLI, or SDK you can build how you want.',
  },
  {
    icon: '/svg/colaborate-icon.svg',
    title: 'Work Collaboratively',
    description:
      'Invite your team, share deploy previews, test builds and more.',
  },
  {
    icon: '/svg/concentric-circles-icon.svg',
    title: 'Deploy Globally',
    description: 'Fleek automatically deploys your app to 100+ edge locations.',
  },
  {
    icon: '/svg/ddos-icon.svg',
    title: 'DDoS Protection',
    description: 'Effortlessly protect your site from DDoS attacks.',
  },
  {
    icon: '/svg/monitoring-icon.svg',
    title: 'Monitoring & Alerting',
    description: 'Get insights and alerts for your app & infra usage.',
  },
  {
    icon: '/svg/ssl-icon.svg',
    title: 'Domains & SSL',
    description:
      'Seamless domain management & free SSL certificates (Lets Encrypt).',
  },
];

type CardProp = {
  icon: string;
  title: string;
  description: string;
};

const ExplainerCard: React.FC<CardProp> = (props) => {
  return (
    <div className="flex flex-col gap-16 rounded-16 border-t border-gray-dark-5 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-28">
      <div>
        <img
          src={props.icon}
          className="h-32 sm:h-60"
          alt={props.title}
          loading="lazy"
        />
      </div>
      <div>
        <p className="w-2/3 font-sans text-24 font-medium leading-tight -tracking-1 text-gray-dark-12 lg:text-34">
          {props.title}
        </p>
      </div>
      <div>
        <p className="typo-m text-balance text-gray-dark-11">
          {props.description}
        </p>
      </div>
    </div>
  );
};

const ExplainerBlocks: React.FC = () => {
  return (
    <Container classNameOuterContainer="sm:pt-[72px] sm:pb-[105px]">
      <div className="flex flex-col gap-24 sm:text-center">
        <Text as="h3">Enjoy the developer experience</Text>
      </div>
      <div className="grid gap-16 overflow-hidden pt-42 sm:grid-cols-2 sm:pt-80 lg:grid-cols-3">
        {List.map((item, index) => {
          return (
            <ExplainerCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              key={index}
            />
          );
        })}
        <img
          src="/images/circles.png"
          alt="bg-squiggle"
          className="absolute bottom-0 left-0 right-0 top-[16.5%] -z-1 m-auto hidden w-full max-w-[1500px] sm:block"
          loading="lazy"
        />
      </div>
    </Container>
  );
};

export default ExplainerBlocks;
