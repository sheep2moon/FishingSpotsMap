import React, { useState } from "react";
import StarRating from "../ui/star-rating";
import { api } from "../../lib/utils/api";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type AddReviewProps = {
  spotId: string;
};

const AddReview = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AddReviewProps
>(({ spotId, ...props }, ref) => {
  const ctx = api.useContext();
  const [comment, setComment] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const addReviewMutation = api.fishery.addReview.useMutation({
    onSuccess: () => {
      void ctx.fishery.getFishingSpot.invalidate();
      setComment("");
      setRate(0);
      setIsSubmitDisabled(false);
    },
  });

  const handleAddReview = () => {
    setIsSubmitDisabled(true);
    void addReviewMutation.mutateAsync({ comment, rate, spotId });
  };

  return (
    <Card ref={ref} {...props}>
      <CardHeader className="pb-2">
        <CardTitle>Twoja opinia</CardTitle>
        <CardDescription>
          Jeżeli odwiedziłeś to łowisko, przekaż swoją opinie
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-0 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <p>Ocena</p>
          <StarRating disabled={false} rate={rate} setRate={setRate} />
        </div>
        <Textarea
          placeholder="Opisz swoje doświadczenie z tym miejscem."
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          onClick={handleAddReview}
          className="ml-auto mt-2 w-fit "
          variant="default"
          disabled={isSubmitDisabled}
        >
          Dodaj recenzje
        </Button>
      </CardContent>
    </Card>
  );
});

AddReview.displayName = "AddReview";

export default AddReview;
