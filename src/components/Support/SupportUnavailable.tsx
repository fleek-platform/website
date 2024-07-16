import FormTitle from './form/ui/FormTitle';
import settings from '@base/settings.json';

function SupportUnavailable() {
  return (
    <div className="mx-auto my-[40px] w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]">
      <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
        <FormTitle
          title={'Support System Unavailable'}
          subTitle={
            'Our support system is currently experiencing issues. Please visit our Discord channel for assistance.'
          }
        />
        <div className="mt-[3rem]">
          <a
            href={settings.site.resources.discordFleekCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.3rem] text-yellow-dark-11 underline"
          >
            Go to Discord Channel
          </a>
        </div>
      </div>
    </div>
  );
}

export default SupportUnavailable;
