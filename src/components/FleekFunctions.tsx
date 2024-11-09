import React, { useState } from 'react';
import { Button } from '@components/Button';

type FleekFunctionProps = {
  functionUrl: string;
};

const FleekFunction = ({ functionUrl }: FleekFunctionProps) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(functionUrl);
      const result = await response.text();
      setData(result);
      setError(null);
    } catch (err) {
      setError('Error fetching data.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full">
      <Button variant="primary" onClick={handleClick}>
        {loading ? 'Loading...' : 'Run Function'}
      </Button>
      {data && (
        <div className="mt-6 bg-gray-500 p-10 text-[1.8rem]">
          <code className="text-white">Fleek Function Response: {data}</code>
        </div>
      )}
      {error && <div className="error text-red-500">{error}</div>}
    </div>
  );
};

export default FleekFunction;
