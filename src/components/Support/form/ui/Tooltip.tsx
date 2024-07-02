import { IoIosInformationCircle } from 'react-icons/io';
import { colors } from 'tailwind.config.mjs';

function Tooltip() {
  return (
    <form action="">
      <div className="flex items-center gap-[6px] rounded-[0.5rem] border border-yellow-dark-4  p-[1rem] lg:gap-[10px] lg:px-[1.3rem] lg:py-[1.4rem] xl:px-[1.5rem] xl:py-[1.55rem]">
        <div>
          <IoIosInformationCircle
            fill={colors['yellow-dark-11']}
            fontSize={24}
            className="lg:text-[2.3rem] xl:text-[2.5rem]"
          />
        </div>

        <p className="text-[1rem] sm:text-[1.35rem] xl:text-[1.47rem]">
          Provide as much information as possible in your message so that we can
          quickly assist you.
        </p>
      </div>
    </form>
  );
}

export default Tooltip;
