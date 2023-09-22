import React from "react";
import { cn } from "../../lib/utils/cn";

type ImageInputProps = {
  onFileAdd: (file: File) => void;
};

const ImageInput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ImageInputProps
>(({ onFileAdd, className, ...props }, ref) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputFile = e.currentTarget.files?.[0];
    if (inputFile) onFileAdd(inputFile);
  };

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "aspect-square w-full rounded-md border border-primary-200 dark:border-primary-800 dark:hover:bg-primary-800",
        className
      )}
    >
      <label htmlFor="image-upload" className="flex h-full cursor-pointer ">
        <input
          className="peer w-0 opacity-0"
          id="image-upload"
          type="file"
          onChange={handleFileChange}
        />
        <div className="flex h-full w-full flex-col items-center justify-center rounded-md ring-primary peer-focus:ring-2">
          <svg
            aria-hidden="true"
            className="mb-3 h-8 w-8 text-primary-500 dark:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <span className="text-center text-sm">Kliknij aby dodać zdjęcie</span>
        </div>
      </label>
    </div>
  );
});

ImageInput.displayName = "ImageInput";
export default ImageInput;
