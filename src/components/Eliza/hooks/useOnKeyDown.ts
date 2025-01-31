import { useEffect } from 'react';

type UseOnKeyDownArgs = {
  key: string;
  condition?: boolean;
  callbackFn: () => void;
};

export const useOnKeyDown = ({
  key,
  condition = true,
  callbackFn,
}: UseOnKeyDownArgs) => {
  useEffect(() => {
    if (!condition) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callbackFn();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, condition, callbackFn]);
};
