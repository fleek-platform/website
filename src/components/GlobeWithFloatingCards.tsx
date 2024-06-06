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
  return (
    <Container>
      <PageSection rounded="all-big">
        <div className="overflow-hidden py-48 lg:pb-56 lg:pt-60">
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
              <div className="flex justify-center gap-16">
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
                <img
                  src="/svg/elliptical-squiggle-bg.svg"
                  alt="bg-squiggle"
                  className="absolute bottom-0 left-0 right-0 top-0 -z-1 m-auto hidden w-full scale-125 bg-blend-difference lg:block"
                />
                <img
                  src="/svg/elliptical-squiggle-bg-mobile.svg"
                  alt="bg-squiggle"
                  className="absolute left-0 top-0 -z-1 m-auto h-full w-full lg:hidden"
                />
                <div className="relative mx-auto hidden h-[62rem] w-[110rem] rounded-12  lg:block  "></div>
                <div
                  className={`${showPlayer ? 'hidden' : ''} cursor-pointer`}
                  onClick={() => setShowPlayer(true)}
                >
                  <img
                    src="/svg/player.svg"
                    alt="Fleek"
                    className="absolute left-1/2 top-1/2 z-3 hidden -translate-x-1/2 -translate-y-1/2  transform-gpu  bg-[#1c1c1c] lg:block"
                  />
                  <img
                    width={525}
                    height={450}
                    src="/svg/video-bg.svg"
                    alt="Fleek"
                    className="absolute left-1/2 top-1/2 z-2 hidden -translate-x-1/2 -translate-y-1/2 scale-[1.55] transform-gpu rounded-12  bg-[#1c1c1c] lg:block"
                  />
                </div>
                <iframe
                  width={525}
                  height={310}
                  src={` ${showPlayer ? 'https://www.youtube.com/embed/I7n7JFhUKeA?autoplay=1&loop=1&playlist=I7n7JFhUKeA&modestbranding=1&showinfo=0&controls=1&mute=1' : 'https://www.youtube.com/embed/I7n7JFhUKeA'}`}
                  title="Fleek Edge-Optimize Cloud Platform"
                  className="z-0 absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 scale-150 transform-gpu  rounded-12 border-2  border-ui-mid-grey bg-[#1c1c1c] lg:block"
                  allow="autoplay"
                  frameBorder="0"
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
