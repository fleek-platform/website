import Container from "@components/Container";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
import TransparentCard from "@components/TransparentCard";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
// @ts-ignore
import imgRepoImage from "@images/repo.png?w=516&format=webp";

// TODO: Move to settings
const CICDFeatures = [
  {
    icon: {
      src: "/svg/git-integration-icon.svg",
      alt: "Git Integration",
      width: 32,
      height: 48,
    },
    description: "Git integration, actions & check runs",
  },
  {
    icon: {
      src: "/svg/zig-zag-icon.svg",
      alt: "Deploy Previews",
      width: 43,
      height: 44,
    },
    description: "Deploy previews with every pull request",
  },
  {
    icon: {
      src: "/svg/ns-icon.svg",
      alt: "Name Services Updates",
      width: 32,
      height: 32,
    },
    description: "Automated DNS, ENS, SSL, IPFS & CDN updates",
  },
];

const ContinuousDelivery = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-40 lg:py-80 gap-y-20">
        <img
          src={imgRepoImage}
          alt="Fleek Site Preview"
          className="hidden lg:block col-span-6 col-start-10"
          // TODO: check what the original ideia was for blur
          // as this block was a nextjs img component
          // placeholder="blur"
        />
        <div className="flex flex-col gap-48 col-span-16 lg:col-start-1 lg:col-span-9 lg:max-w-[670px]">
          <div className="flex flex-col text-center lg:text-start gap-24">
            <TextGlowHoverEffect style="h4">
              <Text style="h4" as="h4">
                CI/CD the way you want it
              </Text>
            </TextGlowHoverEffect>
            <Text className="text-ui-light-grey">Whether you want Fleek to handle the entire build and deployment, or you want a custom CI/CD flow, we got you.</Text>
          </div>
          <div className="flex flex-col lg:flex-row gap-20 px-10">
            {CICDFeatures.map((feature) => (
              <TransparentCard key={feature.description} {...feature}>
                <Text style="caption-s" className="col-span-3 whitespace-pre-line">{feature.description}</Text>
              </TransparentCard>
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default ContinuousDelivery;
