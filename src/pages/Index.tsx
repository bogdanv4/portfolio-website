import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={loading ? "overflow-hidden h-screen" : ""} style={{ minHeight: '100vh' }}>
        <Navbar />
        <Hero />
        <About />
        <Marquee />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
};

export default Index;
