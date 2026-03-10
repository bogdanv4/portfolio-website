import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"typing" | "exit">("typing");
  const firstName = "Bogdan";
  const lastName = "Vujić";

  useEffect(() => {
    const totalChars = firstName.length + lastName.length;
    const typingDuration = totalChars * 120 + 600;
    const timer = setTimeout(() => setPhase("exit"), typingDuration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" ? null : undefined}
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, scale: 0.95 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (phase === "exit") onComplete();
        }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(72 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(72 100% 50% / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9]">
            <span className="inline-flex">
              {firstName.split("").map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.08, delay: i * 0.12 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <br />
            <span className="inline-flex text-gradient">
              {lastName.split("").map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.08, delay: (firstName.length + i) * 0.12 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </div>

          {/* Blinking cursor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: (firstName.length + lastName.length) * 0.12 }}
            className="mt-6 w-6 h-[3px] bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
