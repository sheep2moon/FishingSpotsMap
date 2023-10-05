import React, { useState } from "react";
import Tabs, { type Tab } from "../components/ui/tabs";
import { IconTags } from "@tabler/icons-react";
import { ViewHeader, ViewTitle } from "../components/ui/view-header";
import ModerateTags from "../components/moderator/moderate-tags";

type TabKey = "discussion-tags";

const tabs: readonly Tab<TabKey>[] = [
  {
    name: "Tagi dyskusji",
    key: "discussion-tags",
    icon: <IconTags />,
  },
] as const;

const ModeratorPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof tabs)[number]["key"]>("discussion-tags");
  return (
    <div className="mx-auto mt-16 min-h-screen w-full max-w-screen-xl">
      <ViewHeader>
        <ViewTitle>Panel moderatora</ViewTitle>
      </ViewHeader>
      <div className="p-2">
        <Tabs
          onTabSelect={setSelectedTab}
          selectedTab={selectedTab}
          tabList={tabs}
        />
        <div className="mt-2">
          {selectedTab === "discussion-tags" && <ModerateTags />}
        </div>
      </div>
    </div>
  );
};

export default ModeratorPage;
