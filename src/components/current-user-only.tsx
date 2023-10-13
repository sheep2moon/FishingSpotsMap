import { useSession } from "next-auth/react";
import React, { useDebugValue } from "react";

type CurrentUserOnlyProps = {
  children: React.ReactNode;
  userId: string;
};

const CurrentUserOnly = ({ userId, children }: CurrentUserOnlyProps) => {
  const session = useSession();
  useDebugValue(session);
  if (!session.data || session.data.user.id !== userId) return null;
  return <>{children}</>;
};

export default CurrentUserOnly;
