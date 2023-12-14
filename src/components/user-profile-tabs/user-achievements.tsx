import React from "react";
import BadgeTemplate from "../achievements/badge-template";
import { api } from "../../lib/utils/api";
import LoadingSpinner from "../ui/loading-view";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDebugLog } from "../../hooks/useDebugLog";

const UserAchievements = () => {
  const achievementsQuery = api.achievements.getAchievements.useQuery();
  const userAchievementsQuery = api.achievements.getUserAchievements.useQuery();
  // useDebugLog(userAchievementsQuery.data);

  if (!achievementsQuery.data || !userAchievementsQuery.data)
    return <LoadingSpinner />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Osiągnięcia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-6 p-4">
          {achievementsQuery.data.map((achievement) => {
            const userAchievement = userAchievementsQuery.data.find(
              (userAchievement) =>
                userAchievement.achievementId === achievement.id
            );

            return (
              <>
                {Array.from({ length: achievement.max_level }).map(
                  (_, index) => {
                    const level = index + 1;
                    const currentPoints =
                      Math.pow(achievement.level_multiplication, level - 1) *
                      achievement.points;
                    return (
                      <div
                        className="flex w-full rounded-md p-3 dark:bg-primary-dark"
                        key={`${achievement.id}-level-${level}`}
                      >
                        <BadgeTemplate
                          achieved={
                            userAchievement?.current_level
                              ? userAchievement.current_level >= level
                              : false
                          }
                          iconUrl={achievement.icon_url}
                          level={level}
                        />
                        <div className="ml-8 flex flex-col gap-2">
                          <div className="flex items-center gap-2 font-dosis text-lg font-bold">
                            <span>{achievement.name}</span>
                            <span className="text-base font-thin">{`poziom ${level}`}</span>
                          </div>
                          <p>{achievement.description}</p>
                        </div>
                        <div className="ml-auto">
                          <div>
                            Postęp{" "}
                            <span>{`${
                              userAchievement
                                ? Math.min(
                                    userAchievement.progress,
                                    currentPoints
                                  )
                                : 0
                            }/${currentPoints}`}</span>
                          </div>
                          {userAchievement?.earnedAt && (
                            <span>
                              Ukończono dnia{" "}
                              {userAchievement.earnedAt.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserAchievements;

// return (
//   <div
//     className="flex w-full rounded-md p-3 dark:bg-primary-dark"
//     key={achievement.id}
//   >
//     <BadgeTemplate
//       achieved={!!userAchievement}
//       iconUrl={achievement.icon_url}
//       level={userAchievement?.current_level || 1}
//     />
//     <div className="ml-8 flex flex-col gap-2">
//       <div className="font-dosis text-lg font-bold">
//         <span>{achievement.name}</span>
//       </div>
//       <p>{achievement.description}</p>
//     </div>
//     <div className="ml-auto">
//       <div>
//         Postęp{" "}
//         <span>{`${userAchievement ? userAchievement.progress : 0}/${
//           achievement.points
//         }`}</span>
//       </div>
//       {userAchievement?.earnedAt && (
//         <span>
//           Ukończono dnia{" "}
//           {userAchievement.earnedAt.toLocaleDateString()}
//         </span>
//       )}
//     </div>
//   </div>
// );
