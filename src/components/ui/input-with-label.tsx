import { cn } from "../../lib/utils/cn";
import { Input, type InputProps } from "./input";
import { Label } from "./label";
import * as React from "react";
interface InputWithLabelProps extends InputProps {
  label: React.ReactNode;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div
        className={cn("grid w-full max-w-sm items-center gap-1.5", className)}
      >
        <Label className="flex items-center gap-2" htmlFor={props.id}>
          {label}
        </Label>
        <Input {...props} ref={ref} />
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
