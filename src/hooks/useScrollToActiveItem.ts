import { useEffect, useRef } from 'react';

export const useScrollToActiveItem = (
  activeCategory: string,
  activeSlug: string,
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLAnchorElement | null>(null);
  const isActive = Boolean(activeCategory) || Boolean(activeSlug);

  useEffect(() => {
    if (isActive && itemRef.current && containerRef.current) {
      const itemRect = itemRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const isItemVisible =
        itemRect.top >= containerRect.top &&
        itemRect.bottom <= containerRect.bottom;

      // Scroll only when the item is not visible in the screen
      if (!isItemVisible) {
        // Calculate the aproximate center position
        const containerHeight = containerRect.height;
        const itemPosY = itemRect.top - containerRect.top;
        const centerOffset = containerHeight / 2 - itemRect.height / 2;

        containerRef.current.scrollTo({
          top: containerRef.current.scrollTop + itemPosY - centerOffset,
          behavior: 'auto',
        });
      }
    }
  }, [isActive, activeCategory, activeSlug]);

  return { containerRef, itemRef };
};
