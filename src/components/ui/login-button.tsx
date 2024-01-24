import {
  IconBrandDiscordFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import useUiStore from "../../zustand/ui-store";

type LoginButtonProps = {
  text?: string;
};

const LoginButton = ({ text = "Zaloguj się" }: LoginButtonProps) => {
  const setIsOpen = useUiStore((store) => store.setIsLoginOpen);
  return (
    <Button className="whitespace-nowrap" onClick={() => setIsOpen(true)}>
      {text}
      {/* <div className="flex items-center gap-1">
        <IconBrandDiscordFilled className="" />
        <IconBrandGoogleFilled className="" />
      </div> */}
    </Button>
  );
};

export default LoginButton;
