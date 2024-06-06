import { IoIosSearch } from 'react-icons/io';
import '@styles/supportPage.css';
import PageSection from '@components/PageSection';

function HomePageHero() {
  return (
    <PageSection rounded="all-big">
      <div className="flex items-center justify-center ">
        <div className="w-full  py-[12rem]">
          <div className="mb-[3rem] text-center">
            <h1 className="text-[3rem] font-semibold xl:text-[3.4rem]">
              How can we help you?
            </h1>
          </div>

          <div className="mx-auto mb-[4rem]  mt-[1rem] w-[90%] rounded-[8px] border-white/30 bg-[#FFFFFF]/10 px-[1.3rem] py-[1rem] focus-within:border-[.1px] focus-within:bg-[#FFFFFF]/25 hover:border-[.1px] hover:bg-[#FFFFFF]/25 md:w-[50%] xl:w-[40%] xl:px-[1.5rem] xl:py-[1.25rem]">
            <div className="input-container flex items-center gap-[1rem] ">
              <div>
                <IoIosSearch className="focus:text-blue-600" fontSize={27} />
              </div>
              <form className="w-full  text-[#9BA1A6]">
                <input
                  className="w-full border-none bg-transparent text-[1.5rem] outline-none placeholder:text-[#ECEDEE] focus:placeholder:text-[#9BA1A6] xl:text-[2rem]"
                  type="search"
                  aria-label="Search"
                  placeholder="Search"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

export default HomePageHero;
