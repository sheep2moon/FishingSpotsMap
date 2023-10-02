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
          variant="outline"
          disabled={!!unfollowMutation.isLoading}
          onClick={() => void unfollowFishingSpot()}
        >
          <IconStarFilled className="text-amber-300" />
          Obserwujesz
        </Button>
      ) : (
        <Button
          variant="outline"
          disabled={!!followMutation.isLoading}
          onClick={() => void followFishingSpot()}
        >
          <IconStar />
          Obserwuj
        </Button>
      )}
    </>
  );
};

export default FollowSpot;
