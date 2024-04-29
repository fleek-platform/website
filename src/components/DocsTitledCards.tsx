import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import Text from '@components/Text';
import TextGlowHoverEffect from '@components/TextGlowHoverEffect';
import TransparentCard from '@components/TransparentCard';

type Items = {
 title: string;
 description: string;
 icon: {
    src: string;
    alt: string;
 };
};

type Props = {
  title: string;
  items: Items[];
}
const DocsTitledCards = ({
  title,
  items,
}: Props) => (
  <Container>
    <PageSection>
      <GridLayout className="py-40 md:px-16 xl:py-80">
        <div className="col-span-16 flex flex-col items-center gap-30 text-center lg:col-span-12 lg:col-start-3 lg:text-start">
          <TextGlowHoverEffect style="h5" align="center">
            <Text style="h5">{title}</Text>
          </TextGlowHoverEffect>
          <div className="grid-dense-flow grid gap-15 gap-x-16 lg:grid-cols-3 lg:px-10">
            {items.map((item, index) => (
              <TransparentCard
                key={index}
                {...item}
                className="lg:max-w-[325px]"
              />
            ))}
          </div>
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default DocsTitledCards;
