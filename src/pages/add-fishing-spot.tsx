import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import AddSpotForm from "../components/add-spot/AddSpotForm";

const AddFishingSpot = () => {
  return (
    <div className="mt-12 w-full max-w-4xl">
      <AddSpotForm />
    </div>
  );
};

export default AddFishingSpot;
