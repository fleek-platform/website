import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import TemplateAppCard from '@components/TemplateAppCard';
import TextGlowHoverEffect from './TextGlowHoverEffect';
import Link, { Target } from '@components/Link';
import type { RoundedType } from '@components/PageSection';
import ButtonGray from './ButtonGray';
import Text from './Text';

interface Card {
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
  cta: {
    url: string;
    text: string;
  };
  image: string;
}

interface CardSection {
  title: string;
  cards: Array<Card>;
}

interface Props {
  headline: string;
  copy?: string;
  cardSections: Array<CardSection>;
  cta?: {
    url: string;
    text: string;
  };
  rounded?: RoundedType;
}

const CardsWithDottedLinesBackground: React.FC<Props> = (props) => (
  <Container>
    <PageSection rounded={props.rounded}>
      <GridLayout className="overflow-hidden py-64 lg:py-50">
        <div className="col-span-16 flex flex-col gap-48 lg:col-span-12 lg:col-start-3">
          <div className="flex flex-col gap-24 text-center">
            <h2 className="typo-h5 text-gray-dark-12 lg:typo-h4">
              {props.headline}
            </h2>
            {props.copy && <p className="typo-l">{props.copy}</p>}
          </div>
          <div className="relative">
            <img
              src="/images/circles.png"
              alt="bg-squiggle"
              className="absolute  -top-44 bottom-0 left-0 right-0 -z-1 m-auto hidden w-full scale-125 lg:block"
            />
            <img
              src="/svg/elliptical-squiggle-bg-mobile.svg"
              alt="bg-squiggle"
              className="absolute left-0 top-0 -z-1 m-auto h-full w-full lg:hidden"
            />
            <div className="flex w-full flex-col gap-8 lg:m-auto lg:w-fit lg:items-center">
              {props.cardSections.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col gap-16 lg:gap-8"
                >
                  <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-30 lg:gap-x-24">
                    {section.cards.map(
                      ({ title, description, icon, cta, image }) => (
                        <Link href={cta.url} key={title} target={Target.Blank}>
                          <TemplateAppCard
                            key={title}
                            title={title}
                            description={description}
                            icon={icon}
                            image={image}
                          />
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              ))}
              {props.cta && (
                <div className="mt-12 w-full self-center lg:w-fit">
                  <Link href={props.cta.url} target={Target.Blank}>
                    <ButtonGray>
                      <Text>{props.cta.text}</Text>
                    </ButtonGray>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default CardsWithDottedLinesBackground;
