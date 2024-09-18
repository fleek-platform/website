import DeployWithImage from './DeployWithImage';

const DeployOnFleek: React.FC = () => (
  <DeployWithImage
    kicker="deployment"
    floatingImageEffect
    headline="Deploy apps in a flash"
    copy="Link your repo and go live. Deploy from a Git Provider or the Fleek CLI."
    cta={{ url: 'https://app.fleek.xyz/', text: 'try it out' }}
  />
);

export default DeployOnFleek;
