import ButtonOutlined from "@components/ButtonOutlined";
import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import TemplateAppCard from "@components/TemplateAppCard";
import TextGlowHoverEffect from "./TextGlowHoverEffect";
import Link from "next/link";

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
  <Container>
    <PageSection>
      <GridLayout className="py-64 lg:py-50">
        <div className="col-span-16 flex flex-col gap-48 lg:col-span-12 lg:col-start-3">
          <div className="flex flex-col gap-24 text-center">
            <TextGlowHoverEffect style="h4" align="center">
              <h2 className="typo-h5 text-ui-white lg:typo-h4">
                {props.headline}
              </h2>
            </TextGlowHoverEffect>
            {props.copy && <p className="typo-l">{props.copy}</p>}
          </div>
          <div className="relative">
            <img
              src="/svg/elliptical-squiggle-bg.svg"
              alt="bg-squiggle"
              className="absolute bottom-0 left-0 right-0 top-0 -z-1 m-auto hidden w-full lg:block"
            />
            <img
              src="/svg/elliptical-squiggle-bg-mobile.svg"
              alt="bg-squiggle"
              className="absolute left-0 top-0 -z-1 m-auto h-full w-full lg:hidden"
            />
            <div className="flex flex-col gap-30 lg:m-auto lg:w-fit lg:items-center">
              {props.cardSections.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col gap-16 lg:gap-8"
                >
                  <div className="typo-xl text-center text-ui-white lg:text-left lg:text-ui-light-grey">
                    {section.title}
                  </div>
                  <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-x-10">
                    {section.cards.map(({ title, description, icon, cta }) => (
                      <Link href={cta.url} key={title} target="_blank" rel="noopener noreferrer">
                        <TemplateAppCard
                          key={title}
                          title={title}
                          description={description}
                          icon={icon}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {props.cta && (
                <div className="self-center lg:self-end">
                  <Link href={props.cta.url} target="_blank" rel="noopener noreferrer">
                    <ButtonOutlined>{props.cta.text}</ButtonOutlined>
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
