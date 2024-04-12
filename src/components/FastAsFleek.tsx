import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import Text from "@components/Text";
import ExternalLink from "@components/ExternalLink";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";
import imgFleekGlobe from "@images/fleek-globe.png";

// TODO: Move to settings
const FEATURES = [
  {
    label: "IMPROVE SEO",
    icon: {
      src: "/svg/seo-icon.svg",
      alt: "Improve your SEO",
    },
  },
  {
    label: "REDUCE BOUNCE RATES",
    icon: {
      src: "/svg/bounce-icon.svg",
      alt: "Reduce bounce rates",
    },
  },
  {
    label: "GET MORE USERS",
    icon: {
      src: "/svg/hosting-icon.svg",
      alt: "Get more users",
    },
  },
];

const FastAsFleek = () => (
  <Container>
    <PageSection className="overflow-hidden rounded-48">
      <GridLayout className="py-40 h-[540px]">
        <div className="absolute top-[-200px] left-[-300px]">
          <img
            src={imgFleekGlobe.src}
            alt="Fleek Globe"
            width={1177}
            height={1177}
            className="mix-blend-screen hidden md:block transform-gpu"
          />
        </div>
        <div className="flex flex-col gap-30 col-span-14 col-start-2 lg:col-start-9 lg:col-span-7 justify-center">
          <div className="flex flex-col text-center lg:text-start gap-15">
            <TextGlowHoverEffect style="h4">
              <Text style="h4" className="text-ui-white">Fast as Fleek</Text>
            </TextGlowHoverEffect>
            <Text className="text-ui-light-grey">
              Your users hate slow loading
              <ExternalLink href="https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/" className="ml-5"/>. {""}
              That’s why we deploy everything to the Fleek Edge, making your app lightning fast all over the world.</Text>
          </div>
          <div className="flex flex-col w-full gap-5">
            {FEATURES.map(({ label, icon }) => (
              <div key={label} className="flex items-center w-full self-stretch gap-10 rounded-full bg-ui-black py-5 pl-15 pr-20 lg:max-w-[304px] z-1 border-1 border-ui-dark-grey">
                <img {...icon} width={40} height={40} /> 
                <Text style="caption-s">{label}</Text>
              </div>
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default FastAsFleek;
