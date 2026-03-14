import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);
  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isLarge;
}

const experiences = [
  {
    year: "Jan 2026 – Present",
    position: "Frontend Developer Specialization",
    company: "EPAM",
  },
  {
    year: "Mar 2025 – Sep 2025",
    position: "Software Engineer Intern",
    company: "Grid Dynamics",
  },
  {
    year: "Oct 2024 – Dec 2024",
    position: "Frontend Developer Intern",
    company: "Ingsoftware",
  },
  {
    year: "Oct 2022 – Oct 2023",
    position: "Teaching Associate",
    company: "Faculty of Organizational Sciences",
  },
];

const TimelineNode = ({
  exp,
  index,
  isLarge,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLarge: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (isLarge) {
    // Horizontal: alternating top/bottom
    const isTop = index % 2 === 0;
    return (
      <div ref={ref} className="flex-1 relative flex flex-col items-center min-w-0">
        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: isTop ? -40 : 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`absolute ${isTop ? "bottom-[calc(50%+28px)]" : "top-[calc(50%+28px)]"} w-full px-2`}
        >
          <div className="bg-card border border-border p-5 group hover:border-primary/30 transition-colors duration-300 relative">
            <span className="font-mono text-[11px] text-primary tracking-wider block mb-1.5">
              {exp.year}
            </span>
            <h3 className="font-display text-sm font-bold text-foreground mb-1">
              {exp.position}
            </h3>
            <p className="font-body text-xs text-muted-foreground">{exp.company}</p>
            {/* Connector line from card to dot */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-[1px] bg-border ${
                isTop ? "top-full h-[28px]" : "bottom-full h-[28px]"
              }`}
            />
          </div>
        </motion.div>

        {/* Center dot - positioned on the line */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </div>
    );
  }

  // Vertical timeline
  return (
    <div ref={ref} className="relative flex gap-4 sm:gap-6">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className="w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center flex-shrink-0 z-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
            className="w-[1px] bg-border flex-1 origin-top"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-card border border-border p-5 mb-6 flex-1 group hover:border-primary/30 transition-colors duration-300 relative"
      >
        <span className="font-mono text-[11px] text-primary tracking-wider block mb-1.5">
          {exp.year}
        </span>
        <h3 className="font-display text-sm sm:text-base font-bold text-foreground mb-1">
          {exp.position}
        </h3>
        <p className="font-body text-xs sm:text-sm text-muted-foreground">{exp.company}</p>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const isLarge = useIsLargeScreen();

  return (
    <section id="experience" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="left">
          <span className="font-mono text-sm text-primary tracking-widest uppercase mb-4 block">
            // Experience
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-32 lg:mb-44 tracking-tight">
            Career Path<span className="text-primary">.</span>
          </h2>
        </ScrollReveal>

        {isLarge ? (
          /* Horizontal timeline */
          <div className="relative h-[280px]">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border -translate-y-1/2" />
            <div className="flex h-full">
              {experiences.map((exp, i) => (
                <TimelineNode key={exp.company} exp={exp} index={i} isLarge />
              ))}
            </div>
          </div>
        ) : (
          /* Vertical timeline */
          <div className="relative pl-2">
            {experiences.map((exp, i) => (
              <TimelineNode key={exp.company} exp={exp} index={i} isLarge={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
