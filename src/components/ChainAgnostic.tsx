import IconsCollectionWithHeadline from "@components/IconsCollectionWithHeadline";
import settings from '@base/settings.json'

import type { ReactNode } from 'react';

type Props = {
  optImgBolt: ReactNode;
}

const ChainAgnostic = ({
  optImgBolt
}: Props) => {
  return (
    <IconsCollectionWithHeadline
      headline="Everybody can be #OnFleek"
      subheadline={
        <div className="flex items-center justify-center gap-16">
          {optImgBolt}
          <div className="typo-caption-m lg:typo-caption-l">
            chain agnostic
          </div>
          {optImgBolt}
        </div>
      }
      items={settings.homepage.chainAgnostic.icons}
    />
  );
}

export default ChainAgnostic;
