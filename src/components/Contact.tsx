import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, FileDown, ArrowUp } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingScale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const links = [
    {
      icon: <Mail size={20} />,
      label: "vujic.bogdan@gmail.com",
      href: "mailto:vujic.bogdan@gmail.com",
    },
    {
      icon: <Github size={20} />,
      label: "github.com/bogdanv4",
      href: "https://github.com/bogdanv4",
    },
    {
      icon: <Linkedin size={20} />,
      label: "linkedin.com/in/bogdan-vujic",
      href: "https://www.linkedin.com/in/bogdan-vujic",
    },
    {
      icon: <FileDown size={20} />,
      label: "Download CV",
      href: "/Bogdan_Vujic_CV.pdf",
      download: true,
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      <FloatingParticles />
      <div className="container mx-auto px-6">
        <ScrollReveal direction="left">
          <span className="font-mono text-sm text-primary tracking-widest uppercase mb-4 block">
            // Contact
          </span>
        </ScrollReveal>

        <motion.h2
          style={{ scale: headingScale, opacity: headingOpacity }}
          className="font-display text-3xl sm:text-5xl font-bold mb-4 tracking-tight origin-left"
        >
          Let's work together<span className="text-primary">.</span>
        </motion.h2>

        <ScrollReveal delay={0.2}>
          <p className="font-body text-lg text-secondary-foreground max-w-xl mb-12">
            I'm actively looking for my next opportunity. Whether you have a role in mind
            or just want to say hello — my inbox is always open.
          </p>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {links.map((link, i) => (
            <ScrollReveal key={link.label} direction="left" delay={0.3 + i * 0.1}>
              <motion.a
                href={link.href}
                download={link.download || undefined}
                target={link.download ? undefined : "_blank"}
                rel={link.download ? undefined : "noopener noreferrer"}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 font-mono text-sm text-secondary-foreground border border-border rounded-sm px-5 py-3 hover:border-primary hover:text-primary transition-all duration-200"
              >
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  {link.icon}
                </span>
                {link.label}
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Footer */}
      <ScrollReveal delay={0.6}>
        <div className="container mx-auto px-6 mt-24 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bogdan Vujić. Built with React & passion.
            </span>
            <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
              Serbia <span className="text-base leading-none">🇷🇸</span>
            </span>
          </div>
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-border group-hover:border-primary flex items-center justify-center transition-colors">
                <ArrowUp size={16} />
              </span>
              Back to top
            </motion.button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Contact;
