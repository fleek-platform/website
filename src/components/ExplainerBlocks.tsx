import React from 'react';
import ExplainerCard from '@components/ExplainerCard';
import Container from './Container';
import PageSection from './PageSection';

const List1 = [
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
];
const List2 = [
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

type props = {
  index: number;
  header: string;
};

const ExplainerBlocks: React.FC<props> = ({ index, header }) => {
  function ListSelector() {
    if (index == 1) {
      return List1;
    } else if (index == 2) {
      return List2;
    }
    return List2;
  }

  var List = ListSelector();

  return (
    <Container>
      <PageSection rounded={'all-big'}>
        <div className="flex flex-col gap-24 text-center">
          {/* <TextGlowHoverEffect style="h4" align="center"> */}
          <h2 className="typo-h5 pt-64 text-gray-dark-12 lg:typo-h4">
            {header}
          </h2>
          {/* </TextGlowHoverEffect> */}
        </div>
        <div
          className={
            'relative flex flex-col gap-44 overflow-hidden px-10 py-64 lg:flex-row  lg:px-42 lg:py-80'
          }
        >
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
      </PageSection>
    </Container>
  );
};

export default ExplainerBlocks;
