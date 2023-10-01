import React from "react";
import BadgeTemplate from "../achievements/badge-template";
import { IconFishHook } from "@tabler/icons-react";

import ReviewIcon from "../../../public/images/achievements/reviews.svg";
import { StaticImageData } from "next/image";

const UserAchievements = () => {
  return (
    <div className="flex gap-8 p-4">
      <BadgeTemplate
        achieved={true}
        level={1}
        icon={ReviewIcon as StaticImageData}
      />
      <BadgeTemplate
        achieved={false}
        level={2}
        icon={ReviewIcon as StaticImageData}
      />
      <BadgeTemplate
        achieved={false}
        level={3}
        icon={ReviewIcon as StaticImageData}
      />
    </div>
  );
};

export default UserAchievements;
