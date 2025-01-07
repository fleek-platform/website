import { useState } from 'react';
import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import {
  type Template,
  type Page,
  type Step,
  type Options,
} from '../utils/types';
import { Characterfile } from './Characterfile';
import { FormProviderCharacterBuilder } from '../hooks/useElizaForm';
import { SettingsPage } from './SettingsPage';
import { ReviewPage } from './ReviewPage';
import { UploadPage } from './UploadPage';

type NavigationProps = {
  onDeployBtnClick: (characterfile: string | undefined) => void;
};

export const Navigation: React.FC<NavigationProps> = ({ onDeployBtnClick }) => {
  const [page, setPage] = useState<Page>('getStarted');
  const [options, setOptions] = useState<Options>();
  const [completedStep, setCompletedStep] = useState<Step>(0);

  const goTo = (page: Page, newOptions?: Options) => {
    setOptions(newOptions);
    setPage(page);
  };

  const completeStep = (step: Step) => {
    setCompletedStep(step);
  };

  const pages: Record<Page, React.ReactNode> = {
    getStarted: <GetStarted goTo={goTo} />,
    upload: <UploadPage goTo={goTo} />,
    characterfile: (
      <Characterfile
        goTo={goTo}
        template={options?.template}
        completedStep={completedStep}
        completeStep={completeStep}
      />
    ),
    settings: (
      <SettingsPage
        goTo={goTo}
        completedStep={completedStep}
        completeStep={completeStep}
      />
    ),
    review: (
      <ReviewPage
        goTo={goTo}
        onDeployBtnClick={onDeployBtnClick}
        from={options?.from}
      />
    ),
  };

  return (
    <FormProviderCharacterBuilder>
      <Layout>{pages[page]}</Layout>
    </FormProviderCharacterBuilder>
  );
};
