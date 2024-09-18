import React from 'react';
import ExplainerCard from '@components/ExplainerCard';

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
    description: 'The Fleek Edge helps your app load lightning fast worldwide.',
  },
  {
    icon: '/svg/ddos-icon.svg',
    title: 'DDoS Protection',
    description:
      'Using either the Platform, CLI, or SDK you can build how you want.',
  },
  {
    icon: '/svg/monitoring-icon.svg',
    title: 'Monitoring & Alerting',
    description:
      'Invite your team, share deploy previews, test builds and more.',
  },
  {
    icon: '/svg/ssl-icon.svg',
    title: 'Domains & SSL',
    description: 'The Fleek Edge helps your app load lightning fast worldwide.',
  },
];

const ExplainerBlocks: React.FC = () => {
  return (
    <div className="border-t">
      <div className="flex flex-col gap-24 text-center">
        <h3 className="typo-h5 pt-64 text-gray-dark-12 lg:typo-h4">
          Enjoy the (Developer) Experience
        </h3>
      </div>
      <div className="relative grid gap-24 overflow-hidden py-64 sm:grid-cols-2 sm:gap-44 lg:grid-cols-3 lg:py-80">
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
          src="/svg/dotted-squiggle-bg.svg"
          className="absolute top-1/3 -z-1 hidden scale-110 lg:block"
        />
      </div>
    </div>
  );
};

export default ExplainerBlocks;
