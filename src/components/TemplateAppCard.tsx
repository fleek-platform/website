import CardWrapper from './CardWrapper';

type TemplateAppCardProps = {
  title: string;
  description: string;
  image: string;
  icon: {
    src: string;
    alt: string;
  };
};

const TemplateAppCard = ({
  title,
  description,
  icon,
  image,
}: TemplateAppCardProps) => (
  <CardWrapper className="rounded-10" image={image}>
    <div className="flex h-full w-full flex-col justify-between gap-15 rounded-10 bg-gray-dark-2 p-16 lg:max-w-[240px] lg:p-0">
      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between">
          <div className="typo-m-strong text-gray-dark-12">{title}</div>
        </div>
        <p className="typo-s mr-40 text-gray-dark-13 lg:mr-0">{description}</p>
      </div>
      {/* <div className="typo-caption-s cursor-pointer text-right">
        try it &gt;
      </div> */}
    </div>
  </CardWrapper>
);

export default TemplateAppCard;
