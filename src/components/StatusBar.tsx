'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Text from '@components/Text';

type StatusIndicator = 'none' | 'minor' | 'major';

const StatusBar: React.FC = () => {
  const [description, setDescription] = useState('All System Operational');
  const [indicator, setIndicator] = useState<StatusIndicator>('none');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://fleek.statuspage.io/api/v2/status.json',
      );
      if (!response.ok) throw new Error('could not fetch status');

      const data = await response.json();
      const description = data.status?.description;
      const indicator = data.status?.indicator;

      if (description && indicator) {
        setDescription(description);
        setIndicator(indicator);
      }
    };

    fetchData().catch((e) => console.error(e));
  }, []);

  return (
    <a
      href="https://status.fleek.xyz/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
    >
      <div className="flex w-full gap-2">
        <div className="hidden rounded-bl-8 rounded-tl-8 border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.04)] px-12 py-8 md:block">
          <Text style="caption-text">Status</Text>
        </div>
        <div className="flex items-center gap-10 rounded-8 border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.04)] px-12 py-8 md:rounded-bl-none md:rounded-tl-none">
          <span
            className={clsx('block h-12 w-12 rounded-full', {
              'bg-red-500': indicator === 'major',
              'bg-yellow': indicator === 'minor',
              'bg-ui-status-operational': indicator === 'none',
            })}
          />
          <Text style="caption-text">{description}</Text>
        </div>
      </div>
    </a>
  );
};

export default StatusBar;
