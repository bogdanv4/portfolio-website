import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

const LinkedInFloat = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://www.linkedin.com/in/bogdan-vujic"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          whileHover={{ scale: 1.1 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 group hidden lg:flex flex-col items-center gap-3"
        >
          {/* Vertical line */}
          <span className="w-px h-8 bg-border group-hover:bg-primary transition-colors" />
          
          {/* Icon button */}
          <span className="w-10 h-10 rounded-full border border-border group-hover:border-primary bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all">
            <Linkedin size={18} />
          </span>
          
          {/* Vertical line */}
          <span className="w-px h-8 bg-border group-hover:bg-primary transition-colors" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default LinkedInFloat;
