import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { IconArrowsMoveVertical } from "@tabler/icons-react";
import { cn } from "../lib/utils/cn";

export type SortingOption = {
  name: string;
  key: string;
};

type SortingMenuProps<T> = {
  activeOption: T;
  options: T[];
  setActiveOption: (option: T) => void;
};

const SortingMenu = <T extends SortingOption>(props: SortingMenuProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap">
          {props.activeOption.name}
          <IconArrowsMoveVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {props.options.map((option) => (
            <DropdownMenuItem
              onClick={() => props.setActiveOption(option)}
              key={option.key}
              className={cn(
                "whitespace-nowrap",
                props.activeOption.key === option.key && "bg-primary-800"
              )}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortingMenu;
