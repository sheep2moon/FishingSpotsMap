import React from "react";
import { Button } from "./button";
import { cn } from "../../lib/utils/cn";

export type Tab<Key extends string> = {
  key: Key;
  name: string;
  icon: React.ReactNode;
};

type TabsProps<T extends string> = {
  tabList: readonly Tab<T>[];
  onTabSelect: (key: T) => void;
  selectedTab: T;
};

const Tabs = <T extends string>({
  tabList,
  onTabSelect,
  selectedTab,
}: TabsProps<T>): JSX.Element => {
  return (
    <div className={cn("flex gap-1")}>
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
};

export default Tabs;
