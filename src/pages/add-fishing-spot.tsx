import dynamic from "next/dynamic";
import DetailsForm from "../components/add-spot/DetailsForm";
import PricesForm from "../components/add-spot/PricesForm";

const AddFishingSpot = () => {
  const PositionMap = dynamic(() => import("../components/map/PositionMap"), {
    ssr: false,
  });
  return (
    <div className="mt-12 flex w-full max-w-4xl flex-col gap-2">
      <DetailsForm />
      <PricesForm />
    </div>
  );
};

export default AddFishingSpot;
