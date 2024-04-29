import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import Button from '@components/Button';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
import Text from './Text';

type Props = {
  title: string;
  description: string;
  ctaTitle: string;  
};

const DocsHero = ({
  title,
  description,
  ctaTitle,
}: Props) => (
  <div className="docs-hero-container">
    <PageSection className="overflow-hidden" rounded="all-big">
      <GridLayout>
        <div className="col-span-16 flex items-center md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-10">
          <div className="w-full lg:scale-150 lg:self-start lg:pt-[20rem] xl:scale-125 xl:pt-[10rem] 2xl:pt-[5rem]">
            <video
              autoPlay
              muted
              playsInline
              className="animate-float delay-1000 lg:mt-[-30px]"
              // TODO: add blur support, as original
              // placeholder="blur"
            >
              <source
                src="/videos/flash-header-safari.mp4"
                type='video/mp4; codecs="hvc1"'
              />
              <source
                src="/videos/flash-header-chrome.webm"
                type="video/webm"
              />
            </video>
          </div>
        </div>
        <div className="col-span-16 flex flex-col items-center gap-16 pb-64 text-center lg:col-span-9 lg:items-start lg:gap-40 lg:py-[13.2rem] lg:text-left">
          <TextGlowHoverEffect style="h2">
            <Text style="h2" className="typo-h5 text-ui-white md:typo-h2">
              <h1>{title}</h1>
            </Text>
          </TextGlowHoverEffect>
          <p className="typo-s md:typo-l">
            {description}
          </p>
          {
            ctaTitle && (
              <a
                href="https://app.fleek.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mx-auto mt-32 md:mx-0 md:mt-0">Start Now</Button>
              </a>              
            )
          }
        </div>
      </GridLayout>
    </PageSection>
  </div>
);

export default DocsHero;
