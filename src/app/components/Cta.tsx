"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  headers: string[];
  description: string;
  buttons: ButtonProps[];
};

export type Cta57Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Cta57 = (props: Cta57Props) => {
  const { headers, description, buttons } = {
    ...Cta57Defaults,
    ...props,
  } as Props;
  return (
    <section
      id="relume"
      className="px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-b from-[var(--alt-background)] to-[#16043d]"
    >
      <div className="container">
        <div className="mx-auto w-full max-w-lg text-center">
          {headers.map((heading, index) => (
            <motion.h1
              key={index}
              initial={{ x: index % 2 === 0 ? "-50%" : "50%" }}
              animate={{ x: "0%" }}
              transition={{ type: "spring", bounce: 0 }}
              className={clsx(
                "text-6xl font-bold md:text-9xl lg:text-10xl bg-clip-text text-transparent bg-gradient-to-b from-[var(--card-text)] to-[#9f79f4]",
                {
                  "mb-5 md:mb-6": index !== 0,
                }
              )}
            >
              {heading}
            </motion.h1>
          ))}
          <p className="md:text-xl text-white/90">{description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                {button.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Cta57Defaults: Cta57Props = {
  headers: ["Medium length CTA", "heading goes here"],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  buttons: [
    {
      title: "Interview today",
      className:
        "bg-ctaAlt border-none rounded-full font-semibold text-altBackground",
    },
    {
      title: "How it works",
      variant: "secondary",
      className: "rounded-full border-white text-white font-semibold",
    },
  ],
};
