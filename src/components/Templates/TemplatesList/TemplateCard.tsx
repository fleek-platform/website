import ContentBox from '@components/ContentBox';
import type { Template } from '../types';
import { cn } from '@utils/cn';

interface TemplateCardProps {
  template: Template;
  className?: string;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  className,
}) => {
  const contributor = template.repository.contributors?.[0];

  return (
    <a
      key={template.id}
      href={`/templates/${template.slug}`}
      className={cn('block transition-colors', className)}
    >
      <ContentBox
        variant="narrow"
        className="flex flex-col transition-all duration-200 hover:border-neutral-9"
        footerComponent={
          <div className="relative font-plex-sans">
            <h3 className="mb-[1rem] text-[16px] font-bold leading-[22px] text-neutral-12">
              {template.name}
            </h3>

            {template.framework && (
              <img
                className="absolute right-0 top-0 h-28 w-28 rounded-full"
                src={template.framework.avatar}
                alt={`${template.framework.name} icon`}
              />
            )}

            <p className="mt-12 line-clamp-2 break-words text-[14px] font-normal leading-[20px] text-neutral-11 lg:text-[14px]">
              {template.description}
            </p>

            {contributor && (
              <div className="mt-12">
                <div className="flex items-center text-[12px] font-normal leading-[16px]">
                  <span className=" text-neutral-11">Added by</span>

                  <img
                    className="mx-6 h-24 w-24 rounded-full"
                    src={contributor.avatar_url}
                    alt={`${contributor.name} avatar`}
                  />

                  <span className="text-neutral-12">{contributor.name}</span>
                </div>
              </div>
            )}
          </div>
        }
        contentClassName="!p-0"
      >
        <img
          className="h-[128px] w-full object-cover"
          src={template.banner}
          alt={`${template.name} banner image`}
        />
      </ContentBox>
    </a>
  );
};
