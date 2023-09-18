import dynamic from "next/dynamic";
import DetailsForm from "../components/add-spot/DetailsForm";
import PricesForm from "../components/fishing-spot-forms/pricing-spot-form";
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
import BasicsSpotForm from "../components/fishing-spot-forms/basics-spot-form";
import DetailsSpotForm from "../components/fishing-spot-forms/details-spot-form";
import PricingSpotForm from "../components/fishing-spot-forms/pricing-spot-form";
import { fishingSpotSchema } from "../../schemas/fishing-spot.schema";

const SelectPositionMap = dynamic(
  () => import("../components/map/SelectPositionMap"),
  {
    ssr: false,
  }
);
const AddFishingSpot = () => {
  const {
    lat,
    lng,
    prices,
    area,
    tent,
    spinning,
    accommodation,
    night_fishing,
    city,
    name,
    province,
    setField,
  } = useNewSpotStore((store) => store);

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
      <SelectPositionMap
        position={{ lat, lng }}
        setPosition={(position) => {
          setField("lat", position.lat);
          setField("lng", position.lng);
        }}
        setCity={(province) => setField("province", province)}
        setProvince={(city) => setField("city", city)}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <BasicsSpotForm
          city={city}
          name={name}
          province={province}
          setCity={(city) => setField("city", city)}
          setName={(name) => setField("name", name)}
          setProvince={(province) => setField("province", province)}
        />
        <DetailsSpotForm
          area={area}
          spinning={spinning}
          accommodation={accommodation}
          tent={tent}
          night_fishing={night_fishing}
          setArea={(area) => setField("area", area)}
          setTent={(tent) => setField("tent", tent)}
          setAccommodation={(accommodation) =>
            setField("accommodation", accommodation)
          }
          setNightFishing={(night_fishing) =>
            setField("night_fishing", night_fishing)
          }
          setSpinning={(spinning) => setField("spinning", spinning)}
        />
        <PricingSpotForm
          prices={prices}
          setPrices={(prices) => setField("prices", prices)}
        />

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
    const newSpotData = useNewSpotStore.getState();
    const parsingResults = fishingSpotSchema.safeParse(newSpotData);
    if (parsingResults.success) addFishery({ ...newSpotData });
    else {
      setErrorMessages(
        parsingResults.error.issues.map((issue) => issue.message)
      );
    }
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
