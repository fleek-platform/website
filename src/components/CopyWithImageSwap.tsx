"use client";

import { useState } from "react";
import Link, { Target } from "@components/Link";
import clsx from "clsx";

import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import Button from "@components/Button";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import { down } from "@utils/screens";
import imgFleekSdkUploadToIpfs from "@images/fleek-sdk-uploadtoipfs.png";
import imgFleekCliUploadFile from "@images/fleek-cli-upload-file.png";

interface Props {
  kicker: string;
  headline: string | JSX.Element;
  copy: string;
  cta?: {
    url: string;
    text: string;
  };
}

const CopyWithImageSwap: React.FC<Props> = (props) => {
  const [swap, setSwap] = useState(false);

  return (
    <Container>
      <PageSection>
        <GridLayout className="overflow-hidden py-64 lg:py-42">
          <div className="order-2 col-span-16 flex flex-col justify-center text-center lg:order-none lg:col-span-8 lg:text-left">
            <div className="typo-caption-m mb-12 text-ui-white">
              {props.kicker}
            </div>
            <TextGlowHoverEffect style="h5">
              <h1 className="typo-h5 mb-24 text-ui-white">{props.headline}</h1>
            </TextGlowHoverEffect>
            <p className="typo-m lg:typo-l">{props.copy}</p>
            {props.cta && (
              <div className="mt-48">
                <Link
                  href={props.cta.url}
                  target={Target.Blank}
                  className="inline-block"
                >
                  <Button>{props.cta.text}</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="order-1 col-span-16 lg:order-none lg:col-span-7" onMouseOver={() => setSwap(true)} onMouseLeave={() => setSwap(false)}>
            <div className="aspect-h-10 aspect-w-16 relative mb-16 lg:mb-0">
              <div className="absolute bottom-0 left-0 right-0 top-0">
                <div
                  className={clsx(
                    "flex cursor-pointer transition duration-500 ease-in-out",
                    {
                      "-translate-x-full": swap,
                    }
                  )}
                >
                  <img
                    src={imgFleekSdkUploadToIpfs.src}
                    sizes={`${down("md")} 100vw, 50vw`}
                    className={clsx(
                      "flex-shrink-0 object-contain transition duration-500",
                      {
                        "translate-x-full scale-50 opacity-0": swap,
                      }
                    )}
                    alt="upload to ipfs with the fleekxyz sdk"
                  />
                  <img
                    src={imgFleekCliUploadFile.src}
                    className={clsx(
                      "flex-shrink-0 object-contain transition duration-500",
                      {
                        "scale-90": !swap,
                      }
                    )}
                    sizes={`${down("md")} 100vw, 50vw`}
                    alt="upload to ipfs with the fleekxyz cli"
                  />
                </div>
              </div>
            </div>
          </div>
        </GridLayout>
      </PageSection>
    </Container>
  );
};

export default CopyWithImageSwap;
