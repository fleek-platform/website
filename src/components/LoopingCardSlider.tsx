import { Swiper, SwiperSlide } from "swiper/react";
import Marquee from "react-fast-marquee";

import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import CardWrapper from "@components/CardWrapper";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

import type { ReactNode } from "react";

interface Card {
  bannerImage: ReactNode;
  title: string | JSX.Element;
  icon: ReactNode;
  domain: string;
  cta: {
    url: string;
  };
}

interface Props {
  headline: string;
  cards: Array<Card>;
}

const Card: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <CardWrapper key={card.domain} noInnerPadding>
      <div className="aspect-h-1 aspect-w-2 relative overflow-hidden rounded-tl-12 rounded-tr-12 lg:w-240">
        {card.bannerImage}
      </div>
      <div className="p-16">
        <div className="mb-16 flex items-center gap-8">
          <div className="relative h-32 w-32">
            {card.icon}
          </div>
          <div className="typo-caption-m text-ui-white">{card.title}</div>
        </div>
        <div className="typo-caption-s">{card.domain}</div>
      </div>
    </CardWrapper>
  );
};

const LoopingCardSlider: React.FC<Props> = (props) => {
  return (
    <Container>
      <PageSection className="overflow-hidden">
        <div className="pb-80 pt-64 lg:pb-48 lg:pt-80">
          <GridLayout>
            <div className="col-span-12 col-start-3 text-center">
              <TextGlowHoverEffect style="h5" align="center">
                <h3 className="typo-h5 text-ui-white">{props.headline}</h3>
              </TextGlowHoverEffect>
            </div>
          </GridLayout>
          <div className="hidden lg:block">
            <Marquee pauseOnHover speed={35}>
              <div className="mr-16 flex gap-16 py-48">
                {props.cards.concat(props.cards).map((card, index) => (
                  <a href={card.cta.url} target="_blank" key={index}>
                    <Card card={card} />
                  </a>
                ))}
              </div>
            </Marquee>
          </div>
          <div className="mt-46 px-16 lg:hidden">
            <Swiper
              slidesPerView={"auto"}
              centeredSlides={true}
              centeredSlidesBounds={true}
              spaceBetween={16}
              className="overflow-x-visible"
            >
              {props.cards.map((card, index) => (
                <SwiperSlide className="w-4/5 md:w-1/2" key={index}>
                  <a href={card.cta.url} target="_blank" rel="noopener noreferrer">
                    <Card card={card} />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </PageSection>
    </Container>
  );
};

export default LoopingCardSlider;
