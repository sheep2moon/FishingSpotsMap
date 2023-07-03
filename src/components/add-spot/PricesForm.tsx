import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import { Input } from "../common/Input";
import Button from "../common/Button";
import ChoiceInput from "../common/ChoiceInput";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const PricesForm = () => {
  const { isPaid, setField, prices } = useNewSpotStore((store) => store);
  const [parent] = useAutoAnimate();
  const [pricesCount, setPricesCount] = useState(0);

  const toggleIsPaid = (e: ChangeEvent<HTMLInputElement>) => {
    setField("isPaid", e.target.checked);
  };

  const handlePriceTitleChange = (index: number, title: string) => {
    const newPrices = prices.map((price, i) => {
      if (index == i) {
        return { ...price, title };
      }
      return price;
    });
    setField("prices", newPrices);
  };

  const handlePriceValueChange = (index: number, value: string) => {
    const newPrices = prices.map((price, i) => {
      if (index == i) {
        return { ...price, value };
      }
      return price;
    });
    setField("prices", newPrices);
  };

  const handleDeletePrice = (index: number) => {
    const newPrices = prices.filter((_, i) => i !== index);
    setField("prices", newPrices);
    setPricesCount((prev) => prev - 1);
  };

  const handleAddNewPrice = useCallback(() => {
    setField("prices", [...prices, { title: "", value: "" }]);
    setPricesCount((prev) => prev + 1);
  }, [prices, setField]);

  return (
    <div ref={parent} className="flex w-full flex-col transition-all">
      <ChoiceInput
        checked={isPaid}
        onChange={toggleIsPaid}
        label="Chcesz dodać cennik?"
      />
      {isPaid && (
        <div className="mt-2 flex w-full flex-col gap-1">
          {/* <p>Wprowadź cennik</p> */}
          {prices.length > 0 && (
            <div className="grid grid-cols-2 gap-1 rounded-t-md p-1 pr-11 text-lg dark:bg-dark">
              <span className="ml-2">Nazwa usługi</span>
              <span className="ml-2">Cena</span>
            </div>
          )}
          {Array(pricesCount)
            .fill(0)
            .map((_, index) => (
              <div
                className="mb-2 flex w-full items-center gap-1"
                key={`${index}`}
              >
                <Input
                  className=""
                  value={prices[index]?.title}
                  placeholder={`${(index + 1) * 2} godziny`}
                  onChange={(e) =>
                    handlePriceTitleChange(index, e.target.value)
                  }
                />
                <Input
                  value={prices[index]?.value}
                  placeholder="20zł/os"
                  onChange={(e) =>
                    handlePriceValueChange(index, e.target.value)
                  }
                />
                <button
                  onClick={() => handleDeletePrice(index)}
                  className="h-10 w-10 shrink-0 rounded-md bg-white shadow-sm shadow-primary/40 hover:bg-black dark:bg-stone-900"
                >
                  X
                </button>
              </div>
            ))}
          <Button
            onClick={handleAddNewPrice}
            className=" text-lg"
            variant="secondary"
          >
            {prices.length > 0 ? (
              <span className="flex items-center gap-2">Dodaj opcje</span>
            ) : (
              <span className="flex items-center gap-2">Stwórz cennik</span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PricesForm;
