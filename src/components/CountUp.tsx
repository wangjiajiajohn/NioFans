"use client";
import React, { useState, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration?: number; // ms
  decimals?: number;
  separator?: boolean;
}

/**
 * A lightweight, high-performance CountUp component using requestAnimationFrame.
 * Enhances numbers with a premium 'rolling' animation on load or value change.
 */
export default function CountUp({ end, duration = 1500, decimals = 0, separator = true }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let rAF: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutExpo for a premium, fast-then-slow feel
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easedProgress * end;
      
      setCount(current);

      if (progress < 1) {
        rAF = requestAnimationFrame(animate);
      }
    };

    rAF = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rAF);
  }, [end, duration]);

  const formatted = count.toFixed(decimals);
  if (!separator) return <>{formatted}</>;

  const [int, dec] = formatted.split('.');
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return <>{dec ? `${withCommas}.${dec}` : withCommas}</>;
}
