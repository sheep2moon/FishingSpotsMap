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
          className="hidden "
        />
        <span
          className={clsx(
            "relative flex h-8 w-20 cursor-pointer select-none items-center justify-around rounded-md border border-gray-600 bg-light text-base transition-none duration-300"
          )}
        >
          <span
            className={clsx("z-10", {
              "text-light": !checked,
              "text-dark": checked,
            })}
          >
            NIE
          </span>
          <span
            className={clsx("z-10", {
              "text-light": checked,
              "text-dark": !checked,
            })}
          >
            TAK
          </span>
          <span
            className={clsx(
              "absolute left-0 h-8 w-10 translate-x-0 transform rounded-md bg-dark transition-transform duration-300",
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
