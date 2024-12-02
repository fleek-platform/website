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
  gradientClassName?: string;
  gradientLocation?: 'left' | 'right';
  image?: React.ReactNode;
  headerClassName?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  titleH1,
  subText,
  headerClassName,
  align = 'center',
  backgroundElement,
  className,
  gradientClassName,
  gradientLocation = 'left',
  image,
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
        {image && <div className={styles.image}>{image}</div>}

        <div
          className={clsx(
            gradientLocation === 'left'
              ? styles.gradientLeft
              : styles.gradientRight,
            gradientClassName,
          )}
        />

        <div className={clsx(styles.header, headerClassName)}>
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
      </div>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Section;
