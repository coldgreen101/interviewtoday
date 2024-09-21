"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

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
  const [BeerSlider, setBeerSlider] = useState<any>(null);

  useEffect(() => {
    import("beerslider").then((module) => {
      setBeerSlider(() => module.default);
    });
  }, []);

  useEffect(() => {
    if (sliderRef.current && BeerSlider) {
      new BeerSlider(sliderRef.current, { start });
    }
  }, [start, BeerSlider]);

  return (
    <div ref={sliderRef} className="beer-slider">
      <img src={afterImage} alt="After" />
      <div className="beer-reveal">
        <img src={beforeImage} alt="Before" />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(BeforeAfterSlider), {
  ssr: false,
});
