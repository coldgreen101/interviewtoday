import { Navbar14 as Navbar } from "./layouts/Navbar";
import { Header26 as Header } from "./layouts/Header";
import { Logo3 as Logo } from "./layouts/Logo";
import { Layout242 as Process } from "./layouts/Layout242";
import { Layout27 as Benefits } from "./layouts/Layout27";
import { Stats33 as Stats } from "./layouts/Stats33";
import { Pricing17 as Pricing } from "./layouts/Pricing";
import { Layout253 as Features } from "./layouts/Layout253";
import { Testimonial1 as Testimonial } from "./layouts/Testimonial";
import { Cta57 as Cta } from "./layouts/Cta";
import { Footer4 as Footer } from "./layouts/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Header />
        <Logo />
        <Process />
        <Benefits />
        <Stats />
        <Pricing />
        <Features />
        <Testimonial />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
