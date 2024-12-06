import ContentBox from '@components/About/ContentBox';
import Text from '@components/Text';

interface TemplateScreenshotProps {
  screenShotUrl: string;
}

export const TemplateScreenshot: React.FC<TemplateScreenshotProps> = ({
  screenShotUrl,
}) => {
  return (
    <ContentBox variant="narrow">
      <Text
        as="h3"
        style="l"
        className="mb-12 !text-[20px] !font-bold !leading-[28px] text-neutral-12"
      >
        Screenshot
      </Text>
      <img
        alt="Template preview"
        className="mb-4 h-auto w-full rounded-5 border-1 border-neutral-6 object-cover"
        src={screenShotUrl}
      />
    </ContentBox>
  );
};
