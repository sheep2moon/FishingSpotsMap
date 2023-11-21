/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { fileSchema } from "schemas/file.schema";
import { z } from "zod";
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

const catchSchema = z.object({
  images: z.array(fileSchema),
  weight: z.number(),
  length: z.number(),
  date: z.date().optional(),
  fishType: z.string().optional(),
  description: z.string().optional(),
});

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

  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data);
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
    <div className="mt-16 w-full max-w-screen-xl">
      <div className="mx-auto max-w-4xl p-2">
        <ViewHeader>
          <ViewTitle>Dodaj zdobycz</ViewTitle>
        </ViewHeader>
        <div>
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
              <div className="flex flex-wrap gap-0.5">
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
              <SelectFishingSpot />
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

            <Button className="mt-2 w-full" type="submit">
              Dodaj
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCatch;
