import dynamic from "next/dynamic";
import DetailsForm from "../components/add-spot/DetailsForm";
import PricesForm from "../components/add-spot/PricesForm";
import { useNewSpotStore } from "../zustand/new-spot-store";
import { api } from "../lib/utils/api";
import FishTypeSelector from "../components/add-spot/FishTypeSelector";
import ImagesGallery from "../components/add-spot/ImagesGallery";
import { useState } from "react";
import MarkdownEditor from "../components/markdown-editor/MarkdownEditor";
import {
  IconAlertHexagonFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../components/ui/view-header";

const AddFishingSpot = () => {
  const SelectPositionMap = dynamic(
    () => import("../components/add-spot/SelectPositionMap"),
    {
      ssr: false,
    }
  );

  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-6 p-2 pb-16 text-xl">
      <ViewHeader>
        <ViewTitle>
          {/* <IconMapPinPlus size="3rem" /> */}
          Nowe łowisko
        </ViewTitle>
        <ViewSubtitle>
          Wypełnij formularz nowego łowiska aby dodać je do mapy, przed dodaniem
          dane zostaną zweryfikowane przez moderatorów.
        </ViewSubtitle>
      </ViewHeader>
      <SelectPositionMap />
      <div className="grid gap-4 lg:grid-cols-2">
        <DetailsForm />
        <PricesForm />
        <FishTypeSelector />
      </div>
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
  const [parent] = useAutoAnimate();

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
    <div className="flex w-full flex-col gap-2" ref={parent}>
      {errorMesssages.length > 0 && (
        <div className="flex flex-col gap-1 text-sm text-amber-700">
          <Alert variant="destructive">
            <IconAlertHexagonFilled />
            <AlertTitle className="text-base">Błąd</AlertTitle>
            <AlertDescription className="flex flex-col gap-1">
              {errorMesssages.map((message, index) => (
                <div
                  key={`error-message${index}`}
                  className="flex items-center gap-1 text-base"
                >
                  <IconPlayerStopFilled />
                  <span className="text-primary-dark dark:text-primary ">
                    {message}
                  </span>
                </div>
              ))}
            </AlertDescription>
          </Alert>
        </div>
      )}
      <Button onClick={handleSubmit} className="mt-4 font-bold">
        Potwierdź
      </Button>
    </div>
  );
};
