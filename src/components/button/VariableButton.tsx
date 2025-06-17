import { Check, Plus } from "lucide-react";
import { SparklesIcon } from "../../utils/icons";

type VariableButtonProps = {
  label: string; // Button label text
  selected?: boolean; // Whether the button is currently selected
  onClick: () => void; // Click handler
  onMouseEnter: (desc: string, title: string) => void; // Mouse enter handler for tooltip or info display
  onMouseLeave: () => void; // Mouse leave handler to hide tooltip/info
  desc: string; // Description passed on hover
};

/**
 * VariableButton - Interactive button with icon indicators and hover effects.
 * Designed to be used in contexts where a variable is selectable.
 */
export const VariableButton = ({
  label,
  selected = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  desc,
}: VariableButtonProps) => {
  return (
    <div className="relative group cursor-pointer">
      <button
        onClick={onClick}
        onMouseEnter={() => onMouseEnter(desc, label)}
        onMouseLeave={onMouseLeave}
        className={`flex items-center gap-[15px] px-4 py-1 rounded-full border text-[15px] tracking-[0%] leading-[150%] font-normal transition-colors
          ${selected
            ? "bg-[#282E16] text-lime-400 border-active"
            : "bg-[#5959594D] text-gray-300 border-[#EEEEEE]"
          }`}
      >
        {label}

        {/* Icons container: Sparkle + Check/Plus */}
        <div className="flex gap-2">
          <span className="text-xs">
            <SparklesIcon className="w-3 h-3" selected={selected} />
          </span>
          <span>{selected ? <Check size={14} /> : <Plus size={14} />}</span>
        </div>
      </button>

      {/* Decorative glowing underline shown when selected and hovered */}
      {selected && (
        <div
          className="
            w-[calc(100%-20px)] h-[8px] rounded-full
            absolute bottom-[-2px] left-[10px]
            [background:linear-gradient(90deg,_#3BFF72_0%,_#C9FF3B_52%)] blur-sm
            opacity-0 group-hover:opacity-20 transition-opacity duration-200 z-40
          "
        />
      )}
    </div>
  );
};

export default VariableButton;
