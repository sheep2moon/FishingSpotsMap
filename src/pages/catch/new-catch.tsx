import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { customFile, fileSchema } from "schemas/file.schema";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ViewHeader, ViewTitle } from "~/components/ui/view-header";
import { fishTypeNames } from "~/const/fish-type-names";
import { cn } from "~/lib/utils/cn";
import type { FishType } from "~/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import ImageInput from "~/components/ui/image-input";
import Image from "next/image";

const catchSchema = z.object({
  images: z.array(fileSchema),
  weight: z.number(),
  length: z.number(),
  fishType: z.string(),
});

type FormData = z.infer<typeof catchSchema>;
const NewCatch = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(catchSchema), // Using Zod for form validation
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="mt-16 max-w-screen-xl">
      <div>
        <ViewHeader>
          <ViewTitle>Dodaj zdobycz</ViewTitle>
        </ViewHeader>
        <div>
          <form onSubmit={void handleSubmit(onSubmit)}>
            <div>
              {getValues("images") &&
                getValues("images").map((imageFile) => (
                  <div key={imageFile.name}>
                    <Image
                      className="rounded-md object-cover"
                      fill
                      alt=""
                      src={URL.createObjectURL(imageFile)}
                    />
                  </div>
                ))}
            </div>
            <ImageInput
              onFileAdd={(file) =>
                setValue("images", [...getValues("images"), file])
              }
            />
            <Label htmlFor="weight">Waga ryby</Label>
            <Input id="weight" {...register("weight")} />
            <Label htmlFor="length">Długość ryby</Label>
            <Input id="length" {...register("length")} />
          </form>
          {/* <Card>
            <CardHeader>
              <CardTitle>Gatunek ryby</CardTitle>
            </CardHeader>
            <CardContent>
              {fishTypeNames.map((fishName) => (
                <Button
                  variant="outline"
                  onClick={() => setSelectedFish(fishName)}
                  key={fishName}
                  className={cn(
                    "",
                    selectedFish === fishName &&
                      "bg-secondary dark:bg-secondary-900"
                  )}
                >
                  {fishName}
                </Button>
              ))}
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default NewCatch;
