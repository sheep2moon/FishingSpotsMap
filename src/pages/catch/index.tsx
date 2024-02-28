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
    <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col gap-6 bg-white p-2 pb-16 pt-16 text-xl shadow-md dark:bg-transparent">
      <ViewHeader>
        <ViewTitle>Zdobycze</ViewTitle>
        <ViewSubtitle>
          {session.data?.user ? (
            <InternalLink className="text-xl" href="/catch/new-catch">
              <IconPlus />
              Dodaj własną zdobycz
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
      {data?.length === 0 && (
        <div className="flex w-full justify-center py-8 text-xl">
          <h3>Brak zdobyczy w bazie.</h3>
        </div>
      )}
    </div>
  );
};

export default CatchPage;
