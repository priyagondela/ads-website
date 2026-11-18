import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Custom hook that provides a ref and an `isInView` flag for scroll-reveal
 * animations powered by framer-motion.
 *
 * @param {number} threshold - Fraction of the element that must be visible (0–1).
 * @returns {{ ref: React.RefObject, isInView: boolean }}
 */
export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  return { ref, isInView };
};

export default useScrollReveal;
