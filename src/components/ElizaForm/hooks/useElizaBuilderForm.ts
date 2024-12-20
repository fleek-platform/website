import { useState } from 'react';
import type { Character, Template } from '../types';
import { EXAMPLE_CHARACTERFILE, INITIAL_FORM } from '../constants';

export const useElizaBuilderForm = (template?: Template) => {
  const [form, setForm] = useState<Character>(
    template ? EXAMPLE_CHARACTERFILE : INITIAL_FORM,
  );

  const onFormChange = <
    T extends keyof Character,
    K extends keyof Character[T],
  >(
    formSection: T,
    nestedKeyOrData: K | Character[T],
    data?: Character[T][K],
  ) => {
    setForm((prevForm) => {
      if (typeof nestedKeyOrData === 'string' && data !== undefined) {
        const section = prevForm[formSection];

        return {
          ...prevForm,
          [formSection]: {
            ...((typeof section === 'object' && section) || {}),
            [nestedKeyOrData]: data,
          },
        };
      }

      return {
        ...prevForm,
        [formSection]: nestedKeyOrData,
      };
    });
  };

  return { form, onFormChange };
};
