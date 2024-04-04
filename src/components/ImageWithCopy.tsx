import ExportedImage from "next-image-export-optimizer";
import clsx from "clsx";

import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import Button from "@components/Button";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

import type { StaticImageData } from "next/image";
import type { RoundedType } from "@components/PageSection";
import Link from "next/link";

import { down } from "@utils/screens";

type OptionalProps =
  | {
      image: StaticImageData;
      children?: never;
    }
  | {
      image?: never;
      children: React.ReactNode;
    };

type Props = {
  kicker: string;
  headline: string | JSX.Element;
  copy: string;
  cta?: {
    url: string;
    text: string;
  };
  floatingImageEffect?: boolean;
  inverse?: boolean;
  className?: string;
  rounded?: RoundedType;
};

const ImageWithCopy: React.FC<Props & OptionalProps> = (props) => {
  return (
    <Container>
      <PageSection rounded={props.rounded}>
        <div className={props?.className || "pb-64 pt-24 lg:py-80"}>
          <GridLayout>
            <div
              className={clsx(
                "col-span-16 flex justify-center lg:col-span-8",
                props.inverse && "lg:col-start-9"
              )}
            >
              <div
                className={clsx({
                  "animate-float": props.floatingImageEffect,
                })}
              >
                {props.children}
                {!props.children && props.image && (
                  <ExportedImage
                    className="object-contain mix-blend-screen"
                    src={props.image}
                    alt=""
                    sizes={`${down("lg")} 100vw, 50vw`}
                    width={600}
                  />
                )}
              </div>
            </div>
            <div className="col-span-16 flex flex-col items-center justify-center lg:col-span-8 lg:items-start">
              <div className="typo-caption-m mb-12 text-ui-white">
                {props.kicker}
              </div>
              <TextGlowHoverEffect style="h4">
                <h1 className="typo-h5 mb-24 text-center text-ui-white lg:typo-h4 lg:text-start">
                  {props.headline}
                </h1>
              </TextGlowHoverEffect>
              <p className="typo-m text-center lg:typo-l lg:text-start">
                {props.copy}
              </p>
              {props.cta && (
                <div className="mt-48">
                  <Link
                    href={props.cta.url}
                    className="inline-block"
                    target="_blank"
                  >
                    <Button>{props.cta.text}</Button>
                  </Link>
                </div>
              )}
            </div>
          </GridLayout>
        </div>
      </PageSection>
    </Container>
  );
};

export default ImageWithCopy;
