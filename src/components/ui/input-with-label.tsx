import { Input, type InputProps } from "./input";
import { Label } from "./label";
import * as React from "react";
interface InputWithLabelProps extends InputProps {
  label: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={props.id}>{label}</Label>
        <Input {...props} ref={ref} />
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
