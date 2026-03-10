import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

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
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingX = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      <FloatingParticles />
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          style={{ x: headingX, opacity: headingOpacity }}
          className="mb-4"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            // Testimonials
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl font-bold mb-12 tracking-tight"
        >
          Kind Words<span className="text-primary">.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-card border border-border rounded-sm p-6 relative group"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-accent" />

              <motion.div
                initial={{ rotate: 0 }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
