import type { FishingSpot, User } from "@prisma/client";
import React from "react";

type UserSettingsProps = {
  userData: User;
};

const UserSettings = ({ userData }: UserSettingsProps) => {
  return <div>{userData.name}</div>;
};

export default UserSettings;
