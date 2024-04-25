import type { CollectionEntry } from 'astro:content';

type Doc = CollectionEntry<'docs'>;
type DocWithCategory = Doc['data'] & { category: string; slug: string };

type SidebarItem = Pick<Doc['data'], 'title' | 'order'>;

export type SidebarData = Record<string, SidebarItem[]>;

type List = {
  slug: string;
  title: string;
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

// Deprecated because the convention allows to autogenerate and sort the data by naming conventions, name normalization but the static file name still matters for the ssg. For this reason, will have to create a way to declare the menu order.
//
// To use
// import { getCollection } from "astro:content";
// const allPosts = await getCollection("docs");
// const sidebarSorted = generateSidebarDS(allPosts);
const generateSidebarDS = (data: Doc[]) => {
  const categories: SidebarData = {};

  data.forEach((item) => {
    const split = item.slug.split('/');
    const hasCategory = split.length > 1;
    // Use the directory name to order alphabetically
    const categoryFromSlug = split[0];

    if (!hasCategory) {
      if (!categories[ROOT_FALLBACK_CATEGORY]) {
        categories[ROOT_FALLBACK_CATEGORY] = [];
      }

      categories[ROOT_FALLBACK_CATEGORY] = [
        ...categories[ROOT_FALLBACK_CATEGORY],
        {
          title: item.data.title,
          order: item.data.order,
        },
      ];
    } else {
      if (!categories[categoryFromSlug]) {
        categories[categoryFromSlug] = [];
      }

      categories[categoryFromSlug] = [
        ...categories[categoryFromSlug],
        {
          title: item.data.title,
          order: item.data.order,
        },
      ];
    }
  });

  const result = Object.keys(categories)
    .sort()
    .map((category) => {
      const list = categories[category]
        .sort((a, b) =>
          a?.order && b?.order
            ? a.order - b.order
            : a.title.localeCompare(b.title),
        )
        .map((item) => item.title);

      const normalized = normalizeCategoryName(category);

      return { category: normalized, list };
    });

  return result;
};

export default generateSidebarDS;

type UserOrderItem = {
  category: string;
  order: number;
};

export const generateSidebarDSByUserOrder = (
  allPosts: Doc[],
  userOrder: UserOrderItem[],
): GenerateSidebarResponse => {
  const data = allPosts.map((item) => {
    const split = item.slug.split('/');
    const hasCategory = split.length > 1;
    const categoryFromSlug = split[0];

    if (!hasCategory) {
      return {
        ...item.data,
        category: ROOT_FALLBACK_CATEGORY,
        slug: item.slug,
      };
    }

    return {
      ...item.data,
      category: categoryFromSlug,
      slug: split[1],
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

  // Separate categories that are in userOrder from those that are not
  const userOrderCategories = new Set(userOrder.map((item) => item.category));
  const remainingCategories = data.filter(
    (item) => !userOrderCategories.has(item.category),
  );

  // Sort the userOrder array based on the order field
  userOrder.sort((a, b) => a.order - b.order);

  const userOrderLookupTable = userOrder.reduce(
    (acc, item) => {
      acc[item.category] = item.order;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Create a new array based on the order specified in userOrder
  const orderedUserOrderItems: DocWithCategory[] = userOrder
    .flatMap((orderItem) => dataMap.get(orderItem.category) ?? [])
    .filter((item): item is DocWithCategory => item !== undefined);

  // Sort the remaining categories alphabetically
  remainingCategories.sort((a, b) => a.category.localeCompare(b.category));

  // Combine the sorted userOrder items with the sorted remaining categories
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
    .filter(
      (item) =>
        item.category !== ROOT_FALLBACK_CATEGORY && item.slug !== ROOT_INDEX,
    );

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
      title: normalizeCategoryName(category),
      list: sortedItems.map((item) => ({
        slug: item.slug,
        title: item.title,
      })),
    };
  });

  return transformedData;
};
