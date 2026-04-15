import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Animation constants for the "breathing" pulse
  const pulseVariants = {
    initial: {
      boxShadow: "9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5)",
      scale: 1
    },
    animate: {
      boxShadow: "15px 15px 25px rgba(163, 177, 198, 0.4), -15px -15px 25px rgba(255, 255, 255, 0.6)",
      scale: 1.02,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.5,
        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neo-bg overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full shadow-inset-deep blur-2xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full shadow-inset-deep blur-2xl"></div>
      </div>

      {/* Central Logo Container */}
      <div className="relative flex items-center justify-center mb-12">
        {/* The "Well" (Inset Deep) */}
        <div className="absolute w-40 h-40 rounded-[40px] shadow-inset-deep bg-neo-bg"></div>
        
        {/* The Logo (Extruded/Rising) */}
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="relative z-10 w-32 h-32 rounded-[32px] bg-neo-bg flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
            }}
            transition={{ 
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Layers size={64} className="text-neo-accent drop-shadow-sm" />
          </motion.div>
        </motion.div>
      </div>

      {/* Loading Percentage Pill */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-8 py-3 rounded-full bg-neo-bg shadow-inset-small flex items-center justify-center min-w-[120px]"
        aria-live="polite"
      >
        <span className="font-display font-extrabold text-neo-fg tabular-nums tracking-tighter">
          {progress}<span className="text-neo-accent ml-1">%</span>
        </span>
      </motion.div>

      {/* Accessibility Status */}
      <span className="sr-only">Cổng thông tin đang tải, vui lòng chờ...</span>
    </motion.div>
  );
};

export default Preloader;
