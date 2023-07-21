import { IconEdit } from "@tabler/icons-react";
import React from "react";

type EditableBlockProps = {
  target: string;
  children: React.ReactNode;
};

const EditableBlock = ({ target, children }: EditableBlockProps) => {
  return (
    <div className="group relative ring-accent hover:ring-2">
      <button className="absolute right-1 top-1 hidden aspect-square rounded-full bg-accent p-1 text-light group-hover:block">
        <IconEdit />
      </button>
      {children}
    </div>
  );
};

export default EditableBlock;
