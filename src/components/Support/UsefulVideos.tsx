import { Swiper, SwiperSlide } from 'swiper/react';

import '@styles/supportPage.css';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

function UsefulVideos() {
  return (
    <div className="mx-auto mt-[20px] max-w-[768px]">
      <div>
        <h2 className="my-[1rem] text-[2rem] font-semibold">Useful Videos</h2>
      </div>
      <div className="relative h-full">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="w-10%">
            <VideoCard />
          </SwiperSlide>
          <SwiperSlide>
            <VideoCard />
          </SwiperSlide>
          <SwiperSlide>
            <VideoCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

function VideoCard() {
  return (
    <div className="w-full">
      <iframe
        className="relative z-20"
        id="ZR6hoLODDvI"
        frameBorder="0"
        allowFullScreen
        height={200}
        width={350}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title="YouTube video player"
        src="https://www.youtube.com/embed/ZR6hoLODDvI?enablejsapi=1&amp;origin=https%3A%2F%2Fsupport.fleek.xyz&amp;widgetid=2"
      ></iframe>
    </div>
  );
}

export default UsefulVideos;
