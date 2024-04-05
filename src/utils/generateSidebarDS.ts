import type { CollectionEntry } from "astro:content" 

type Doc = CollectionEntry<"docs">;
type SidebarItem = Pick<Doc["data"], 'title' | 'order'>;

export type SidebarData = Record<string, SidebarItem[]>;

export type GenerateSidebarResponse = {
  category: string;
  list: string[];
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
