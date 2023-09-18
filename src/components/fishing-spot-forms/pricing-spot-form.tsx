import React, { useCallback, useState } from "react";
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

type PricingSpotFormProps = {
  prices: SpotPricing;
  setPrices: (pricing: SpotPricing) => void;
};

const PricingSpotForm = ({ prices, setPrices }: PricingSpotFormProps) => {
  const [parent] = useAutoAnimate();
  const [pricesCount, setPricesCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  const handleSetIsPaid = (isPaid: boolean) => {
    if (isPaid) {
      setIsPaid(true);
      setPricesCount(1);
    }
    if (!isPaid) {
      setIsPaid(false);
      setPricesCount(0);
    }
  };

  const handlePriceTitleChange = (index: number, title: string) => {
    const newPricing = prices.map((price, i) => {
      if (index == i) {
        return { ...price, title };
      }
      return price;
    });
    setPrices(newPricing);
  };

  const handlePriceValueChange = (index: number, value: string) => {
    const newPricing = prices.map((price, i) => {
      if (index == i) {
        return { ...price, value };
      }
      return price;
    });
    setPrices(newPricing);
  };

  const handleDeletePrice = (index: number) => {
    const newPricing = prices.filter((_, i) => i !== index);
    setPrices(newPricing);
    setPricesCount((prev) => {
      if (prev === 1) handleSetIsPaid(false);
      return prev - 1;
    });
  };

  const handleAddNewPrice = useCallback(() => {
    setPrices([...prices, { title: "", value: "" }]);
    setPricesCount((prev) => prev + 1);
  }, [prices, setPrices]);

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
          <Button variant="outline" onClick={() => handleSetIsPaid(true)}>
            Stwórz cennik
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingSpotForm;
