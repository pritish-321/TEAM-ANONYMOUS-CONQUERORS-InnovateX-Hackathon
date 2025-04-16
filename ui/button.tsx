import React from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'destructive'; // Added 'destructive'
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ variant, onClick, children, className = '' }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300';
      case 'destructive':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold ${getVariantClass()} ${className}`}
    >
      {children}
    </button>
  );
};
