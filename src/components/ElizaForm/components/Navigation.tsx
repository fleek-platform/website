import { useState } from 'react';
import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import { type Template, type Page, type Step } from '../utils/types';
import { Characterfile } from './Characterfile';
import { FormProviderCharacterBuilder } from '../hooks/useElizaForm';
import { SettingsPage } from './SettingsPage';
import { ReviewPage, type ReviewPageProps } from './ReviewPage';
import { UploadPage } from './UploadPage';

interface NavigationProps extends ReviewPageProps {}

export const Navigation: React.FC<NavigationProps> = (props) => {
  const [page, setPage] = useState<Page>('getStarted');
  const [template, setTemplate] = useState<Template>();
  const [completedStep, setCompletedStep] = useState<Step>(0);

  const goTo = (page: Page, template?: Template) => {
    setTemplate(template);
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
        template={template}
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
      <ReviewPage goTo={goTo} onDeployBtnClick={props.onDeployBtnClick} />
    ),
  };

  return (
    <FormProviderCharacterBuilder>
      <Layout>{pages[page]}</Layout>
    </FormProviderCharacterBuilder>
  );
};
