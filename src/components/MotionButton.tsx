"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export function MotionButton({ children, className, ...props }: MotionButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "var(--ink-2, #3A3128)",
        color: "#FFFFFF",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
