import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Air Pollution Tracker",
    description:
      "Interactive web app featuring Google SSO and real-time map visualization of air quality data. Built as part of a 3-member team during my Grid Dynamics internship.",
    tags: ["React", "TypeScript", "Google SSO", "Maps API", "SCSS"],
    live: "#",
    github: "#",
  },
  {
    title: "Angular Web Shop",
    description:
      "Full-featured e-commerce application with product listings, cart management, and responsive design. Developed during my frontend internship at Ingsoftware.",
    tags: ["Angular", "TypeScript", "Bootstrap", "REST API"],
    live: "#",
    github: "#",
  },
  {
    title: "AI Haiku",
    description:
      "An AI-powered haiku generator that creates unique poetry using machine learning. A fun side project exploring the intersection of creativity and technology.",
    tags: ["React", "TypeScript", "AI", "API"],
    live: "#",
    github: "#",
  },
  {
    title: "Agencija Kozic",
    description:
      "A professional agency website with modern design, smooth animations, and responsive layout. Built for a real client with focus on performance and UX.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "#",
    github: "#",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      <FloatingParticles />

      <motion.div
        style={{ x: bgX }}
        className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
      />

      <div className="container mx-auto px-6">
        <ScrollReveal direction="left">
          <span className="font-mono text-sm text-primary tracking-widest uppercase mb-4 block">
            // Projects
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12 tracking-tight">
            Selected Work<span className="text-primary">.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex gap-3 h-[420px] sm:h-[480px]">
            {projects.map((project, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={project.title}
                  className="relative rounded-sm overflow-hidden cursor-pointer border border-border group"
                  animate={{
                    flex: isActive ? 4 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{ minWidth: 0 }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-card" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                  {/* Glow on active */}
                  <motion.div
                    className="absolute inset-0 rounded-sm pointer-events-none"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: "inset 0 0 40px hsl(72 100% 50% / 0.06), 0 0 30px hsl(72 100% 50% / 0.08)",
                    }}
                  />

                  {/* Vertical title (collapsed state) */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="font-display text-sm sm:text-base font-bold text-muted-foreground whitespace-nowrap tracking-wider"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {project.title}
                    </span>
                  </motion.div>

                  {/* Content (expanded state) */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isActive ? 0.15 : 0 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 ml-auto">
                        <motion.a
                          href={project.github}
                          whileHover={{ scale: 1.2 }}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          whileHover={{ scale: 1.2 }}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Live Demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      </div>
                    </div>

                    <p className="font-body text-sm text-secondary-foreground leading-relaxed mb-4 max-w-md">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Top accent line on active */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-primary"
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
