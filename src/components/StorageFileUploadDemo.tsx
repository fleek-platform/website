import Container from "@components/Container";
import ExternalLink from "@components/ExternalLink";
import FileUpload from "@components/FileUpload";
import GridLayout from "@components/GridLayout";
import PageSection from "@components/PageSection";
import Text from "@components/Text";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

const FEATURES = [
  {
    label: "BUILD FASTER APPS",
    icon: {
      src: "/svg/vertical-waves-icon.svg",
      alt: "Improve your SEO",
    },
  },
  {
    label: "MAKE USERS HAPPY",
    icon: {
      src: "/svg/heart-icon.svg",
      alt: "Make users happy",
    },
  },
  {
    label: "SAVE MONEY",
    icon: {
      src: "/svg/theta-icon.svg",
      alt: "Save money",
    },
  },
]

const StorageFileUploadDemo = () => (
  <Container>
    <PageSection>
      <GridLayout className="p-16 py-32 gap-y-32 md:px-32 lg:py-42 lg:gap-x-32 xl:pl-48 xl:pr-64 xl:pt-[8.7rem] xl:pb-[7.3rem] xl:gap-x-72">
        <div className="col-span-14 col-start-2 md:col-span-8 md:col-start-1">
          <FileUpload />
        </div>
        <div className="col-span-16 md:col-span-8 md:col-start-9 flex flex-col items-start gap-30 max-w-[660px] w-full">
          <div className="flex flex-col gap-15 text-center lg:text-start">
            <TextGlowHoverEffect style="h4">
              <Text style="h4">Fast as Fleek</Text>
            </TextGlowHoverEffect>
            <Text>
              Your users want your app to load fast. That includes files, images, and all the data {""}
              <ExternalLink href="https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/" className="mr-1"/>. {""}
              With the Fleek Edge, we make that speed possible for web3 storage.
            </Text>
          </div>
          <div className="inline-flex flex-col items-center gap-10 w-full lg:w-fit lg:items-start">
            {FEATURES.map(({ label, icon }) => (
              <div key={label} className="flex self-stretch items-center gap-10 rounded-20 bg-ui-black py-8 pl-15 pr-20 shadow-dark text-center lg:text-start border-1 border-ui-dark-grey">
                <img {...icon} width={24} height={24} /> 
                <Text style="caption-s" className="w-full lg:w-fit">{label}</Text>
              </div>
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default StorageFileUploadDemo;
