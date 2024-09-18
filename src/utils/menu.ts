import settings from '@base/settings.json';

export const hasCustomTitlesByDirectoryNameOverride = ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) => {
  const customTitlesByDirectoryName: Record<string, string> =
    settings.docs.menu.customTitlesByDirectoryName;

  if (slug in customTitlesByDirectoryName) {
    return customTitlesByDirectoryName[slug];
  }

  return title;
};

export const customFilterByDirectoryName = ({ name }: { name: string }) => {
  const customFilterByDirectoryNameOverride: Record<string, string> =
    settings.blog.customFilterByDirectoryName;

  return customFilterByDirectoryNameOverride[name]
    ? customFilterByDirectoryNameOverride[name]
    : name;
};

export const scrollToActiveItem = ({
  container,
  item,
}: {
  container: string;
  item: string;
}) => {
  const scrollableContainer = document.querySelector(container);
  const activeItem = document.querySelector(item);

  if (scrollableContainer && activeItem) {
    const scrollOffset =
      activeItem.getBoundingClientRect().top -
      scrollableContainer.getBoundingClientRect().top;

    scrollableContainer.scrollTo({
      top: scrollableContainer.scrollTop + scrollOffset - 20,
    });
  }
};
