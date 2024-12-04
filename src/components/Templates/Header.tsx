import Text from '@components/Text';
import settings from '@base/settings.json';
import { Button } from '@components/Button';

const Header: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[1rem]">
      <Text
        as="h1"
        className="text-[16px] font-medium leading-[22px] text-neutral-11 lg:text-[16px]"
      >
        {settings.templatesPage.title}
      </Text>
      <Text className="text-[34px] font-bold leading-[46px] text-neutral-12 lg:text-[34px]">
        {settings.templatesPage.subTitle}
      </Text>
      <Text className="max-w-[640px] text-center text-[18px] font-normal leading-[24px] text-neutral-11 lg:text-[18px]">
        {settings.templatesPage.description}
      </Text>

      <Button
        size="sm"
        variant="app-primary"
        href={settings.templatesPage.ctaTargetUrl}
        className="mt-[1.25rem]"
      >
        {settings.templatesPage.ctaLabel}
      </Button>
    </div>
  );
};

export default Header;
