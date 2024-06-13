import Container from '@components/Container';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import ButtonGray from './ButtonGray';
import ButtonYellow from './ButtonYellow';
import React, { useState } from 'react';
import type { WritableAtom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { isOpen } from '@base/store';

type Prop = {
  isOpen: WritableAtom<boolean>;
};

const GlobeWithFloatingCards: React.FC<Prop> = (props) => {
  const $isCartOpen = useStore(isOpen);

  const [showPlayer, setShowPlayer] = useState(false);
  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <Container>
      <PageSection rounded="all-big">
        <div className="overflow-hidden py-48 lg:pb-48 lg:pt-60">
          <GridLayout>
            <div className="col-span-16 mb-32 flex flex-col gap-16 text-center lg:col-span-12 lg:col-start-3 lg:mb-14 lg:gap-24">
              <h2 className="typo-h5 text-ui-white lg:typo-h2">
                Build Lightning Fast
              </h2>

              <p className="typo-m text-[#B4B4B4] lg:typo-l">
                Fleek is an edge-optimized cloud platform. Effortlessly build,
                ship and <br />
                scale highly performant apps.
              </p>
              <div className="flex flex-col justify-center gap-16 sm:flex-row">
                <div className="typo-btn-l">
                  <a
                    href="https://app.fleek.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
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
                <div
                  className="typo-btn-l"
                  onClick={() => isOpen.set(!$isCartOpen)}
                >
                  <ButtonGray className="flex items-center justify-center gap-12 px-10 ">
                    <div>Stay Updated</div>
                  </ButtonGray>
                </div>
              </div>
            </div>
            <div className="col-span-16 ">
              <div className="relative overflow-y-clip">
                <div className="relative mx-auto hidden h-[62rem] w-[110rem] rounded-12  lg:block  "></div>
                <div
                  className={`${showPlayer ? 'hidden' : ''} cursor-pointer`}
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
              </div>
            </div>
          </GridLayout>
        </div>
      </PageSection>
    </Container>
  );
};

export default GlobeWithFloatingCards;
