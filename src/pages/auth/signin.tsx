import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { IconBrandDiscordFilled } from "@tabler/icons-react";

const SignIn = () => {
  const session = useSession();

  if (session.data?.user)
    return (
      <div className="text-dark flex min-h-screen flex-col items-center justify-center gap-4">
        Jesteś zalogowany
        <Button variant="secondary" onClick={() => void signOut()}>
          wyloguj
        </Button>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="p-8">
        <CardHeader>
          <CardTitle className="justify-center">Zaloguj się</CardTitle>
        </CardHeader>
        <CardContent className="mt-8">
          <Button
            variant="secondary"
            className="bg-indigo-600 text-primary dark:bg-indigo-600"
            onClick={() => void signIn("discord")}
          >
            za pomocą Discord
            <IconBrandDiscordFilled />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
