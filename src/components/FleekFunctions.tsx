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
    <div className="mb-12 rounded-12 bg-gray-dark-2 p-12">
      <div className="flex flex-col gap-12">
        <div className="flex gap-4">
          {/* three dots  */}
          <div className="w-2 rounded-full bg-rose-600 p-5" />
          <div className="w-2 rounded-full bg-yellow-dark-9 p-5" />
          <div className="w-2 rounded-full bg-green-600 p-5" />
        </div>
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex-grow rounded-12 bg-gray-dark-6 px-7">
            {/* fn comes here */}
            {functionUrl}
          </div>
          <div>
            {/* run button  */}
            <Button variant="tertiary" onClick={handleClick}>
              {loading ? 'Loading...' : 'Run Function'}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12 rounded-12 bg-gray-dark-1 p-7 font-sans">
        {/* fun output here */}
        {data ? data : 'Please run the function above to see the output here. '}
      </div>
    </div>
    // <div className="mx-auto w-full">
    //   <Button variant="primary" onClick={handleClick}>
    //     {loading ? 'Loading...' : 'Run Function'}
    //   </Button>
    //   {data && (
    //     <div className="mt-6 bg-gray-500 p-10 text-[1.8rem]">
    //       <code className="text-white">Fleek Function Response: {data}</code>
    //     </div>
    //   )}
    //   {error && <div className="error text-red-500">{error}</div>}
    // </div>
  );
};

export default FleekFunction;
