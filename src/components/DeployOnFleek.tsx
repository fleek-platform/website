import { down } from '@utils/screens';
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

type CardProp = {
  icon: string;
  description: string;
};

const Card: React.FC<CardProp> = (props) => {
  return (
    <div className="flex items-center gap-16 rounded-16 border-t border-gray-dark-5 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-16 md:flex-col md:items-start">
      <div className="flex size-40 justify-center rounded-12 border border-gray-dark-5 bg-gray-dark-1 p-8 md:size-60 md:rounded-16">
        <img src={props.icon} alt={props.description} loading="lazy" />
      </div>
      <Text variant="feature">{props.description}</Text>
    </div>
  );
};

const DeployOnFleek: React.FC = () => {
  return (
    <Container gradient="left">
      <div className="flex flex-col items-center justify-between gap-20 md:flex-row">
        <div className="w-full md:max-w-[520px]">
          <div className="space-y-24">
            <Text as="h3">Deploy apps in a flash</Text>
            <Text variant="description">
              Link your repo and go live. Deploy from a Git Provider or the
              Fleek CLI.
            </Text>
          </div>
          <img
            src="/svg/deploy-to-repo.svg"
            alt="Deploy to repo"
            sizes={`${down('lg')} 100vw, 50vw`}
            className="mt-32 md:hidden"
            loading="lazy"
          />
          <div className="mt-32 grid gap-20 text-gray-dark-12 md:grid-cols-3">
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
        <img
          src={'/svg/deploy-to-repo.svg'}
          alt="Deploy to repo"
          sizes={`${down('lg')} 100vw, 50vw`}
          className="hidden w-full md:block md:max-w-[300px] lg:max-w-400"
          loading="lazy"
        />
      </div>
    </Container>
  );
};

export default DeployOnFleek;
