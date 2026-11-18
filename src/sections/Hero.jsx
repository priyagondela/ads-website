import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.1,
    }));
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center bg-brand-black">
      {/* Animated particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: '#D4AF37',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Abstract tech arc */}
      <motion.div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-brand-gold/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full border border-brand-gold/[0.03]"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.p
          className="text-sm tracking-[0.3em] text-brand-gold mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          ADVYNTRA DIGITAL SERVICES
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Transform Your Ideas Into
          <br />
          <span className="gold-gradient">Digital Success.</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-brand-grey max-w-2xl mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          We help businesses grow through creative digital marketing, powerful
          branding, innovative technology, and customized digital solutions.
        </motion.p>

        <motion.p
          className="text-xs tracking-[0.3em] text-brand-gold/70 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          INNOVATE • CREATE • GROW
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a href="#services" className="btn-primary">
            Explore Our Services
          </a>
          <a href="#contact" className="btn-outline">
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent" />
    </section>
  );
};

export default Hero;
