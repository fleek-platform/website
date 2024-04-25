import Container from '@components/Container';
import ActionButton from '@components/ActionButton';
import GridLayout from '@components/GridLayout';
import PageSection from '@components/PageSection';
import Text from '@components/Text';
import TextGlowHoverEffect from './TextGlowHoverEffect';

const LiveOnTheEdge = () => (
  <Container>
    <PageSection>
      <GridLayout className="py-50">
        <div className="col-span-12 col-start-3 flex flex-col items-center gap-30 text-center lg:text-start">
          <TextGlowHoverEffect style="h4" align="center">
            <Text style="h4">Ready to live on the edge?</Text>
          </TextGlowHoverEffect>
          <ActionButton />
        </div>
      </GridLayout>
    </PageSection>
  </Container>
);

export default LiveOnTheEdge;
