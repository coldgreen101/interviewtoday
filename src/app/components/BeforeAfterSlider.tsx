"use client";
import React, { useEffect, useRef } from "react";
import BeerSlider from "beerslider";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  start?: number;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,

  start = 50,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      new BeerSlider(sliderRef.current, { start });
    }
  }, [start]);

  return (
    <div ref={sliderRef} className="beer-slider">
      <img src={afterImage} alt="After" />
      <div className="beer-reveal">
        <img src={beforeImage} alt="Before" />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
