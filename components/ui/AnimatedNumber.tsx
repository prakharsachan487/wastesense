'use client';

import React, { useEffect } from 'react';
import { useMotionValue, useSpring, motion, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  format?: (val: number) => string;
  className?: string;
  padZero?: boolean;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  format, 
  className = '',
  padZero = false 
}) => {
  const motionVal = useMotionValue(value);
  const spring = useSpring(motionVal, { damping: 25, stiffness: 120 });
  const display = useTransform(spring, (latest) => {
    const rounded = Math.round(latest);
    if (format) return format(rounded);
    if (padZero && rounded < 10 && rounded >= 0) return `0${rounded}`;
    return String(rounded);
  });

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  return <motion.span className={className}>{display}</motion.span>;
};
