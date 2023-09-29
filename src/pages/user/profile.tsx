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

const userTabs = [
  {
    key: "user-settings",
    name: "Ustawienia konta",
    icon: <IconUserEdit />,
  },
  {
    key: "badges",
    name: "Odznaki",
    icon: <IconAward />,
  },
  {
    key: "notifications",
    name: "Powiadomienia",
    icon: <IconBell />,
  },
] as const;

type TabKey = (typeof userTabs)[number]["key"];

const UserProfile = () => {
  const userQuery = api.users.getPrivateUser.useQuery();
  const [activeTabKey, setActiveTabKey] = useState<TabKey>(userTabs[0].key);
  useDebugLog(userQuery.data);
  if (!userQuery.data) return <LoadingSpinner />;
  return (
    <div className="mx-auto mt-16 min-h-screen w-full max-w-screen-xl">
      <ViewHeader>
        <ViewTitle>Twój profil</ViewTitle>
        <ViewSubtitle>podsumowanie</ViewSubtitle>
      </ViewHeader>
      <div className="p-2">
        <div className="flex gap-1">
          {userTabs.map((tab) => (
            <Button
              onClick={() => setActiveTabKey(tab.key)}
              variant="secondary"
              className={cn(
                "",
                activeTabKey === tab.key && "text-accent dark:text-accent"
              )}
              key={tab.key}
            >
              {tab.icon} {tab.name}
            </Button>
          ))}
        </div>
        <div>
          {activeTabKey === "user-settings" && (
            <UserSettings userData={userQuery.data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
