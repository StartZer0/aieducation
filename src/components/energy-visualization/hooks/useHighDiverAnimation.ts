
import { useState, useRef, useCallback, RefObject } from 'react';

interface HighDiverAnimationState {
  diverPosition: number;
  isAnimating: boolean;
}

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
  const animationFrameRef = useRef<number | null>(null);

  // Animate diver
  const animateDiver = useCallback(() => {
    if (!diverRef.current || !velocityVectorRef.current || !potentialEnergyRef.current || 
        !kineticEnergyRef.current || !visualizationRef.current) {
      return;
    }
    
    if (diverPosition >= 1) {
      // Animation complete
      cancelAnimationFrame(animationFrameRef.current!);
      animationFrameRef.current = null;
      setIsAnimating(false);
      return;
    }
    
    // Next frame - using a fixed small increment for smooth animation
    const newPos = diverPosition + 0.005;
    
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
    
    // Update position state for next frame
    setDiverPosition(newPos);
    
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
      setIsAnimating(false);
    } else {
      // Start or resume animation
      setIsAnimating(true);
      animationFrameRef.current = requestAnimationFrame(animateDiver);
    }
  }, [isAnimating, animateDiver]);

  // Reset simulation
  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setIsAnimating(false);
    setDiverPosition(0);
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return {
    diverPosition,
    isAnimating,
    toggleAnimation,
    resetAnimation,
    cleanup
  };
}
