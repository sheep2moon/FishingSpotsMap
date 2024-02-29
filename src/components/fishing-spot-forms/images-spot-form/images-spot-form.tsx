import React, { forwardRef, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  IconCamera,
  IconGripVertical,
  IconPencilMinus,
  IconX,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { swapIndices } from "remeda";
import { useDrag } from "@use-gesture/react";
import { Input } from "../../ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { type FSpotImageWithFile } from "../../../../schemas/fishing-spot.schema";
import { cn } from "../../../lib/utils/cn";
import { IconPhotoStar } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import ImageInput from "../../ui/image-input";
import { getSpotImageSrc } from "../../../lib/utils/getImageSrc";
import { useDebugLog } from "../../../hooks/useDebugLog";
import { IconArrowsMove } from "@tabler/icons-react";

type NewSpotImagesFormProps = {
  images: FSpotImageWithFile[];
  setImages: (images: FSpotImageWithFile[]) => void;
};

const ImagesSpotForm = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & NewSpotImagesFormProps
>(({ images, setImages, ...props }, ref) => {
  const [imageContainerRef] = useAutoAnimate();
  // const [selectedImage, setSelectedImage] = useState<FSpotImageWithFile>();
  // const [activeItem, setActiveItem] = useState<FSpotImageWithFile>();
  const [activeRows, setActiveRows] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const onFileAdd = (file: File) => {
    setImages([...images, { comment: "", source: "", file, id: uuidv4() }]);
  };

  // const handleDragStart = () => {};

  // triggered when dragging ends
  // const handleDragEnd = () => {};

  const handleDeleteImage = (imageIndex: number) => {
    const newImages = [...images];
    newImages.splice(imageIndex, 1);
    setImages(newImages);
    // setField("images", newImages);
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
      console.log(newImages);

      // setImages(newImages);
    }
  };

  const bind = useDrag(({ args: [imageIndex], active, movement: [x, y] }) => {
    // console.log(imageIndex, active, x, y);
    const currentRow = Math.max(
      0,
      Math.min(images.length - 1, Math.round((imageIndex * 144 + y) / 144))
    );
    console.log(imageIndex, currentRow);
    setActiveRows([imageIndex, currentRow]);
    if (currentRow !== imageIndex) {
      const newImages = [...images];
      // console.log(newImages);
      const newnew = swapIndices(newImages, imageIndex, currentRow);
      // console.log(newnew);
      if (!active) {
        setImages(newnew);
        setActiveRows([null, null]);
      }
    }
  });

  return (
    <Card ref={ref} {...props}>
      <CardHeader>
        <CardTitle>
          <IconCamera />
          Zdjęcia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={imageContainerRef} className="grid grid-cols-1 gap-2">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "group flex h-36 w-full touch-none items-center rounded-md bg-primary-100 pr-2 shadow-md shadow-primary-dark/20",
                activeRows[0] === index && "ring-2 ring-info-800",
                activeRows[1] !== activeRows[0] &&
                  activeRows[1] === index &&
                  "bg-info-200/50"
              )}
            >
              <div className="relative aspect-square h-full overflow-hidden rounded-md border-primary-300 bg-white dark:border-primary-dark lg:aspect-video">
                <Image
                  className={cn(
                    "pointer-events-none touch-none object-contain"
                  )}
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
                className="px-1.5 text-primary-600/70 hover:text-primary-700"
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
        {/* {images.length !== 6 && (
          <ImageInput className="" onFileAdd={onFileAdd} />
        )}
        {Array(images.length === 6 ? 6 : 5)
          .fill(0)
          .map((_, index) => {
            const currentImage = images[index];
            return (
              <div
                className={cn(
                  "group relative aspect-square w-full rounded-md border border-primary-300 dark:border-primary-dark"
                )}
                key={`image-${index}`}
              >
                {currentImage !== undefined && (
                  <>
                    <Image
                      className="rounded-md object-cover"
                      fill
                      alt=""
                      src={
                        currentImage.file
                          ? URL.createObjectURL(currentImage.file)
                          : getSpotImageSrc(currentImage.id)
                      }
                    />
                    {index === 0 && (
                      <span className="absolute bottom-0 left-0 rounded-bl-md rounded-tr-md bg-secondary px-2 py-1 text-base text-primary">
                        Zdjęcie główne
                      </span>
                    )}
                    <div className=" absolute right-2 top-2 flex justify-center gap-2 text-primary dark:text-primary-dark">
                      {index !== 0 && (
                        <ImageOptionButton
                          tooltip="Ustaw jako główne"
                          icon={
                            <IconPhotoStar className=" p-2" size="2.8rem" />
                          }
                          onClick={() => setMainImage(index)}
                        />
                      )}
                      <ImageOptionButton
                        tooltip="Opcje zdjęcia"
                        icon={<IconPencilMinus className="p-2" size="2.8rem" />}
                        onClick={() => setSelectedImage(currentImage)}
                      />

                      <ImageOptionButton
                        icon={<IconX className="p-2" size="2.8rem" />}
                        tooltip="Usuń zdjęcie"
                        onClick={() => handleDeleteImage(index)}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })} */}
      </CardContent>
      {/* {!!selectedImage && (
        <ImageDetailsDialogContent
          close={() => setSelectedImage(undefined)}
          isOpen={!!selectedImage}
          image={selectedImage}
          onSubmit={onImageDetailsSubmit}
        />
      )} */}
    </Card>
  );
});

ImagesSpotForm.displayName = "NewSpotImagesForm";

type ImageOptionButtonProps = {
  icon: React.ReactNode;
  tooltip: string;
};

const ImageOptionButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & ImageOptionButtonProps
>(({ icon, tooltip, ...props }, ref) => {
  return (
    <button
      aria-label={tooltip}
      ref={ref}
      {...props}
      className="rounded-full opacity-80 transition-all group-hover:opacity-100 dark:bg-primary-dark/50 dark:text-primary/80 dark:hover:text-primary"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{icon}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </button>
  );
});

ImageOptionButton.displayName = "ImageOptionButton";

type ImageDetailsDialogContentProps = {
  isOpen: boolean;
  close: () => void;
  image: FSpotImageWithFile;
  onSubmit: (image: FSpotImageWithFile) => void;
};

const ImageDetailsDialogContent = ({
  image,
  onSubmit,
  isOpen,
  close,
}: ImageDetailsDialogContentProps) => {
  const [comment, setComment] = useState(image.comment);
  const [source, setSource] = useState(image.source);

  const handleSubmit = () => {
    onSubmit({ ...image, comment, source });
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => close()}>
      <DialogContent className="h-full max-h-screen w-full max-w-full sm:h-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Szczegóły zdjęcia</DialogTitle>
          <DialogDescription className="text-left">
            Dodaj opcjonalne informacje do zdjęcia
          </DialogDescription>
        </DialogHeader>

        <div className="relative aspect-video w-full">
          <Image
            src={
              image.file
                ? URL.createObjectURL(image.file)
                : getSpotImageSrc(image.id)
            }
            fill
            className="object-contain"
            alt=""
          />
        </div>

        <Input
          value={comment || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
          placeholder="Komentarz"
        />
        <Input
          value={source || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSource(e.target.value)
          }
          placeholder="Źródło"
        />
        <div className="flex justify-end gap-2">
          <Button onClick={close}>Anuluj</Button>
          <Button onClick={handleSubmit}>Zapisz</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ImagesSpotForm };
