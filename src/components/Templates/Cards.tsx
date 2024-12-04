import settings from '@base/settings.json';
import ContentBox from '@components/About/ContentBox';

const Cards: React.FC = () => {
  return (
    <div className="mt-50 grid grid-cols-[repeat(auto-fit,272px)] justify-center gap-[20px]">
      {settings.templatesPage.data.map((template, index) => (
        <a
          key={index}
          href={`/templates/${template.slug}`}
          className="block transition-colors"
        >
          <ContentBox
            variant="narrow"
            className="hover:border-neutral-9 flex flex-col transition-all duration-200"
            footerComponent={
              <div className="relative font-plex-sans">
                <h3 className="mb-[1rem] text-[16px] font-bold leading-[22px] text-neutral-12 ">
                  {template.title}
                </h3>

                <img
                  className="absolute right-0 top-0 h-28 w-28 rounded-full"
                  src={template.icon_image_src}
                  alt={`${template.title} icon`}
                />

                <p className="mt-12 line-clamp-2 break-words text-[14px] font-normal leading-[20px] text-neutral-11 lg:text-[14px]">
                  {template.description}
                </p>

                <div className="mt-12">
                  <div className="flex items-center text-[12px] font-normal leading-[16px]">
                    <span className=" text-neutral-11">Added by</span>

                    <img
                      className="mx-6 h-24 w-24 rounded-full"
                      src={template.author_profile_image_src}
                      alt={template.added_by}
                    />

                    <span className="text-neutral-12">{template.added_by}</span>
                  </div>
                </div>
              </div>
            }
            contentClassName="!p-0"
          >
            <img
              className="h-[128px] w-full object-cover"
              src={template.poster_image_src}
              alt={template.title}
            />
          </ContentBox>
        </a>
      ))}
    </div>
  );
};

export default Cards;
