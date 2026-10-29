"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h2" | "span" | "li";
}

// Soft fade + lift + unblur when the element scrolls into view.
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

// Image wrapper that unveils like a curtain lifting.
// The observed wrapper stays unclipped so the in-view trigger always fires;
// only the inner layer animates its clip-path.
export function RevealImage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          shown: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
