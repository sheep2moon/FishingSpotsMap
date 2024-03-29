import dynamic from "next/dynamic";
import { useNewSpotStore } from "../zustand/new-spot-store";
import { api } from "../lib/utils/api";
import { FishTypeSelector } from "../components/fishing-spot-forms/fish-types-selector";
import { useState } from "react";
import { Button } from "../components/ui/button";
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
import { ImagesSpotForm } from "../components/fishing-spot-forms/images-spot-form/images-spot-form";
import { ContactSpotForm } from "../components/fishing-spot-forms/contact-spot-form";
import { cn } from "../lib/utils/cn";
import { uploadFile } from "../server/uploadFile";
import ErrorMessages from "../components/ui/error-messages";
import { useRouter } from "next/router";

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
    images,
    setField,
  } = useNewSpotStore((store) => store);

  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-6 p-0 pb-16 text-xl sm:p-2">
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
        setCity={(city) => setField("city", city)}
        setProvince={(province) => setField("province", province)}
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

        <FishTypeSelector
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
      <ImagesSpotForm
        images={images}
        setImages={(images) => setField("images", images)}
      />
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
  const { mutateAsync: addFishery } = api.fishery.addFishery.useMutation();
  const { mutateAsync: createPresignedUrl } =
    api.files.createPresignedImageUrl.useMutation();
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
  const [parent] = useAutoAnimate();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    const { images, ...newSpotData } = spotData;
    const dbImages: FSpotData["images"] = [];

    for (let i = 0; i < images.length; i++) {
      const currentImage = images[i];
      if (currentImage && currentImage.file) {
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

    const newSpotId = await addFishery({ ...newSpotData, images: dbImages });
    spotData.resetFields();
    void router.push(`/fishing-spot/${newSpotId}`);
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col gap-2" ref={parent}>
      <ErrorMessages errorMessages={errorMessages} />
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
