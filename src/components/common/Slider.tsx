import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Slider = ({ children }: { children: React.ReactNode }) => {
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 2,
      spacing: 15,
    },
  });
  return (
    <div ref={sliderRef} className="keen-slider">
      {children}
    </div>
  );
};

export default Slider;
