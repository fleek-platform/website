import { Container } from './v2/LandingPage/Container/Container';
import { Text } from './v2/LandingPage/Text/Text';

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
    description: 'gain & retain more users ',
  },
];

type CardProp = {
  icon: string;
  description: string;
};

const Card: React.FC<CardProp> = (props) => {
  return (
    <div className="flex items-center gap-16 rounded-full border-t border-gray-dark-5 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-1 px-24 py-8 lg:max-w-400">
      <img className="h-24 sm:h-40" src={props.icon} />
      <Text variant="feature">{props.description}</Text>
    </div>
  );
};

const ImpressUsers: React.FC = () => {
  return (
    <Container gradient="right" classNameOuterContainer="pt-[82px] pb-[68px]">
      <div className="grid md:grid-cols-2 lg:gap-48">
        <div className="relative hidden md:block">
          <video
            className="z-0 pointer-events-none absolute left-[25%] hidden -translate-x-1/2 -translate-y-1/2 scale-[2.4] transform-gpu mix-blend-screen sm:block md:top-[65%] lg:top-[80%]"
            width={520}
            height={480}
            autoPlay
            muted
            loop
          >
            <source
              src="https://fleek.network/media/globe_animation.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div>
          <div className="space-y-24">
            <Text as="h3">Gain more users</Text>
            <Text variant="description">
              Your app needs to load fast, otherwise you'll lose customers.
              Fleek runs your app in 100+ edge locations to ensure fast loading
              worldwide.
            </Text>
          </div>

          <div className="mt-32 flex w-full flex-col gap-8">
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
        <div className="h-184 md:hidden">
          <img
            src="/svg/globe-mobile.svg"
            className="absolute bottom-0 left-1/3 -translate-x-1/4 md:hidden"
            width={520}
            height={480}
          />
        </div>
      </div>
    </Container>
  );
};

export default ImpressUsers;
