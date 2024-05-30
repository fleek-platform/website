import type { CollectionEntry } from 'astro:content';
import settings from '@base/settings.json';

type Doc = CollectionEntry<'docs'>;
type DocWithCategory = Doc['data'] & {
  category: string;
  slug: string;
  index: boolean;
};

type SidebarItem = Pick<Doc['data'], 'title' | 'order'>;

export type SidebarData = Record<string, SidebarItem[]>;

type List = {
  slug: string;
  title: string;
  index: boolean;
}[];

export type GenerateSidebarResponse = {
  category: string;
  list: List;
  order?: number;
  title?: string;
  slug: string;
}[];

export type UserOrder = {
  category: string;
  order: number;
}[];

type UserOrderLookupTable = Record<string, number>;

export const ROOT_FALLBACK_CATEGORY = 'root';
const ROOT_INDEX = 'index';

// Normalize directory into human-friendly name
// e.g. `15-has_whitespace_and_dash-word`
// `has whitespace and dash-word`
const normalizeCategoryName = (input: string) => {
  const regex = /^\d{1,2}-(.*)$/;
  const match = input.match(regex);
  return (match ? match[1] : input).replaceAll('_', ' ');
};

type UserOrderItem = {
  category: string;
  order: number;
};

const hasCustomTitlesByDirectoryNameOverride = ({
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

export const generateSidebarDSByUserOrder = (
  allPosts: Doc[],
  userOrder: UserOrderItem[],
): GenerateSidebarResponse => {
  const data = allPosts.map((item) => {
    const hasCategory = item.id.split('/').length > 1;
    const slugSplit = item.slug.split('/');
    const category = slugSplit[0];
    const slug = slugSplit.length > 1 ? slugSplit[1] : item.slug;
    const index = slugSplit.length == 1 && item.id.includes('index');

    if (!hasCategory) {
      return {
        ...item.data,
        category: ROOT_FALLBACK_CATEGORY,
        slug: item.slug,
        index,
      };
    }

    return {
      ...item.data,
      category,
      slug,
      index,
    };
  });

  // Normalize userOrder category name
  userOrder = userOrder.map(({ category, ...fields }) => {
    return {
      ...fields,
      category: category.toLowerCase(),
    };
  });

  // Initialize the Map with empty arrays for each category
  const dataMap = new Map<string, DocWithCategory[]>(
    data.map((item) => [item.category, []]),
  );

  // Populate the Map with items for each category
  data.forEach((item) => {
    const existingItems = dataMap.get(item.category);
    if (existingItems) {
      existingItems.push(item);
    } else {
      // This should not happen if the map was initialized correctly, but it's a safeguard
      dataMap.set(item.category, [item]);
    }
  });

  // Separate categories that are in userOrder from remaining
  const userOrderCategories = new Set(userOrder.map((item) => item.category));
  const remainingCategories = data.filter(
    (item) => !userOrderCategories.has(item.category),
  );

  userOrder.sort((a, b) => a.order - b.order);

  const userOrderLookupTable = userOrder.reduce(
    (acc, item) => {
      acc[item.category] = item.order;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Create array by the order in userOrder
  const orderedUserOrderItems: DocWithCategory[] = userOrder
    .flatMap((orderItem) => dataMap.get(orderItem.category) ?? [])
    .filter((item): item is DocWithCategory => item !== undefined);

  // Sort the remaining categories alphabetically
  remainingCategories.sort((a, b) => a.category.localeCompare(b.category));

  // Combine sorted userOrder items with remaining sorted cats
  const sortedOrderedUserOrderItems = transformData(
    orderedUserOrderItems,
    userOrderLookupTable,
  );
  const orderedData: GenerateSidebarResponse = [
    ...sortedOrderedUserOrderItems,
    ...transformData(remainingCategories, userOrderLookupTable),
  ].filter((item) => item.category !== ROOT_FALLBACK_CATEGORY);

  // We'll now work with a list of data that is sorted by user preference, but we want the root items which are not in a category to be considered in ordering
  const filtered = data.filter(
    (item) => item.category == ROOT_FALLBACK_CATEGORY,
  );

  const flatten: GenerateSidebarResponse = filtered.map((item) => ({
    category: item.category,
    slug: item.slug,
    order: item.order,
    title: item.title,
    list: [],
  }));

  const join = [...flatten, ...orderedData]
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
    .filter((item) => item.slug !== ROOT_INDEX);

  return join;
};

const transformData = (
  data: DocWithCategory[],
  userOrderLookupTable: UserOrderLookupTable,
): GenerateSidebarResponse => {
  const groupedByCategory = data.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, DocWithCategory[]>,
  );

  const transformedData: GenerateSidebarResponse = Object.entries(
    groupedByCategory,
  ).map(([category, items], idx) => {
    const sortedItems = items.sort(
      (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity),
    );

    return {
      category,
      slug: category,
      order: userOrderLookupTable ? userOrderLookupTable[category] : idx,
      title: hasCustomTitlesByDirectoryNameOverride({
        title: normalizeCategoryName(category),
        slug: category,
      }),
      list: sortedItems.map((item) => ({
        slug: item.slug,
        title: hasCustomTitlesByDirectoryNameOverride({
          title: item.title,
          slug: item.slug,
        }),
        index: item.index,
      })),
    };
  });

  return transformedData;
};
