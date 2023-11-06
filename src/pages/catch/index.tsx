import { useSession } from "next-auth/react";
import React from "react";
import { InternalLink } from "~/components/ui/internal-link";

const CatchPage = () => {
  const session = useSession();
  return (
    <div className="mt-16 max-w-screen-xl">
      <div className="flex flex-col gap-2">
        {session.data?.user ? (
          <InternalLink href="/catch/new-catch">Dodaj zdobycz</InternalLink>
        ) : (
          <InternalLink href="/auth/signin">
            Zaloguj się aby dodać zdobycz
          </InternalLink>
        )}
      </div>
    </div>
  );
};

export default CatchPage;
