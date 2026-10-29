"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth custom cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over clickable elements (buttons, links, select, inputs, textareas)
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "SELECT" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      ref={cursorRef}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 1.5 : 1,
        backgroundColor: isHovered ? "rgba(160, 120, 64, 0.1)" : "rgba(160, 120, 64, 0.03)",
        borderColor: isHovered ? "rgba(160, 120, 64, 0.8)" : "rgba(160, 120, 64, 0.35)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold-500 pointer-events-none z-[9999] hidden lg:block"
    >
      {/* Center dot */}
      <motion.div 
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "var(--gold, #A07840)" : "var(--gold-lt, #C9A96E)",
        }}
        className="w-1.5 h-1.5 bg-gold-600 rounded-full absolute top-[13px] left-[13px]" 
      />
    </motion.div>
  );
}
