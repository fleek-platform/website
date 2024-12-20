import { useMemo, useState } from 'react';
import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import type { Options, Page, Template } from '../types';

export const Navigation = () => {
  const [page, setPage] = useState<Page>('get-started');
  const [template, setTemplate] = useState<Template | undefined>(undefined);

  const goTo = (page: Page, options?: Options) => {
    if (options) {
      setTemplate(options.forwardProps.template);
    } else {
      setTemplate(undefined);
    }
    setPage(page);
  };

  const pages: Record<Page, React.ReactNode> = useMemo(
    () => ({
      'get-started': <GetStarted goTo={goTo} />,
      characterfile: '',
      // characterfile: <Characterfile goTo={goTo} template={template} />,
      review: <></>,
      env: <></>,
    }),

    [template],
  );

  return <Layout>{pages[page]}</Layout>;
};
