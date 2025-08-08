"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import TypewriterEffect from "@/components/ui/typewritter";
import DarkVeil from "@/components/ui/hero-background";

const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  const techWords = [
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "Tailwind",
  ];

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-[455px] md:h-screen flex items-end md:items-center justify-center px-4"
    >
      <div className="absolute inset-0">
        <DarkVeil />
      </div>
      <div className="relative text-center max-w-4xl mx-auto z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground md:mb-4 leading-tight font-heading"
        >
          Building <em>cool stuffs</em> with
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-8 font-heading"
        >
          <TypewriterEffect words={techWords} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Hello 👋 Welcome to my personal website ;)
        </motion.p>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
