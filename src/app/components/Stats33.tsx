type StatCard = {
  percentage: string;
  title: string;
  description: string;
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

export const Stats33 = (props: Stats33Props) => {
  const { tagline, heading, description, stat } = {
    ...Stats33Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-bold md:mb-4 text-primary">{tagline}</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h1>
          <p className="md:text-md">{description}</p>
        </div>
        <Stat {...stat} />
      </div>
    </section>
  );
};

const Stat = (stat: Stat) => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-7 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8 lg:gap-y-8">
      {stat.statCards.map((statCard, index) => (
        <div
          key={index}
          className="flex w-full flex-col justify-between border border-border-primary p-8"
        >
          <p className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            {statCard.percentage}
          </p>
          <div>
            <h3 className="text-md font-bold leading-[1.4] md:text-xl">
              {statCard.title}
            </h3>
            <p className="mt-2 mb-3">{statCard.description}</p>
            <p className="mt-2">{statCard.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Stats33Defaults: Stats33Props = {
  tagline: "Real sucess stories",
  heading: "How businesses like yours are winning",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  stat: {
    statCards: [
      {
        percentage: "30%",
        title: "Short heading goes here",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        percentage: "30%",
        title: "Short heading goes here",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        percentage: "30%",
        title: "Short heading goes here",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
};
