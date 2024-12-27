import { useState } from 'react';
import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import type { Page } from '../types';
import { Characterfile } from './Characterfile';
import ElizaModule from '@components/Eliza';
import { FormProviderCharacterBuilder } from '../hooks/useElizaForm';

export const Navigation = () => {
  const [page, setPage] = useState<Page>('getStarted');

  const goTo = (page: Page) => {
    setPage(page);
  };

  const pages: Record<Page, React.ReactNode> = {
    getStarted: <GetStarted goTo={goTo} />,
    upload: <ElizaModule />,
    characterfile: <Characterfile goTo={goTo} />,
    review: <></>,
    env: <></>,
  };

  return (
    <FormProviderCharacterBuilder>
      <Layout>{pages[page]}</Layout>
    </FormProviderCharacterBuilder>
  );
};
