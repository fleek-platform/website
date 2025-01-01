import { DEFAULT_DATA } from './defaultData';
import type { Contributor, Repo } from './types';

export const fetchRepoWithContributors = async (
  repo: string,
): Promise<Repo> => {
  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${repo}`);

    if (!repoResponse.ok) {
      console.error(`Failed to fetch repo: ${repo}`);
      return DEFAULT_DATA.find((el) => el.html_url.includes(repo))!;
    }

    const repoData: Repo = await repoResponse.json();

    let contributors: Contributor[] = [];
    if (repoData.contributors_url) {
      const contributorsResponse = await fetch(repoData.contributors_url);
      if (contributorsResponse.ok) {
        contributors = await contributorsResponse.json();
      } else {
        console.error(`Failed to fetch contributors for repo: ${repo}`);
        contributors =
          DEFAULT_DATA.find((el) => el.html_url.includes(repo))?.contributors ||
          [];
      }
    }

    return {
      ...repoData,
      contributors,
    };
  } catch (error) {
    console.error(`Error fetching repo ${repo}:`, error);
    return DEFAULT_DATA.find((el) => el.html_url.includes(repo))!;
  }
};
