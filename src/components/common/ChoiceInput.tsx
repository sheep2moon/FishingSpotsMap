import clsx from "clsx";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const ChoiceInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label = "", checked, ...props }, ref) => {
    return (
      <label className="flex w-full items-center justify-start gap-2 rounded-md bg-dark/50 p-1 text-xl">
        <input
          checked={checked}
          {...props}
          ref={ref}
          type="checkbox"
          className="hidden"
        />
        <span className="relative flex h-8 w-20 items-center justify-around rounded-md border border-gray-600 bg-primary text-base transition-colors duration-300">
          <span className="z-10 ">NIE</span>
          <span className="z-10 ">TAK</span>
          <span
            className={clsx(
              "absolute left-0 h-8 w-10 translate-x-0 transform rounded-md bg-accent/40 transition-transform duration-300",
              { "translate-x-0": !checked, "translate-x-10": checked }
            )}
          ></span>
        </span>
        {label}
      </label>
    );
  }
);

ChoiceInput.displayName = "ChoiceInput";

export default ChoiceInput;
