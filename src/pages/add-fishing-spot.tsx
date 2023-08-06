import dynamic from "next/dynamic";
import DetailsForm from "../components/add-spot/DetailsForm";
import PricesForm from "../components/add-spot/PricesForm";
import Button from "../components/common/Button";
import { useNewSpotStore } from "../zustand/new-spot-store";
import DescriptionEditor from "../components/add-spot/DescriptionEditor";
import { api } from "../utils/api";
import FishTypeSelector from "../components/add-spot/FishTypeSelector";
import ImagesGallery from "../components/add-spot/ImagesGallery";

const AddFishingSpot = () => {
  const { mutate: addFishery } = api.fishery.addFishery.useMutation();
  const SelectPositionMap = dynamic(
    () => import("../components/add-spot/SelectPositionMap"),
    {
      ssr: false,
    }
  );

  const handleSubmit = () => {
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
    if (!position) return;
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
      lat: position?.lat,
      lng: position?.lng,
      description,
      prices,
      imagesId,
    };
    console.log(newFisherySpotData);

    addFishery(newFisherySpotData);
  };

  return (
    <div className="mt-6 flex w-full max-w-4xl flex-col gap-3 p-2 pb-6 text-xl">
      <h1 className="mx-auto text-2xl font-bold">Dodaj nowe łowisko</h1>
      <SelectPositionMap />
      <DetailsForm />
      <PricesForm />
      <FishTypeSelector />
      <ImagesGallery />
      <DescriptionEditor />
      <Button onClick={handleSubmit} className="mt-12" variant="secondary">
        Potwierdź
      </Button>
    </div>
  );
};

export default AddFishingSpot;
