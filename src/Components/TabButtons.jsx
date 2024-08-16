// TabButton.jsx
import React from 'react';

const TabButton = ({ onClick, isActive, children , fortheref}) => {
  const activeClass = isActive
    ? 'bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)]'
    : 'text-[var(--data-gray-color)] border-[var(--border-color)]';

  return (
    <button
      onClick={onClick}
      className={`${activeClass} p-2 w-full rounded-md border-2 text-sm font-medium`}
    >
      {children}
    </button>
  );
};

export default TabButton;