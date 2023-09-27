import { useSession } from "next-auth/react";
import React from "react";

type AuthOnlyProps = {
  children: React.ReactNode;
};

const AuthOnly = ({ children }: AuthOnlyProps) => {
  const session = useSession();
  if (session.status === "unauthenticated") return null;
  return <>{children}</>;
};

export default AuthOnly;
