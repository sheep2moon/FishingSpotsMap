import dynamic from "next/dynamic";
import DetailsForm from "../components/add-spot/DetailsForm";
import PricesForm from "../components/add-spot/PricesForm";
import Button from "../components/common/Button";
import { useNewSpotStore } from "../zustand/new-spot-store";

const AddFishingSpot = () => {
  const SelectPositionMap = dynamic(
    () => import("../components/add-spot/SelectPositionMap"),
    {
      ssr: false,
    }
  );

  const handleSubmit = () => {
    const {} = useNewSpotStore.getState();
  };

  return (
    <div className="mt-12 flex w-full max-w-4xl flex-col gap-2 pb-24">
      <SelectPositionMap />
      <DetailsForm />
      <PricesForm />
      <Button onClick={handleSubmit} className="mt-12" variant="secondary">
        Potwierdź
      </Button>
    </div>
  );
};

export default AddFishingSpot;
