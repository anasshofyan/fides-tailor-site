"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function MotionCard({ children, className, index = 0 }: MotionCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, boxShadow: "0 18px 40px -18px rgba(28,25,23,0.18)" }}
    >
      {children}
    </motion.div>
  );
}
