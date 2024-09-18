import { useEffect, useRef } from 'react';

export const useScrollToActiveItem = (
  activeCategory: string,
  activeSlug: string,
) => {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const itemRef = useRef<HTMLAnchorElement | null>(null);
  const scrollOffset = 20;
  const isActive = Boolean(activeCategory) || Boolean(activeSlug);

  useEffect(() => {
    if (isActive && itemRef.current && containerRef.current) {
      const activePosY =
        itemRef.current.getBoundingClientRect().top -
        containerRef.current.getBoundingClientRect().top -
        scrollOffset;
      containerRef.current.scrollTo({
        top: containerRef.current.scrollTop + activePosY,
        behavior: 'auto',
      });
    }
  }, [isActive, activeCategory, activeSlug]);

  return { containerRef, itemRef };
};
