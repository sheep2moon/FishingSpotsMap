import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import useUiStore from "../zustand/ui-store";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { IconBrandDiscordFilled, IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/router";

const SignInDialog = () => {
  const { isLoginOpen, setIsLoginOpen } = useUiStore((state) => state);
  const router = useRouter();

  const handleSignIn = (method: "discord" | "google") => {
    console.log(router.asPath, router);
    const callback = router.asPath;
    if (method === "discord") void signIn("discord", { callbackUrl: callback });
  };
  return (
    <Dialog open={isLoginOpen} onOpenChange={(open) => setIsLoginOpen(open)}>
      <DialogContent>
        <h2>Zaloguj się za pomocą:</h2>
        <Button
          variant="secondary"
          className="bg-indigo-600 text-lg font-bold text-primary hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          onClick={() => handleSignIn("discord")}
        >
          Discord
          <IconBrandDiscordFilled />
        </Button>
        <Button
          variant="secondary"
          className="bg-rose-600 text-lg font-bold text-primary hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-800"
          onClick={() => void signIn("google")}
        >
          Google
          <IconBrandGoogle />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
