import { Button } from '@components/Button';
import IconSocial from '@components/IconSocial';
import { FaArrowUp, FaYoutube } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import BiweeklySubscription from '@components/BiweeklySubscription';
import { SocialButton } from './SocialButton';
import settings from '@base/settings.json';
import { LinkButton } from './LinkButton';
import type { CollectionEntry } from 'astro:content';
import Link from '@components/Link';

interface LinksProps {
  featuredPost: CollectionEntry<'blog'>;
}

const Links: React.FC<LinksProps> = ({ featuredPost }) => {
  const newsletterFeatureFlag = false;

  return (
    <div className="text flex max-w-[348px] flex-col gap-10 rounded-[0.75rem] border-ui-mid-grey bg-[#111] p-10">
      <p className="text-[12px]">Featured post</p>
      {featuredPost.data.thumbnail && (
        <Link
          href={featuredPost.slug}
          className="relative overflow-hidden rounded-[0.75rem] border border-ui-mid-grey"
        >
          <img
            src={featuredPost.data.thumbnail.src}
            alt={featuredPost.data.title}
            height={featuredPost.data.thumbnail.height}
            width={featuredPost.data.thumbnail.width}
          />
          <h3 className="absolute bottom-0 mt-2 bg-[rgba(0,0,0,0.65)] p-10 text-right text-[12px] font-semibold text-gray-dark-12 ">
            {featuredPost.data.title}
          </h3>
        </Link>
      )}
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
