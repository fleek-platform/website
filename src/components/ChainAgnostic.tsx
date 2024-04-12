import IconsCollectionWithHeadline from "@components/IconsCollectionWithHeadline";
import settings from '@base/settings.json'

const ChainAgnostic = () => {
  return (
    <IconsCollectionWithHeadline
      headline="Everybody can be #OnFleek"
      subheadline={
        <div className="flex items-center justify-center gap-16">
          <img
            src="/images/bolt.png"
            alt="fleek bolt icon"
            className="h-32 w-16"
          />
          <div className="typo-caption-m lg:typo-caption-l">
            chain agnostic
          </div>
          <img
            src="/images/bolt.png"
            alt="fleek bolt icon"
            className="h-32 w-16"
          />
        </div>
      }
      items={settings.homepage.chainAgnostic.icons}
    />
  );
}

export default ChainAgnostic;
