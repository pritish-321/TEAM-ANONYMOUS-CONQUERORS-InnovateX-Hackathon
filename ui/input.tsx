// components/ui/input.tsx

import React from 'react';

type InputProps = {
  id: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
};

// components/ui/input.tsx
export const Input: React.FC<InputProps> = ({ type, placeholder, className, value, onChange, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={className}
    {...props}
  />
)
