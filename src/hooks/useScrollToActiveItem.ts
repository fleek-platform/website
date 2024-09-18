import { useEffect, useRef } from 'react';

export const useScrollToActiveItem = (isActive: boolean) => {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const scrollOffset = 20;

  useEffect(() => {
    if (isActive && containerRef.current) {
      const activeItem = document.querySelector('.active-menu-item');
      if (activeItem && containerRef.current) {
        const activePosY =
          activeItem.getBoundingClientRect().top -
          containerRef.current.getBoundingClientRect().top -
          scrollOffset;
        containerRef.current.scrollTo({
          top: containerRef.current.scrollTop + activePosY,
          behavior: 'auto',
        });
      }
    }
  }, [isActive]);

  return { containerRef };
};
