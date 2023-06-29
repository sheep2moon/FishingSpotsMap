import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../common/Input";
import ChoiceInput from "../common/ChoiceInput";
import dynamic from "next/dynamic";
import Button from "../common/Button";
import { useNewSpotStore } from "../../zustand/new-spot-store";

export type FormData = {
  name: string;
  contact: string;
  province: string;
  city: string;
  night: boolean;
  tent: boolean;
  accommodation: boolean;
  spinning: boolean;
};
const AddSpotForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { position } = useNewSpotStore((store) => store);
  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = (formData: FormData) => {
    // TODO: Handle no position error
    if (!position) return;
    const newSpotData = {
      ...formData,
      lat: position.lat,
      lng: position.lng,
    };
    console.log(newSpotData);
  };

  const PositionMap = dynamic(
    () => import("../../components/map/PositionMap"),
    { ssr: false }
  );

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 bg-primary p-4 text-3xl"
    >
      <h3>Wskaż miejsce</h3>
      <PositionMap />
      <Input
        label="Województwo"
        error={!!errors.province}
        {...register("province", { required: true })}
      />
      <Input
        label="Miasto"
        error={!!errors.city}
        {...register("city", { required: true })}
      />
      <Input
        label="Nazwa"
        error={!!errors.name}
        {...register("name", { required: true })}
      />
      <Input
        label="Kontakt"
        error={!!errors.contact}
        {...register("contact", { required: true })}
      />

      <Controller
        control={control}
        name="night"
        defaultValue={false}
        render={({ field }) => (
          <ChoiceInput
            label="Łowienie w nocy"
            onChange={field.onChange}
            checked={field.value}
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name="tent"
        defaultValue={false}
        render={({ field }) => (
          <ChoiceInput
            label="Można rozłożyć namiot?"
            onChange={field.onChange}
            checked={field.value}
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name="accommodation"
        defaultValue={false}
        render={({ field }) => (
          <ChoiceInput
            label="Możliwy nocleg?"
            onChange={field.onChange}
            checked={field.value}
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name="spinning"
        defaultValue={false}
        render={({ field }) => (
          <ChoiceInput
            label="Spinning"
            onChange={field.onChange}
            checked={field.value}
            ref={field.ref}
          />
        )}
      />
      <Button
        className="mx-auto mt-4 w-fit px-16 py-2 text-2xl"
        variant="secondary"
        type="submit"
      >
        Wyślij zgłoszenie o dodanie
      </Button>
    </form>
  );
};

export default AddSpotForm;
