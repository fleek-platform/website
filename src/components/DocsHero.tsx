import PageSection from '@components/PageSection';
import Text from './Text';
import ButtonYellow from './ButtonYellow';
import ButtonGray from './ButtonGray';

type Props = {
  title: string;
  description: string;
};

const DocsHero = ({ title, description }: Props) => (
  <div className="docs-hero-container">
    <PageSection className="overflow-hidden bg-black" rounded="all-big">
      <div className="pb-34">
        <Text style="h2" className="typo-h5 text-gray-dark-12 md:typo-h2">
          <h1>{title}</h1>
        </Text>
        <p className="md:typo-l">{description}</p>
        <div className="mt-12 flex gap-16">
          <div className="typo-btn-l">
            <a href="/docs/platform">
              <ButtonYellow>
                <div>Learn the platform</div>
              </ButtonYellow>
            </a>
          </div>
          <div className="typo-btn-l">
            <a href="/docs/cli">
              <ButtonGray className="flex items-center justify-center gap-12 px-10">
                <div>Use the CLI</div>
              </ButtonGray>
            </a>
          </div>
        </div>
      </div>
    </PageSection>
  </div>
);

export default DocsHero;
