import clsx from "clsx";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const ChoiceInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label = "", checked, ...props }, ref) => {
    return (
      <label className="flex w-full items-center justify-start gap-2 rounded-md p-1 text-xl">
        <input
          checked={checked}
          {...props}
          ref={ref}
          type="checkbox"
          className="hidden"
        />
        <span
          className={clsx(
            "relative flex h-8 w-20 cursor-pointer select-none items-center justify-around rounded-md border border-secondary text-base transition-none duration-300 dark:bg-primary-950"
          )}
        >
          <span
            className={clsx("z-10", {
              "text-primary": !checked,
              "dark:text-primary-600": checked,
            })}
          >
            NIE
          </span>
          <span
            className={clsx("z-10", {
              "text-primary": checked,
              "dark:text-primary-600": !checked,
            })}
          >
            TAK
          </span>
          <span
            className={clsx(
              "absolute left-0 h-7 w-9 translate-x-0 transform rounded-md bg-secondary transition-transform duration-300 dark:bg-secondary-900",
              {
                "translate-x-0": !checked,
                "translate-x-10": checked,
              }
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
