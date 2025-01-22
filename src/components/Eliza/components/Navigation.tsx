import { GetStarted } from './GetStarted';
import {
  type Page,
  type Step,
  type Options,
  type NavigationState,
} from '../utils/types';
import { Characterfile } from './Characterfile';
import { FormProviderCharacterBuilder } from '../hooks/useElizaForm';
import type { UseDeployAIAgentProps } from '../hooks/useDeployAIAgent';
import { SettingsPage } from './SettingsPage';
import { ReviewPage } from './ReviewPage';
import { UploadPage } from './UploadPage';
import trackingUtils from '@components/Tracking/trackingUtils';
import { useEffect } from 'react';

type NavigationProps = {
  onDeployBtnClick: (characterfile: string | undefined) => void;
  isOverCapacity?: boolean;
  handleNavigationStateChange: (navigationState: NavigationState) => void;
  navigationState: NavigationState;
  isLoggedIn: UseDeployAIAgentProps['isLoggedIn'];
  login: UseDeployAIAgentProps['login'];
};

export const Navigation: React.FC<NavigationProps> = ({
  onDeployBtnClick,
  handleNavigationStateChange,
  navigationState,
  isOverCapacity = false,
  login,
  isLoggedIn,
}) => {
  const updateState = (newState: Partial<NavigationState>) => {
    handleNavigationStateChange({ ...navigationState, ...newState });
  };

  const goTo = (page: Page, options?: Options) => {
    trackingUtils.trackCustomEvent('agent-ui-wizard.navigation', {
      from: navigationState.page,
      to: page,
    });
    if (page === 'getStarted') {
      updateState({ page, options, characterFile: undefined });
    } else {
      updateState({ page, options });
    }
  };

  const completeStep = (completedStep: Step) => {
    updateState({ completedStep });
  };

  const handleOnDeployClick = (characterFile: string) => {
    updateState({ characterFile });
    onDeployBtnClick(characterFile);
  };

  useEffect(() => {
    if (
      navigationState.page === 'getStarted' &&
      !navigationState.options.from
    ) {
      trackingUtils.trackCustomEvent('agent-ui-wizard.journey-init');
    }
  }, []);

  const pages: Record<Page, React.ReactNode> = {
    getStarted: (
      <GetStarted
        goTo={goTo}
        isOverCapacity={isOverCapacity}
        login={login}
        isLoggedIn={isLoggedIn}
      />
    ),
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
        from={navigationState.options?.from}
        characterfile={navigationState.characterFile}
        onDeployBtnClick={handleOnDeployClick}
      />
    ),
  };

  return (
    <FormProviderCharacterBuilder>
      {pages[navigationState.page]}
    </FormProviderCharacterBuilder>
  );
};
