import {
  AccountIcon,
  SettingIcon,
  RecordIcon,
  CloudIcon,
  BellIcon,
  HomeIcon,
} from "../../utils/icons";

interface SidebarItemProps {
  label: string; // Display label for the item
  isOpen: boolean; // Whether the sidebar is expanded
  path: string; // Navigation path
  id: string; // Unique identifier for this item
  active?: boolean; // Whether the item is currently active
  onClick: (id: string, path: string) => void; // Click handler
}

/**
 * SidebarItem - A responsive navigation item used in a sidebar.
 * Supports active styling, icon rendering, responsive width, and hover tooltip.
 */
const SidebarItem = ({
  label,
  isOpen,
  path,
  id,
  active = false,
  onClick,
}: SidebarItemProps) => {
  // Returns icon component based on id and active state
  const renderIcon = (id: string, active: boolean) => {
    switch (id) {
      case "home":
        return <HomeIcon active={active} />;
      case "bell":
        return <BellIcon active={active} />;
      case "record":
        return <RecordIcon active={active} />;
      case "cloud":
        return <CloudIcon active={active} />;
      case "setting":
        return <SettingIcon active={active} />;
      case "account":
        return <AccountIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="group relative">
      <button
        onClick={() => onClick(id, path)}
        className={`
          flex items-center gap-3 h-12 cursor-pointer text-sm px-3 py-2 mx-2
          ${isOpen ? "justify-start w-40" : "justify-center w-12"}
          ${active ? "text-white border-[#5f5f5f] rounded-xl border bg-[#292929]" : "text-[#858882]"}
          transition-[width] duration-300 ease-in-out
        `}
      >
        {renderIcon(id, !!active)}
        {isOpen && <span>{label}</span>}
      </button>

      {/* Tooltip shown when sidebar is collapsed */}
      {!isOpen && label !== "Profile" && (
        <div
          className="
            absolute left-full top-1/2 -translate-y-1/2 ml-2
            bg-[#292929] text-white text-xs px-2 py-1 rounded-md
            whitespace-nowrap opacity-0 group-hover:opacity-100
            transition-opacity duration-500 z-50
          "
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
