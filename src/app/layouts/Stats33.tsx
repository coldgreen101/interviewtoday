"use client";
import React, { useState, useEffect, useRef } from "react";
import { CountUp } from "use-count-up";

type StatCard = {
  percentage: string;
  title: string;
  description1: string;
  description2: string;
};

type Stat = {
  statCards: StatCard[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  stat: Stat;
};

export type Stats33Props = React.ComponentPropsWithoutRef<"section"> &
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

export const Stats33 = (props: Stats33Props) => {
  const { tagline, heading, stat } = {
    ...Stats33Defaults,
    ...props,
  } as Props;

  const [statsRef, isStatsVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container-fluid">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-bold md:mb-4 text-primary">{tagline}</p>
          <h1 className="mb-5 text-5xl font-semibold md:mb-6 md:text-5xl lg:text-5xl leading-tight">
            {heading}
          </h1>
        </div>
        <Stat {...stat} statsRef={statsRef} isStatsVisible={isStatsVisible} />
      </div>
    </section>
  );
};

const Stat = ({
  statCards,
  statsRef,
  isStatsVisible,
}: Stat & {
  statsRef: React.RefObject<HTMLDivElement>;
  isStatsVisible: boolean;
}) => {
  return (
    <div
      ref={statsRef}
      className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-7 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8 lg:gap-y-8"
    >
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`flex w-full flex-col justify-between p-8 rounded-2xl ${
            index === 0
              ? "bg-[#4dc9f07a] bg-opacity-50 text-altBackground"
              : index === 1
              ? "bg-[#3a0ba3d9] text-cardText"
              : "bg-[#f7248599] text-altBackground"
          }`}
        >
          <p className="mb-5 text-6xl font-bold md:mb-6 md:text-8xl lg:text-8xl">
            <span>+</span>
            <CountUp
              isCounting={isStatsVisible}
              start={0}
              end={parseInt(card.percentage)}
              duration={2}
            />
            <span>%</span>
          </p>
          <div>
            <h3 className="text-md font-bold leading-[1.4] md:text-xl">
              {card.title}
            </h3>
            <p className="mt-2 mb-3 font-medium">{card.description1}</p>
            <p className="mt-2 font-medium">{card.description2}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Stats33Defaults: Stats33Props = {
  tagline: "Real success stories",
  heading: "How businesses like yours are winning with InterviewToday",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  stat: {
    statCards: [
      {
        percentage: "34",
        title: "DHW & Company",
        description1:
          "Impact: 34% increase in staffing levels and 8% boost in guest satisfaction within two months.",
        description2:
          "Benefit: Streamlined hiring processes allowing managers to focus on customer service rather than recruitment.",
      },
      {
        percentage: "41",
        title: "Gellert Hospitality Group",
        description1:
          "Impact: Staffing levels rose by 41%, with sales growing 25.4% in the first year.",
        description2:
          "Benefit: Enabled aggressive expansion and efficient staffing of new locations, supporting business growth.",
      },
      {
        percentage: "30",
        title: "NYVA Restaurant Group",
        description1:
          "Impact: Achieved proper staffing in 90% of locations, enhancing operational efficiency and sales.",
        description2:
          "Benefit: Simplified recruitment process led to significant time savings and higher management satisfaction.",
      },
    ],
  },
};
