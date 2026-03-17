import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback, useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import FloatingParticles from "./FloatingParticles";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Ana Petrović",
    role: "Senior Developer, Grid Dynamics",
    quote:
      "Bogdan picks up new concepts remarkably fast. His attention to detail in UI implementation and willingness to take on complex tasks set him apart from other interns I've worked with.",
  },
  {
    name: "Marko Nikolić",
    role: "Team Lead, Ingsoftware",
    quote:
      "What impressed me most was Bogdan's ability to work independently. He delivered both projects on time with clean, well-structured code. A genuinely self-driven developer.",
  },
  {
    name: "Prof. Jelena Đorđević",
    role: "Faculty of Organizational Sciences",
    quote:
      "Bogdan brought real enthusiasm to teaching web development. Students responded well to his practical approach, and his materials were always thorough and up-to-date.",
  },
  {
    name: "Stefan Jovanović",
    role: "Project Manager, Levi9",
    quote:
      "Bogdan consistently demonstrated strong problem-solving skills and a collaborative spirit. He communicated clearly with the team and always delivered quality work ahead of schedule.",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingX = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      <FloatingParticles />
      <div className="container mx-auto px-6">
        <motion.div
          style={{ x: headingX, opacity: headingOpacity }}
          className="mb-4"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            // Testimonials
          </span>
        </motion.div>

        <div className="flex items-end justify-between mb-12">
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Kind Words<span className="text-primary">.</span>
            </h2>
          </ScrollReveal>

          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30"
              disabled={!canScrollPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30"
              disabled={!canScrollNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-card border border-border rounded-sm p-6 relative group h-full"
                >
                  <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-accent" />

                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="inline-block"
                  >
                    <Quote size={20} className="text-primary/30 mb-4" />
                  </motion.div>
                  <p className="font-body text-sm text-secondary-foreground leading-relaxed mb-6 italic relative z-10">
                    "{t.quote}"
                  </p>
                  <div className="border-t border-border pt-4 relative z-10">
                    <div className="font-display text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
