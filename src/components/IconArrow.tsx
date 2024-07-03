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
      transform="scale(-1, 1) translate(-20, 0)"
      d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);
