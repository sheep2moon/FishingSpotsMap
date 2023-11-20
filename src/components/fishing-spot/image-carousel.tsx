import React, { useState } from "react";
import { type FSpotData } from "../../../schemas/fishing-spot.schema";
import Image from "next/image";
import { getSpotImageSrc } from "../../lib/utils/getImageSrc";
import { Button } from "../ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type ImageCarouselProps = {
  images: Partial<FSpotData["images"]>;
};

const ImageCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ImageCarouselProps
>(({ images, ...props }, ref) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };
  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  return (
    <div {...props} ref={ref}>
      <div className="relative aspect-[16/10] max-h-[500px] w-full bg-primary-200 object-cover dark:bg-primary-800/10">
        <Image
          priority
          alt="widok"
          className="rounded-md object-contain"
          fill
          src={getSpotImageSrc(images[selectedImageIndex]?.id)}
        />
        <Button
          onClick={handlePreviousImage}
          variant="ghost"
          className="absolute left-2 top-1/2 -translate-y-1/2"
        >
          <IconChevronLeft />
        </Button>
        <Button
          onClick={handleNextImage}
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <IconChevronRight />
        </Button>
      </div>
      <div className="flex w-full justify-center gap-1 p-2">
        {Array.from({ length: images.length }, (_, index) => {
          const currentImage = images[index];
          if (!currentImage) return <></>;
          return (
            <div
              onClick={() => setSelectedImageIndex(index)}
              className="relative"
              key={currentImage.id}
            >
              <Image
                className="aspect-square rounded-sm object-cover"
                alt="widok"
                width={80}
                height={80}
                src={getSpotImageSrc(currentImage.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

ImageCarousel.displayName = "ImageCarousel";

export default ImageCarousel;
