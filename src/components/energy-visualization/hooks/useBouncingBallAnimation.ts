
import { useState, useRef, useCallback, RefObject, useEffect } from 'react';

interface BouncingBallAnimationConfig {
  initialHeight: number;
  reboundHeight: number;
  mass: number;
  gravity: number;
  ballRef: RefObject<HTMLDivElement>;
  tableRef: RefObject<HTMLDivElement>;
  heightMarkerRef: RefObject<HTMLDivElement>;
  heightLabelRef: RefObject<HTMLDivElement>;
  velocityVectorRef: RefObject<HTMLDivElement>;
  potentialEnergyRef: RefObject<HTMLDivElement>;
  kineticEnergyRef: RefObject<HTMLDivElement>;
  lostEnergyRef: RefObject<HTMLDivElement>;
  visualizationRef: RefObject<HTMLDivElement>;
  energyLostRef?: RefObject<HTMLSpanElement>;
  kineticBeforeImpactRef?: RefObject<HTMLSpanElement>;
  velocityBeforeImpactRef?: RefObject<HTMLSpanElement>;
  energyGainedRef?: RefObject<HTMLSpanElement>;
  reboundVelocityRef?: RefObject<HTMLSpanElement>;
}

export function useBouncingBallAnimation({
  initialHeight,
  reboundHeight,
  mass,
  gravity,
  ballRef,
  tableRef,
  heightMarkerRef,
  heightLabelRef,
  velocityVectorRef,
  potentialEnergyRef,
  kineticEnergyRef,
  lostEnergyRef,
  visualizationRef,
  energyLostRef,
  kineticBeforeImpactRef,
  velocityBeforeImpactRef,
  energyGainedRef,
  reboundVelocityRef
}: BouncingBallAnimationConfig) {
  const [ballPosition, setBallPosition] = useState<number>(0);
  const [ballDirection, setBallDirection] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Animation refs
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const directionRef = useRef<number>(1);

  // Initialize visualization
  const initVisualization = useCallback(() => {
    if (!visualizationRef.current || !ballRef.current || !tableRef.current || 
        !heightMarkerRef.current || !heightLabelRef.current || !velocityVectorRef.current || 
        !potentialEnergyRef.current || !kineticEnergyRef.current || 
        !lostEnergyRef.current) return;
    
    const visHeight = visualizationRef.current.clientHeight;
    const visWidth = visualizationRef.current.clientWidth;
    
    // Position elements
    const tableY = visHeight - 50;
    tableRef.current.style.top = tableY + 'px';
    
    // Initial ball position
    const pixelsPerMeter = (tableY - 50) / Math.max(initialHeight, reboundHeight);
    const initialY = tableY - initialHeight * pixelsPerMeter;
    
    ballRef.current.style.top = initialY + 'px';
    ballRef.current.style.left = (visWidth / 2 - 10) + 'px';
    
    // Height marker
    heightMarkerRef.current.style.left = (visWidth / 2 - 50) + 'px';
    heightMarkerRef.current.style.top = initialY + 'px';
    heightMarkerRef.current.style.height = (tableY - initialY) + 'px';
    
    // Height label
    heightLabelRef.current.style.left = (visWidth / 2 - 90) + 'px';
    heightLabelRef.current.style.top = (initialY + (tableY - initialY) / 2) + 'px';
    heightLabelRef.current.textContent = `h = ${initialHeight.toFixed(1)} m`;
    
    // Velocity vector - initially hidden
    velocityVectorRef.current.style.opacity = '0';
    
    // Calculate energy values
    const initialPE = mass * gravity * initialHeight;
    const impactKE = initialPE; // Conservation of energy
    const reboundPE = mass * gravity * reboundHeight;
    
    // Calculate velocities
    const impactVelocity = Math.sqrt(2 * gravity * initialHeight);
    const reboundVelocity = Math.sqrt(2 * gravity * reboundHeight);
    
    // Update energy bars
    potentialEnergyRef.current.style.width = '100%';
    kineticEnergyRef.current.style.width = '0%';
    lostEnergyRef.current.style.width = '0%';
    
    // Update results
    if (energyLostRef?.current) energyLostRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (kineticBeforeImpactRef?.current) kineticBeforeImpactRef.current.textContent = impactKE.toFixed(4);
    if (velocityBeforeImpactRef?.current) velocityBeforeImpactRef.current.textContent = impactVelocity.toFixed(2);
    if (energyGainedRef?.current) energyGainedRef.current.textContent = reboundPE.toFixed(4);
    if (reboundVelocityRef?.current) reboundVelocityRef.current.textContent = reboundVelocity.toFixed(2);
    
    // Reset animation state
    positionRef.current = 0;
    directionRef.current = 1;
    setBallPosition(0);
    setBallDirection(1);
  }, [initialHeight, reboundHeight, mass, gravity, ballRef, tableRef, heightMarkerRef, heightLabelRef, 
      velocityVectorRef, potentialEnergyRef, kineticEnergyRef, lostEnergyRef, visualizationRef,
      energyLostRef, kineticBeforeImpactRef, velocityBeforeImpactRef, energyGainedRef, reboundVelocityRef]);

  // Animate ball with timestamp-based animation
  const animateBall = useCallback((timestamp: number) => {
    if (!ballRef.current || !velocityVectorRef.current || !potentialEnergyRef.current || 
        !kineticEnergyRef.current || !lostEnergyRef.current || !visualizationRef.current || 
        !heightMarkerRef.current || !heightLabelRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateBall);
      return;
    }
    
    // Initialize timestamp on first frame
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animateBall);
      return;
    }
    
    // Get current position and direction from refs
    let currentPos = positionRef.current;
    let currentDirection = directionRef.current;
    
    // Check if animation is complete
    if (currentPos >= 3) {
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
    const speedFactor = 0.7;
    let newPos = currentPos + speedFactor * deltaTime;
    
    // Handle direction changes
    let newDirection = currentDirection;
    if (newPos >= 1 && newPos < 1.05 && currentDirection === 1) {
      // Impact
      newDirection = -1; // Change direction to up
    } else if (newPos >= 2 && currentDirection === -1) {
      // Peak of rebound
      newDirection = 1; // Change direction to down
    }
    
    // Calculate current height
    let currentHeight;
    if (newPos < 1) {
      // Initial fall
      currentHeight = initialHeight * (1 - newPos);
    } else if (newPos < 2) {
      // Rebound up
      currentHeight = reboundHeight * (newPos - 1);
    } else {
      // Rebound down
      currentHeight = reboundHeight * (3 - newPos);
    }
    
    // Calculate visual position
    const visHeight = visualizationRef.current.clientHeight;
    const tableY = visHeight - 50;
    const pixelsPerMeter = (tableY - 50) / Math.max(initialHeight, reboundHeight);
    const ballY = tableY - currentHeight * pixelsPerMeter;
    
    // Update ball position
    ballRef.current.style.top = ballY + 'px';
    
    // Update height marker
    heightMarkerRef.current.style.top = ballY + 'px';
    heightMarkerRef.current.style.height = (tableY - ballY) + 'px';
    heightLabelRef.current.style.top = (ballY + (tableY - ballY) / 2) + 'px';
    heightLabelRef.current.textContent = `h = ${currentHeight.toFixed(1)} m`;
    
    // Calculate current energy values
    const initialPE = mass * gravity * initialHeight;
    const currentPE = mass * gravity * currentHeight;
    
    // Energy values depend on which phase we're in
    let energyLoss = 0;
    let availableEnergy = initialPE;
    
    if (newPos >= 1) {
      // After impact, some energy is lost
      energyLoss = initialPE - mass * gravity * reboundHeight;
      availableEnergy = initialPE - energyLoss;
    }
    
    const kinetic = availableEnergy - currentPE;
    
    // Calculate current velocity based on kinetic energy
    const currentVelocity = Math.sqrt(2 * kinetic / mass) * (newDirection === 1 ? 1 : -1);
    
    // Update energy bars
    potentialEnergyRef.current.style.width = (currentPE / initialPE * 100) + '%';
    kineticEnergyRef.current.style.width = (kinetic / initialPE * 100) + '%';
    lostEnergyRef.current.style.width = (energyLoss / initialPE * 100) + '%';
    
    // Update velocity vector
    const absVelocity = Math.abs(currentVelocity);
    const maxVelocity = Math.sqrt(2 * gravity * initialHeight);
    const vectorLength = (absVelocity / maxVelocity) * 40;
    
    if (absVelocity > 0.5) {
      velocityVectorRef.current.style.opacity = '1';
      velocityVectorRef.current.style.width = vectorLength + 'px';
      velocityVectorRef.current.style.left = ballRef.current.offsetLeft + 20 + 'px';
      velocityVectorRef.current.style.top = ballY + 'px';
      velocityVectorRef.current.style.transform = `rotate(${newDirection === 1 ? 90 : -90}deg)`;
    } else {
      velocityVectorRef.current.style.opacity = '0';
    }
    
    // Update refs for next frame
    positionRef.current = newPos;
    directionRef.current = newDirection;
    
    // Update React state less frequently to reduce renders
    if (Math.abs(newPos - ballPosition) > 0.01 || newDirection !== ballDirection) {
      setBallPosition(newPos);
      setBallDirection(newDirection);
    }
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateBall);
  }, [initialHeight, reboundHeight, mass, gravity, 
      ballRef, velocityVectorRef, heightMarkerRef, heightLabelRef, 
      potentialEnergyRef, kineticEnergyRef, lostEnergyRef, visualizationRef,
      ballPosition, ballDirection]);

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
      animationFrameRef.current = requestAnimationFrame(animateBall);
    }
  }, [isAnimating, animateBall]);

  // Reset simulation
  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    lastTimestampRef.current = null;
    setIsAnimating(false);
    positionRef.current = 0;
    directionRef.current = 1;
    setBallPosition(0);
    setBallDirection(1);
    initVisualization();
  }, [initVisualization]);

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
    ballPosition,
    ballDirection,
    isAnimating,
    toggleAnimation,
    resetAnimation,
    initVisualization,
    cleanup
  };
}
