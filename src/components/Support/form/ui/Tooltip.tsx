import { IoIosInformationCircle } from 'react-icons/io';

function Tooltip() {
  return (
    <form action="">
      <div className="flex items-center gap-[6px] rounded-[0.5rem] border border-ui-medium-blue p-[1rem] lg:gap-[10px] lg:px-[1.3rem] lg:py-[1.4rem] xl:px-[1.5rem] xl:py-[1.55rem]">
        <div>
          <IoIosInformationCircle
            fill="#61a5ff"
            fontSize={24}
            className="lg:text-[2.3rem] xl:text-[2.5rem]"
          />
        </div>

        <p className="text-[1rem] sm:text-[1.35rem] xl:text-[1.47rem]">
          Providing as much information as possible in your request will allow
          us to help you faster
        </p>
      </div>
    </form>
  );
}

export default Tooltip;
