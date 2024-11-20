import { useState, useEffect, useRef } from 'react';

interface Contributor {
  login: string;
  avatar_url: string;
}

interface Repo {
  name: string;
  html_url: string;
  description: string;
  contributors_url: string;
  contributors?: Contributor[];
}

const DEFAULT_DATA: Repo[] = [
  {
    name: 'lightning',
    html_url: 'https://github.com/fleek-network/lightning',
    description: 'Fleek Network, a decentralized edge platform.',
    contributors_url:
      'https://api.github.com/repos/fleek-network/lightning/contributors',
    contributors: [
      {
        login: 'ozwaldorf',
        avatar_url: 'https://avatars.githubusercontent.com/u/8976745?v=4',
      },
      {
        login: 'kckeiks',
        avatar_url: 'https://avatars.githubusercontent.com/u/24687641?v=4',
      },
      {
        login: 'qti3e',
        avatar_url: 'https://avatars.githubusercontent.com/u/13242052?v=4',
      },
      {
        login: 'matthias-wright',
        avatar_url: 'https://avatars.githubusercontent.com/u/25928722?v=4',
      },
      {
        login: 'snormore',
        avatar_url: 'https://avatars.githubusercontent.com/u/182290?v=4',
      },
      {
        login: 'daltoncoder',
        avatar_url: 'https://avatars.githubusercontent.com/u/71679972?v=4',
      },
      {
        login: 'bidzyyys',
        avatar_url: 'https://avatars.githubusercontent.com/u/25967634?v=4',
      },
      {
        login: 'theBeardA',
        avatar_url: 'https://avatars.githubusercontent.com/u/35360097?v=4',
      },
      {
        login: 'heldrida',
        avatar_url: 'https://avatars.githubusercontent.com/u/236752?v=4',
      },
      {
        login: 'nhtyy',
        avatar_url: 'https://avatars.githubusercontent.com/u/15225385?v=4',
      },
      {
        login: 'scott-dn',
        avatar_url: 'https://avatars.githubusercontent.com/u/26348060?v=4',
      },
      {
        login: 'andrcmdr',
        avatar_url: 'https://avatars.githubusercontent.com/u/7407420?v=4',
      },
      {
        login: 'qx-nico',
        avatar_url: 'https://avatars.githubusercontent.com/u/73345016?v=4',
      },
      {
        login: 'jsonsivar',
        avatar_url: 'https://avatars.githubusercontent.com/u/18757934?v=4',
      },
      {
        login: 'jproyo',
        avatar_url: 'https://avatars.githubusercontent.com/u/1112854?v=4',
      },
      {
        login: 'gabrielmpinto',
        avatar_url: 'https://avatars.githubusercontent.com/u/10453270?v=4',
      },
      {
        login: 'Qwuke',
        avatar_url: 'https://avatars.githubusercontent.com/u/8070097?v=4',
      },
      {
        login: 'berryhill',
        avatar_url: 'https://avatars.githubusercontent.com/u/2887364?v=4',
      },
      {
        login: 'osrm',
        avatar_url: 'https://avatars.githubusercontent.com/u/90407222?v=4',
      },
      {
        login: 'rollsmorr1',
        avatar_url: 'https://avatars.githubusercontent.com/u/55561695?v=4',
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
        login: 'heldrida',
        avatar_url: 'https://avatars.githubusercontent.com/u/236752?v=4',
      },
      {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/15368?v=4',
      },
      {
        login: 'gabrielmpinto',

        avatar_url: 'https://avatars.githubusercontent.com/u/10453270?v=4',
      },
      {
        login: 'theBeardA',
        avatar_url: 'https://avatars.githubusercontent.com/u/35360097?v=4',
      },
      {
        login: 'daltoncoder',
        avatar_url: 'https://avatars.githubusercontent.com/u/71679972?v=4',
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
        login: 'heldrida',
        avatar_url: 'https://avatars.githubusercontent.com/u/236752?v=4',
      },
      {
        login: 'github-actions[bot]',
        avatar_url: 'https://avatars.githubusercontent.com/in/15368?v=4',
      },
      {
        login: 'gabrielmpinto',
        avatar_url: 'https://avatars.githubusercontent.com/u/10453270?v=4',
      },
      {
        login: 'kkudryaev',
        avatar_url: 'https://avatars.githubusercontent.com/u/16938595?v=4',
      },
      {
        login: 'angarita-dev',
        avatar_url: 'https://avatars.githubusercontent.com/u/44899916?v=4',
      },
    ],
  },
];

export const useGetRepos = (repos: string[]) => {
  const [data, setData] = useState<Repo[]>(DEFAULT_DATA);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    if (hasFetched.current) {
      setLoading(false);
      return;
    }

    const fetchRepos = async () => {
      try {
        const result = await Promise.all(
          repos.map(async (repo) => {
            try {
              const repoResponse = await fetch(
                `https://api.github.com/repos/${repo}`,
              );
              if (!repoResponse.ok) {
                throw new Error(`Failed to fetch repo: ${repo}`);
              }
              const repoData: Repo = await repoResponse.json();

              const contributorsResponse = await fetch(
                repoData.contributors_url,
              );
              if (!contributorsResponse.ok) {
                throw new Error(
                  `Failed to fetch contributors for repo: ${repo}`,
                );
              }
              const contributorsData: Contributor[] =
                await contributorsResponse.json();

              return { ...repoData, contributors: contributorsData };
            } catch (error) {
              console.error(`Error fetching repo ${repo}:`, error);
              return null;
            }
          }),
        );

        const reposData = result.filter(Boolean);

        setData((reposData.length ? reposData : DEFAULT_DATA) as Repo[]);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        setError('Failed to fetch repositories');
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    };

    fetchRepos();
  }, [repos]);

  return { data, error, loading };
};
