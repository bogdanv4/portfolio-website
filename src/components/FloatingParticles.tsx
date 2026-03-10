import { motion } from "framer-motion";

const defaultParticles = [
  { top: "10%", left: "8%", size: "w-2 h-2", dur: 8, delay: 0 },
  { top: "20%", left: "92%", size: "w-1.5 h-1.5", dur: 6, delay: 1 },
  { top: "45%", left: "5%", size: "w-1 h-1", dur: 10, delay: 2 },
  { top: "30%", left: "75%", size: "w-1.5 h-1.5", dur: 7, delay: 0.5 },
  { top: "75%", left: "20%", size: "w-1 h-1", dur: 9, delay: 3 },
  { top: "60%", left: "88%", size: "w-2 h-2", dur: 11, delay: 1.5 },
  { top: "85%", left: "45%", size: "w-1.5 h-1.5", dur: 8, delay: 2.5 },
  { top: "15%", left: "55%", size: "w-1 h-1", dur: 12, delay: 0.8 },
  { top: "50%", left: "35%", size: "w-1.5 h-1.5", dur: 9, delay: 3.5 },
  { top: "90%", left: "78%", size: "w-1 h-1", dur: 7, delay: 1.2 },
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
