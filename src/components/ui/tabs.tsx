import React from "react";
import { Button } from "./button";
import { cn } from "../../lib/utils/cn";

export type TabList = {
  key: string;
  name: string;
  icon: React.ReactNode;
}[];

type TabsProps = {
  tabList: TabList;
  onTabSelect: (key: string) => void;
  selectedTab: string;
};

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TabsProps
>(({ tabList, onTabSelect, selectedTab, className, ...props }, ref) => {
  return (
    <div className={cn("flex gap-1", className)} {...props} ref={ref}>
      {tabList.map((tab) => (
        <Button
          onClick={() => onTabSelect(tab.key)}
          variant="secondary"
          className={cn(
            "",
            selectedTab === tab.key && "text-accent dark:text-accent"
          )}
          key={tab.key}
        >
          {tab.icon} {tab.name}
        </Button>
      ))}
    </div>
  );
});

Tabs.displayName = "Tabs";

export default Tabs;
