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
                className="group relative aspect-square w-full max-w-[180px] rounded-md border dark:border-primary-dark"
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
                    <button
                      className="absolute right-1 top-1 rounded-full p-2 opacity-0 transition-all group-hover:opacity-100 dark:bg-primary-dark/50 dark:text-primary/80 dark:hover:text-primary"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <IconX size="2rem" />
                    </button>
                    <button
                      className="absolute left-1 top-1 rounded-full p-2 opacity-0 transition-all group-hover:opacity-100 dark:bg-primary-dark/50 dark:text-primary/80 dark:hover:text-primary"
                      onClick={() => setSelectedImage(currentImage)}
                    >
                      <IconPencilMinus size="1.8rem" />
                    </button>
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
