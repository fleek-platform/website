import ContentBox from '@components/ContentBox';
import type { Template } from '../types';
import { cn } from '@utils/cn';
import { GoGear } from 'react-icons/go';
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
      href={`/templates/${template.slug}/`}
      className={cn('block transition-colors', className)}
    >
      <ContentBox
        variant="narrow"
        className="flex flex-col transition-all duration-200 hover:border-neutral-9"
        footerComponent={
          <div className="relative font-plex-sans">
            <h3 className="mb-[1rem] text-[13px] font-bold leading-[22px] text-neutral-12 lg:text-[16px]">
              {template.name}
            </h3>

            {template.framework ? (
              <img
                className="absolute right-0 top-0 size-24 rounded-full lg:size-28"
                src={template.framework.avatar}
                alt={`${template.framework.name} icon`}
              />
            ) : (
              <GoGear className="absolute right-0 top-0 size-24 lg:size-28" />
            )}

            <p className="mt-12 line-clamp-2 break-words text-[11px] font-normal leading-[16px] text-neutral-11 lg:text-[14px] lg:leading-[20px]">
              {template.description}
            </p>

            {contributor && (
              <div className="mt-12">
                <div className="flex items-center text-[10px] font-normal leading-[13px] lg:text-[12px] lg:leading-[16px]">
                  <span className=" text-neutral-11">Added by</span>

                  <img
                    className="mx-6 h-20 w-20 rounded-full lg:h-24 lg:w-24"
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
