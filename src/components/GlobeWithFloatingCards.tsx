import Container from '@components/Container';
import PageSection from '@components/PageSection';
import GridLayout from '@components/GridLayout';
import ButtonGray from './ButtonGray';
import ButtonYellow from './ButtonYellow';

const GlobeWithFloatingCards = () => {
  return (
    <Container>
      <PageSection rounded="all-big">
        <div className="overflow-hidden py-48 lg:pb-56 lg:pt-60">
          <GridLayout>
            <div className="col-span-16 mb-32 flex flex-col gap-16 text-center lg:col-span-12 lg:col-start-3 lg:mb-64 lg:gap-24">
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
                        <img src="/svg/bolt-white.svg" />
                      </div>
                      <div>TRY IT NOW</div>
                    </ButtonYellow>
                  </a>
                </div>
                <div className="typo-btn-l">
                  <a
                    href="https://app.fleek.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ButtonGray className="flex items-center justify-center gap-12 px-10 ">
                      <div>GET A DEMO</div>
                    </ButtonGray>
                  </a>
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
                <div className="mx-auto  hidden h-[62rem] w-[110rem] rounded-12 border-2 border-ui-mid-grey  bg-[#1c1c1c]  lg:block  "></div>
                {/* <div className="relative  z-1 mb-8 flex flex-col gap-y-8 lg:absolute lg:left-[12%] lg:top-1/2 lg:mb-0 lg:w-[32.5rem] lg:-translate-y-1/2 lg:gap-y-48 ">
                  <CardWrapper header>
                    <a href="https://fleek.xyz/hosting/">
                      <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                          <img
                            src="/svg/hosting-icon.svg"
                            className=" scale-105"
                          />
                          <span className="typo-caption-m text-ui-white lg:typo-caption-l">
                            Hosting
                          </span>
                        </div>
                        <p className="typo-xs text-center lg:typo-s lg:text-start">
                          Host web3 apps on web3 infra (IPFS, ENS, etc.).
                        </p>
                      </div>
                    </a>
                  </CardWrapper>
                  <CardWrapper header className="lg:relative lg:right-60">
                    <a href="https://fleek.xyz/storage/">
                      <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                          <img src="/svg/storage-icon.svg" />
                          <span className="typo-caption-m text-ui-white lg:typo-caption-l">
                            Storage
                          </span>
                        </div>
                        <p className="typo-xs text-center lg:typo-s lg:text-start">
                          Store on Filecoin and Arweave, addressable via IPFS.
                        </p>
                      </div>
                    </a>
                  </CardWrapper>
                  <CardWrapper header>
                    <a href="https://fleek.xyz/domains/">
                      <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                          <img src="/svg/domains-icon.svg" />
                          <span className="typo-caption-m text-ui-white lg:typo-caption-l">
                            Domains
                          </span>
                        </div>
                        <p className="typo-xs text-center lg:typo-s lg:text-start">
                          Manage ENS, DNS, and IPNS records.
                        </p>
                      </div>
                    </a>
                  </CardWrapper>
                </div> */}
                {/* <div className="z-1 flex flex-col gap-y-8 lg:absolute lg:right-[12%] lg:top-1/2 lg:w-[32.5rem] lg:-translate-y-1/2 lg:gap-y-48">
                  <CardWrapper header>
                    <a
                      href="https://docs.fleek.xyz/docs/Storage#content-addressing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                          <img src="/svg/content-addressing-icon.svg" />
                          <span className="typo-caption-m text-ui-white">
                            Content Addressing
                          </span>
                        </div>
                        <p className="typo-xs text-center lg:typo-s lg:text-start">
                          Use IPFS and/or IPNS for addressing data.
                        </p>
                      </div>
                    </a>
                  </CardWrapper>
                  <CardWrapper header className="lg:relative lg:left-60">
                    <a
                      href="https://docs.fleek.xyz/docs/Sites#cdn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                          <img src="/svg/concentric-circles-icon.svg" />
                          <span className="typo-caption-m text-ui-white lg:typo-caption-l">
                            CDN
                          </span>
                        </div>
                        <p className="typo-xs text-center lg:typo-s lg:text-start">
                          Accelerate files, data, sites, gateways, and more.
                        </p>
                      </div>
                    </a>
                  </CardWrapper>
                  <CardWrapper header>
                    <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                        <img src="/svg/compute-icon.svg" />
                        <div className="text-ui-white">
                          <span className="typo-caption-m lg:typo-caption-l">
                            Compute
                          </span>
                          <span className="font-plex-mono text-8 uppercase leading-[150%] tracking-[0.1638rem]">
                            (coming soon)
                          </span>
                        </div>
                      </div>
                      <p className="typo-xs text-center lg:typo-s lg:text-start">
                        Choose from serverless and edge functions.
                      </p>
                    </div>
                  </CardWrapper>
                </div> */}

                <video
                  src="https://fleek.network/media/globe_animation.mp4"
                  className="z-0 absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 scale-150 transform-gpu mix-blend-screen  lg:block"
                  width={520}
                  height={480}
                  autoPlay
                  loop
                  preload="auto"
                />
              </div>
            </div>
          </GridLayout>
        </div>
      </PageSection>
    </Container>
  );
};

export default GlobeWithFloatingCards;
