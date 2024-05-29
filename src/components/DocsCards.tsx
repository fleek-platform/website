import clsx from 'clsx';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import CardWrapper from '@components/CardWrapper';
import Text from '@components/Text';

type Feature = {
  title: string;
  description: string;
  icon: string;
  className?: string;
  url: string;
};

type BlackFeatureCardsProps = {
  title: string;
  features: Array<Feature>;
  className?: string;
};

const BlackFeatureCards: React.FC<BlackFeatureCardsProps> = ({
  title,
  features,
  className,
}) => (
  <div className="docs-cards-container">
    <PageSection>
      <div className="relative">
        <div className="py-40 text-center font-sans text-20 font-medium leading-[100%] md:text-25 2xl:text-39">
          {title}
        </div>
      </div>
      <div
        className={clsx(
          'grid grid-cols-1 gap-20 p-40 pt-0 lg:grid-cols-3',
          className,
        )}
      >
        <img
          src="/svg/dotted-squiggle-bg.svg"
          alt="bg-squiggle"
          className="absolute left-0 top-0 h-full w-full"
          // TODO: original has support for blur, solve
          // placeholder="blur"
          width={1440}
          height={540}
        />
        {features.map((feature, index) => (
          <CardWrapper key={index} className={clsx('border-lg')}>
            <a href={feature.url}>
              <div className="flex flex-col items-center gap-16 py-16 text-center lg:items-start lg:text-start">
                <img
                  src={feature.icon}
                  alt="globe with bolt"
                  width={64}
                  height={64}
                />
                <Text
                  style="h5"
                  className="max-w-[250px] whitespace-pre-wrap text-gray-dark-12"
                >
                  {feature.title}
                </Text>
                <Text style="m" className="text-gray-dark-11">
                  {feature.description}
                </Text>
              </div>
            </a>
          </CardWrapper>
        ))}
      </div>
    </PageSection>
  </div>
);

export default BlackFeatureCards;
