import { type Review } from "@prisma/client";
import React from "react";
import StarRating from "../common/indicators/StarRating";
import Image from "next/image";
import { api } from "../../utils/api";

type ReviewsProps = {
  reviews: Review[];
};

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div className="mt-4 flex flex-col gap-2 px-2">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;

const Review = ({ review }: { review: Review }) => {
  const userQuery = api.users.getUserById.useQuery({
    userId: review.createdBy,
  });

  return (
    <div className="rounded-sm bg-gray-200 p-2 ring-1 ring-primary-700 dark:bg-primary-dark">
      <div className="flex items-center gap-2">
        <div className="relative aspect-square w-12 ">
          <Image
            src={userQuery.data?.image || ""}
            fill
            className="rounded-full"
            alt="awatar"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{userQuery.data?.name || "anonim"}</span>
          <span>{review.createdAt.toUTCString()}</span>
        </div>
        <div className="mb-auto ml-auto flex items-center">
          <p>opcje</p>
        </div>
      </div>
      <StarRating disabled={true} rate={review.rate} />
      <p className="mt-2 bg-gray-100 px-2 py-1 dark:bg-primary-800">
        {review.comment}
      </p>
    </div>
  );
};
