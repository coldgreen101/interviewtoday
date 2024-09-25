"use client";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";

import type { ButtonProps } from "@relume_io/relume-ui";

import { AnimatePresence, motion } from "framer-motion";

import React, { useState, useRef, useEffect } from "react";

type Billing = "monthly" | "yearly";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeatureSection = {
  icon: ImageProps;
  heading: string;
  description: string;
};

type PricingPlan = {
  icon: ImageProps;
  planName: string;
  price: string;
  discount?: string;
  description: string;
  features: string[];
  button: ButtonProps;
};

type Tab = {
  value: Billing;
  tabName: string;
  plans: PricingPlan[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  defaultTabValue: Billing;
  tabs: Tab[];
  featureSections: FeatureSection[];
};

export type Pricing17Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Pricing17 = (props: Pricing17Props) => {
  const {
    tagline,
    heading,
    description,
    defaultTabValue,
    tabs,
    featureSections,
  } = {
    ...Pricing17Defaults,
    ...props,
  } as Props;

  const [activeTab, setActiveTab] = useState(defaultTabValue);

  const MotionTabsContent = motion(TabsContent);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container-fluid">
        <div className="grid w-full grid-cols-1 items-start gap-y-12 md:gap-x-12 md:gap-y-16 lg:grid-cols-2 lg:gap-x-20">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-2">
            <div className=" mb-8 max-w-lg  md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-5xl lg:text-5xl">
                {heading}
              </h2>
              <p className="md:text-md">{description}</p>
            </div>

            {featureSections.map((featureSection, index) => (
              <div key={index} className="flex self-start">
                <div className="mr-6 flex-none self-start">
                  <img
                    src={featureSection.icon.src}
                    className="size-8"
                    alt={featureSection.icon.alt}
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                    {featureSection.heading}
                  </h3>
                  <p>{featureSection.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Tabs defaultValue={defaultTabValue}>
              <div className="border-none">
                <TabsList className="mb-12 w-fit p-1 bg-[#f2f2f2] border-none">
                  {tabs.map((tab, index) => (
                    <TabsTrigger
                      key={index}
                      value={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                    >
                      {tab.tabName}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <AnimatePresence initial={false}>
                {tabs.map(
                  (tab, index) =>
                    tab.value === activeTab && (
                      <MotionTabsContent
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        value={tab.value}
                      >
                        {tab.plans.map((plan, index) => (
                          <PricingPlan
                            key={index}
                            plan={plan}
                            billing={tab.value}
                          />
                        ))}
                      </MotionTabsContent>
                    )
                )}
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingPlan = ({
  plan,
  billing,
}: {
  plan: PricingPlan;
  billing: Billing;
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const values = [0, 30, 40, 50];
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderClick = (value: number) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    const handleResize = () => {
      setSelectedValue(selectedValue);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedValue]);

  return (
    <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <div className="rb-4 mb-4 flex flex-col items-start justify-end">
              <img
                src={plan.icon.src}
                alt={plan.icon.alt}
                className="size-12"
              />
            </div>
            <h5 className="mb-2 text-xl font-bold md:text-2xl">
              {plan.planName}
            </h5>
            <p>{plan.description}</p>
          </div>
          <div className="text-right">
            <h1 className="text-6xl font-bold md:text-9xl lg:text-10xl">
              {plan.price}
              <span className="text-2xl font-bold md:text-3xl lg:text-4xl">
                {billing === "monthly" ? "/mo" : ""}
              </span>
            </h1>
            {billing === "yearly" && "discount" in plan && (
              <p className="mt-2 font-medium">{plan.discount}</p>
            )}
          </div>
        </div>

        {billing === "yearly" && (
          <div className="my-8">
            <div ref={sliderRef} className="relative w-full h-16">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-black"></div>

              {values.map((value, index) => (
                <div
                  key={value}
                  className="absolute -translate-x-1/2 cursor-pointer"
                  style={{ left: `${(index / 3) * 100}%`, top: "0" }}
                  onClick={() => handleSliderClick(value)}
                >
                  <div className="w-1 h-2 bg-black"></div>
                  <div className="mt-4 text-center text-sm">{value}</div>
                  {selectedValue === value && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-black rounded-full"></div>
                  )}
                </div>
              ))}

              {selectedValue !== null && (
                <div
                  className="absolute -top-8 -translate-x-1/2 bg-black text-white px-2 py-1 text-sm rounded"
                  style={{
                    left: `${(values.indexOf(selectedValue) / 3) * 100}%`,
                  }}
                >
                  {selectedValue} interviews
                </div>
              )}
            </div>
          </div>
        )}

        <div className="my-8 h-px w-full shrink-0 bg-border" />
      </div>

      <div>
        <Button
          variant={plan.button.variant}
          size={plan.button.size}
          iconRight={plan.button.iconRight}
          iconLeft={plan.button.iconLeft}
          className="w-full bg-black text-white"
        >
          {plan.button.title}
        </Button>
      </div>
    </div>
  );
};

export const Pricing17Defaults: Pricing17Props = {
  tagline: "Pricing",
  heading: "Choose your plan",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  defaultTabValue: "monthly",
  tabs: [
    {
      value: "monthly",
      tabName: "Pay As You Go",
      plans: [
        {
          icon: {
            src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
            alt: "Relume icon 1",
          },
          planName: "Pay As You Go",
          description: "Ideal for ongoing recruitment needs",
          price: "$99",
          features: [
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
          ],
          button: { title: "Get started" },
        },
      ],
    },
    {
      value: "yearly",
      tabName: "Starter pack",
      plans: [
        {
          icon: {
            src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
            alt: "Relume icon 1",
          },
          planName: "Starter pack",
          description: "Perfect for large scale hiring needs",
          price: "$300",
          discount: "30 interviews",
          features: [
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
            "Feature text goes here",
          ],
          button: { title: "Get started" },
        },
      ],
    },
  ],
  featureSections: [
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 1",
      },
      heading: "Reliable hiring support",
      description:
        "Perfect for businesses with consistent hiring needs. This plan ensures a steady flow of qualified candidates.",
    },
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 2",
      },
      heading: "Flexible internet packages",
      description:
        "Buy interview credits in batches, with no penalties for cancellations or no-shows.",
    },
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 3",
      },
      heading: "Pause and resume anytime",
      description:
        "Valid for 2 months, with the option to pause when needed, offering flexibility to match your business demands.",
    },
  ],
};
