import Image from "next/image";
import React from "react";
import { cn } from "../../lib/utils/cn";

const LoadingView = () => {
  return (
    <div
      role="status"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative aspect-square w-28 animate-bounce">
        <Image
          src="/images/spinner.svg"
          className={cn(
            "mr-2 inline aspect-square w-full  text-gray-200 duration-1000 dark:text-gray-600"
          )}
          fill
          alt=""
        />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-sm bg-primary-dark p-1 text-sm">
          Wczytywanie...
        </span>
      </div>
      <span className="sr-only">Czekaj...</span>
    </div>
  );
};

export default LoadingView;
