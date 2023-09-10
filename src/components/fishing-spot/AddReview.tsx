import React, { useState } from "react";
import StarRating from "../common/indicators/StarRating";
import { Textarea } from "../common/TextArea";
import Button from "../common/Button";
import { api } from "../../utils/api";

type AddReviewProps = {
  spotId: string;
};

const AddReview = ({ spotId }: AddReviewProps) => {
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
    <div className="shadow-dark/30 mx-2 mt-2 rounded-sm border-2 border-gray-400/20 bg-gray-200 p-2 shadow-sm">
      <span className="text-base ">
        Widziałeś to miejsce? Przekaż swoją opinie.
      </span>
      <StarRating disabled={false} rate={rate} setRate={setRate} />
      <div>
        <Textarea
          placeholder="Opisz swoje doświadczenie z tym miejscem."
          name="comment"
          value={comment}
          className="bg-gray-100"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button
        isLoading={addReviewMutation.isLoading}
        onClick={handleAddReview}
        className="ml-auto mt-2 w-fit "
        variant="filled"
        disabled={isSubmitDisabled}
      >
        Dodaj recenzje
      </Button>
    </div>
  );
};

export default AddReview;
