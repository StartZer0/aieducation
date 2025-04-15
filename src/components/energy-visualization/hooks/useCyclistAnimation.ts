
import { useState, useEffect, useRef, useCallback } from 'react';

// Define the gravity constant
const GRAVITY = 9.81; // m/s²

interface CyclistAnimationProps {
  mass: number;
  height: number;
  distance: number;
  finalSpeed: number;
  cyclistPosition: number;
  setCyclistPosition: (position: number) => void;
}

export const useCyclistAnimation = ({
  mass,
  height,
  distance,
  finalSpeed,
  cyclistPosition,
  setCyclistPosition
}: CyclistAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const positionRef = useRef<number>(cyclistPosition);

  // Calculate the results
  const potentialEnergyLoss = mass * GRAVITY * height;
  const finalKineticEnergy = 0.5 * mass * finalSpeed * finalSpeed;
  const workAgainstFriction = potentialEnergyLoss - finalKineticEnergy;
  const avgResistiveForce = workAgainstFriction / distance;

  const animateCyclist = useCallback((timestamp: number) => {
    // Initialize timestamp on first frame
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animateCyclist);
      return;
    }

    // Calculate delta time in seconds, capped to prevent large jumps
    const deltaTime = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05);
    lastTimestampRef.current = timestamp;

    // Get current position from ref
    let currentPos = positionRef.current;

    // Calculate new position based on delta time
    const speedFactor = 0.4; // Control animation speed
    const newPos = Math.min(currentPos + speedFactor * deltaTime, 1); // Cap at 1
    
    // Update ref with new value
    positionRef.current = newPos;

    // Update state for UI updates (less frequently than animation frames)
    if (Math.abs(newPos - cyclistPosition) > 0.01) {
      setCyclistPosition(newPos);
    }

    // If animation hasn't completed, continue the loop
    if (newPos < 1) {
      animationFrameRef.current = requestAnimationFrame(animateCyclist);
    } else {
      setIsAnimating(false);
      animationFrameRef.current = null;
      lastTimestampRef.current = null;
    }
  }, [cyclistPosition, setCyclistPosition]);

  const toggleAnimation = useCallback(() => {
    if (isAnimating) {
      // Pause animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastTimestampRef.current = null;
      setIsAnimating(false);
    } else {
      // Start or resume animation
      setIsAnimating(true);
      lastTimestampRef.current = null;
      if (cyclistPosition >= 1) {
        // Reset position if animation has completed
        setCyclistPosition(0);
        positionRef.current = 0;
      }
      animationFrameRef.current = requestAnimationFrame(animateCyclist);
    }
  }, [isAnimating, animateCyclist, cyclistPosition, setCyclistPosition]);

  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsAnimating(false);
    setCyclistPosition(0);
    positionRef.current = 0;
    lastTimestampRef.current = null;
  }, [setCyclistPosition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    isAnimating,
    potentialEnergyLoss,
    finalKineticEnergy,
    workAgainstFriction,
    avgResistiveForce,
    toggleAnimation,
    resetAnimation
  };
};
