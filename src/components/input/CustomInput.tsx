import React from 'react';

interface InputProps {
  className: string; // Custom container styles
  type?: 'text' | 'password' | 'email' | 'search'; // HTML input types
  placeholder?: string; // Placeholder text for the input
  error?: string; // Optional error message for validation feedback
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Input change handler
  name: string; // Unique name/id for input element
  required?: boolean; // Native HTML required attribute
}

/**
 * CustomizedInput - A styled input field with optional error message.
 * Supports various input types and custom error styling.
 */
const CustomInput: React.FC<InputProps> = ({
  className,
  type = 'text',
  placeholder,
  error,
  onChange,
  name,
}) => {
  const isPassword = type === 'password';
  const inputBorder = error ? 'border border-red-500' : 'border border-border-primary';

  return (
    <div className={`relative ${className}`}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
        className={`
          w-full h-full px-2 rounded-[5px] bg-[#1a1a1a] 
          focus:outline-none focus:ring-1 focus:ring-gray-400
          placeholder:text-[15px] text-white
          ${inputBorder} ${isPassword ? 'pr-10' : ''}
        `}
      />

      {/* Error message shown below the input */}
      {error && (
        <span
          id={`${name}-error`}
          className="text-red-600 text-sm absolute bottom-[-17px] left-2 mt-1"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
