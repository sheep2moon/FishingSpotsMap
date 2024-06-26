/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import { ViewHeader, ViewTitle } from "~/components/ui/view-header";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import ImageInput from "~/components/ui/image-input";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import { Textarea } from "../../components/ui/textarea";
import { CalendarPopover } from "../../components/ui/calendar-popover";
import { fishTypeNames } from "../../const/fish-type-names";
import { cn } from "../../lib/utils/cn";
import SelectFishingSpot from "../../components/select-fishing-spot";
import ErrorMessages from "../../components/ui/error-messages";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { catchSchema } from "../../../schemas/catch.schema";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../lib/utils/api";
import { uploadFile } from "../../server/uploadFile";
import { useRouter } from "next/router";

type FormData = z.infer<typeof catchSchema>;

const NewCatch = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(catchSchema),
    defaultValues: { images: [] },
  });
  const [errorMessagesContainer] = useAutoAnimate();
  const { mutateAsync: createNewCatch } = api.catch.newCatch.useMutation();
  const { mutateAsync: createPresignedUrl } =
    api.files.createPresignedImageUrl.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: FormData) => {
    setIsLoading(true);
    const imagesId: Array<string> = [];
    for (let i = 0; i < data.images.length; i++) {
      const currentImage = data.images[i];
      if (currentImage) {
        const imageId = uuidv4();
        const { fields, url } = await createPresignedUrl({
          folderName: "catch-images",
          id: imageId,
        });
        await uploadFile({ url, fields, file: currentImage });
        imagesId.push(imageId);
      }
    }

    const catchId = await createNewCatch({
      fishingSpotId: data.fishingSpotId,
      fishType: data.fishType,
      length: data.length,
      weight: data.weight,
      description: data.description,
      date: data.date,
      images: imagesId,
    });
    setIsLoading(false);
    void router.push(`/catch/${catchId}`);
  });

  const handleAddImage = (file: File) => {
    const currentImages = watch("images");
    if (currentImages.length < 3) {
      setValue("images", [...watch("images"), file]);
    }
  };

  const handleDeleteImage = (imageIndex: number) => {
    const images = watch("images");
    images.splice(imageIndex, 1);
    setValue("images", images);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="mt-16 w-full max-w-screen-xl rounded-md bg-primary-50  shadow-sm shadow-primary-500 dark:bg-primary-dark dark:shadow-primary-950">
      <div className="mx-auto max-w-4xl p-2">
        <ViewHeader>
          <ViewTitle>Dodaj zdobycz</ViewTitle>
        </ViewHeader>
        <div className="p-4 ">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <Label>Dodaj do 3 zdjęć</Label>
              <div className="grid grid-cols-3 gap-2 xl:grid-cols-4">
                {watch("images").length < 3 && (
                  <>
                    <ImageInput onFileAdd={handleAddImage} />
                  </>
                )}
                {getValues("images") &&
                  getValues("images").map((imageFile, index) => (
                    <div
                      key={imageFile.name}
                      className="relative aspect-square w-full"
                    >
                      <div className="group absolute inset-0">
                        <Image
                          className="rounded-md object-cover"
                          fill
                          alt=""
                          src={URL.createObjectURL(imageFile)}
                        />
                        <div className="absolute inset-0 flex h-full w-full items-start justify-end">
                          <Button
                            variant="destructive"
                            className="m-2 hidden h-12 w-12 rounded-full group-hover:flex"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <IconX />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <Label>Gatunek ryby</Label>
              <div className="flex max-w-lg flex-wrap gap-0.5">
                {fishTypeNames.map((fishType) => (
                  <Button
                    type="button"
                    onClick={() => setValue("fishType", fishType)}
                    className={cn(
                      watch("fishType") === fishType &&
                        "bg-primary-600 text-primary-50 dark:bg-primary-700"
                    )}
                    variant="outline"
                    key={fishType}
                  >
                    {fishType}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Łowisko</Label>
              <SelectFishingSpot
                onSpotSelect={(fishingSpot) =>
                  setValue("fishingSpotId", fishingSpot.id)
                }
              />
            </div>
            <div>
              <Label htmlFor="weight">Waga ryby (g)</Label>
              <Input
                type="number"
                id="weight"
                className="w-fit"
                {...register("weight", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="length">Długość ryby (cm)</Label>
              <Input
                type="number"
                id="length"
                className="w-fit"
                {...register("length", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="description">Opis</Label>
              <Textarea
                className="max-w-lg"
                id="description"
                {...register("description")}
              />
            </div>
            <div>
              <Label>Wybierz date</Label>
              <CalendarPopover
                date={watch("date")}
                onDateChange={(date) => setValue("date", date)}
              />
            </div>
            <div ref={errorMessagesContainer}>
              {errors && (
                <ErrorMessages
                  errorMessages={Object.values(errors).map(
                    (error) => error.message as string
                  )}
                />
              )}
            </div>
            <Button className="mt-2 w-full" type="submit" disabled={isLoading}>
              Dodaj
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCatch;
