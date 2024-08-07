import clsx from 'clsx';

type ButtonProps = {
  isDisabled?: boolean;
};

function Button({ isDisabled }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={clsx(
        'mb-[.6rem] mt-[2.5rem] rounded-[8px] bg-yellow-dark-4 px-[1.5em] py-[0.5em] text-center text-[1.6rem] text-yellow-dark-11 shadow-md transition duration-100 ease-in-out hover:bg-yellow-dark-5 xl:mb-[1rem] xl:mt-[4rem] xl:text-[1.8rem]',
        {
          'cursor-not-allowed opacity-60': isDisabled,
        },
      )}
    >
      Submit
    </button>
  );
}

export default Button;
