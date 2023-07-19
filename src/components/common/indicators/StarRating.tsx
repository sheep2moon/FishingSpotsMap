import { IconStar } from "@tabler/icons-react";
import { IconStarFilled } from "@tabler/icons-react";
import React, { useState } from "react";

type StarRatingProps =
  | {
      disabled: true;
      rate: number;
    }
  | {
      disabled: false;
      rate: number;
      setRate: (r: number) => void;
    };

const StarRating = (props: StarRatingProps) => {
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleMouseOver = (rate: number) => {
    setHoveredStars(rate);
    console.log(rate);
  };

  const handleMouseOut = () => {
    setHoveredStars(0);
  };

  const handleClick = (r: number) => {
    if (!props.disabled) {
      props.setRate(r);
      console.log(r);
    }
  };
  return (
    <div className="flex items-center gap-2 ">
      <span className="text-sm">Twoja ocena</span>
      <div className="my-2 flex text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <button
            style={{ pointerEvents: props.disabled ? "none" : "all" }}
            disabled={props.disabled}
            className=" px-1 text-xl "
            key={`rating-star-${starIndex}`}
            onClick={() => handleClick(starIndex)}
            onMouseOver={() => handleMouseOver(starIndex)}
            onMouseOut={handleMouseOut}
          >
            {(hoveredStars || props.rate) >= starIndex ? (
              <IconStarFilled />
            ) : (
              <IconStar />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
