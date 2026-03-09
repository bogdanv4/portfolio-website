import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    label: "Frontend",
    skills: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "SCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
      { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    ],
  },
  {
    label: "Database",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
    ],
  },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax background element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-20 top-0 w-[400px] h-[400px] rounded-full border border-primary/5 pointer-events-none"
      />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            // About Me
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl font-bold mb-6 tracking-tight"
            >
              I build things for the web
              <span className="text-primary">.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-secondary-foreground font-body leading-relaxed"
            >
              <p>
                I'm a frontend-focused Software Engineer with a degree in Information Systems
                from the University of Belgrade. I enjoy translating complex ideas into clean,
                intuitive interfaces that people actually want to use.
              </p>
              <p>
                Currently working as a Software Engineer Intern at Grid Dynamics, building
                React applications with Google SSO and interactive map visualizations. Previously,
                I honed my skills at Ingsoftware and spent a year teaching web development
                fundamentals at the Faculty of Organizational Sciences.
              </p>
              <p className="text-muted-foreground text-sm font-mono">
                Fun fact: I've been on both sides of the classroom — teaching HTML to students
                before I even landed my first dev job. That's commitment.
              </p>
            </motion.div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono text-sm text-muted-foreground mb-6 uppercase tracking-widest"
            >
              Tech Stack
            </motion.h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  whileHover={{ 
                    y: -4, 
                    borderColor: "hsl(72 100% 50% / 0.4)",
                    transition: { duration: 0.2 } 
                  }}
                  className="group flex flex-col items-center gap-2 p-4 bg-secondary/50 border border-border rounded-sm cursor-default transition-colors duration-200 hover:bg-secondary"
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    style={skill.name === "Express.js" ? { filter: "invert(1)" } : undefined}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
