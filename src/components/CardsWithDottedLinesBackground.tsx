import Link, { Target } from '@components/Link';
import { Container } from './v2/LandingPage/Container/Container';
import { Text } from './v2/LandingPage/Text/Text';
import { Button } from './v2/Button/Button';

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
}

const CardsWithDottedLinesBackground: React.FC<Props> = (props) => (
  <Container classNameOuterContainer="py-[72px]">
    <div className="col-span-16 flex flex-col gap-48 lg:col-span-12 lg:col-start-3">
      <div className="flex flex-col gap-24 text-center">
        <Text as="h3">{props.headline}</Text>
        {props.copy && <p className="typo-l">{props.copy}</p>}
      </div>
      <div className="relative">
        <div className="flex w-full flex-col gap-54">
          {props.cardSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-16 lg:gap-8">
              <div className="grid gap-8 lg:grid-cols-3 lg:gap-30 lg:gap-x-24">
                {section.cards.map(({ title, description, cta, image }) => (
                  <Link
                    href={cta.url}
                    key={title}
                    target={Target.Blank}
                    rel="noreferrer noopener"
                    className="group overflow-hidden rounded-12 border border-gray-dark-5 transition-all hover:scale-[1.02]"
                  >
                    <figure className="h-144 overflow-clip">
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-all group-hover:opacity-80"
                      />
                    </figure>
                    <div className="space-y-8 bg-gray-dark-2 p-16 font-plex-sans transition-colors group-hover:bg-gray-dark-3">
                      <p className="text-16 font-bold text-gray-dark-12">
                        {title}
                      </p>
                      <p className="text-14 text-gray-dark-11">{description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {props.cta && (
            <Button
              href={props.cta.url}
              target={Target.Blank}
              rel="noreferrer noopener"
              variant="secondary"
              className="mx-auto"
            >
              {props.cta.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  </Container>
);

export default CardsWithDottedLinesBackground;
