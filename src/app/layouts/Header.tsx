import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header26Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Header26 = (props: Header26Props) => {
  const { heading, description, buttons, image } = {
    ...Header26Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container-fluid">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <h1 className="mb-5 text-6xl font-semibold text-black md:mb-6 md:text-7xl lg:text-8xl leading-tight">
                {heading}
              </h1>
              <div className="max-w-md mx-auto">
                <p className="text-2xl">{description}</p>
              </div>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                {buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src={image.src}
              className="size-full object-cover"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header26Defaults: Header26Props = {
  heading: "Fastest way to interview and hire",
  description:
    "Overcome hiring complexities using our AI-driven platform to connect with the most qualified candidates faster than ever before.",
  buttons: [
    {
      title: "Interview today",
      className:
        "bg-primary rounded-full border-none font-semibold transition hover:bg-[#e80279]",
    },
    {
      title: "How it works",
      variant: "secondary",
      className:
        "rounded-full border-black/10 font-semibold transition hover:bg-black hover:text-white",
    },
  ],
  image: {
    src: "/header.png",
    alt: "Relume placeholder image",
  },
};
