
import { useState, useRef, useCallback, RefObject } from 'react';

interface UpwardProjectionAnimationState {
  objectPosition: number;
  objectDirection: number;
  isAnimating: boolean;
}

interface UpwardProjectionAnimationConfig {
  initialVelocity: number;
  mass: number;
  maxHeight: number;
  resistance: number;
  gravity: number;
  objectRef: RefObject<HTMLDivElement>;
  velocityVectorRef: RefObject<HTMLDivElement>;
  heightMarkerRef: RefObject<HTMLDivElement>;
  heightLabelRef: RefObject<HTMLDivElement>;
  potentialEnergyRef: RefObject<HTMLDivElement>;
  kineticEnergyRef: RefObject<HTMLDivElement>;
  lostEnergyRef: RefObject<HTMLDivElement>;
  visualizationRef: RefObject<HTMLDivElement>;
}

export function useUpwardProjectionAnimation({
  initialVelocity,
  mass,
  maxHeight,
  resistance,
  gravity,
  objectRef,
  velocityVectorRef,
  heightMarkerRef,
  heightLabelRef,
  potentialEnergyRef,
  kineticEnergyRef,
  lostEnergyRef,
  visualizationRef
}: UpwardProjectionAnimationConfig) {
  const [objectPosition, setObjectPosition] = useState<number>(0);
  const [objectDirection, setObjectDirection] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  // Animate object
  const animateObject = useCallback(() => {
    if (!objectRef.current || !velocityVectorRef.current || !potentialEnergyRef.current || 
        !kineticEnergyRef.current || !lostEnergyRef.current || !visualizationRef.current || 
        !heightMarkerRef.current || !heightLabelRef.current) {
      return;
    }
    
    if (objectPosition >= 2) {
      // Animation complete
      cancelAnimationFrame(animationFrameRef.current!);
      animationFrameRef.current = null;
      setIsAnimating(false);
      return;
    }
    
    // Next frame - using a small fixed increment for smooth animation
    const deltaPosition = 0.005 * (objectPosition < 1 ? 1 : 1.5); // Move faster on the way down
    const newPos = objectPosition + deltaPosition;
    
    // Check for direction change at max height
    let newDirection = objectDirection;
    if (newPos >= 1 && objectDirection === 1) {
      newDirection = -1; // Change direction to down
    }
    
    // Calculate current height
    let currentHeight;
    if (newPos <= 1) {
      // Going up
      currentHeight = maxHeight * newPos;
    } else {
      // Coming down
      currentHeight = maxHeight * (2 - newPos);
    }
    
    // Calculate visual position
    const visHeight = visualizationRef.current.clientHeight;
    const pixelsPerMeter = (visHeight - 50) / maxHeight;
    const objectY = 10 + currentHeight * pixelsPerMeter;
    
    // Update object position
    objectRef.current.style.bottom = objectY + 'px';
    
    // Update height marker
    heightMarkerRef.current.style.height = objectY + 'px';
    heightLabelRef.current.style.bottom = (objectY / 2) + 'px';
    heightLabelRef.current.textContent = `h = ${currentHeight.toFixed(1)} m`;
    
    // Calculate current energy values
    const initialKE = 0.5 * mass * initialVelocity * initialVelocity;
    const potential = mass * gravity * currentHeight;
    
    // Calculate how much energy has been lost so far
    // More loss as we get closer to the peak
    const peakRatio = newPos <= 1 ? newPos : 2 - newPos;
    const lossRatio = Math.pow(peakRatio, resistance); // More loss with higher resistance
    
    const totalLoss = initialKE - mass * gravity * maxHeight;
    const currentLoss = totalLoss * lossRatio;
    
    // Remaining energy is distributed between potential and kinetic
    const total = initialKE;
    const available = total - currentLoss;
    const kinetic = available - potential;
    
    // Calculate current velocity based on kinetic energy
    let currentVelocity = Math.sqrt(2 * kinetic / mass) * (newDirection === 1 ? 1 : -1);
    if (newPos > 0.98 && newPos < 1.02) {
      currentVelocity = 0; // Exactly at the peak
    }
    
    // Update energy bars
    potentialEnergyRef.current.style.width = (potential / total * 100) + '%';
    kineticEnergyRef.current.style.width = (kinetic / total * 100) + '%';
    lostEnergyRef.current.style.width = (currentLoss / total * 100) + '%';
    
    // Update velocity vector
    const absVelocity = Math.abs(currentVelocity);
    const maxVelocity = initialVelocity;
    const vectorLength = (absVelocity / maxVelocity) * 40;
    
    velocityVectorRef.current.style.opacity = absVelocity > 0.5 ? '1' : '0';
    velocityVectorRef.current.style.width = vectorLength + 'px';
    velocityVectorRef.current.style.left = objectRef.current.offsetLeft + (newDirection === 1 ? 15 : -vectorLength) + 'px';
    velocityVectorRef.current.style.bottom = objectY + 'px';
    velocityVectorRef.current.style.transform = `rotate(${newDirection === 1 ? -90 : 90}deg)`;
    
    // Update state for next frame
    setObjectPosition(newPos);
    setObjectDirection(newDirection);
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateObject);
  }, [objectPosition, objectDirection, initialVelocity, mass, maxHeight, resistance, gravity, 
      objectRef, velocityVectorRef, heightMarkerRef, heightLabelRef, 
      potentialEnergyRef, kineticEnergyRef, lostEnergyRef, visualizationRef]);

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
      animationFrameRef.current = requestAnimationFrame(animateObject);
    }
  }, [isAnimating, animateObject]);

  // Reset simulation
  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setIsAnimating(false);
    setObjectPosition(0);
    setObjectDirection(1);
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return {
    objectPosition,
    objectDirection,
    isAnimating,
    toggleAnimation,
    resetAnimation,
    cleanup
  };
}
