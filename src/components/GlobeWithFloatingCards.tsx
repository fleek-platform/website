import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import CardWrapper from "@components/CardWrapper";
import ExternalLink from "./ExternalLink";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

import type { ReactNode } from 'react';

type Props = {
  optImgGlobeWithBolt?: ReactNode;
}

const GlobeWithFloatingCards = ({ optImgGlobeWithBolt }: Props) => {
  return (
    <Container>
      <PageSection rounded="all-big">
        <div className="py-48 lg:pb-56 lg:pt-40">
          <GridLayout>
            <div className="col-span-16 mb-32 flex flex-col gap-16 text-center lg:col-span-12 lg:col-start-3 lg:mb-100 lg:gap-24">
              <TextGlowHoverEffect style="h2" align="center">
                <h2 className="typo-h5 text-ui-white lg:typo-h2">
                  Supercharge your web3 apps with Fleek
                </h2>
              </TextGlowHoverEffect>
              <p className="typo-l lg:typo-xl">
                Your users want fast loading apps{" "}
                <ExternalLink href="https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/" />
                . Let&apos;s give them what they want.
              </p>
            </div>
            <div className="col-span-16">
              <div className="relative">
                <div className="mx-auto hidden h-[56rem] w-[56rem] rounded-full border border-dashed border-ui-light-grey opacity-40 lg:block"></div>
                <div className="z-1 mb-8 flex flex-col gap-y-8 lg:absolute lg:left-[12%] lg:top-1/2 lg:mb-0 lg:w-[32.5rem] lg:-translate-y-1/2 lg:gap-y-48">
                  <CardWrapper>
                    <a href="https://fleek.xyz/hosting/">
                    <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                        <img src="/svg/hosting-icon.svg" />
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
                  <CardWrapper className="lg:relative lg:right-72">
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
                  <CardWrapper>
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
                </div>
                <div className="z-1 flex flex-col gap-y-8 lg:absolute lg:right-[12%] lg:top-1/2 lg:w-[32.5rem] lg:-translate-y-1/2 lg:gap-y-48">
                  <CardWrapper>
                  <a href="https://docs.fleek.xyz/docs/Storage#content-addressing" target="_blank" rel="noopener noreferrer">
                    <div className="mb-8 flex flex-col gap-8 lg:max-w-[32.5rem]">
                      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16">
                        <img src="/svg/content-addressing-icon.svg" />
                        <span className="typo-caption-m text-ui-white">
                          Content Addressing
                        </span>
                      </div>
                      <p className="typo-xs text-center lg:typo-s lg:text-start">
                        Use IPFS and/or IPNS for addressing files and data.
                      </p>
                    </div>
                    </a>
                  </CardWrapper>
                  <CardWrapper className="lg:relative lg:left-72">
                  <a href="https://docs.fleek.xyz/docs/Sites#cdn" target="_blank" rel="noopener noreferrer">
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
                  <CardWrapper>
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
                        Choose from several flavors of serverless and edge
                        functions.
                      </p>
                    </div>
                  </CardWrapper>
                </div>
                {optImgGlobeWithBolt}
              </div>
            </div>
          </GridLayout>
        </div>
      </PageSection>
    </Container>
  );
};

export default GlobeWithFloatingCards;
