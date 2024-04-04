import Container from "@components/Container";
import PageSection from "@components/PageSection";
import GridLayout from "@components/GridLayout";
import TextGlowHoverEffect from "@components/TextGlowHoverEffect";

interface Props {
  headline: string;
  items: Array<Item>;
  subheadline?: string | JSX.Element;
}

interface Item {
  image: string;
  title: string;
}

const IconsCollectionWithHeadline: React.FC<Props> = (props) => {
  return (
    <Container>
      <PageSection>
        <GridLayout className="py-64 lg:py-80">
          <div className="col-span-16 text-ui-light-grey lg:col-span-10 lg:col-start-4">
            <TextGlowHoverEffect style="h4" align="center">
              <h2 className="typo-h5 text-center text-ui-white lg:typo-h4">
                {props.headline}
              </h2>
            </TextGlowHoverEffect>
            {props.subheadline && (
              <div className="mt-32">{props.subheadline}</div>
            )}
            <div className="mt-48 flex flex-wrap justify-center gap-16">
              {props.items.map((item) => (
                <div
                  key={item.title}
                  className="flex h-120 w-120 flex-col items-center gap-16"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} icon`}
                    className="h-64 w-64"
                  />
                  <div className="typo-m">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </GridLayout>
      </PageSection>
    </Container>
  );
};

export default IconsCollectionWithHeadline;
