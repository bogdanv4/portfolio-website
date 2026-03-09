import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);
  const circleScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.6], [0.08, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Parallax background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Large accent circle */}
        <motion.div
          style={{ scale: circleScale, opacity: circleOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] border border-primary/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] border border-primary/[0.07] rounded-full"
        />

        {/* Floating particles */}
        {[
          { top: "15%", left: "10%", size: "w-3 h-3", dur: 8, delay: 0 },
          { top: "70%", left: "85%", size: "w-2 h-2", dur: 6, delay: 1 },
          { top: "50%", left: "5%", size: "w-1.5 h-1.5", dur: 10, delay: 2 },
          { top: "25%", left: "75%", size: "w-2 h-2", dur: 7, delay: 0.5 },
          { top: "80%", left: "25%", size: "w-1 h-1", dur: 9, delay: 3 },
          { top: "40%", left: "90%", size: "w-2.5 h-2.5", dur: 11, delay: 1.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            className={`absolute ${p.size} bg-primary/30 rounded-full`}
            style={{ top: p.top, left: p.left }}
          />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(72 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(72 100% 50% / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Main content with parallax */}
      <motion.div style={{ y: textY, opacity, scale }} className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono text-sm text-primary tracking-widest uppercase"
            >
              Frontend Software Engineer
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Bogdan
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-gradient"
            >
              Vujić
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-body text-lg sm:text-xl text-secondary-foreground max-w-xl mb-10 leading-relaxed"
          >
            Crafting clean, responsive interfaces with React & TypeScript.
            Based in Belgrade, building for the web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 font-mono text-sm bg-primary text-primary-foreground px-6 py-3 rounded-sm hover:opacity-90 transition-all duration-200 hover:gap-3"
            >
              View My Work
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, borderColor: "hsl(72 100% 50%)" }}
              whileTap={{ scale: 0.97 }}
              className="font-mono text-sm border border-border text-foreground px-6 py-3 rounded-sm hover:text-primary transition-all duration-200"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
