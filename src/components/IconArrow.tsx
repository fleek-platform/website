import React from 'react';

interface IconProps {
  className: string;
}

export const IconArrowRight: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    className={className}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const IconArrowLeft: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    className={className}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.707 14.707a1 1 0 0 0 0-1.414L9.414 10l3.293-3.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const IconArrowUpRight: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    className={className}
  >
    <path
      d="M5.416 5.69c0-.517.42-.937.938-.937h7.955c.518 0 .937.42.937.938v7.955a.938.938 0 01-1.875 0V6.628H6.354a.938.938 0 01-.938-.937z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      d="M5.028 14.972a.937.937 0 010-1.326l8.065-8.066a.938.938 0 011.326 1.326l-8.065 8.066a.938.938 0 01-1.326 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
