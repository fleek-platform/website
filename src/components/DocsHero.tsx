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
      <div className="items-center px-64 pb-48 pt-24 text-center">
        <Text style="h2" className="typo-h5 text-gray-dark-12 md:typo-h2">
          <h1>{title}</h1>
        </Text>
        <p className="typo-s md:typo-l">{description}</p>
        <div className="mt-12 flex justify-center gap-16">
          <div className="typo-btn-l">
            <a
              href="https://app.fleek.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonYellow>
                <div>Learn the Platform</div>
              </ButtonYellow>
            </a>
          </div>
          <div className="typo-btn-l">
            <a
              href="https://app.fleek.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
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
