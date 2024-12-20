import { useMemo, useState } from 'react';
import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import type { Page } from '../types';
import { CharacterFile } from './CharacterFile';

export const Navigation = () => {
  const [page, setPage] = useState<Page>('get-started');

  const goTo = (page: Page) => setPage(page);

  const pages: Record<Page, React.ReactNode> = useMemo(
    () => ({
      'get-started': <GetStarted goTo={goTo} />,
      characterfile: <CharacterFile goTo={goTo} />,
      review: <></>,
      env: <></>,
    }),

    [],
  );

  return <Layout>{pages[page]}</Layout>;
};
