import React from "react";
import { api } from "../../utils/api";
import Button from "../common/Button";

export type HandleSubmitArgs =
  | {
      key:
        | "imagesId"
        | "prices"
        | "name"
        | "description"
        | "province"
        | "city"
        | "fish_types"
        | "area"
        | "contact";
      value: string;
    }
  | {
      key: "night_fishing" | "tent" | "accommodation" | "spinning";
      value: boolean;
    }
  | {
      key: "position";
      value: Position;
    };

type SubmitEditProps = {
  onSubmit: () => false | HandleSubmitArgs;
  spotId: string;
};

const SubmitEdit = ({ onSubmit, spotId }: SubmitEditProps) => {
  const { mutateAsync: updateFieldValue, isLoading } =
    api.moderator.editStringField.useMutation();

  const handleSubmit = async () => {
    const data = onSubmit();
    if (data === false) return;
    if (typeof data.value === "string") {
      await updateFieldValue({
        fieldKey: data.key,
        fieldValue: data.value,
        spotId: spotId,
      });
    }
    if (typeof data.value === "boolean") {
      console.log("boolean");
    }
    if (data.key === "position") {
      console.log("pos");
    }
  };
  return (
    <>
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        onClick={void handleSubmit}
      >
        Potwierdź
      </Button>
    </>
  );
};

export default SubmitEdit;
