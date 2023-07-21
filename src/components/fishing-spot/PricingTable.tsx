import React from "react";

const PricingTable = ({
  prices,
}: {
  prices: { title: string; value: string }[];
}) => {
  if (prices.length < 1) return;
  return (
    <div className="flex flex-col gap-1 dark:bg-dark/60 ">
      {prices.map((price, index) => (
        <div
          className="grid h-8 w-full grid-cols-[1fr_1px_1fr] gap-4"
          key={`${price.title}${index}`}
        >
          <span className="text-end">{price.title}</span>
          <span className="h-full w-[1px] bg-secondary"></span>
          <span className="text-start">{price.value}</span>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
