import dynamic from "next/dynamic";
import DetailsForm from "../components/add-spot/DetailsForm";
import PricesForm from "../components/add-spot/PricesForm";
import Button from "../components/common/Button";
import { useNewSpotStore } from "../zustand/new-spot-store";
import { api } from "../utils/api";
import FishTypeSelector from "../components/add-spot/FishTypeSelector";
import ImagesGallery from "../components/add-spot/ImagesGallery";
import { useEffect, useState } from "react";
import { catchError } from "../utils/catchError";
import { IconAlertHexagonFilled } from "@tabler/icons-react";
import MarkdownEditor from "../components/markdown-editor/MarkdownEditor";

const AddFishingSpot = () => {
  const SelectPositionMap = dynamic(
    () => import("../components/add-spot/SelectPositionMap"),
    {
      ssr: false,
    }
  );

  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-3 p-2 pb-16 text-xl">
      <h1 className="mx-auto text-2xl font-bold">Dodaj nowe łowisko</h1>
      <SelectPositionMap />
      <DetailsForm />
      <PricesForm />
      <FishTypeSelector />
      <ImagesGallery />
      <MarkdownEditor />
      <FormSubmit />
    </div>
  );
};

export default AddFishingSpot;

const FormSubmit = () => {
  const { mutate: addFishery } = api.fishery.addFishery.useMutation();
  const [errorMesssages, setErrorMessages] = useState<Array<string>>([]);

  const handleSubmit = () => {
    const errors = [];
    const {
      name,
      province,
      city,
      fish_types,
      area,
      contact,
      night_fishing,
      tent,
      accommodation,
      spinning,
      position,
      prices,
      description,
      imagesId,
    } = useNewSpotStore.getState();
    if (!position) errors.push("Lokalizacja na mapie jest wymagana");
    if (!name) errors.push("Nazwa jest wymagana");
    if (!city) errors.push("Nazwa miejscowości jest wymagana");
    if (!province) errors.push("Województwo jest wymagane");
    if (!description) errors.push("Opis jest wymagany");
    if (description && description.length < 50)
      errors.push("Opis musi być dłuższy niż 50 znaków.");

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }
    const newFisherySpotData = {
      name,
      province,
      city,
      fish_types,
      area,
      contact,
      night_fishing,
      tent,
      accommodation,
      spinning,
      lat: position?.lat as number,
      lng: position?.lng as number,
      description,
      prices,
      imagesId,
    };
    addFishery(newFisherySpotData);
  };

  return (
    <div className="mt-12 flex w-full flex-col gap-2">
      <div className="flex flex-col gap-1 text-sm text-amber-700">
        {errorMesssages.map((message, index) => (
          <p className="flex items-center gap-1" key={`error-message${index}`}>
            <IconAlertHexagonFilled />
            <span>{message}</span>
          </p>
        ))}
      </div>
      <Button onClick={handleSubmit} className="" variant="secondary">
        Potwierdź
      </Button>
    </div>
  );
};
