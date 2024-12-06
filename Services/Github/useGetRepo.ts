import { useState, useEffect, useCallback, useRef } from 'react';
import type { Repo } from './types';

export const useGetRepo = (repo: string) => {
  const [data, setData] = useState<Repo>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasFetched = useRef(false);

  const fetchRepo = useCallback(async () => {
    try {
      const repoResponse = await fetch(`https://api.github.com/repos/${repo}`);

      let repoData: Repo;
      if (repoResponse.ok) {
        repoData = await repoResponse.json();

        if (repoData && !repoData?.contributors) {
          const contributorsResponse = await fetch(repoData.contributors_url);

          if (contributorsResponse.ok) {
            repoData.contributors = await contributorsResponse.json();
          } else {
            repoData.contributors = [];
            console.error(`Failed to fetch contributors for repo: ${repo}`);
          }
        }

        setData(repoData);
      } else {
        console.error(`Failed to fetch repo: ${repo}`);
      }
    } catch (error) {
      console.error(`Error fetching repo ${repo}:`, error);
      setError('Failed to fetch repository');
    } finally {
      setIsLoading(false);
      hasFetched.current = true;
    }
  }, [repo]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    if (hasFetched.current) {
      setIsLoading(false);
      return;
    }

    fetchRepo();
  }, [repo]);

  return { data, error, isLoading };
};
