import React from 'react';

interface ButtonProps {
  className: string; // Additional Tailwind classes for custom styling
  label?: string; // Optional label text displayed inside the button
  icon?: React.ReactElement; // Optional icon component to show before the label
  onClick: () => void; // Required click handler
  active?: boolean; // Whether the button is in an active/selected state
}

/**
 * CustomizedButton - A reusable, stylized button component.
 * Supports optional icon and label, active state styling, and click handling.
 */
const CustomButton = ({ className, icon, label, onClick, active = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer border-[0.67px] 
        ${active ? 'border-active bg-[#23291E] text-active' : 'border-border-primary bg-[#242424] text-white'}
        rounded-[4px] text-[16px] font-semibold
        active:scale-95 transition-all duration-200 
        flex gap-2.5 items-center justify-center ${className}`}
    >
      {/* Optional icon */}
      {icon}
      {/* Optional label */}
      {label}
    </button>
  );
};

export default CustomButton;
