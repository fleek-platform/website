import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { characterFormSchema, type CharacterFormSchema } from '../utils/schema';
import { INITIAL_FORM } from '../utils/constants';

export const FormProviderCharacterBuilder = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const methods = useForm<CharacterFormSchema>({
    defaultValues: INITIAL_FORM,
    resolver: zodResolver(characterFormSchema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const useElizaForm = () => useFormContext<CharacterFormSchema>();
