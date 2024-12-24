import { useState } from 'react';
import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import type { Options, Page } from '../types';
import { Characterfile } from './Characterfile';
import ElizaModule from '@components/Eliza';

export const Navigation = () => {
  const [page, setPage] = useState<Page>('getStarted');
  const [options, setOptions] = useState<Options | null>(null);

  const goTo = (page: Page, options?: Options) => {
    if (options) {
      setOptions(options);
    } else {
      setOptions(null);
    }
    setPage(page);
  };

  const pages: Record<Page, React.ReactNode> = {
    getStarted: <GetStarted goTo={goTo} />,
    upload: <ElizaModule />,
    characterfile: (
      <Characterfile goTo={goTo} template={options?.forwardProps.template} />
    ),
    review: <></>,
    env: <></>,
  };

  return <Layout>{pages[page]}</Layout>;
};
