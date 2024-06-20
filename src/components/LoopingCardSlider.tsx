import { Swiper, SwiperSlide } from 'swiper/react';
import Marquee from 'react-fast-marquee';

import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
// TODO: needs correct replacement, check original intent
// import ExportedImage from "next-image-export-optimizer";
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';

import { down, up } from '@utils/screens';

interface Card {
  bannerImage: string;
}

interface Props {
  headline: string;
  cards: Array<Card>;
}

const Card: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div className=" relative flex h-100 justify-center  overflow-hidden rounded-16 bg-gray-dark-3 p-20 lg:h-200 lg:w-240 lg:p-36">
      <img src={card.bannerImage} alt={'Framework Image'} className="" />
    </div>
  );
};

const LoopingCardSlider: React.FC<Props> = (props) => {
  return (
    <Container>
      <PageSection className="overflow-hidden rounded-48">
        <div className="py-64 lg:py-48">
          <GridLayout>
            <div className="col-span-12 col-start-3 text-left lg:hidden">
              <TextGlowHoverEffect style="h5" align="center">
                <h3 className="typo-h5 text-ui-white">{props.headline}</h3>
              </TextGlowHoverEffect>
            </div>
          </GridLayout>
          <div className="hidden items-center lg:flex">
            <Marquee pauseOnHover speed={35}>
              <div className="mr-16 flex gap-16 ">
                {props.cards.concat(props.cards).map((card, index) => (
                  <Card card={card} />
                ))}
              </div>
            </Marquee>

            <div className="col-span-12 col-start-3 basis-1/4 px-32 text-right">
              {/* <TextGlowHoverEffect style="h5" align="center"> */}
              <h3 className="typo-h5 text-ui-white">{props.headline}</h3>
              {/* </TextGlowHoverEffect> */}
            </div>
          </div>
          <div className="min-h-130 mt-46 px-16 lg:hidden">
            <Swiper
              slidesPerView={1.75}
              centeredSlides={true}
              centeredSlidesBounds={true}
              spaceBetween={16}
              className="overflow-x-visible"
              autoplay
            >
              {props.cards.map((card, index) => (
                <SwiperSlide className="w-4/5 md:w-1/2 " key={index}>
                  <Card card={card} />
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
