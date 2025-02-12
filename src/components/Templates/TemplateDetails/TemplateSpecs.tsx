import Text from '@components/Text';
import { BarChart, Calendar, CodeTag, RocketShip } from '@components/Icons';
import type { Template } from '@utils/graphql-client/fetchTemplates';
import ContentBox from '@components/ContentBox';
import settings from '@base/settings.json';
import { formatDate } from '@utils/date';
import { getRepository } from '@utils/templates';

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
  const repository = getRepository(template);

  return (
    <ContentBox variant="narrow" className="!h-[fit-content] !bg-neutral-1">
      <Text
        as="h3"
        style="l"
        className="mb-12 !text-[20px] !font-bold !leading-[28px] text-neutral-11"
      >
        Details
      </Text>

      {repository.createdAt && (
        <DetailItem
          icon={<Calendar />}
          detailValue={formatDate({
            date: new Date(repository.createdAt),
            dateStyle: 'long',
          })}
          detailLabel="Creation date"
        />
      )}

      {template.usageCount ? (
        <DetailItem
          icon={<BarChart />}
          detailValue={template.usageCount}
          detailLabel="Deployments"
        />
      ) : null}

      <DetailItem
        icon={<CodeTag />}
        detailValue={template.framework?.name ?? 'No framework'}
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
