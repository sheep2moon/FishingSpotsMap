import React, { useCallback, useState } from "react";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IconTag } from "@tabler/icons-react";

const PricesForm = () => {
  const { isPaid, setField, prices } = useNewSpotStore((store) => store);
  const [parent] = useAutoAnimate();
  const [pricesCount, setPricesCount] = useState(0);

  const setIsPaid = (isPaid: boolean) => {
    if (isPaid) {
      setField("isPaid", true);
      setPricesCount(1);
    }
    if (!isPaid) {
      setField("isPaid", false);
      setPricesCount(0);
    }
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
    setPricesCount((prev) => {
      if (prev === 1) setIsPaid(false);
      return prev - 1;
    });
  };

  const handleAddNewPrice = useCallback(() => {
    setField("prices", [...prices, { title: "", value: "" }]);
    setPricesCount((prev) => prev + 1);
  }, [prices, setField]);

  return (
    <Card className="transition-all">
      <CardHeader>
        <CardTitle>
          <IconTag size="2rem" />
          Cennik
        </CardTitle>
        <CardDescription>Możesz wprowadzić cennik łowiska</CardDescription>
      </CardHeader>
      <CardContent ref={parent}>
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
                onChange={(e) => handlePriceTitleChange(index, e.target.value)}
              />
              <Input
                value={prices[index]?.value}
                placeholder="20zł/os"
                onChange={(e) => handlePriceValueChange(index, e.target.value)}
              />
              <Button onClick={() => handleDeletePrice(index)} variant="ghost">
                X
              </Button>
            </div>
          ))}
        {}
        {isPaid && (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAddNewPrice}
          >
            Dodaj pole
          </Button>
        )}
        {!isPaid && (
          <Button variant="outline" onClick={() => setIsPaid(true)}>
            Stwórz cennik
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PricesForm;
