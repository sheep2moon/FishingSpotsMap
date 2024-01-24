import React, { useState } from "react";
import { type FSpotData } from "../../../schemas/fishing-spot.schema";
import Image from "next/image";
import { getSpotImageSrc } from "../../lib/utils/getImageSrc";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

type ImageCarouselProps = {
  images: Partial<FSpotData["images"]>;
};

const ImageCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ImageCarouselProps
>(({ images, ...props }, ref) => {
  const [api, setApi] = useState<CarouselApi>();

  const handlePreviousImage = () => {
    api?.scrollPrev();
  };
  const handleNextImage = () => {
    api?.scrollNext();
  };
  const handleSelectImage = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        {...props}
        ref={ref}
        className="mx-auto flex aspect-video w-screen max-w-sm justify-center sm:max-w-2xl sm:p-2"
      >
        <Button
          onClick={handlePreviousImage}
          className="absolute -left-12 top-1/2 z-50 mr-2 hidden h-10 w-10 -translate-y-1/2 rounded-full p-0 lg:flex"
          variant="ghost"
        >
          <IconArrowLeft className="h-8 w-8" />
        </Button>
        <Button
          onClick={handleNextImage}
          className="absolute -right-12 top-1/2 z-30 ml-2 hidden h-10 w-10 -translate-y-1/2 rounded-full p-0 lg:flex"
          variant="ghost"
        >
          <IconArrowRight className="h-8 w-8" />
        </Button>
        <CarouselContent className="ml-0 h-full w-full">
          {Array.from({ length: images.length }, (_, index) => {
            const currentImage = images[index];
            if (!currentImage) return <></>;
            return (
              <CarouselItem
                // onClick={() => setSelectedImageIndex(index)}
                className="relative aspect-video w-full"
                key={currentImage.id}
              >
                <Image
                  className="aspect-square rounded-sm object-contain"
                  alt="widok"
                  fill
                  src={getSpotImageSrc(currentImage.id)}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>

      <div className="mx-auto my-2 flex max-w-sm items-center justify-center gap-1 overflow-x-auto sm:max-w-2xl">
        {Array.from({ length: images.length }, (_, index) => {
          const currentImage = images[index];
          if (!currentImage) return <></>;
          return (
            <div
              className="relative aspect-square w-20"
              onClick={() => handleSelectImage(index)}
              key={`img-preview-${index}`}
            >
              <Image
                className="rounded-sm object-cover"
                alt=""
                src={getSpotImageSrc(currentImage.id)}
                fill
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
