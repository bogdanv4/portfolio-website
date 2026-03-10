import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
    title: "Portfolio Website",
    description:
      "The site you're looking at right now. Designed and built from scratch with a focus on performance, animations, and standing out from the crowd.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "#",
    github: "#",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={0.2 + i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                className="group relative bg-card border border-border rounded-sm p-6 flex flex-col h-full"
                style={{ transformPerspective: 800 }}
              >
                <div className="absolute inset-0 rounded-sm bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-accent" />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={18} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                    </div>
                  </div>

                  <p className="font-body text-sm text-secondary-foreground leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
