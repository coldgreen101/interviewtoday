"use client";
import React, { useState, useEffect, useRef } from "react";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { CountUp } from "use-count-up";

type ImageProps = {
  src: string;
  alt?: string;
};

type StatsProps = {
  title: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  stats: StatsProps[];
  beforeImage: ImageProps;
  afterImage: ImageProps;
};

export type Layout27Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

export const Layout27 = (props: Layout27Props) => {
  const { tagline, heading, description, beforeImage, afterImage, stats } = {
    ...Layout27Defaults,
    ...props,
  } as Props;

  const [statsRef, isStatsVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container-fluid">
        <div className="grid grid-cols-1 gap-16 md:grid-flow-row lg:grid-cols-[40%_1fr] md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-bold md:mb-4 text-primary">{tagline}</p>
            <h2 className="mb-5 text-5xl font-semibold leading-[1.2] md:mb-6">
              {heading}
            </h2>
            <p className="mb-6 md:mb-8 text-lg">{description}</p>
            <div
              ref={statsRef}
              className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2"
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <h3 className="mb-2 text-4xl font-semibold md:text-4xl lg:text-4xl">
                    <CountUp
                      isCounting={isStatsVisible}
                      start={0}
                      end={parseInt(stat.title)}
                      duration={2}
                    />
                    <span className="text-primary">
                      {stat.title.replace(/[0-9]/g, "")}
                    </span>
                  </h3>
                  <p>{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <BeforeAfterSlider
              beforeImage={beforeImage.src}
              afterImage={afterImage.src}
              start={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout27Defaults: Layout27Props = {
  tagline: "Key achievements",
  heading: "Hiring transformed",
  description:
    "From speeding up recruitment to slashing costs and boosting productivity, here's how we've made a difference:",
  stats: [
    {
      title: "14x",
      description: "faster hiring",
    },
    {
      title: "80%",
      description: "reduction in recruitment costs",
    },
    {
      title: "12h",
      description: "saving on average per hiring per month",
    },
    {
      title: "100%",
      description: "manager satisfaction",
    },
  ],
  beforeImage: {
    src: "/before.png",
    alt: "Relume placeholder image",
  },
  afterImage: {
    src: "/after.png",
    alt: "Relume placeholder image",
  },
};
