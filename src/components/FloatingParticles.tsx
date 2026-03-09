import { motion } from "framer-motion";

const defaultParticles = [
  { top: "15%", left: "10%", size: "w-2 h-2", dur: 8, delay: 0 },
  { top: "70%", left: "85%", size: "w-1.5 h-1.5", dur: 6, delay: 1 },
  { top: "50%", left: "5%", size: "w-1 h-1", dur: 10, delay: 2 },
  { top: "25%", left: "75%", size: "w-1.5 h-1.5", dur: 7, delay: 0.5 },
  { top: "80%", left: "25%", size: "w-1 h-1", dur: 9, delay: 3 },
];

const FloatingParticles = ({ particles = defaultParticles }: { particles?: typeof defaultParticles }) => (
  <>
    {particles.map((p, i) => (
      <motion.div
        key={i}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        className={`absolute ${p.size} bg-primary/30 rounded-full pointer-events-none`}
        style={{ top: p.top, left: p.left }}
      />
    ))}
  </>
);

export default FloatingParticles;
