import React, { useState } from 'react';
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
      className="BigDocIntroCard relative flex items-center justify-between rounded-12 bg-gray-dark-3 p-16 !text-gray-dark-11 no-underline ring-gray-dark-8 hover:cursor-pointer hover:bg-gray-dark-4 active:bg-gray-dark-3"
    >
      <div className="flex w-full gap-5">
        <div className={`SmallDocIntroCard mx-5 rounded-12 p-1`} />
        <div className="w-full">
          <div className="relative flex w-full items-center justify-between">
            <div className="typo-btn-action text-white">{title}</div>
            {icon ? (
              <div>
                <img src={icon} alt={description} className="w-20 " />
              </div>
            ) : (
              <div className="arrow absolute right-0">→</div>
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
