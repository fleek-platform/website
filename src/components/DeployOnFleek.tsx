import type { RoundedType } from '@components/PageSection';
import Container from './Container';
import PageSection from '@components/PageSection';
import DeployWithImage from './DeployWithImage';

interface Props {
  rounded?: RoundedType;
}

const DeployOnFleek: React.FC<Props> = ({ rounded }) => (
  <DeployWithImage
    kicker="deployment"
    floatingImageEffect
    headline={<>Deploy Apps in a Flash</>}
    copy="Link your repo and go live. Deploy from a Git Provider or the Fleek CLI."
    cta={{ url: 'https://app.fleek.xyz/', text: 'try it out' }}
    rounded={rounded}
  />
);

export default DeployOnFleek;

// className="pb-64 pt-24 xl:py-40"
