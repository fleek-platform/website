const Container: React.FC<React.PropsWithChildren> = (props) => {
  return <div className="container px-8 sm:px-16">{props.children}</div>;
};

export default Container;
