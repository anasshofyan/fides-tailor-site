"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionBadge({ children, className }: MotionBadgeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 15px rgba(160, 120, 64, 0.2)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
