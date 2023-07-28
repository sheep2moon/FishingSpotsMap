import React, { useState } from "react";
import { Input } from "../common/Input";
import { EditFieldProps } from "./EditModalTemplate";

interface EditNameProps extends EditFieldProps {
  name: string;
}

const EditName = ({ name }: EditNameProps) => {
  const [currentName, setCurrentName] = useState(name);
  return (
    <>
      <Input
        label="Nazwa"
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        type="text"
      />
    </>
  );
};

export default EditName;
