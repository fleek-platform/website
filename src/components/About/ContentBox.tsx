import clsx from 'clsx';
import styles from './ContentBox.module.css';

interface ContentBoxProps {
  children?: React.ReactNode;
  variant?: 'default' | 'narrow';
  footerComponent?: React.ReactNode;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  variant = 'default',
  footerComponent,
}) => {
  return (
    <div
      className={clsx(
        styles.wrapper,
        variant === 'narrow' && styles.wrapperNarrow,
      )}
    >
      <div
        className={clsx(
          styles.innerWrapper,
          variant === 'narrow' && styles.innerWrapperNarrow,
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
