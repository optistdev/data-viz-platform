import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";

import { MenuBarIcon } from "@/utils/icons";
import SearchInput from "@/components/input/SearchInput";
import Button from "@/components/button/CustomButton";
import { useAppDispatch } from "@/hooks";
import { setIsMenuOpen } from "@/store/slices/loading.slice";
import { dashboardTabs as tabs } from "@/utils/data";

/**
 * Header - Top navigation bar for the dashboard.
 * Includes responsive tab switching, search input, and mobile menu logic.
 */
const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("charging");

  const showTabs = location.pathname === "/dashboard";

  return (
    <>
      <div className="flex bg-background-primary justify-between items-center w-full h-[87px] px-4 md:px-6 pt-2 md:pt-5 sticky top-0 z-10">
        
        {/* Left Section: Menu + Tabs + Mobile Search Icon */}
        <div className="flex items-center justify-between gap-2 w-full md:w-auto">
          
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden flex items-center justify-center text-white h-[37px] px-3"
            onClick={() => dispatch(setIsMenuOpen(true))}
          >
            <MenuBarIcon />
          </button>

          {/* Dashboard Tabs (Only on /dashboard route) */}
          {showTabs && (
            <>
              {tabs.map((tab) => (
                <TabItem
                  key={tab.key}
                  name={tab.name}
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                />
              ))}
            </>
          )}

          {/* Mobile Search Icon */}
          <Button
            className="block md:hidden p-2.5"
            onClick={() => setShowMobileSearch(true)}
            icon={<Search size={14} />}
          />
        </div>

        {/* Desktop Search Input */}
        <div className="hidden md:block h-[37px]">
          <SearchInput className="h-full w-40 lg:w-auto" />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed top-0 left-0 w-full z-50 bg-[#1a1a1a] px-4 py-3 flex items-center gap-2">
          <SearchInput className="flex-1 h-[62px] text-sm" />
          <Button
            className="p-2"
            icon={<X size={18} />}
            onClick={() => setShowMobileSearch(false)}
          />
        </div>
      )}
    </>
  );
};

interface TabProps {
  active: boolean;
  name: string;
  onClick: () => void;
}

/**
 * TabItem - A single tab element in the dashboard navigation.
 */
const TabItem = ({ active, name, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`h-[37px] px-2 lg:px-5 text-sm sm:text-[16px] rounded-sm flex items-center text-white cursor-pointer
      ${active ? "bg-[#242424] border border-border-primary" : "bg-transparent"}`}
  >
    {name}
  </button>
);

export default Header;
