"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BentoCard({
  children,
  className = "",
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      whileHover={{
        background:
          "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 25%, transparent 50%)",
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
        background: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      }}
      viewport={{ once: true }}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
