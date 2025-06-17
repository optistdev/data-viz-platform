import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { signOut } from "firebase/auth";

import { MenuBarIcon } from "@/utils/icons";
import SidebarItem from "@/components/menu-item";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setIsMenuOpen } from "@/store/slices/loading.slice";
import { sideBarItems } from "@/utils/data";
import { auth } from "@/utils/firebase";
import { clearSelectedVariables } from "@/store/slices/variables.slice";

/**
 * Sidebar - Responsive sidebar with navigation, profile dropdown, and logout.
 */
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isMenuOpen } = useAppSelector((state) => state.loading);

  const selectedItemFromPath =
    sideBarItems.find((item) => location.pathname.startsWith(item.path))?.id;

  const [selectedItem, setSelectedItem] = useState(() => {
    return localStorage.getItem("sidebarSelected") || selectedItemFromPath || "home";
  });

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync sidebar selected state with current route
  useEffect(() => {
    if (selectedItemFromPath && selectedItemFromPath !== selectedItem) {
      setSelectedItem(selectedItemFromPath);
    }
  }, [location.pathname]);

  // Persist selected item to local storage
  useEffect(() => {
    if (selectedItemFromPath) {
      localStorage.setItem("sidebarSelected", selectedItemFromPath);
    }
  }, [selectedItemFromPath]);

  const toggleSidebar = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
  };

  const clickHandler = (id: string, path: string) => {
    setSelectedItem(id);
    localStorage.setItem("sidebarSelected", id);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      dispatch(clearSelectedVariables());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="relative z-50">
        <div
          className={`
            fixed top-0 left-0 h-screen bg-background-primary
            flex flex-col shrink-0
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? "w-50 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"}
          `}
        >
          {/* Sidebar Top */}
          <div className="flex flex-grow flex-col items-center gap-7">
            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className={`text-white mt-8 cursor-pointer w-full flex ${
                isMenuOpen ? "justify-end" : "justify-center"
              }`}
            >
              {isMenuOpen ? (
                <ChevronLeft className="w-5 h-5 mr-2" />
              ) : (
                <MenuBarIcon className="w-5 h-5" />
              )}
            </button>

            {/* Sidebar Items */}
            <div className={`flex flex-col gap-5 w-full items-center ${isMenuOpen && "items-start"}`}>
              {sideBarItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  path={item.path}
                  isOpen={isMenuOpen}
                  active={selectedItem === item.id}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      dispatch(setIsMenuOpen(false));
                    }
                    clickHandler(item.id, item.path);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Profile Menu (Bottom Section) */}
          <div ref={profileMenuRef} className="relative flex items-center justify-center mb-4">
            <SidebarItem
              id="account"
              label="Profile"
              isOpen={isMenuOpen}
              path="/profile"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            />

            {/* Dropdown */}
            <div
              className={`
                absolute left-full bottom-3 ml-[-10px]
                bg-[#292929] text-white text-sm rounded-lg shadow-lg z-50
                flex flex-col min-w-[140px]
                transform transition-all duration-300 ease-out
                ${
                  isProfileMenuOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                }
              `}
            >
              {/* Triangle Pointer */}
              <div className="absolute left-[-6px] bottom-3 w-3 h-3 bg-[#292929] rotate-45 z-[-1]" />

              <button className="px-4 py-2 hover:bg-[#3a3a3a] text-left">My Account</button>
              <button className="px-4 py-2 hover:bg-[#3a3a3a] text-left" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Background */}
      <div
        className={`
          fixed top-0 left-0 w-screen h-screen z-49
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          md:hidden
        `}
      />
    </div>
  );
};

export default Sidebar;
