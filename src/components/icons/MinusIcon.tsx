import React from "react";

interface MinusIconProps {
  className?: string;
  size?: number;
}

export const MinusIcon: React.FC<MinusIconProps> = ({
  className = "",
  size = 14,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.5 7H10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
