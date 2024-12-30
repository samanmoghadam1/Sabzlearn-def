import React from "react";

const SeachIcon = ({ className }: {className: string}) => {
  return (
    <svg
      className={`w-6 h-6 ${className}`} 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="6" />
      <line x1="14" y1="14" x2="20" y2="20" />
    </svg>
  );
};

export default SeachIcon;
