import '@styles/supportPage.css';
import PageSection from '@components/PageSection';
import SupportSearch from './form/SupportSearch';

function HomePageHero() {
  return (
    <PageSection rounded="all-big">
      <div className="flex items-center justify-center ">
        <div className="w-full py-[12rem]">
          <div className="mb-[3rem] text-center">
            <h1 className="text-[3rem] font-semibold xl:text-[3.4rem]">
              How can we help you?
            </h1>
          </div>

          <SupportSearch />
        </div>
      </div>
    </PageSection>
  );
}

export default HomePageHero;
