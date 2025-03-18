import type { CollectionEntry } from 'astro:content';

import settings from '@base/settings.json';
import { Button } from '@components/Button';
import IconSocial from '@components/IconSocial';
import BiweeklySubscription from '@components/BiweeklySubscription';
import Link, { Target } from '@components/Link';

import { SocialButton } from './SocialButton';
import { LinkButton } from './LinkButton';

interface LinksProps {
  featuredPost: CollectionEntry<'blog'>;
}

// TODO: fleek dashboard, app URL should be computed
// from env var. See href fleek.xyz
const Links: React.FC<LinksProps> = ({ featuredPost }) => {
  const newsletterFeatureFlag = false;

  return (
    <div className="text flex max-w-[348px] flex-col gap-10 rounded-[0.75rem] border-ui-mid-grey bg-[#111] p-10 md:max-w-[1024px] md:p-[24px]">
      <p className="text-[12px] md:text-[28px] md:font-semibold">
        Featured post
      </p>
      {featuredPost?.data?.thumbnail && (
        <Link
          href={`blog/${featuredPost.slug}`}
          className="relative max-h-[300px] max-w-[535px] overflow-hidden rounded-[0.75rem] border border-ui-mid-grey"
        >
          <img
            src={featuredPost.data.thumbnail.src}
            alt={featuredPost.data.title}
            height={featuredPost.data.thumbnail.height}
            width={featuredPost.data.thumbnail.width}
          />
          <h3 className="absolute bottom-0 mt-2 w-full bg-[rgba(0,0,0,0.65)] p-10 text-left text-[12px] font-semibold text-gray-dark-12 md:p-15 md:text-[24px]">
            {featuredPost.data.title}
          </h3>
        </Link>
      )}

      <div className="flex flex-row gap-10">
        <SocialButton
          href={settings.site.resources.discordFleekCommunityUrl}
          ariaLabel="Fleek Discord"
        >
          <IconSocial
            icon="discord"
            className="mt-2 text-[19px] text-gray-dark-11 md:h-48 md:w-48 md:p-[4px] md:text-[30px]"
          />
        </SocialButton>

        <SocialButton
          href={settings.site.resources.fleekTwitterUrl}
          ariaLabel="Fleek X/Twitter account"
        >
          <IconSocial
            icon="twitter"
            className="mt-8 text-[19px] text-gray-dark-11 md:mx-auto md:mt-[20px] md:h-48 md:w-fit md:text-[30px]"
          />
        </SocialButton>

        <SocialButton
          href="https://www.youtube.com/@fleekxyz/videos"
          ariaLabel="Fleek Youtube account"
        >
          <IconSocial
            icon="youtube"
            className="mt-8 text-[19px] text-gray-dark-11 md:mx-auto md:mt-[20px] md:h-48 md:w-fit md:text-[30px]"
          />
        </SocialButton>
      </div>

      {settings.linksPage.links &&
        settings.linksPage.links.map((link) => (
          <LinkButton
            href={link.href}
            ariaLabel={link.ariaLabel}
            label={link.label}
            className="md:h-38 md:p-[14px] md:text-[16px]"
          />
        ))}

      <Button
        variant="primary-ghost"
        className="w-full md:h-[48px] md:text-[18px]"
        size="sm"
        aria-label="Fleek Platform"
        href="https://fleek.xyz"
        rel="noopener noreferrer"
        target={Target.Blank}
      >
        Sign up for Fleek
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
