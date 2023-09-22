import dynamic from "next/dynamic";
import { useNewSpotStore } from "../zustand/new-spot-store";
import { api } from "../lib/utils/api";
import { FishTypeSpotForm } from "../components/fishing-spot-forms/fish-types-spot-form";
import { useState } from "react";
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
import { BasicsSpotForm } from "../components/fishing-spot-forms/basics-spot-form";
import { DetailsSpotForm } from "../components/fishing-spot-forms/details-spot-form";
import PricingSpotForm from "../components/fishing-spot-forms/pricing-spot-form";
import {
  type FSpotData,
  fishingSpotSchema,
} from "../../schemas/fishing-spot.schema";
import { DescriptionSpotForm } from "../components/fishing-spot-forms/description-spot-form";
import { NewSpotImagesForm } from "../components/fishing-spot-forms/images-spot-form";
import { ContactSpotForm } from "../components/fishing-spot-forms/contact-spot-form";
import { cn } from "../lib/utils/cn";
import { uploadFile } from "../server/image-handlers";

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
    description,
    spinning,
    accommodation,
    night_fishing,
    city,
    name,
    contact_email,
    contact_instagram,
    contact_page,
    contact_phone,
    fish_types,
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

        <FishTypeSpotForm
          fishTypes={fish_types}
          setFishTypes={(fishTypes) => setField("fish_types", fishTypes)}
        />
      </div>
      <ContactSpotForm
        contact_email={contact_email}
        contact_instagram={contact_instagram}
        contact_page={contact_page}
        contact_phone={contact_phone}
        setPhone={(phone) => setField("contact_phone", phone)}
        setEmail={(email) => setField("contact_email", email)}
        setInstagram={(instagram) => setField("contact_instagram", instagram)}
        setPage={(page) => setField("contact_page", page)}
      />
      <NewSpotImagesForm />
      <DescriptionSpotForm
        description={description}
        setDescription={(description) => setField("description", description)}
      />
      <FormSubmit />
    </div>
  );
};

export default AddFishingSpot;

const FormSubmit = () => {
  const { mutate: addFishery } = api.fishery.addFishery.useMutation();
  const { mutateAsync: createPresignedUrl } =
    api.images.createPresignedUrl.useMutation();
  const [errorMesssages, setErrorMessages] = useState<Array<string>>([]);
  const [parent] = useAutoAnimate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const spotData = useNewSpotStore.getState();
    const parsingResults = fishingSpotSchema.safeParse(spotData);

    if (!parsingResults.success) {
      setErrorMessages(
        parsingResults.error.issues.map((issue) => issue.message)
      );
      setIsLoading(false);
      return;
    }

    setErrorMessages([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { setField, images, ...newSpotData } = spotData;
    const dbImages: FSpotData["images"] = [];

    for (let i = 0; i < images.length; i++) {
      const currentImage = images[i];
      if (currentImage) {
        const { url, fields } = await createPresignedUrl({
          folderName: "spot-images",
          id: currentImage.id,
        });
        await uploadFile({ url, fields, file: currentImage.file });
        dbImages.push({
          id: currentImage.id,
          comment: currentImage.comment,
          source: currentImage.source,
        });
      }
    }

    addFishery({ ...newSpotData, images: dbImages });
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col gap-2" ref={parent}>
      {errorMesssages.length > 0 && (
        <div className="flex flex-col gap-1 text-sm">
          <Alert variant="destructive">
            <IconAlertHexagonFilled />
            <AlertTitle className="text-lg">Błąd</AlertTitle>
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
      <Button
        disabled={isLoading}
        onClick={() => void handleSubmit()}
        className={cn("mt-4 font-bold", isLoading && "animate-pulse")}
      >
        {isLoading ? "Czekaj..." : "Potwierdź"}
      </Button>
    </div>
  );
};
