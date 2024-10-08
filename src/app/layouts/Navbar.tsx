"use client";

import { useEffect, useRef, useState } from "react";
import { Button, useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: ButtonProps[];
};

export type Navbar14Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Navbar14 = (props: Navbar14Props) => {
  const { logo, navLinks, buttons } = {
    ...Navbar14Defaults,
    ...props,
  } as Props;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
      navRef.current?.classList.remove("bg-white/70");
      navRef.current?.classList.add("bg-white");
      document.body.classList.remove("overflow-scroll");
    } else {
      document.body.classList.remove("overflow-hidden");
      navRef.current?.classList.remove("bg-white");
      navRef.current?.classList.add("bg-white/70");
      document.body.classList.add("overflow-scroll");
    }
    // Cleanup function
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("overflow-scroll");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky inset-0 bottom-auto z-[1000] flex w-full backdrop-saturate-150 backdrop-blur-xl transition-all px-0 md:mt-6 sm:mt-5 sm:px-[5%] ${
        isMobileMenuOpen ? "bg-white" : "bg-white/70"
      }`}
      style={{
        boxShadow: hasScrolled ? "0 3px 12px rgba(0, 0, 0, 0.07)" : "none",
      }}
    >
      <div className="mx-auto flex min-h-16 w-full max-w-xxl items-center justify-between gap-x-4 gap-y-4 md:min-h-18">
        <a href={logo.url}>
          <img src={logo.src} alt={logo.alt} width={222} />
        </a>
        <button
          ref={buttonRef}
          className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
            variants={topLineVariants}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={isMobileMenuOpen ? "open" : "closed"}
            variants={middleLineVariants}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
            variants={bottomLineVariants}
          />
        </button>
        <motion.div
          variants={{
            open: { height: "var(--height, 100vh)" },
            close: { height: "auto" },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          className="absolute left-0 right-0 sm:h-[100dvh] top-full w-full overflow-hidden lg:static lg:left-auto lg:right-auto lg:top-auto lg:w-auto lg:overflow-visible lg:[--height:auto] max-lg:bg-white"
        >
          <motion.div
            variants={{
              open: { y: 0 },
              close: { y: "var(--translate-y, -100%)" },
            }}
            animate={isMobileMenuOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-0 mx-auto min-w-[200px] justify-self-center px-[5%] text-center text-lg lg:static lg:inset-auto lg:mx-0 lg:px-0 lg:text-left lg:[--translate-y:0%]"
          >
            <div
              ref={menuRef}
              className="mt-4 flex w-full flex-col border-none border-black p-5 text-lg md:p-8 lg:w-auto lg:flex-row lg:border-none lg:bg-none lg:p-0 lg:mt-0 lg:[--height:auto] sm:max-md:bg-white"
            >
              {navLinks.map((navLink, index) => (
                <div key={index}>
                  {navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                    <SubMenu navLink={navLink} isMobile={isMobile} />
                  ) : (
                    <a
                      href={navLink.url}
                      className="relative block py-3 text-center font-semibold transition-opacity hover:opacity-80 lg:px-4 lg:py-3 text-lg lg:text-base"
                    >
                      {navLink.title}
                    </a>
                  )}
                </div>
              ))}
              <div className="rt-4 mt-6 flex flex-col items-center sm:items-center  gap-4 lg:ml-8 lg:mt-0 lg:flex-row">
                {buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLink;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-center gap-4 py-3 text-left text-md font-semibold lg:flex-none lg:justify-start lg:gap-2 lg:px-4 lg:py-2 lg:text-base transition-opacity hover:opacity-80"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.nav
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            variants={{
              open: {
                opacity: "var(--opacity-open, 100%)",
                y: 0,
                visibility: "visible",
                height: "auto",
              },
              close: {
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
                visibility: "hidden",
                height: "var(--height, 0)",
              },
            }}
            transition={{ duration: 0.2 }}
            className="sm:max-md:bg-white lg:absolute lg:z-50 lg:border lg:border-black lg:p-2 lg:[--height:auto] lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((navLink, index) => (
              <a
                key={index}
                href={navLink.url}
                className="block py-3 text-center lg:px-4 lg:py-2 lg:text-left lg:text-base transition-opacity hover:opacity-80"
              >
                {navLink.title}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar14Defaults: Navbar14Props = {
  logo: {
    url: "#",
    src: "/logo.svg",
    alt: "Logo image",
  },
  navLinks: [
    { title: "About", url: "#" },
    { title: "How it works", url: "#" },
    { title: "Pricing", url: "#" },
  ],
  buttons: [
    {
      title: "Log in",
      variant: "secondary",
      size: "sm",
      className:
        "bg-transparent border-black/10 rounded-full lg:py-[.375rem] lg:px-[1.25rem] py-2 px-4 font-semibold text-base transition hover:bg-black hover:text-white sm:max-lg:w-[12.5rem]",
    },
    {
      title: "Sign up",
      size: "sm",
      className:
        "bg-primary rounded-full border-none lg:py-[.375rem] lg:px-[1.25rem] py-2 px-4 font-semibold text-base hover:bg-[#e80279] sm:max-lg:w-[12.5rem]",
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
