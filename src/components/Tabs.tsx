import React from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

interface TabItem {
  icon?: string;
  label: string;
  value: string;
  component: React.ReactNode;
  onClick?: () => void;
}

interface TabProps {
  tabs: TabItem[];
  onTabChange?: (tab: string) => void;
  className?: string;
}

const Tabs: React.FC<TabProps> = ({ tabs, onTabChange, className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentActiveTab = searchParams?.get("activeTab");

  return (
    <div className={`flex flex-col flex-1`}>
      <div
        className={`
          flex items-center gap-2 overflow-x-auto hide-scrollbar px-4
          border-b border-secondary-dark
          ${className}
        `}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            onClick={() => {
              if (tab.value === "") {
                navigate(`${location.pathname}`);
                return;
              }
              const searchParams = new URLSearchParams(location.search);
              searchParams.set("activeTab", tab.value);
              navigate(`${location.pathname}?${searchParams.toString()}`);
              tab.onClick?.();
              onTabChange?.(tab.value);
            }}
            className={`
              flex items-center gap-2 flex-shrink-0 text-primary text-[1rem] py-2 px-3
              hover:bg-secondary-light cursor-pointer 
              ${
                currentActiveTab === tab.value ||
                (!currentActiveTab && index === 0)
                  ? "border-b-3 border-primary-highlight font-semibold"
                  : ""
              }`}
          >
            {tab.icon && (
              <img
                src={tab.icon}
                alt={tab.label}
                className="w-4 h-4 object-contain"
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      {currentActiveTab
        ? tabs.find((tab) => tab.value === currentActiveTab)?.component
        : tabs[0]?.component}
    </div>
  );
};

export default Tabs;
