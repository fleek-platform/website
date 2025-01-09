import { useEffect, useRef, useState } from 'react';
import { GetStarted } from './GetStarted';
import { Layout } from './Layout';
import { type Page, type Step, type Options } from '../utils/types';
import { Characterfile } from './Characterfile';
import { FormProviderCharacterBuilder } from '../hooks/useElizaForm';
import { SettingsPage } from './SettingsPage';
import { ReviewPage } from './ReviewPage';
import { UploadPage } from './UploadPage';

type NavigationProps = {
  onDeployBtnClick: (characterfile: string | undefined) => void;
  isOverCapacity?: boolean;
  onPropsChange?: (
    options?: Options,
    page?: Page,
    completedStep?: Step,
    characterFile?: string | undefined,
  ) => void;
  initialState?: {
    page?: Page;
    options?: Options;
    completedStep?: Step;
    characterFile?: string | undefined;
  };
};

export const Navigation: React.FC<NavigationProps> = ({
  onDeployBtnClick,
  onPropsChange,
  initialState,
  isOverCapacity = false,
}) => {
  const [page, setPage] = useState<Page>(initialState?.page || 'getStarted');
  const [options, setOptions] = useState<Options | undefined>(
    initialState?.options,
  );
  const [completedStep, setCompletedStep] = useState<Step>(
    initialState?.completedStep || 0,
  );
  const [characterFile, setCharacterFile] = useState<string | undefined>(
    initialState?.characterFile || undefined,
  );
  const prevStateRef = useRef({ options, page, completedStep, characterFile });

  useEffect(() => {
    const prevState = prevStateRef.current;

    if (
      prevState.options !== options ||
      prevState.page !== page ||
      prevState.completedStep !== completedStep ||
      prevState.characterFile !== characterFile
    ) {
      onPropsChange?.(options, page, completedStep, characterFile);
      prevStateRef.current = { options, page, completedStep, characterFile };
    }
  }, [options, page, completedStep, onPropsChange, characterFile]);

  const goTo = (page: Page, newOptions?: Options) => {
    if (page === 'getStarted') {
      setCharacterFile(undefined);
    }
    setOptions(newOptions);
    setPage(page);
  };

  const completeStep = (step: Step) => {
    setCompletedStep(step);
  };

  const handleOnDeployClick = (characterFile: string | undefined) => {
    setCharacterFile(characterFile);
    onDeployBtnClick?.(characterFile);
  };

  const handleOnCharacterFileUpload = (characterFile: string | undefined) => {
    setCharacterFile(characterFile);
  };

  const pages: Record<Page, React.ReactNode> = {
    getStarted: <GetStarted goTo={goTo} isOverCapacity={isOverCapacity} />,
    upload: (
      <UploadPage
        goTo={goTo}
        onCharacterfileUpload={handleOnCharacterFileUpload}
        initialState={{ characterFile }}
      />
    ),
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
        initialState={{ characterFile }}
        onDeployBtnClick={handleOnDeployClick}
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
