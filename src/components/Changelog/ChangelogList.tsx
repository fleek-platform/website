import ButtonYellow from '@components/ButtonYellow';
import { IconArrowUpRight } from '@components/IconArrow';
import { formatDate } from '@utils/date';
import type { CollectionEntry } from 'astro:content';
import Markdown from 'markdown-to-jsx';
import { useState } from 'react';

const CHANGELOG_LIMIT = 5;

export const ChangelogList = ({
  changelogs,
}: {
  changelogs: CollectionEntry<'changelog'>[];
}) => {
  const [visibleChangelogs, setVisibleChangelogs] = useState(CHANGELOG_LIMIT);

  const generateChangelogDetailsUrl = (
    changelog: CollectionEntry<'changelog'>,
  ) => `./${changelog.collection}/${changelog.slug}`;

  return (
    <>
      <div className="pl-8">
        {changelogs.slice(0, visibleChangelogs).map((changelog) => (
          <div
            key={changelog.id}
            className="relative border-l border-gray-dark-6 pb-48 pl-26 last:pb-0"
          >
            <div className="absolute -left-8 top-1 size-15 rounded-full border-3 border-gray-dark-2 bg-gray-dark-11 outline outline-gray-dark-6" />
            <p className="pb-16 text-14 font-medium text-yellow-dark-11">
              {formatDate({ date: changelog.data.date })}
            </p>
            <img
              src={changelog.data.image?.src}
              alt={changelog.data.desc}
              className="w-full rounded-20 border-6 border-gray-dark-3 p-0 outline outline-gray-dark-5 sm:h-400"
            />
            <article className="flex flex-col gap-24 py-24">
              <a
                href={generateChangelogDetailsUrl(changelog)}
                className="text-34 font-medium leading-tight text-gray-dark-12 hover:underline"
              >
                {changelog.data.title}
              </a>
              <div className="changelog-list relative">
                <div className="absolute bottom-0 h-80 w-full bg-gradient-to-b from-transparent to-black"></div>
                <Markdown>{changelog.body}</Markdown>
              </div>
            </article>
            <a
              href={generateChangelogDetailsUrl(changelog)}
              className="group flex items-center gap-4 text-16 text-gray-dark-12 hover:underline"
            >
              Read the announcement to learn more{' '}
              <IconArrowUpRight className="size-18 text-gray-dark-11 transition-all group-hover:ml-4" />
            </a>
          </div>
        ))}
      </div>
      <div className="self-center pt-42">
        {visibleChangelogs < changelogs.length && (
          <ButtonYellow
            onClick={() =>
              setVisibleChangelogs((prev) => prev + CHANGELOG_LIMIT)
            }
          >
            Load more
          </ButtonYellow>
        )}
      </div>
    </>
  );
};
