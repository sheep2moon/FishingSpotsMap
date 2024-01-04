import { type Review } from "@prisma/client";
import React from "react";
import StarRating from "../ui/star-rating";
import { api } from "../../lib/utils/api";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { IconDots } from "@tabler/icons-react";
import Avatar from "../ui/avatar";

type ReviewsProps = {
  reviews: Review[];
};

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Separator />
      {reviews.length === 0 && (
        <div className="p-2">To miejsca nie ma jeszcze żadnych opini.</div>
      )}
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;

const Review = ({ review }: { review: Review }) => {
  const userQuery = api.users.getPublicUser.useQuery({
    userId: review.createdBy,
  });

  return (
    <div className="rounded-md border border-primary-200 bg-primary p-2 dark:border-primary-800 dark:bg-primary-950 sm:p-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-10" imageSrc={userQuery.data?.image || ""} />

        <div className="flex flex-col gap-1">
          <span className="font-bold">{userQuery.data?.name || "anonim"}</span>
          <StarRating disabled={true} rate={review.rate} />
        </div>
        <div className="mb-auto ml-auto flex items-center gap-4">
          <span className="text-sm">
            {format(review.createdAt, "dd-MM-yyyy")}
          </span>
          <Button variant="ghost">
            <IconDots />
          </Button>
        </div>
      </div>

      <p className="mt-2 bg-primary-200 px-2 py-1 dark:bg-primary-900/20">
        {review.comment}
      </p>
    </div>
  );
};
