import { Swiper, SwiperSlide } from 'swiper/react';

import '@styles/supportPage.css';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { youtubeEmbedVideos } from './config';

type UsefulVideosProps = {
  pageOriginURL: string;
};

export type YoutubeEmbedVideoProps = {
  id: string;
} & UsefulVideosProps;

function UsefulVideos({ pageOriginURL }: UsefulVideosProps) {
  return (
    <div className="mx-auto mt-[20px] w-[85%] max-w-[768px] lg:w-full">
      <div>
        <h2 className="my-[1rem] text-[1.5rem] font-semibold xl:text-[2rem]">
          Useful Videos
        </h2>
      </div>
      <div className="swiper-container relative h-full">
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
              <VideoCard {...youtubeVideo} pageOriginURL={pageOriginURL} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function VideoCard({ id, pageOriginURL }: YoutubeEmbedVideoProps) {
  const videoSrc = `https://www.youtube.com/embed/${id}?enablejsapi=1&origin=${pageOriginURL}`;
  return (
    <div className="xl:w-full">
      <iframe
        className="relative z-20 h-[200px] w-full md:h-[260px]"
        id={id}
        allowFullScreen
        height={200}
        width={350}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title="YouTube video player"
        src={videoSrc}
      ></iframe>
    </div>
  );
}

export default UsefulVideos;
