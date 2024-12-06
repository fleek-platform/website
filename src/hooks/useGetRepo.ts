import { useState, useEffect, useRef } from 'react';
import { isServer } from '@utils/common';
import type { Repo } from 'Services/Github/types';
import { fetchRepoWithContributors } from 'Services/Github/api';

export const useGetRepo = (repo: string) => {
  const [data, setData] = useState<Repo>();
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
        const result = await fetchRepoWithContributors(repo);
        setData(result);
      } catch (err) {
        console.error('Error fetching repository:', err);
        setError('Failed to fetch repository');
      } finally {
        setIsLoading(false);
        hasFetched.current = true;
      }
    };

    fetchData();
  }, [repo]);

  return { data, error, isLoading };
};
