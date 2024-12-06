import { useState, useEffect, useRef } from 'react';
import { isServer } from '@utils/common';
import type { Repo } from 'Services/Github/types';
import { fetchRepoWithContributors } from 'Services/Github/api';

export const useGetRepos = (repos: string[]) => {
  const [data, setData] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (isServer || hasFetched.current) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const promises = repos.map((repo) => fetchRepoWithContributors(repo));
        const results = await Promise.all(promises);
        setData(results);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to fetch repositories');
      } finally {
        setIsLoading(false);
        hasFetched.current = true;
      }
    };

    fetchData();
  }, [repos]);

  return { data, error, isLoading };
};
