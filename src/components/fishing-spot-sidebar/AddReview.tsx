import React, { useState } from "react";
import StarRating from "../common/indicators/StarRating";
import { Textarea } from "../common/TextArea";
import Button from "../common/Button";
import { api } from "../../utils/api";

type AddReviewProps = {
  spotId: string;
};

const AddReview = ({ spotId }: AddReviewProps) => {
  const [comment, setComment] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const addReviewMutation = api.fishery.addReview.useMutation();

  const handleAddReview = async () => {
    setIsSubmitDisabled(true);
    await addReviewMutation.mutateAsync({ comment, rate, spotId });
    setIsSubmitDisabled(false);
  };

  return (
    <div className="mx-2 mt-2 rounded-sm border-2 border-gray-400/20 bg-gray-200 p-2 shadow-sm shadow-dark/30">
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
        onClick={void handleAddReview}
        className="ml-auto mt-1 w-fit "
        variant="filled"
        disabled={isSubmitDisabled}
      >
        Dodaj recenzje
      </Button>
    </div>
  );
};

export default AddReview;
