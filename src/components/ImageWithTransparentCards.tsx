import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
import ExportedImage from "next-image-export-optimizer";
import TransparentCard from "./TransparentCard";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import TextGlowHoverEffect from "./TextGlowHoverEffect";

type Feature = {
  icon: {
    src: string;
    alt: string;
  };
  description: string;
};

interface Props {
  image: StaticImageData;
  features: Array<Feature>;
  kicker: string;
  headline: string | JSX.Element;
  copy: string;
  inverse?: boolean;
  className?: string;
  imageProps: {
    className?: string;
    height: number;
    width: number;
  }
}

const ImageWithTransparentCards: React.FC<Props> = ({ image, features, headline, kicker, copy, inverse, className = '', imageProps }) => (
  <Container>
    <PageSection>
      <GridLayout className={clsx("py-80 gap-y-32", className)}>
        <div className={clsx("col-span-16 lg:col-span-8 flex justify-center", inverse && "lg:col-start-9 justify-start")}>
          <ExportedImage
            src={image}
            alt="Domain Management"
            placeholder="blur"
            {...imageProps}
          />
        </div>
        <div className="col-span-16 lg:col-span-8 gap-30 flex flex-col">
          <div className="flex flex-col gap-15">
            <div className="flex flex-col gap-10">
              {kicker && <Text style="caption-m">{kicker}</Text>}
              {headline && (
              <TextGlowHoverEffect style="h5">
                <Text style="h5" className="whitespace-wrap">{headline}</Text>
              </TextGlowHoverEffect>
              )}
            </div>
          </div>
          {copy && <Text>{copy}</Text>}
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {features.map((feature) => (
              <TransparentCard key={feature.description} description={feature.description} icon={{ ...feature.icon, width: 40, height: 40 }} />
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default ImageWithTransparentCards;
