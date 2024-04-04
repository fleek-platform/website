import ExportedImage from "next-image-export-optimizer";
import clsx from "clsx";

import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import CardWrapper from "@components/CardWrapper";
import Text from "@components/Text";

type Feature = {
  title: string;
  description: string;
  icon: string;
  className?: string;
};

type BlackFeatureCardsProps = {
  features: Array<Feature>;
  className?: string;
};

const BlackFeatureCards: React.FC<BlackFeatureCardsProps> = ({ features, className }) => (
  <Container>
    <PageSection>
      <GridLayout className={clsx("py-24 lg:py-64 gap-y-10", className)}>
        <ExportedImage
          src="/svg/dotted-squiggle-bg.svg"
          alt="bg-squiggle"
          className="absolute top-0 left-0 w-full h-full"
          placeholder="blur"
          width={1440}
          height={540}
        />
        {features.map((feature, index) => (
          <CardWrapper key={index} className={clsx("border-lg col-span-16 md:col-span-16 lg:col-span-4", !index && 'lg:col-start-3')}>
            <div className="flex flex-col items-center lg:items-start gap-16 py-16 text-center lg:text-start">
              <ExportedImage
                src={feature.icon}
                alt="globe with bolt"
                width={64}
                height={64}
              />
              <Text style="h5" className="max-w-[250px] whitespace-pre-wrap">{feature.title}</Text>
              <Text style="m" className="text-ui-light-grey">{feature.description}</Text>
            </div>
          </CardWrapper>
        ))}
      </GridLayout>
    </PageSection>
  </Container>
);

export default BlackFeatureCards;
