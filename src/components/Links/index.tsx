import { Button } from '@components/Button';
import IconSocial from '@components/IconSocial';
import { FaArrowUp, FaYoutube } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import BiweeklySubscription from '@components/BiweeklySubscription';
import { SocialButton } from './SocialButton';
import settings from '@base/settings.json';

// To change the image, replace the import banner from '@content/blog/{category}/{blog-folder-name}/{image}.png'; with the new image path. For example,
import banner from '@content/blog/announcements/introducing-fleek-edge-sgx/sgxservicefleek.png';
import { LinkButton } from './LinkButton';

const Links = () => {
  const newsletterFeatureFlag = false;

  return (
    <div className="text flex max-w-[348px] flex-col gap-10 rounded-[0.75rem] border-ui-mid-grey bg-[#111] p-10">
      <p className="text-[12px]">Featured post</p>
      <img
        src={banner.src}
        className="rounded-[0.75rem] border border-ui-mid-grey"
      />
      <div className="flex flex-row gap-10">
        <SocialButton
          href={settings.site.resources.discordFleekCommunityUrl}
          ariaLabel="Fleek Discord"
        >
          <IconSocial icon="discord" />
        </SocialButton>

        <SocialButton
          href={settings.site.resources.fleekTwitterUrl}
          ariaLabel="Fleek X/Twitter account"
        >
          <FaXTwitter fontSize={19} className="mt-2 text-gray-dark-11" />
        </SocialButton>

        <SocialButton
          href="https://www.youtube.com/@fleekxyz/videos"
          ariaLabel="Fleek Youtube account"
        >
          <FaYoutube fontSize={19} className="mt-2 text-gray-dark-11" />
        </SocialButton>
      </div>

      <LinkButton
        href={settings.site.production.url}
        ariaLabel="Fleek website"
        label="Website"
      />

      <LinkButton href="/blog/" ariaLabel="Fleek Blog" label="Blog" />

      <LinkButton href="/docs/" ariaLabel="Fleek docs" label="Documentation" />

      <Button variant="primary-ghost" className="w-full" size="sm">
        <a
          aria-label="Fleek X/Twitter account"
          href="https://app.fleek.xyz/"
          rel="noopener noreferrer"
          target="_blank"
          className="w-full"
        >
          Sign up for Fleek
        </a>
      </Button>

      {newsletterFeatureFlag && (
        <>
          <hr className="border-ui-mid-grey" />

          <BiweeklySubscription />
        </>
      )}
    </div>
  );
};

export default Links;
