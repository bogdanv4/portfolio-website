import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isSmall;
}




const projects = [
  {
    title: "Air Pollution Tracker",
    description:
      "Interactive web app featuring Google SSO and real-time map visualization of air quality data. Built as part of a 3-member team during my Grid Dynamics internship.",
    tags: ["React", "TypeScript", "Google SSO", "Maps API", "SCSS"],
    live: "",
    github: "https://github.com/bogdanv4/airo-capstone",
  },
  {
    title: "Angular Web Shop",
    description:
      "Full-featured e-commerce application with product listings, cart management, and responsive design. Developed during my frontend internship at Ingsoftware.",
    tags: ["Angular", "TypeScript", "Bootstrap", "REST API"],
    live: "",
    github: "https://github.com/bogdanv4/angular-shop-project",
  },
  {
    title: "AI Haiku",
    description:
      "An AI-powered haiku generator that creates unique poetry using machine learning. A fun side project exploring the intersection of creativity and technology.",
    tags: ["React", "TypeScript", "AI", "API"],
    live: "",
    github: "https://github.com/bogdanv4/ai-haiku",
  },
  {
    title: "Agencija Kozic",
    description:
      "A professional agency website with modern design, smooth animations, and responsive layout. Built for a real client with focus on performance and UX.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://agencijakozic.rs/",
    github: "https://github.com/bogdanv4/agencija-kozic",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => (
  <ScrollReveal delay={index * 0.1}>
    <div className="group relative bg-card border border-border p-6 sm:p-8 hover:border-primary/30 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
          {project.title}
        </h3>
        <div className="flex gap-2 ml-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
      <p className="font-body text-sm text-secondary-foreground leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 border border-border text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  </ScrollReveal>
);

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
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
      </div>

      {/* Mobile/Tablet: stacked cards */}
      {isMobile ? (
        <div className="container mx-auto px-6 flex flex-col gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      ) : (
        /* Desktop: expanding diagonal cards */
        <ScrollReveal delay={0.2}>
          <div className="flex h-[560px] w-full overflow-hidden">
            {projects.map((project, i) => {
              const isActive = activeIndex === i;

              return (
                <motion.div
                  key={project.title}
                  className="relative cursor-pointer group"
                  animate={{
                    flex: isActive ? 5 : 1,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    minWidth: 0,
                    transform: "skewX(-6deg)",
                    marginLeft: i === 0 ? "-2%" : "-1%",
                    marginRight: i === projects.length - 1 ? "-2%" : 0,
                    overflow: "hidden",
                  }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-card" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-card" />

                  {/* Edge highlight between cards */}
                  <div
                    className="absolute top-0 bottom-0 left-0 w-[1px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, hsl(var(--border)) 0%, hsl(var(--primary) / 0.3) 50%, hsl(var(--border)) 100%)",
                    }}
                  />

                  {/* Glow on active */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      boxShadow: "inset 0 0 60px hsl(72 100% 50% / 0.04)",
                    }}
                  />

                  {/* Vertical title (collapsed state) */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: "skewX(6deg)" }}
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
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
                    className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10"
                    style={{ transform: "skewX(6deg)" }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2, delay: isActive ? 0.08 : 0 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 ml-auto">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </motion.a>
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2 }}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Live Demo"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <p className="font-body text-sm text-secondary-foreground leading-relaxed mb-4 max-w-md">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bottom accent line on active */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      )}
    </section>
  );
};

export default Projects;
