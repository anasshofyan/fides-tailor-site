"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionImageProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionImage({ children, className }: MotionImageProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.03 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
