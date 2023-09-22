import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebugLog = (value: any) => {
  return useEffect(() => {
    console.log("useDebugLog value: ", value);
  }, [value]);
};
