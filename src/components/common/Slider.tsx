import React from "react";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const InitializePlugin: KeenSliderPlugin = (slider) => {
  slider.on("created", () => {
    slider?.container?.classList?.add("initialized");
  });
};

const Slider = ({ children }: { children: React.ReactNode }) => {
  const [sliderRef] = useKeenSlider(
    {
      slides: {
        perView: 5,
        spacing: 15,
      },
    },
    [InitializePlugin]
  );
  return (
    <div ref={sliderRef} className="keen-slider">
      {children}
    </div>
  );
};

export default Slider;
