import { useCallback } from 'react';
import type { FieldErrors } from 'react-hook-form';
import type { CharacterSchema } from './useElizaForm';

export const useScrollToError = (
  fieldName: keyof CharacterSchema,
  errors: FieldErrors,
) => {
  return useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0 && errorKeys[0] === fieldName) {
        node.scrollIntoView({
          block: 'center',
        });
      }
    },
    [fieldName, errors],
  );
};
