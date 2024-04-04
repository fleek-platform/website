import Text from "./Text";

type WhiteIconProps = {
  title: string;
  image: string;
};

const WhiteIcon = ({ title, image }: WhiteIconProps) => (
  <div className="flex h-120 w-120 flex-col items-center gap-16">
    <img
      src={image}
      alt={`${title} icon`}
      className="h-64 w-64"
    />
    <Text style="m">{title}</Text>
  </div>
);

export default WhiteIcon;
