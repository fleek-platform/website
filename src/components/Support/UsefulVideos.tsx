import { Swiper, SwiperSlide } from 'swiper/react';

import '@styles/supportPage.css';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { youtubeEmbedVideos } from './config';

export type YoutubeEmbedVideoProps = {
  id: string;
  src: string;
};

function UsefulVideos() {
  return (
    <div className="mx-auto mt-[20px] w-[85%] max-w-[768px]  lg:w-full">
      <div>
        <h2 className="my-[1rem] text-[1.5rem] font-semibold xl:text-[2rem]">
          Useful Videos
        </h2>
      </div>
      <div className="relative h-full">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {youtubeEmbedVideos.map((youtubeVideo) => (
            <SwiperSlide key={youtubeVideo.id}>
              <VideoCard {...youtubeVideo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function VideoCard({ id, src }: YoutubeEmbedVideoProps) {
  return (
    <div className="xl:w-full">
      <iframe
        className=" relative z-20 h-[200px] w-full md:h-[260px] lg:h-[200px]"
        id={id}
        allowFullScreen
        height={200}
        width={350}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title="YouTube video player"
        src={src}
      ></iframe>
    </div>
  );
}

export default UsefulVideos;
