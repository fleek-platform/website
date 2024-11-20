import styles from './Section.module.css';
import clsx from 'clsx';

interface SectionProps {
  title: string;
  titleH1?: boolean;
  subText?: string[];
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  backgroundElement?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  titleH1,
  subText,
  align = 'center',
  backgroundElement,
  className,
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {backgroundElement && (
        <div className={clsx(styles.backgroundElement)}>
          {backgroundElement}
        </div>
      )}
      <div
        className={clsx(
          styles.innerWrapper,
          align === 'left' && styles.alignLeft,
          align === 'right' && styles.alignRight,
        )}
      >
        <div className={styles.header}>
          {titleH1 ? (
            <h1 className={styles.titleText}>{title}</h1>
          ) : (
            <h2 className={styles.title}>{title}</h2>
          )}

          {subText &&
            subText.length > 0 &&
            subText.map((text, index) => (
              <p key={index} className={styles.subText}>
                {text}
              </p>
            ))}
        </div>
        {children && <div className={styles.content}>{children}</div>}
      </div>
    </div>
  );
};

export default Section;
