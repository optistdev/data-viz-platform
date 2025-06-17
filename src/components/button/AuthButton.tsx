
interface ButtonProps {
  className: string; // Additional utility classes for the outer wrapper
  label: string; // Text label displayed on the button
  type?: 'button' | 'submit' | 'reset'; // Button type attribute
  img?: string; // Optional image source to be displayed before the label
  onClick?: () => void; // Optional click handler function
}

/**
 * AuthButton - A reusable authentication button component.
 * Supports gradient backgrounds, optional icon, and hover/active effects.
 */
const AuthButton = ({ className, label, type = 'button', img, onClick }: ButtonProps) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <button
        type={type}
        onClick={onClick}
        className="w-full h-full flex items-center justify-center rounded- text-white text-lg font-semibold
        bg-gradient-to-r from-blue-500 dark:from-cyan-400 via-purple-500 dark:via-sky-500 to-pink-500 dark:to-blue-600
        hover:from-blue-600 dark:hover:from-cyan-500 hover:via-purple-600 dark:hover:via-sky-600 hover:to-pink-600 dark:hover:to-blue-700
        active:scale-95 transition-all duration-200"
      >
        {/* Render optional image icon if provided */}
        {img && <img src={img} alt="button icon" className="w-7 h-7 mr-2" />}
        {label}
      </button>
    </div>
  );
};

export default AuthButton;
