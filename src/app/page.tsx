import { Navbar14 as Navbar } from "./components/Navbar";
import { Header26 as Header } from "./components/Header";
import { Logo3 as Logo } from "./components/Logo";
import { Layout242 as Process } from "./components/Layout242";
import { Layout27 as Benefits } from "./components/Layout27";
import { Stats33 as Stats } from "./components/Stats33";
import { Layout253 as Features } from "./components/Layout253";
import { Testimonial1 as Testimonial } from "./components/Testimonial";
import { Cta57 as Cta } from "./components/Cta";
import { Footer4 as Footer } from "./components/Footer";

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
        <Features />
        <Testimonial />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
