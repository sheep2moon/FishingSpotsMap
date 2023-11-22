import { useSession } from "next-auth/react";
import React from "react";
import { InternalLink } from "~/components/ui/internal-link";
import { api } from "../../lib/utils/api";
import CatchPreview from "../../components/catch/catch-preview";

const CatchPage = () => {
  const session = useSession();
  const { data, isLoading } = api.catch.getCatches.useQuery();
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
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {data &&
          data.map((fishCatch) => (
            <CatchPreview key={fishCatch.id} fishCatch={fishCatch} />
          ))}
      </div>
    </div>
  );
};

export default CatchPage;
