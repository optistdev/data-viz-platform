import React from "react";
import { CircleHelp, CircleArrowUp } from "lucide-react";

type Props = {
  x: number;       // Horizontal screen position of the tooltip (in pixels)
  y: number;       // Vertical screen position of the tooltip (in pixels)
  value: number;   // Data value to be formatted and displayed
  visible: boolean; // Controls tooltip visibility and animation state
};

/**
 * ChartTooltip Component
 * 
 * A floating tooltip that appears on chart hover to display value insights.
 * Includes formatted revenue, an info icon, and a comparison indicator.
 * Smoothly fades and scales in/out using Tailwind transitions.
 */
export const ChartTooltip: React.FC<Props> = ({ x, y, value, visible }) => {
  // Format the numeric value into currency style (e.g., "$12.34k")
  const formatted = `$${(value / 1000).toFixed(2)}k`;

  return (
    <div
      // Position tooltip absolutely and animate scale + opacity
      className={`fixed z-50 pointer-events-none transition-all duration-300 transform ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {/* Tooltip container */}
      <div className="text-white bg-background-surface p-2 md:p-5 rounded-md border border-border-secondary shadow-lg">
        {/* Top row: Main value + help icon */}
        <div className="flex justify-between items-center">
          <div className="text-[20px] font-semibold mb-1">{formatted}</div>
          <div className="text-[#888888]">
            <CircleHelp size={16} />
          </div>
        </div>

        {/* Bottom row: Comparison indicator (e.g., trend info) */}
        <div className="flex items-center text-[16px] text-gray-400 mt-2.5">
          <span className="mr-2.5">
            <CircleArrowUp color="#C8E972" />
          </span>
          4.6% above target
        </div>
      </div>
    </div>
  );
};

export default ChartTooltip;
