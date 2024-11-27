import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

import styles from './BlurFade.module.css';

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
};

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  duration = 0.4,
  delay = 0,
}) => {
  return (
    <div
      className={clsx(styles.blurFade, className)}
      style={
        {
          '--animation -duration': `${duration}s`,
          '--animation-delay': `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
