import React from 'react';
type DocIntroCardProps = {
  title: string;
  description?: string;
  href: string;
  icon?: string;
};

const DocIntroCard: React.FC<DocIntroCardProps> = ({
  title,
  description,
  href,
  icon,
}) => {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-12 bg-gray-dark-3 p-16 !text-gray-dark-11 no-underline ring-gray-dark-8 hover:cursor-pointer hover:bg-gray-dark-4 active:bg-gray-dark-3"
    >
      <div className="flex w-full gap-5">
        <div className="mx-5 rounded-12 bg-yellow p-1" />
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <div className="typo-btn-action text-white">{title}</div>
            {icon && (
              <div>
                <img src={icon} alt={description} className="w-20 " />
              </div>
            )}
          </div>
          {description && (
            <div className="typo-btn-s-normal">{description}</div>
          )}
        </div>
      </div>
    </a>
  );
};

export default DocIntroCard;
