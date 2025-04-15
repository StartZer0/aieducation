
import { useState, useRef, useCallback, RefObject, useEffect } from 'react';

interface HighDiverAnimationConfig {
  height: number;
  mass: number;
  gravity: number;
  diverRef: RefObject<HTMLDivElement>;
  velocityVectorRef: RefObject<HTMLDivElement>;
  potentialEnergyRef: RefObject<HTMLDivElement>;
  kineticEnergyRef: RefObject<HTMLDivElement>;
  visualizationRef: RefObject<HTMLDivElement>;
}

export function useHighDiverAnimation({
  height,
  mass,
  gravity,
  diverRef,
  velocityVectorRef,
  potentialEnergyRef,
  kineticEnergyRef,
  visualizationRef
}: HighDiverAnimationConfig) {
  const [diverPosition, setDiverPosition] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Animation refs
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);

  // Animate diver with timestamp-based animation
  const animateDiver = useCallback((timestamp: number) => {
    if (!diverRef.current || !velocityVectorRef.current || !potentialEnergyRef.current || 
        !kineticEnergyRef.current || !visualizationRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateDiver);
      return;
    }
    
    // Initialize timestamp on first frame
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animateDiver);
      return;
    }
    
    // Get current position from ref
    let currentPos = positionRef.current;
    
    // Check if animation is complete
    if (currentPos >= 1) {
      // Animation complete
      cancelAnimationFrame(animationFrameRef.current!);
      animationFrameRef.current = null;
      lastTimestampRef.current = null;
      setIsAnimating(false);
      return;
    }
    
    // Calculate delta time in seconds, capped to prevent large jumps
    const deltaTime = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05);
    lastTimestampRef.current = timestamp;
    
    // Calculate new position based on delta time, with speed factor
    const speedFactor = 0.5;
    const newPos = Math.min(currentPos + speedFactor * deltaTime, 1);
    
    // Calculate current position
    const visHeight = visualizationRef.current.clientHeight;
    const platformTop = 50;
    const waterTop = visHeight - 80;
    const diverTop = platformTop + newPos * (waterTop - platformTop);
    
    // Update diver position
    diverRef.current.style.top = diverTop + 'px';
    
    // Calculate current energy values
    const currentHeight = height * (1 - newPos);
    const potential = mass * gravity * currentHeight;
    const total = mass * gravity * height;
    const kinetic = total - potential;
    
    // Calculate current velocity
    const currentVelocity = Math.sqrt(2 * gravity * (height - currentHeight));
    
    // Update energy bars
    potentialEnergyRef.current.style.width = (potential / total * 100) + '%';
    kineticEnergyRef.current.style.width = (kinetic / total * 100) + '%';
    
    // Update velocity vector
    if (newPos > 0.1) {
      const maxVelocity = Math.sqrt(2 * gravity * height);
      const vectorLength = (currentVelocity / maxVelocity) * 50;
      
      velocityVectorRef.current.style.opacity = '1';
      velocityVectorRef.current.style.width = vectorLength + 'px';
      velocityVectorRef.current.style.left = (diverRef.current.offsetLeft + 20) + 'px';
      velocityVectorRef.current.style.top = (diverTop + 20) + 'px';
      velocityVectorRef.current.style.transform = 'rotate(90deg)';
    }
    
    // Update ref for next frame
    positionRef.current = newPos;
    
    // Update React state less frequently to reduce renders
    if (Math.abs(newPos - diverPosition) > 0.01) {
      setDiverPosition(newPos);
    }
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateDiver);
  }, [diverPosition, height, mass, gravity, diverRef, velocityVectorRef, potentialEnergyRef, kineticEnergyRef, visualizationRef]);

  // Start/pause simulation
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
      animationFrameRef.current = requestAnimationFrame(animateDiver);
    }
  }, [isAnimating, animateDiver]);

  // Reset simulation
  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    lastTimestampRef.current = null;
    setIsAnimating(false);
    positionRef.current = 0;
    setDiverPosition(0);
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    lastTimestampRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    diverPosition,
    isAnimating,
    toggleAnimation,
    resetAnimation,
    cleanup
  };
}
