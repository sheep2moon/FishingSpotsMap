import { useState, useEffect } from "react";

const useDebounce = <T>(
  value: T,
  delay: number
): { debouncedValue: T; setInstantValue: (v: T) => void } => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  const setInstantValue = (value: T) => {
    setDebouncedValue(value);
  };

  return { debouncedValue, setInstantValue };
};
export default useDebounce;
