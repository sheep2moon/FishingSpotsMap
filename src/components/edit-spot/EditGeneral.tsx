import React, { useState } from "react";
import { Input } from "../common/OldInput";
// import { type EditFieldProps } from "./EditModalTemplate";
// import SubmitEdit, { type HandleSubmitArgs } from "./SubmitEdit";
import type { FishingSpot } from "@prisma/client";

const EditGeneral = ({
  name,
  area,
}: Pick<FishingSpot, "name" | "area" | "contact">) => {
  const [currentName, setCurrentName] = useState(name);
  const [currentArea, setCurrentArea] = useState(area);
  // const onSubmit = (): false | HandleSubmitArgs => {
  //   if (currentName.length < 3) return false;
  //   return { key: "name", value: currentName };
  // };
  return (
    <>
      <Input
        label="Nazwa"
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        type="text"
      />
      {/* <Input
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
      /> */}
      <Input
        label="Powierzchnia"
        value={currentArea}
        onChange={(e) => setCurrentArea(e.target.value)}
        type="text"
      />
      {/* <SubmitEdit onSubmit={onSubmit} spotId={spot.id} /> */}
    </>
  );
};

export default EditGeneral;
