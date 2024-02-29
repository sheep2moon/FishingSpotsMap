import React, { forwardRef, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { IconCamera, IconGripVertical, IconX } from "@tabler/icons-react";

import { clamp, swapIndices } from "remeda";
import { useDrag } from "@use-gesture/react";
import { Input } from "../../ui/input";

import { Button } from "../../ui/button";
import { type FSpotImageWithFile } from "../../../../schemas/fishing-spot.schema";
import { cn } from "../../../lib/utils/cn";
import ImageInput from "../../ui/image-input";
import { getSpotImageSrc } from "../../../lib/utils/getImageSrc";

type NewSpotImagesFormProps = {
  images: FSpotImageWithFile[];
  setImages: (images: FSpotImageWithFile[]) => void;
};

const ImagesSpotForm = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & NewSpotImagesFormProps
>(({ images, setImages, ...props }, ref) => {
  const [imageContainerRef] = useAutoAnimate();
  const [activeRows, setActiveRows] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const onFileAdd = (file: File) => {
    setImages([...images, { comment: "", source: "", file, id: uuidv4() }]);
  };

  const handleDeleteImage = (imageIndex: number) => {
    const newImages = [...images];
    newImages.splice(imageIndex, 1);
    setImages(newImages);
  };

  const onImageDetailsChange = (
    index: number,
    targetType: "source" | "comment",
    value: string
  ) => {
    const newImages = [...images];
    const editedImage = newImages.at(index);
    if (editedImage) {
      if (targetType === "comment") editedImage.comment = value;
      if (targetType === "source") editedImage.source = value;
      newImages.splice(index, 1, editedImage);
      setImages(newImages);
    }
  };

  const bind = useDrag(({ args: [imageIndex], active, movement: [, y] }) => {
    if (active && !activeRows[0])
      setActiveRows((prev) => [imageIndex, prev[1]]);

    const currentRow = clamp(Math.round((imageIndex * 144 + y) / 144), {
      min: 0,
      max: images.length - 1,
    });

    if (
      activeRows[0] &&
      activeRows[1] !== currentRow &&
      activeRows[0] !== currentRow
    )
      setActiveRows((prev) => [prev[0], currentRow]);
    if (currentRow !== imageIndex) {
      const newImages = swapIndices([...images], imageIndex, currentRow);
      if (!active) {
        setImages(newImages);
      }
    }
    if (!active) setActiveRows([null, null]);
  });

  return (
    <Card ref={ref} {...props}>
      <CardHeader>
        <CardTitle>
          <IconCamera />
          Zdjęcia
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 pt-0 lg:p-6">
        <div
          ref={imageContainerRef}
          className="grid grid-cols-1 gap-2 lg:gap-4"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "group flex h-36 w-full items-center rounded-md bg-primary-100 shadow-md shadow-primary-dark/20 dark:bg-primary-900/40 lg:pr-2",
                activeRows[0] === index && "bg-info-200/50 dark:bg-info-800/20",
                activeRows[1] !== activeRows[0] &&
                  activeRows[1] === index &&
                  "ring-2 ring-info-800"
              )}
            >
              <div className="relative aspect-square h-full select-none overflow-hidden rounded-md border-primary-300 bg-white dark:border-primary-dark dark:bg-primary-800 lg:aspect-video">
                <Image
                  className={cn("touch-none object-contain")}
                  fill
                  alt=""
                  src={
                    image.file
                      ? URL.createObjectURL(image.file)
                      : getSpotImageSrc(image.id)
                  }
                />
              </div>
              <Button
                {...bind(index)}
                variant="ghost"
                className="touch-none px-1.5 text-primary-600/70 hover:text-primary-700"
                size="sm"
              >
                <IconGripVertical className="" />
              </Button>
              <div className="flex w-full flex-col gap-2">
                <Input
                  value={image.comment || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onImageDetailsChange(index, "comment", e.target.value)
                  }
                  placeholder="Komentarz"
                />
                <Input
                  value={image.source || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onImageDetailsChange(index, "source", e.target.value)
                  }
                  placeholder="Źródło"
                />
              </div>
              <Button
                variant="ghost"
                className="ml-auto px-1 hover:bg-rose-500/50"
                size="sm"
                onClick={() => handleDeleteImage(index)}
              >
                <IconX className="p-2" size="2.8rem" />
              </Button>
            </div>
          ))}
          <ImageInput className="h-36" onFileAdd={onFileAdd} />
        </div>
      </CardContent>
    </Card>
  );
});

ImagesSpotForm.displayName = "NewSpotImagesForm";

export { ImagesSpotForm };
