import { useState, useEffect, useCallback, useRef } from 'react';
import type { Repo } from './types';

const DEFAULT_DATA: Repo[] = [
  {
    name: 'lightning',
    html_url: 'https://github.com/fleek-network/lightning',
    description: 'Fleek Network, a decentralized edge platform.',
    contributors_url:
      'https://api.github.com/repos/fleek-network/lightning/contributors',
    contributors: [
      {
        login: 'contributor1',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor2',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor3',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor4',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor5',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor5',
        avatar_url: '/images/github-avatar.webp',
      },
    ],
  },
  {
    name: 'cli',
    html_url: 'https://github.com/fleek-platform/cli',
    description:
      'The Fleek-platform CLI provides a unified command line interface to Fleek Services',
    contributors_url:
      'https://api.github.com/repos/fleek-platform/cli/contributors',

    contributors: [
      {
        login: 'contributor1',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor2',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor3',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor4',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor5',
        avatar_url: '/images/github-avatar.webp',
      },
    ],
  },
  {
    name: 'sdk',
    html_url: 'https://github.com/fleek-platform/sdk',
    description:
      'The Fleek-Platform SDK provides an unified interface to help you quickly build applications that leverage our Fleek Services.',
    contributors_url:
      'https://api.github.com/repos/fleek-platform/sdk/contributors',

    contributors: [
      {
        login: 'contributor1',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor2',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor3',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor4',
        avatar_url: '/images/github-avatar.webp',
      },
      {
        login: 'contributor5',
        avatar_url: '/images/github-avatar.webp',
      },
    ],
  },
];

export const useGetRepos = (repos: string[]) => {
  const [data, setData] = useState<Repo[]>(DEFAULT_DATA);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasFetched = useRef(false);

  const fetchRepos = useCallback(async () => {
    try {
      const result = await Promise.all(
        repos.map(async (repo) => {
          try {
            const repoResponse = await fetch(
              `https://api.github.com/repos/${repo}`,
            );

            let repoData: Repo;
            if (repoResponse.ok) {
              repoData = await repoResponse.json();
            } else {
              repoData = DEFAULT_DATA.find((el) => el.html_url.includes(repo))!;
              console.error(`Failed to fetch repo: ${repo}`);
            }

            if (!repoData?.contributors) {
              const contributorsResponse = await fetch(
                repoData.contributors_url,
              );

              if (contributorsResponse.ok) {
                repoData.contributors = await contributorsResponse.json();
              } else {
                repoData.contributors =
                  DEFAULT_DATA.find((el) => el.html_url.includes(repo))
                    ?.contributors || [];
                console.error(`Failed to fetch contributors for repo: ${repo}`);
              }
            }

            return repoData;
          } catch (error) {
            console.error(`Error fetching repo ${repo}:`, error);
            return DEFAULT_DATA.find((el) => el.html_url.includes(repo))!;
          }
        }),
      );

      const reposData = result.filter(Boolean);
      setData(reposData as Repo[]);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to fetch repositories');
    } finally {
      setIsLoading(false);
      hasFetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    if (hasFetched.current) {
      setIsLoading(false);
      return;
    }

    fetchRepos();
  }, [repos]);

  return { data, error, isLoading };
};
