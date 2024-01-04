import React from "react";
import { api } from "../../lib/utils/api";
import { Button } from "../ui/button";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

type FollowSpotProps = {
  spotId: string;
};

const FollowSpot = ({ spotId }: FollowSpotProps) => {
  const followedSpotsQuery = api.users.getFollowedSpots.useQuery();
  const followMutation = api.users.followFishingSpot.useMutation();
  const unfollowMutation = api.users.unfollowFishingSpot.useMutation();
  const userQuery = api.users.getPrivateUser.useQuery();

  const followFishingSpot = async () => {
    await followMutation.mutateAsync({ spotId });
    await userQuery.refetch();
    console.log("ee");
  };
  const unfollowFishingSpot = async () => {
    await unfollowMutation.mutateAsync({ spotId });
    await userQuery.refetch();
  };
  return (
    <>
      {followedSpotsQuery.data?.followedSpots.some(
        (followedSpot) => followedSpot.id === spotId
      ) ? (
        <Button
          size="sm"
          variant="outline"
          disabled={!!unfollowMutation.isLoading}
          onClick={() => void unfollowFishingSpot()}
          className="gap-1 text-xs"
        >
          <IconStarFilled className="h-5 w-5 text-amber-300" />
          Obserwujesz
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          disabled={!!followMutation.isLoading}
          onClick={() => void followFishingSpot()}
          className="gap-1 text-xs"
        >
          <IconStar className="h-5 w-5" />
          Obserwuj
        </Button>
      )}
    </>
  );
};

export default FollowSpot;
