import clsx from "clsx";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const ChoiceInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label = "", checked, ...props }, ref) => {
    return (
      <label className="flex w-full items-center justify-between gap-2 bg-dark/50 p-1 text-xl font-semibold">
        {label}
        <input
          checked={checked}
          {...props}
          ref={ref}
          type="checkbox"
          className="hidden"
        />
        <span className="relative flex h-8 w-20 items-center justify-around rounded-sm bg-accent text-base transition-colors duration-300">
          <span className="z-10 font-bold">NIE</span>
          <span className="z-10 font-bold">TAK</span>
          <span
            className={clsx(
              "absolute left-0.5 top-0.5 h-7 w-9 translate-x-0 transform rounded-md bg-primary/80 transition-transform duration-300",
              { "translate-x-0": !checked, "translate-x-10": checked }
            )}
          ></span>
        </span>
      </label>
    );
  }
);

ChoiceInput.displayName = "ChoiceInput";

export default ChoiceInput;
