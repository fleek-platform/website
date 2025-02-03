import Text from '@components/Text';
import { BarChart, Calendar, CodeTag, RocketShip } from '@components/Icons';
import type { Template } from '../types';
import ContentBox from '@components/ContentBox';
import settings from '@base/settings.json';

const Separator = () => (
  <div className="separator my-10 border-b-1 border-b-neutral-8" />
);

interface DetailItemProps {
  icon: React.ReactNode;
  detailValue?: string | number;
  detailLabel?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({
  icon,
  detailValue,
  detailLabel,
}) => (
  <>
    <div className="mb-2 flex items-center">
      <span className="mr-2 h-15 w-15">{icon}</span>
      <div className="ml-6">
        {detailValue && (
          <Text as="p" style="xs" className="mb-2 font-medium">
            {detailValue}
          </Text>
        )}
        {detailLabel && (
          <Text as="p" style="xs" className="text-neutral-9">
            {detailLabel}
          </Text>
        )}
      </div>
    </div>
    <Separator />
  </>
);

const { reportAbuseUrl } = settings.site.resources;

interface TemplateSpecsProps {
  template: Template;
}

export const TemplateSpecs: React.FC<TemplateSpecsProps> = ({ template }) => {
  const deploymentsAmount = template.dynamicData?.usageCount;
  return (
    <ContentBox variant="narrow" className="!h-[fit-content] !bg-neutral-1">
      <Text
        as="h3"
        style="l"
        className="mb-12 !text-[20px] !font-bold !leading-[28px] text-neutral-11"
      >
        Details
      </Text>

      <DetailItem
        icon={<Calendar />}
        detailValue={template.repository.creation_date}
        detailLabel="Creation date"
      />

      {deploymentsAmount && (
        <DetailItem
          icon={<BarChart />}
          detailValue={deploymentsAmount}
          detailLabel="Deployments"
        />
      )}

      <DetailItem
        icon={<CodeTag />}
        detailValue={template.framework.name}
        detailLabel="Framework"
      />

      <DetailItem
        icon={<RocketShip />}
        detailValue={template.category.name}
        detailLabel="Category"
      />

      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-12 md:text-16"
        href={reportAbuseUrl}
      >
        Report template for abuse
      </a>
    </ContentBox>
  );
};
