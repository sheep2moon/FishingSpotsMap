import React, { useState } from "react";
import { Input } from "../common/Input";
import { type EditFieldProps } from "./EditModalTemplate";
import SubmitEdit, { type HandleSubmitArgs } from "./SubmitEdit";

const EditName = ({ spot }: EditFieldProps) => {
  const [currentName, setCurrentName] = useState(spot.name);

  const onSubmit = (): false | HandleSubmitArgs => {
    if (currentName.length < 3) return false;
    return { key: "name", value: currentName };
  };
  return (
    <>
      <Input
        label="Nazwa"
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        type="text"
      />
      <SubmitEdit onSubmit={onSubmit} spotId={spot.id} />
    </>
  );
};

export default EditName;
