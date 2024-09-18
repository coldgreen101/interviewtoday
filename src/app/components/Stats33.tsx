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
      <div className="flex w-full flex-col justify-between bg-[#4dc9f07a] bg-opacity-50 text-altBackground p-8 rounded-2xl">
        <p className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          {stat.statCards[0].percentage}
        </p>
        <div>
          <h3 className="text-md font-bold leading-[1.4] md:text-xl">
            {stat.statCards[0].title}
          </h3>
          <p className="mt-2 mb-3">{stat.statCards[0].description1}</p>
          <p className="mt-2">{stat.statCards[0].description2}</p>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between bg-[#3a0ba3d9] text-cardText p-8 rounded-2xl">
        <p className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          {stat.statCards[1].percentage}
        </p>
        <div>
          <h3 className="text-md font-bold leading-[1.4] md:text-xl">
            {stat.statCards[1].title}
          </h3>
          <p className="mt-2 mb-3">{stat.statCards[1].description1}</p>
          <p className="mt-2">{stat.statCards[1].description2}</p>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between bg-[#f7248599] text-altBackground p-8 rounded-2xl">
        <p className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          {stat.statCards[2].percentage}
        </p>
        <div>
          <h3 className="text-md font-bold leading-[1.4] md:text-xl">
            {stat.statCards[2].title}
          </h3>
          <p className="mt-2 mb-3">{stat.statCards[2].description1}</p>
          <p className="mt-2">{stat.statCards[2].description2}</p>
        </div>
      </div>
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
        title: "DHW & Company",
        description1:
          "Impact: 34% increase in staffing levels and 8% boost in guest satisfaction within two months.",
        description2:
          "Benefit: Streamlined hiring processes allowing managers to focus on customer service rather than recruitment.",
      },
      {
        percentage: "30%",
        title: "Gellert Hospitality Group",
        description1:
          "Impact: Staffing levels rose by 41%, with sales growing 25.4% in the first year.",
        description2:
          "Benefit: Enabled aggressive expansion and efficient staffing of new locations, supporting business growth.",
      },
      {
        percentage: "30%",
        title: "NYVA Restaurant Group",
        description1:
          "Impact: Achieved proper staffing in 90% of locations, enhancing operational efficiency and sales.",
        description2:
          "Benefit: Simplified recruitment process led to significant time savings and higher management satisfaction.",
      },
    ],
  },
};
