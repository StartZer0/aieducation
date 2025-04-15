
import { useState, useRef, useCallback, useEffect } from 'react';

export const useAnimationControl = (setTime: React.Dispatch<React.SetStateAction<number>>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Animation function
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / 5000, 1); // 5 seconds animation
    
    // Update time based on progress
    const newTime = 5 * progress;
    setTime(newTime);
    
    if (progress < 1) {
      animationIdRef.current = requestAnimationFrame(animate);
    } else {
      // Animation completed
      startTimeRef.current = null;
      animationIdRef.current = null;
      setIsPlaying(false);
    }
  }, [setTime]);
  
  // Toggle animation
  const toggleAnimation = useCallback(() => {
    setIsPlaying(prevIsPlaying => {
      const newIsPlaying = !prevIsPlaying;
      
      if (newIsPlaying) {
        // Start animation
        startTimeRef.current = null;
        if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);
        }
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        // Stop animation
        if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      }
      
      return newIsPlaying;
    });
  }, [animate]);
  
  // Reset visualization
  const resetVisualization = useCallback(() => {
    // Stop animation if playing
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    
    setIsPlaying(false);
    startTimeRef.current = null;
    setTime(0);
  }, [setTime]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, []);
  
  return {
    isPlaying,
    toggleAnimation,
    resetVisualization,
    animationIdRef,
  };
};
