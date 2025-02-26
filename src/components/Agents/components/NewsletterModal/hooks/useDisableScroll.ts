import { useEffect } from 'react';

type UseDisableScrollArgs = {
  condition: boolean;
};

export const useDisableScroll = ({ condition }: UseDisableScrollArgs) => {
  useEffect(() => {
    if (!condition) {
      return;
    }

    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = '';
    };
  }, [condition]);
};
