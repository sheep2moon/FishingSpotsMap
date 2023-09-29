import { useSession } from "next-auth/react";
import React from "react";

type NotAuthOnlyProps = {
  children: React.ReactNode;
};

const NotAuthOnly = ({ children }: NotAuthOnlyProps) => {
  const session = useSession();
  if (session.status === "authenticated") return null;
  return <>{children}</>;
};

export default NotAuthOnly;
