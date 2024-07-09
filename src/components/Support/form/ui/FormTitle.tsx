type FormTitleProps = {
  title: string;
  subTitle: string;
};

function FormTitle({ title, subTitle }: FormTitleProps) {
  return (
    <>
      <h1 className="text-[3.2rem] font-medium text-ui-faded-gray md:text-[3.5rem] xl:text-[4rem]">
        {title}
      </h1>

      <span className="text-[1rem] sm:text-[1.3rem] xl:text-[1.4rem]">
        {subTitle}
      </span>
    </>
  );
}

export default FormTitle;
