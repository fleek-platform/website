import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import { type Page, type Step, type Options } from '../utils/types';
import { Characterfile } from './Characterfile';
import { FormProviderCharacterBuilder } from '../hooks/useElizaForm';
import { SettingsPage } from './SettingsPage';
import { ReviewPage } from './ReviewPage';
import { UploadPage } from './UploadPage';

export type NavigationState = {
  options: Options;
  page: Page;
  completedStep: Step;
  characterFile: string | undefined;
};

type NavigationProps = {
  onDeployBtnClick: (characterfile: string | undefined) => void;
  isOverCapacity?: boolean;
  handleNavigationStateChange: (navigationState: NavigationState) => void;
  navigationState: NavigationState;
};

export const Navigation: React.FC<NavigationProps> = ({
  onDeployBtnClick,
  handleNavigationStateChange,
  navigationState,
  isOverCapacity = false,
}) => {
  const updateState = (newState: Partial<NavigationState>) => {
    handleNavigationStateChange({ ...navigationState, ...newState });
  };

  const goTo = (page: Page, newOptions?: Options) => {
    if (page === 'getStarted') {
      updateState({ page, options: newOptions, characterFile: undefined });
    } else {
      updateState({ page, options: newOptions });
    }
  };

  const completeStep = (step: Step) => {
    updateState({ completedStep: step });
  };

  const handleOnDeployClick = (characterFile: string | undefined) => {
    updateState({ characterFile });
    onDeployBtnClick(characterFile);
  };

  const pages: Record<Page, React.ReactNode> = {
    getStarted: <GetStarted goTo={goTo} isOverCapacity={isOverCapacity} />,
    upload: <UploadPage goTo={goTo} />,
    characterfile: (
      <Characterfile
        goTo={goTo}
        template={navigationState.options?.template}
        completedStep={navigationState.completedStep}
        completeStep={completeStep}
      />
    ),
    settings: (
      <SettingsPage
        goTo={goTo}
        completedStep={navigationState.completedStep}
        completeStep={completeStep}
      />
    ),
    review: (
      <ReviewPage
        goTo={goTo}
        onDeployBtnClick={handleOnDeployClick}
        from={navigationState.options?.from}
      />
    ),
  };

  return (
    <FormProviderCharacterBuilder>
      <Layout>{pages[navigationState.page]}</Layout>
    </FormProviderCharacterBuilder>
  );
};
