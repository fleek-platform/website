import Text from '@components/Text';
import type { Template } from '@utils/graphql-client/fetchTemplates';
import { TemplateCard } from '../TemplatesList/TemplateCard';
import { Button } from '@components/Button';

interface SimilarTemplatesProps {
  templates: Template[];
}

export const SimilarTemplates: React.FC<SimilarTemplatesProps> = ({
  templates,
}) => {
  return (
    <>
      <div className="mb-12 flex flex-row justify-between">
        <Text
          as="h3"
          style="l"
          className="!text-[14px] !font-medium !leading-[28px] text-neutral-11"
        >
          Similar Templates
        </Text>

        <Button
          size="sm"
          href="/templates/"
          className="bg-neutral-2 text-neutral-11 hover:bg-neutral-4"
        >
          Browse all
        </Button>
      </div>

      <div className="flex flex-col gap-20 sm:flex-row">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            className="w-full"
          />
        ))}
      </div>
    </>
  );
};
