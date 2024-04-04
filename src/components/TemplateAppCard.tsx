import CardWrapper from "./CardWrapper";

type TemplateAppCardProps = {
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

const TemplateAppCard = ({
  title,
  description,
  icon,
}: TemplateAppCardProps) => (
  <CardWrapper className="rounded-10">
    <div className="flex h-full w-full flex-col justify-between gap-15 rounded-10 bg-ui-black p-16 lg:max-w-[240px] lg:p-0">
      <div className="flex flex-col gap-15">
        <div className="flex w-full justify-between">
          <div className="typo-caption-l text-ui-white">{title}</div>
          <img src={icon.src} alt={icon.alt} width={32} height={32} />
        </div>
        <p className="typo-s">{description}</p>
      </div>
      <div className="typo-caption-s cursor-pointer text-right">
        try it &gt;
      </div>
    </div>
  </CardWrapper>
);

export default TemplateAppCard;
