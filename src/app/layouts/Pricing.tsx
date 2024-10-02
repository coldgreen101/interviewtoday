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

import React, { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  planName: string;
  price: string;
  discount?: string;
  description: string;
  features: string[];
  button: ButtonProps;
  showSlider?: boolean;
};

type Tab = {
  value: Billing;
  tabName: string;
  plans: PricingPlan[];
  featureSections: FeatureSection[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  defaultTabValue: Billing;
  tabs: Tab[];
};

export type Pricing17Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Pricing17 = (props: Pricing17Props) => {
  const { tagline, heading, description, defaultTabValue, tabs } = {
    ...Pricing17Defaults,
    ...props,
  } as Props;

  const [activeTab, setActiveTab] = useState(defaultTabValue);

  const MotionTabsContent = motion(TabsContent);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container-fluid">
        <div className=" mb-8 max-w-lg  md:mb-10 lg:mb-12">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-5xl lg:text-5xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid  w-full grid-cols-1 items-start gap-y-12 md:gap-x-12 md:gap-y-16 lg:grid-cols-2 lg:gap-x-20">
          <div className="order-last lg:order-first grid grid-cols-1 gap-x-6 gap-y-8 py-2">
            <AnimatePresence initial={false} mode="wait">
              {tabs.map(
                (tab) =>
                  tab.value === activeTab && (
                    <motion.div
                      key={tab.value}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {tab.featureSections.map((featureSection, index) => (
                        <div key={index} className="flex self-start mb-8">
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
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          <div className="order-first lg:order-last relative">
            <Tabs defaultValue={defaultTabValue}>
              <div className="flex justify-start lg:justify-end lg:absolute lg:top-[-100px] z-index-10">
                <TabsList className="mb-12 w-fit p-1 bg-[#f2f2f2] rounded-xl">
                  {tabs.map((tab, index) => (
                    <TabsTrigger
                      key={index}
                      value={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className="border-none text-[#757575] font-semibold rounded-lg"
                      style={{
                        color: activeTab === tab.value ? "#ffffff" : "#757575",
                        backgroundColor: activeTab === tab.value ? '#000000' : "#efefef"
                      }}
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
  const [sliderValue, setSliderValue] = useState(30);

  const priceMap = {
    30: { price: "$60", interviews: 30 },
    40: { price: "$80", interviews: 40 },
    50: { price: "$100", interviews: 50 },
  };

  const marks = {
    30: {
      style: {
        fontSize: "1rem",
        fontWeight: 500,
        color: "black",
      },
      label: "30",
    },
    40: {
      style: {
        fontSize: "1rem",
        fontWeight: 500,
        color: "black",
      },
      label: "40",
    },
    50: {
      style: {
        fontSize: "1rem",
        fontWeight: 500,
        color: "black",
      },
      label: "50",
    },
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setSliderValue(value);
    } else {
      setSliderValue(value[0]);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h5 className="mb-2 text-xl font-bold md:text-2xl">
              {plan.planName}
            </h5>
            <p>{plan.description}</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl">
              {billing === "yearly" && plan.showSlider
                ? priceMap[sliderValue as keyof typeof priceMap].price
                : plan.price}
              <span className="text-2xl font-bold md:text-2xl lg:text-2xl">
                {billing === "monthly" ? "/ 10 interviews" : ""}
              </span>
            </h1>
            {billing === "yearly" && (
              <p className="mt-1 font-medium">
                {plan.showSlider
                  ? `${
                      priceMap[sliderValue as keyof typeof priceMap].interviews
                    } interviews`
                  : plan.discount}
              </p>
            )}
          </div>
        </div>
        {plan.showSlider && (
          <div className="my-14">
            <Slider
              styles={{
                track: { backgroundColor: "transparent" },
                rail: { backgroundColor: "black" },
                handle: {
                  height: 16,
                  width: 16,
                  borderColor: "black",
                  backgroundColor: "white",
                  opacity: 1,
                },
              }}
              marks={marks}
              defaultValue={30}
              min={30}
              max={50}
              step={null}
              dotStyle={{ display: "none" }}
              activeDotStyle={{ display: "none" }}
              onChange={handleSliderChange}
            />
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
    },
    {
      value: "yearly",
      tabName: "Starter pack",
      plans: [
        {
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
          ],
          button: { title: "Get started" },
          showSlider: true,
        },
      ],
      featureSections: [
        {
          icon: {
            src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
            alt: "Relume logo 1",
          },
          heading: "Fast-track your hiring process",
          description:
            "Perfect for businesses with consistent hiring needs. This plan ensures a steady flow of qualified candidates.",
        },
        {
          icon: {
            src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
            alt: "Relume logo 2",
          },
          heading: "Scalable interview credits",
          description:
            "Choose the number of interviews you need, with no impact from no-shows or cancellations.",
        },
        {
          icon: {
            src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
            alt: "Relume logo 3",
          },
          heading: "Extended validity and flexibility",
          description:
            "Valid for 3 months, with the flexibility to pause and resume as needed, ensuring you can manage your hiring on your schedule.",
        },
      ],
    },
  ],
};
