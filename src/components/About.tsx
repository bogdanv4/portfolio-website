import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  "JavaScript", "TypeScript", "React", "Angular", "HTML", "CSS", "SCSS",
  "Node.js", "Express.js", "MongoDB", "Bootstrap", "Ionic", "Git",
  "Figma", "SCRUM", "WordPress",
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  className="font-mono text-xs px-3 py-1.5 bg-secondary text-secondary-foreground border border-border rounded-sm hover:border-primary/50 hover:text-primary transition-colors duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {[
                { value: "BSc", label: "Degree" },
                { value: "3+", label: "Internships" },
                { value: "1yr", label: "Teaching" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-secondary/50 rounded-sm border border-border">
                  <div className="font-display text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
