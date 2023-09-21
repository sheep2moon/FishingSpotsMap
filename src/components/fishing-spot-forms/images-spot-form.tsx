import React, { forwardRef, useEffect, useState } from "react";
import ImageInput from "../common/ImageInput";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IconCamera, IconPencilMinus, IconX } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import { SpotImage } from "../../../schemas/fishing-spot.schema";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils/cn";
import { IconPhotoStar } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// type NewSpotImagesFormProps = {
//   images: SpotImage[];
//   setImages: (images: SpotImage[]) => void;
//   // onUpload: (imageId: string) => void;
// };

const NewSpotImagesForm = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const [imageContainerRef] = useAutoAnimate();
  const { images, setField } = useNewSpotStore((state) => state);
  const [selectedImage, setSelectedImage] = useState<SpotImage>();

  const onFileAdd = (file: File) => {
    setField("images", [...images, { comment: "", source: "", file }]);
  };

  const handleDeleteImage = (imageIndex: number) => {
    const newImages = [...images];
    newImages.splice(imageIndex, 1);
    setField("images", newImages);
  };

  const onImageDetailsSubmit = (image: SpotImage) => {
    const newImages = [...images];
    const changeIndex = newImages.findIndex(
      (i) => i.file.name === image.file.name
    );
    newImages.splice(changeIndex, 1, image);
    setField("images", newImages);
  };

  const setMainImage = (imageIndex: number) => {
    const newImages = [...images];
    if (!newImages[0]) return;
    const temp = newImages[imageIndex];
    if (temp) {
      newImages[imageIndex] = newImages[0];
      newImages[0] = temp;
      setField("images", newImages);
    }
  };

  return (
    <Card ref={ref} {...props}>
      <CardHeader>
        <CardTitle>
          <IconCamera />
          Zdjęcia
        </CardTitle>
      </CardHeader>
      <CardContent ref={imageContainerRef} className="flex flex-wrap gap-2">
        {images.length !== 6 && (
          <ImageInput className="max-w-[180px]" onFileAdd={onFileAdd} />
        )}
        {Array(images.length === 6 ? 6 : 5)
          .fill(0)
          .map((_, index) => {
            const currentImage = images[index];
            return (
              <div
                className={cn(
                  "group relative aspect-square w-full max-w-[180px] rounded-md border dark:border-primary-dark"
                )}
                key={`image-${index}`}
              >
                {currentImage !== undefined && (
                  <>
                    <Image
                      className="rounded-md object-cover"
                      fill
                      alt=""
                      src={URL.createObjectURL(currentImage.file)}
                    />
                    {index === 0 && (
                      <span className="absolute bottom-0 left-0 rounded-bl-md rounded-tr-md bg-secondary px-2 py-1 text-base text-primary">
                        Zdjęcie główne
                      </span>
                    )}
                    <div className="absolute left-1/2 top-4 flex -translate-x-1/2 justify-center gap-2">
                      {index !== 0 && (
                        <ImageOptionButton
                          tooltip="Ustaw jako główne"
                          icon={<IconPhotoStar className="p-2" size="2.8rem" />}
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
          })}
      </CardContent>
      {!!selectedImage && (
        <ImageDetailsDialogContent
          close={() => setSelectedImage(undefined)}
          isOpen={!!selectedImage}
          image={selectedImage}
          onSubmit={onImageDetailsSubmit}
        />
      )}
    </Card>
  );
});

NewSpotImagesForm.displayName = "NewSpotImagesForm";

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
      ref={ref}
      {...props}
      className="rounded-full opacity-0 transition-all group-hover:opacity-100 dark:bg-primary-dark/50 dark:text-primary/80 dark:hover:text-primary"
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
  image: SpotImage;
  onSubmit: (image: SpotImage) => void;
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
    onSubmit({ comment, source, file: image.file });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Szczegóły zdjęcia</DialogTitle>
          <DialogDescription>
            Dodaj opcjonalne informacje do zdjęcia
          </DialogDescription>
        </DialogHeader>

        <div className="relative aspect-video w-full">
          <Image
            src={URL.createObjectURL(image.file)}
            fill
            className="object-contain"
            alt=""
          />
        </div>

        <Input
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
          placeholder="Komentarz"
        />
        <Input
          value={source}
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

export { NewSpotImagesForm };
