import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="contact" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            // Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-bold mb-4 tracking-tight"
        >
          Let's work together<span className="text-primary">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-lg text-secondary-foreground max-w-xl mb-12"
        >
          I'm actively looking for my next opportunity. Whether you have a role in mind
          or just want to say hello — my inbox is always open.
        </motion.p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              download={link.download || undefined}
              target={link.download ? undefined : "_blank"}
              rel={link.download ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 font-mono text-sm text-secondary-foreground border border-border rounded-sm px-5 py-3 hover:border-primary hover:text-primary transition-all duration-200"
            >
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {link.icon}
              </span>
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container mx-auto px-6 mt-24 pt-8 border-t border-border"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bogdan Vujić. Built with React & passion.
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Belgrade, Serbia 🇷🇸
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
