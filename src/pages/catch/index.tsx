import { useSession } from "next-auth/react";
import React from "react";
import { InternalLink } from "~/components/ui/internal-link";
import { api } from "../../lib/utils/api";
import CatchPreview from "../../components/catch/catch-preview";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../../components/ui/view-header";
import { IconPlus } from "@tabler/icons-react";

const CatchPage = () => {
  const session = useSession();
  const { data, isLoading } = api.catch.getCatches.useQuery();
  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-6 p-2 pb-16 text-xl">
      <ViewHeader>
        <ViewTitle>Połów</ViewTitle>
        <ViewSubtitle>
          {session.data?.user ? (
            <InternalLink href="/catch/new-catch">
              <IconPlus />
              Dodaj zdobycz
            </InternalLink>
          ) : (
            <InternalLink className="text-xl" href="/auth/signin">
              Zaloguj się aby dodać połów
            </InternalLink>
          )}
        </ViewSubtitle>
      </ViewHeader>
      <div className="grid grid-cols-2 gap-2 p-1 lg:grid-cols-4">
        {data &&
          data.map((fishCatch) => (
            <CatchPreview key={fishCatch.id} fishCatch={fishCatch} />
          ))}
      </div>
    </div>
  );
};

export default CatchPage;
