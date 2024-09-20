"use client";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

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

export const Layout27 = (props: Layout27Props) => {
  const { tagline, heading, description, beforeImage, afterImage, stats } = {
    ...Layout27Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-16 md:grid-flow-row lg:grid-cols-[40%_1fr] md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-bold md:mb-4 text-primary">{tagline}</p>
            <h2 className="rb-5 mb-5 text-5xl font-semibold leading-[1.2] md:mb-6">
              {heading}
            </h2>
            <p className="mb-6 md:mb-8 text-lg">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <div key={index}>
                  <h3 className="mb-2 text-4xl font-semibold md:text-4xl lg:text-4xl">
                    {stat.title}
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
    "From speeding up recruitment to slashing costs and boosting productivity, here’s how we’ve made a difference:",
  stats: [
    {
      title: "50%",
      description: "faster hiring",
    },
    {
      title: "50%",
      description: "reduction in recruitment costs",
    },
    {
      title: "50%",
      description: "saving on average per hiring per month",
    },
    {
      title: "50%",
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
