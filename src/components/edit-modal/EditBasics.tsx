import React, { useState } from "react";
import { Input } from "../common/Input";
import { type EditFieldProps } from "./EditModalTemplate";
import SubmitEdit, { type HandleSubmitArgs } from "./SubmitEdit";

const EditBasics = ({ spot }: EditFieldProps) => {
  const [currentName, setCurrentName] = useState(spot.name);
  const [currentCity, setCurrentCity] = useState(spot.city);
  const [currentProvince, setCurrentProvince] = useState(spot.province);
  const [currentArea, setCurrentArea] = useState(spot.area);

  const onSubmit = (): false | HandleSubmitArgs => {
    if (currentName.length < 3) return false;
    return { key: "name", value: currentName };
  };
  return (
    <form className="flex flex-col gap-2">
      <Input
        label="Nazwa"
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        type="text"
      />
      <Input
        label="Miejscowość"
        value={currentCity}
        onChange={(e) => setCurrentCity(e.target.value)}
        type="text"
      />
      <Input
        label="Province"
        value={currentProvince}
        onChange={(e) => setCurrentProvince(e.target.value)}
        type="text"
      />
      <Input
        label="Powierzchnia"
        value={currentArea}
        onChange={(e) => setCurrentArea(e.target.value)}
        type="text"
      />
      <SubmitEdit onSubmit={onSubmit} spotId={spot.id} />
    </form>
  );
};

export default EditBasics;
