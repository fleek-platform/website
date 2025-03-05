import { cn } from '@utils/cn';
import styles from './ContentBox.module.css';

interface ContentBoxProps {
  children?: React.ReactNode;
  variant?: 'default' | 'narrow';
  footerComponent?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  variant = 'default',
  footerComponent,
  className,
  contentClassName,
}) => {
  return (
    <div
      className={cn(
        styles.wrapper,
        variant === 'narrow' && styles.wrapperNarrow,
        className,
      )}
    >
      <div
        className={cn(
          styles.innerWrapper,
          variant === 'narrow' && styles.innerWrapperNarrow,
          contentClassName,
        )}
      >
        {children}
      </div>

      {footerComponent && (
        <div className={styles.footer}>{footerComponent}</div>
      )}
    </div>
  );
};

export default ContentBox;
