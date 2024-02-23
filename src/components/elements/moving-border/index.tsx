'use client';

import { useMotionValue, useAnimationFrame, useTransform, useMotionTemplate, motion } from 'framer-motion';
import { useRef } from 'react';

import { BorderLine, BorderSVG } from './moving-border.styles';

export const MovingBorder = ({
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame(time => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, val => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, val => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <BorderSVG
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </BorderSVG>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        <BorderLine className="animated-border" />
      </motion.div>
    </>
  );
};
