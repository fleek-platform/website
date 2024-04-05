import type { CollectionEntry } from "astro:content" 

type Doc = CollectionEntry<"docs">;
type DocWithCategory = Doc["data"] & { category: string; slug: string; };

type SidebarItem = Pick<Doc["data"], 'title' | 'order'>;

export type SidebarData = Record<string, SidebarItem[]>;

export type GenerateSidebarResponse = {
  category: string;
  list: string[];
  order?: number;
}[];

export type UserOrder = {
  category: string;
  order: number;  
}[];

export const ROOT_FALLBACK_CATEGORY = 'root';

// Normalize directory into human-friendly name
// e.g. `15-has_whitespace_and_dash-word`
// `has whitespace and dash-word`
const normalizeCategoryName = (input: string) => {
  const regex = /^\d{1,2}-(.*)$/;
  const match = input.match(regex);
  return (match ? match[1] : input).replaceAll('_', ' ');;
};

// Deprecated because the convention allows to autogenerate and sort the data by naming conventions, name normalization but the static file name still matters for the ssg. For this reason, will have to create a way to declare the menu order.
//
// To use
// import { getCollection } from "astro:content";
// const allPosts = await getCollection("docs");
// const sidebarSorted = generateSidebarDS(allPosts);
const generateSidebarDS = (data: Doc[]) => {
 const categories: SidebarData = {};

 data.forEach(item => {
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
      }];
    } else {
        if (!categories[categoryFromSlug]) {
          categories[categoryFromSlug] = [];
        }

        categories[categoryFromSlug] = [
          ...categories[categoryFromSlug],
          {
            title: item.data.title,
            order: item.data.order,
        }];
    }
 });

 const result = Object.keys(categories).sort().map(category => {
    const list = categories[category].sort((a, b) => a?.order && b?.order ? a.order - b.order : a.title.localeCompare(b.title)).map(item => item.title);

    const normalized = normalizeCategoryName(category);

    return { category: normalized, list };
 });

 return result;
}

export default generateSidebarDS;

type UserOrderItem = {
 category: string;
 order: number;
};

export const generateSidebarDSByUserOrder = (allPosts: Doc[], userOrder: UserOrderItem[]): GenerateSidebarResponse => {
 const data = allPosts.map(item => {
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

 console.log('[debug] allPosts -> data: ', data);

 // Initialize the Map with empty arrays for each category
 const dataMap = new Map<string, DocWithCategory[]>(data.map(item => [item.category, []]));

 // Populate the Map with items for each category
 data.forEach(item => {
    const existingItems = dataMap.get(item.category);
    if (existingItems) {
       existingItems.push(item);
    } else {
       // This should not happen if the map was initialized correctly, but it's a safeguard
       dataMap.set(item.category, [item]);
    }
 });

 console.log('[debug] dataMap', dataMap);

 // Separate categories that are in userOrder from those that are not
 const userOrderCategories = new Set(userOrder.map(item => item.category));
 const remainingCategories = data.filter(item => !userOrderCategories.has(item.category));

 // Sort the userOrder array based on the order field
 userOrder.sort((a, b) => a.order - b.order);

 // Create a new array based on the order specified in userOrder
 const orderedUserOrderItems: DocWithCategory[] = userOrder.flatMap(orderItem => dataMap.get(orderItem.category) ?? [])
 .filter((item): item is DocWithCategory => item !== undefined);

 // Sort the remaining categories alphabetically
 remainingCategories.sort((a, b) => a.category.localeCompare(b.category));

 // Combine the sorted userOrder items with the sorted remaining categories
 const sortedOrderedUserOrderItems = transformData(orderedUserOrderItems);
 const orderedData: GenerateSidebarResponse = [...sortedOrderedUserOrderItems, ...transformData(remainingCategories, sortedOrderedUserOrderItems.length)];

 return orderedData;
}

const transformData = (data: DocWithCategory[], offset: number = 0): GenerateSidebarResponse => {
 const groupedByCategory = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
 }, {} as Record<string, DocWithCategory[]>);

 console.log('[debug] groupedByCategory: ', groupedByCategory);

 const transformedData: GenerateSidebarResponse = Object.entries(groupedByCategory).map(([category, items], idx) => {
    const sortedItems = items.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

    return {
      category,
      list: sortedItems.map(item => item.slug),
      order: offset + idx,
    };
 });

 return transformedData;
}
