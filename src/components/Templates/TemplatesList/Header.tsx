import Text from '@components/Text';
import settings from '@base/settings.json';
import { Button } from '@components/Button';

import styles from './Header.module.css';

export const Header: React.FC = () => {
  if (!settings.templatesPage) {
    console.error('Missing templatesPage settings.');
  }

  const { title, subTitle, description, ctaTargetUrl, ctaLabel } =
    settings.templatesPage;

  return (
    <div className={styles.wrapper}>
      <Text as="h1" className={styles.title}>
        {title}
      </Text>
      <Text className={styles.subtitle}>{subTitle}</Text>
      <Text className={styles.description}>{description}</Text>

      <Button
        size="sm"
        variant="app-primary"
        href={ctaTargetUrl}
        className={styles.cta}
        aria-label={ctaLabel}
      >
        {ctaLabel}
      </Button>
    </div>
  );
};
