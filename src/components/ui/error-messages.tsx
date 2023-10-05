import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { IconAlertHexagonFilled, IconPlayerStopFilled } from "@tabler/icons-react";

type ErrorMessagesProps = {
  errorMessages: string[]
}

const ErrorMessages = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ErrorMessagesProps
>(({ errorMessages,...props }, ref) => {
  if (errorMessages.length === 0) return null
  return (
    <div ref={ref} {...props}>
        <div className="flex flex-col gap-1 text-sm">
          <Alert variant="destructive">
            <IconAlertHexagonFilled />
            <AlertTitle className="text-lg">Błąd</AlertTitle>
            <AlertDescription className="flex flex-col gap-1">
              {errorMessages.map((message, index) => (
                <div
                  key={`error-message${index}`}
                  className="flex items-center gap-1 text-base"
                >
                  <IconPlayerStopFilled />
                  <span className="text-primary-dark dark:text-primary ">
                    {message}
                  </span>
                </div>
              ))}
            </AlertDescription>
          </Alert>
        </div>
    </div>
  );
});

ErrorMessages.displayName = "ErrorMessages";

export default ErrorMessages;
