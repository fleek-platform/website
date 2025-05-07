import type React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="ml-6 mt-8 flex h-4 w-10 items-center justify-center">
      <div className="flex space-x-4">
        <div className="[animation-delay:-0.3s]' h-4 w-4 animate-bounce rounded-full bg-gray-dark-8" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-gray-dark-8 [animation-delay:-0.15s]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-gray-dark-8" />
      </div>
    </div>
  );
};
