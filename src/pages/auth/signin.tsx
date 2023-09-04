import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Button from "../../components/common/Button";

const SignIn = () => {
  const session = useSession();

  if (session.data?.user)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-dark">
        Jesteś zalogowany
        <Button variant="filled" onClick={() => void signOut()}>
          wyloguj
        </Button>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Button variant="filled" onClick={() => void signIn("discord")}>
        Sign In with Discord
      </Button>
    </div>
  );
};

export default SignIn;
