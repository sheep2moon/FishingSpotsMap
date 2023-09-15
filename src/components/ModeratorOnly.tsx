import { useSession } from "next-auth/react";
import React from "react";

const ModeratorOnly = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  if (session.data?.user.role !== "MODERATOR") return <></>;
  return <>{children}</>;
};

export default ModeratorOnly;
