'use client';

import Container from '@components/Container';
import GridLayout from '@components/GridLayout';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const DebugGrid = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'g') {
      setIsVisible(!isVisible);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleToggle);
    return () => window.removeEventListener('keydown', handleToggle);
  }, [isVisible]);

  return (
    <div
      className={clsx(
        'pointer-events-none fixed left-0 top-0 z-100 w-full transition-opacity',
        {
          'opacity-10': isVisible,
          'opacity-0': !isVisible,
        },
      )}
    >
      <Container>
        <GridLayout>
          {Array.from(Array(16).keys()).map((index) => (
            <div key={index} className="col-span-1 h-screen bg-red-500"></div>
          ))}
        </GridLayout>
      </Container>
    </div>
  );
};

export default DebugGrid;
