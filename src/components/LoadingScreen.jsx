import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete?.();
      }}
    >
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#050505" }}
        >
          {/* Logo with spinning golden ring */}
          <div className="relative flex items-center justify-center">
            {/* Rotating golden ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 190,
                height: 190,
                border: "2px solid transparent",
                borderTopColor: "#D4AF37",
                borderRightColor: "#D4AF37",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Second ring, counter-rotating for depth */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                border: "1px solid transparent",
                borderBottomColor: "rgba(212, 175, 55, 0.4)",
                borderLeftColor: "rgba(212, 175, 55, 0.4)",
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Golden glow pulse */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: 160, height: 160 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(212, 175, 55, 0.1), 0 0 40px rgba(212, 175, 55, 0.05)",
                  "0 0 30px rgba(212, 175, 55, 0.25), 0 0 60px rgba(212, 175, 55, 0.1)",
                  "0 0 20px rgba(212, 175, 55, 0.1), 0 0 40px rgba(212, 175, 55, 0.05)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="/logo.jpg"
                alt="Advyntra Digital Services"
                className="relative"
                style={{
                  width: 150,
                  height: 150,
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="mt-10 text-sm font-light"
            style={{
              color: "#D4AF37",
              letterSpacing: "0.3em",
            }}
          >
            INNOVATE &nbsp;•&nbsp; CREATE &nbsp;•&nbsp; GROW
          </motion.p>

          {/* Loading bar at the bottom */}
          <div className="absolute bottom-0 left-0 w-full" style={{ height: 2 }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              style={{
                height: "100%",
                backgroundColor: "#D4AF37",
                boxShadow: "0 0 8px rgba(212, 175, 55, 0.6)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
