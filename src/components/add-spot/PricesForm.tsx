import React, { type ChangeEvent, useCallback, useState } from "react";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import ChoiceInput from "../common/ChoiceInput";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const PricesForm = () => {
  const { isPaid, setField, prices } = useNewSpotStore((store) => store);
  const [parent] = useAutoAnimate();
  const [pricesCount, setPricesCount] = useState(0);

  const toggleIsPaid = (value: boolean) => {
    setField("isPaid", value);
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
      <div className="flex items-center space-x-2">
        <Switch
          id="is-paid"
          checked={isPaid}
          onCheckedChange={(e) => toggleIsPaid(e.valueOf())}
        />
        <Label htmlFor="is-paid">Chcesz dodać cennik?</Label>
      </div>
      {isPaid && (
        <div className="mt-2 flex w-full flex-col gap-1">
          {/* <p>Wprowadź cennik</p> */}
          {prices.length > 0 && (
            <div className="dark:bg-dark grid grid-cols-2 gap-1 rounded-t-md p-1 pr-11 text-lg">
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
                <Button
                  onClick={() => handleDeletePrice(index)}
                  variant="ghost"
                >
                  X
                </Button>
              </div>
            ))}
          <Button
            onClick={handleAddNewPrice}
            className=" text-lg"
            variant="default"
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
