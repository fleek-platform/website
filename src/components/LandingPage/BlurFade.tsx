import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

import styles from './BlurFade.module.css';

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  inViewMargin?: string;
};

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  duration = 0.4,
  delay = 0,
  inViewMargin = '-50px',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add(styles.inView);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: inViewMargin,
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [inViewMargin]);
  return (
    <div
      ref={ref}
      className={clsx(styles.blurFade, className)}
      style={{
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};
