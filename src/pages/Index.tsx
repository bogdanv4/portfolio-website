import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
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
      <div className={`min-h-screen bg-background text-foreground ${loading ? "overflow-hidden h-screen" : ""}`}>
        
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
};

export default Index;
