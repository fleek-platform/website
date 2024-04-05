import type { CollectionEntry } from "astro:content" 

type Doc = CollectionEntry<"docs">;

type SidebarItem = Pick<Doc["data"], 'title' | 'order'>;

export type SidebarData = Record<string, SidebarItem[]>;

export type GenerateSidebarResponse = {
  category: string;
  list: string[];
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

type DataItem = {
 category: string;
 list: string[];
};

type UserOrderItem = {
 category: string;
 order: number;
};

export const generateSidebarDSByUserOrder = (allPosts: Doc[], userOrder: UserOrderItem[]): DataItem[] => {
 const data = allPosts.map(item => {
    const split = item.slug.split('/');
    const hasCategory = split.length > 1;
    const categoryFromSlug = split[0];

    if (!hasCategory) {
      return {
        ...item.data,
        category: ROOT_FALLBACK_CATEGORY,
      };
    }

    return {
      ...item.data,
      category: categoryFromSlug,
    };
 });

 type DocWithCategory = typeof data[number];

 // Create a map for quick lookup of data items by category
 const dataMap = new Map<string, DocWithCategory>(data.map(item => [item.category, item]));

 // Separate categories that are in userOrder from those that are not
 const userOrderCategories = new Set(userOrder.map(item => item.category));
 const remainingCategories = data.filter(item => !userOrderCategories.has(item.category));

 // Sort the userOrder array based on the order field
 userOrder.sort((a, b) => a.order - b.order);

 // Create a new array based on the order specified in userOrder
 const orderedUserOrderItems: DocWithCategory[] = userOrder.map(orderItem => dataMap.get(orderItem.category))
 .filter((item): item is DocWithCategory => item !== undefined);

 // Sort the remaining categories alphabetically
 remainingCategories.sort((a, b) => a.category.localeCompare(b.category));

 // Combine the sorted userOrder items with the sorted remaining categories
 const orderedData: DataItem[] = [...transformData(orderedUserOrderItems), ...transformData(remainingCategories)];

 return orderedData;
}

type DocWithCategory = Doc["data"] & { category: string; };

const transformData = (data: DocWithCategory[]): DataItem[] => {
 const groupedByCategory = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
 }, {} as Record<string, DocWithCategory[]>);

 const transformedData: DataItem[] = Object.entries(groupedByCategory).map(([category, items]) => {
    const sortedItems = items.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

    return {
      category,
      list: sortedItems.map(item => item.title),
    };
 });

 return transformedData;
}
