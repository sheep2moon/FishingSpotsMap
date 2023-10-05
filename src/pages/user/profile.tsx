import React, { useState } from "react";
import { api } from "../../lib/utils/api";
import { useDebugLog } from "../../hooks/useDebugLog";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../../components/ui/view-header";
import { IconAward, IconBell, IconUserEdit } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils/cn";
import AccountSettings from "../../components/user-profile-tabs/user-settings";
import UserSettings from "../../components/user-profile-tabs/user-settings";
import LoadingSpinner from "../../components/ui/loading-spinner";
import UserAchievements from "../../components/user-profile-tabs/user-achievements";
import Tabs from "../../components/ui/tabs";

const userTabs = [
  {
    key: "user-settings",
    name: "Ustawienia konta",
    icon: <IconUserEdit />,
  },
  {
    key: "achievements",
    name: "Osiągnięcia",
    icon: <IconAward />,
  },
  {
    key: "notifications",
    name: "Powiadomienia",
    icon: <IconBell />,
  },
];

const UserProfile = () => {
  const userQuery = api.users.getPrivateUser.useQuery();
  const [activeTabKey, setActiveTabKey] = useState<string>(
    userTabs[0]?.key || ""
  );
  useDebugLog(userQuery.data);
  if (!userQuery.data) return <LoadingSpinner />;
  return (
    <div className="mx-auto mt-16 min-h-screen w-full max-w-screen-xl">
      <ViewHeader>
        <ViewTitle>Twój profil</ViewTitle>
        <ViewSubtitle>podsumowanie</ViewSubtitle>
      </ViewHeader>
      <div className="p-2">
        <Tabs
          onTabSelect={setActiveTabKey}
          selectedTab={activeTabKey}
          tabList={userTabs}
        />
        <div className="mt-2">
          {activeTabKey === "user-settings" && (
            <UserSettings userData={userQuery.data} />
          )}
          {activeTabKey === "achievements" && <UserAchievements />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
