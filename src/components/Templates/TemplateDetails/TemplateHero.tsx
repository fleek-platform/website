import ContentBox from '@components/ContentBox';
import type { Template } from '@utils/graphql-client/fetchTemplates';
import { ArrowLeft } from '@components/Icons';
import { GoGear } from 'react-icons/go';
import { getDemoUrl, getRepository } from '@utils/templates';

interface TemplateHeroProps {
  template: Template;
}

export const TemplateHero: React.FC<TemplateHeroProps> = ({ template }) => {
  const repository = getRepository(template);
  const { creator } = repository;

  const demoUrl = getDemoUrl(template.siteSlug);

  return (
    <ContentBox
      variant="narrow"
      contentClassName="!flex !flex-col sm:!flex-row !bg-neutral-1 !gap-20"
    >
      <img
        alt={`${template.name} template banner`}
        className="mb-4 h-auto max-h-[267px] rounded-5 object-cover sm:max-w-[43%]"
        src={template.banner}
      />

      <div className="flex w-full flex-col items-center justify-center gap-20 font-plex-sans">
        <div className="flex w-full justify-between">
          <h1 className="mb-2 text-[20px] font-bold leading-[34px] text-neutral-12 md:text-[26px]">
            {template.name}
          </h1>
          {template.framework ? (
            <img
              alt={`${template.framework.name} Framework logo`}
              className="mb-4 h-34 w-34 rounded-full"
              src={template.framework.avatar}
            />
          ) : (
            <GoGear className="size-34" />
          )}
        </div>

        <div className="flex w-full flex-col text-[12px] sm:text-[16px]">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 flex items-center"
            href={repository.repositoryUrl}
          >
            <div className="mr-10 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white">
              <img
                height={12}
                width={12}
                src="/svg/github-navbar-icon.svg"
                alt="Github icon"
                className="invert"
              />
            </div>
            <span>
              {repository.owner}
              <span className="mx-4">/</span>
              {repository.slug}
            </span>
          </a>

          {creator && (
            <div className="mb-10 flex items-center">
              <div className="mr-10 h-[22px] w-[22px] rounded-full">
                <img
                  height={22}
                  width={22}
                  className="rounded-full"
                  src={creator.avatar}
                  alt={`Contributor ${creator.username} avatar`}
                />
              </div>
              <span className="text-neutral-11">Added by</span>
              <span className="ml-5 text-neutral-12">{creator.username}</span>
            </div>
          )}

          <a
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 text-neutral-11 transition-colors"
            href={demoUrl}
          >
            <div className="flex items-center">
              <div className="mr-10 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-neutral-6">
                <ArrowLeft className="rotate-135" />
              </div>
              <span>View Demo</span>
            </div>
          </a>
        </div>
      </div>
    </ContentBox>
  );
};
