"use client";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import Lottie from "lottie-react";
import trainBubbleAnimation from "../../../public/trainBubbleAnimation.json";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeaturesProps = {
  icon: ImageProps;
  heading: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  features: FeaturesProps[];
  image: ImageProps;
};

export type Layout253Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Layout253 = (props: Layout253Props) => {
  const { tagline, heading, buttons, features } = {
    ...Layout253Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container-fluid">
        <div className="text-center">
          <p className="mb-3 font-semibold md:mb-4 text-primary">{tagline}</p>
          <h2 className="rb-5 mb-5 text-5xl font-semibold md:mb-6 md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </div>
        <div className="grid auto-cols-fr sm:grid-cols-1 place-items-center justify-start gap-y-12 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr] md:gap-x-12 md:gap-y-16 lg:gap-x-20">
          <div className="grid w-full auto-cols-fr grid-cols-1 gap-x-8 gap-y-12  md:gap-y-16 lg:gap-x-12">
            <div className="text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src={features[0].icon.src}
                  className="inline-block size-12"
                  alt={features[0].icon.alt}
                />{" "}
              </div>
              <h1 className="mb-5 text-2xl font-semibold md:mb-6 md:text-2xl md:leading-[1.3] lg:text-2xl">
                {features[0].heading}
              </h1>
              <p>{features[0].description}</p>
            </div>
            <div className="text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src={features[1].icon.src}
                  className="inline-block size-12"
                  alt={features[1].icon.alt}
                />
              </div>
              <h1 className="mb-5 text-2xl font-semibold md:mb-6 md:text-2xl md:leading-[1.3] lg:text-2xl">
                {features[1].heading}
              </h1>
              <p>{features[1].description}</p>
            </div>
          </div>
          <div className="hidden lg:block w-full">
            <Lottie animationData={trainBubbleAnimation} loop={true} />
          </div>
          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-1 md:gap-y-16 lg:grid-cols-1 lg:gap-x-12">
            <div className="text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src={features[2].icon.src}
                  className="inline-block size-12"
                  alt={features[2].icon.alt}
                />
              </div>
              <h1 className="mb-5 text-2xl font-semibold md:mb-6 md:text-2xl md:leading-[1.3] lg:text-2xl">
                {features[2].heading}
              </h1>
              <p>{features[2].description}</p>
            </div>
            <div className="text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src={features[3].icon.src}
                  className="inline-block size-12"
                  alt={features[3].icon.alt}
                />
              </div>
              <h1 className="mb-5 text-2xl font-semibold md:mb-6 md:text-2xl md:leading-[1.3] lg:text-2xl">
                {features[3].heading}
              </h1>
              <p>{features[3].description}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-4 md:mt-20">
          {buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout253Defaults: Layout253Props = {
  tagline: "Simple, smart, and stress-Free",
  heading: "Why you'll love InterviewToday",
  buttons: [
    {
      title: "Interview today",
      variant: "secondary",
      className:
        "border-none bg-ctaAlt rounded-full text-white font-semibold transition hover:bg-primary",
    },
    {
      title: "How it works",
      variant: "secondary",
      className:
        "rounded-full border-black/10 font-semibold transition hover:bg-black hover:text-white",
    },
  ],
  features: [
    {
      icon: {
        src: "/coin.svg",
        alt: "Relume logo 1",
      },
      heading: "Transparent pricing",
      description:
        "Enjoy transparent, per-interview pricing with no hidden fees or commitments. Our straightforward approach lets you focus on hiring without worrying about the fine print.",
    },
    {
      icon: {
        src: "/hire.svg",
        alt: "Relume logo 2",
      },
      heading: "Hire A-players quickly",
      description:
        "We connect you with top talent quickly. Our AI, refined over years, keeps you ahead of the competition by ensuring you meet the best candidates first.",
    },
    {
      icon: {
        src: "/package.svg",
        alt: "Relume logo 3",
      },
      heading: "Everything handled",
      description:
        "We manage the entire hiring process, from crafting job ads to scheduling and conducting final interviews. All you need to do is meet the candidates and make your decision.",
    },
    {
      icon: {
        src: "/ghost.svg",
        alt: "Relume logo 4",
      },
      heading: "No show, no charge",
      description:
        "Our no-show rate is just 27%, far below the industry average of 78%. Pay only for candidates who attend, avoiding wasted fees on no-shows.",
    },
  ],
};
