import { IoIosSearch } from 'react-icons/io';
import '@styles/supportPage.css';

function HomePageHero() {
  return (
    <div className="flex items-center justify-center bg-[#111111]">
      <div className="w-full  py-[12rem]">
        <div className="mb-[3rem] text-center">
          <h1 className="text-[3.4rem] font-semibold">How can we help you?</h1>
        </div>

        <div className="mx-auto mb-[4rem]  mt-[1rem] w-[38%] rounded-[8px] border-white/30 bg-[#FFFFFF]/10 px-[1.5rem] py-[1.25rem] focus-within:border-[.1px] focus-within:bg-[#FFFFFF]/25 hover:border-[.1px] hover:bg-[#FFFFFF]/25">
          <div className="input-container flex items-center gap-[1rem] ">
            <div>
              <IoIosSearch className="focus:text-blue-600" fontSize={27} />
            </div>
            <form className="w-full  text-[#9BA1A6]">
              <input
                className="w-full border-none bg-transparent text-[2rem] outline-none placeholder:text-[#ECEDEE] focus:placeholder:text-[#9BA1A6]"
                type="search"
                aria-label="Search"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageHero;
