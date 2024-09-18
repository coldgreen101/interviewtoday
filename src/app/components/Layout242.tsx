import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type SectionProps = {
  image: ImageProps;
  heading: string;
  description: string;
};

type Props = {
  heading: string;
  sections: SectionProps[];
};

export type Layout242Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Layout242 = (props: Layout242Props) => {
  const { heading, sections } = { ...props, ...Layout242Defaults } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container flex flex-col items-center">
        <div className="rb-12 mb-12 text-center w-full max-w-lg md:mb-18 lg:mb-20">
          <h3 className="font-semibold leading-[1.2] md:text-5xl text-headings">
            {heading}
          </h3>
        </div>
        <div className="grid grid-cols-1 items-center text-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {sections.map((section, index) => (
            <div key={index}>
              <div className="rb-5 mb-5 md:mb-6 h-full">
                <img
                  src={section.image.src}
                  className="mx-auto max-w-full object-cover"
                  alt={section.image.alt}
                  width={252}
                />
              </div>
              <h3 className="mb-5 font-bold md:mb-6 md:text-2xl text-headings">
                {section.heading}
              </h3>
              <p className="mb-5 md:mb-6 text-headings">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout242Defaults: Layout242Props = {
  heading: "How it works",
  sections: [
    {
      image: {
        src: "/signup.png",
        alt: "Relume logo 1",
      },
      heading: "Create an account",
      description:
        "Set up your account quickly and easily. There's no lengthy onboarding process, no commitments, and absolutely no hidden fees. Just provide some basic information to get started.",
    },
    {
      image: {
        src: "/activate.png",
        alt: "Relume logo 2",
      },
      heading: "Activate your job",
      description:
        "Tell us what roles you need filled, and our AI-enabled platform will do the rest. Along the way, you’ll receive helpful tips as it effortlessly handles the recruitment process for you.",
    },
    {
      image: {
        src: "/chat.png",
        alt: "Relume logo 3",
      },
      heading: "Interview today",
      description:
        "Receive text notifications about your scheduled interviews with qualified candidates, maybe even today. Hire with ease—you only pay when candidates show up.",
    },
  ],
};
