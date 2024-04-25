import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import Text from '@components/Text';
import TransparentCard from './TransparentCard';
import clsx from 'clsx';
import TextGlowHoverEffect from './TextGlowHoverEffect';

type Feature = {
  icon: {
    src: string;
    alt: string;
  };
  description: string;
};

interface Props {
  // TODO: verify as original was import { StaticImageData } from "next/image";
  image: string;
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
  };
}

const ImageWithTransparentCards: React.FC<Props> = ({
  image,
  features,
  headline,
  kicker,
  copy,
  inverse,
  className = '',
  imageProps,
}) => (
  <Container>
    <PageSection>
      <GridLayout className={clsx('gap-y-32 py-80', className)}>
        <div
          className={clsx(
            'col-span-16 flex justify-center lg:col-span-8',
            inverse && 'justify-start lg:col-start-9',
          )}
        >
          <img
            src={image}
            alt="Domain Management"
            // TODO: This is an attribute from a deprecated component, so add support with css etc
            // placeholder="blur"
            {...imageProps}
          />
        </div>
        <div className="col-span-16 flex flex-col gap-30 lg:col-span-8">
          <div className="flex flex-col gap-15">
            <div className="flex flex-col gap-10">
              {kicker && <Text style="caption-m">{kicker}</Text>}
              {headline && (
                <TextGlowHoverEffect style="h5">
                  <Text style="h5" className="whitespace-wrap">
                    {headline}
                  </Text>
                </TextGlowHoverEffect>
              )}
            </div>
          </div>
          {copy && <Text>{copy}</Text>}
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            {features.map((feature) => (
              <TransparentCard
                key={feature.description}
                description={feature.description}
                icon={{ ...feature.icon, width: 40, height: 40 }}
              />
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default ImageWithTransparentCards;
