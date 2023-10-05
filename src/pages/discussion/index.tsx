import React from "react";
import { InternalLink } from "../../components/ui/internal-link";

const Discussion = () => {
  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-6 p-2 pb-16 text-xl">
      Discussion
      <InternalLink href="/discussion/new">Stwórz dyskusje</InternalLink>
    </div>
  );
};

export default Discussion;
