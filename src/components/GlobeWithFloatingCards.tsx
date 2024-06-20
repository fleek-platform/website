import Container from '@components/Container';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import ButtonYellow from './ButtonYellow';
import { useState } from 'react';
import { CtaNewsletterModal } from '@components/NewsletterSubscriptionModal';

const GlobeWithFloatingCards = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [showPlayerMobile, setShowPlayerMobile] = useState(false);
  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <Container>
      <PageSection rounded="all-big">
        <div className="overflow-hidden py-48 lg:pb-48 lg:pt-60">
          <GridLayout>
            <div className="col-span-16 mb-32 flex flex-col gap-16 text-center lg:col-span-12 lg:col-start-3 lg:mb-14 lg:gap-24">
              <h2 className="typo-h5 mx-40 text-ui-white lg:typo-h2 lg:mx-0">
                Build Lightning Fast
              </h2>

              <p className="typo-m hidden text-[#B4B4B4] lg:typo-l lg:block">
                Fleek is an edge-optimized cloud platform. Effortlessly build,
                ship and <br />
                scale highly performant apps.
              </p>

              <p className="typo-m mx-40 text-[#B4B4B4] lg:typo-l lg:hidden">
                Fleek is an edge-optimized cloud platform. Effortlessly build,
                ship and scale highly performant apps.
              </p>
              <div className="flex flex-col justify-center gap-16 lg:flex-row">
                <div className="typo-btn-l ">
                  <a
                    href="https://app.fleek.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <ButtonYellow
                      border="border-yellow"
                      className="flex items-center justify-center gap-12 "
                    >
                      <div>
                        <img src="/svg/bolt-yellow.svg" />
                      </div>
                      <div>Try it Now</div>
                    </ButtonYellow>
                  </a>
                </div>
                <div className="typo-btn-l">
                  <CtaNewsletterModal />
                </div>
              </div>
            </div>
            <div className="col-span-16 ">
              <div className="relative overflow-y-clip">
                <div className="relative mx-auto hidden h-[62rem] w-[110rem] rounded-12  lg:block  "></div>
                <div
                  className={`${showPlayer ? 'hidden' : 'hidden lg:block'} cursor-pointer `}
                  onClick={() => setShowPlayer(true)}
                >
                  <img
                    src="/svg/video-bg.svg"
                    alt="Fleek"
                    className="absolute left-1/2 top-1/2 z-2 -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-12 bg-[#1c1c1c] lg:block"
                    onMouseEnter={() => setHoverEffect(true)}
                    onMouseLeave={() => setHoverEffect(false)}
                  />
                  <img
                    src="/svg/player.svg"
                    alt="Fleek"
                    className={`absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 transform-gpu ${hoverEffect ? 'scale-110' : 'scale-100'} transition-transform duration-300 ease-in-out lg:block`}
                  />
                </div>
                <iframe
                  width={793.8}
                  height={453.6}
                  src={
                    showPlayer
                      ? 'https://www.youtube-nocookie.com/embed/I7n7JFhUKeA?autoplay=1&loop=1&rel=0'
                      : 'https://www.youtube.com/embed/I7n7JFhUKeA'
                  }
                  title="Fleek Edge-Optimized Cloud Platform"
                  className="z-0 absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-12 border-2 border-ui-mid-grey bg-[#1c1c1c] lg:block"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                ></iframe>
                <div
                  className={`${showPlayerMobile ? 'hidden' : ''} cursor-pointer lg:hidden`}
                  onClick={() => setShowPlayerMobile(!showPlayerMobile)}
                >
                  <img
                    src="/svg/video-bg.svg"
                    alt="Fleek"
                    className="absolute left-1/2 top-1/2 z-2 -translate-x-1/2 -translate-y-1/2 transform-gpu  bg-[#1c1c1c] lg:block"
                    onMouseEnter={() => setHoverEffect(true)}
                    onMouseLeave={() => setHoverEffect(false)}
                  />
                  <img
                    src="/svg/player.svg"
                    alt="Fleek"
                    className={`absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 transform-gpu ${hoverEffect ? 'scale-110' : 'scale-100'} transition-transform duration-300 ease-in-out lg:block`}
                  />
                </div>
                <iframe
                  width={326.8}
                  height={187.6}
                  src={
                    showPlayerMobile
                      ? 'https://www.youtube-nocookie.com/embed/I7n7JFhUKeA?autoplay=1&loop=1&rel=0'
                      : 'https://www.youtube.com/embed/I7n7JFhUKeA'
                  }
                  title="Fleek Edge-Optimized Cloud Platform"
                  className="z-0 ,l-5 transform-gpu rounded-12 border-1 border-ui-mid-grey bg-[#1c1c1c] lg:hidden"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </GridLayout>
        </div>
      </PageSection>
    </Container>
  );
};

export default GlobeWithFloatingCards;
