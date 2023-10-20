import { useState, useEffect, useMemo } from "react";

// Definicja typu dla referencji
type RefType = React.RefObject<HTMLElement>;

const useIsInViewport = (ref: RefType | undefined): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      }),
    []
  );

  useEffect(() => {
    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
};

export default useIsInViewport;
