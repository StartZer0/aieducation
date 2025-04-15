
import { useState, useRef, useCallback, RefObject, useEffect } from 'react';

interface FairgroundVehicleAnimationConfig {
  mass: number;
  initialSpeed: number;
  height: number;
  distance: number;
  finalSpeed: number;
  gravity: number;
  vehicleRef: RefObject<HTMLDivElement>;
  trackRef: RefObject<HTMLDivElement>;
  heightMarkerRef: RefObject<HTMLDivElement>;
  heightLabelRef: RefObject<HTMLDivElement>;
  velocityVectorRef: RefObject<HTMLDivElement>;
  potentialEnergyRef: RefObject<HTMLDivElement>;
  kineticEnergyRef: RefObject<HTMLDivElement>;
  lostEnergyRef: RefObject<HTMLDivElement>;
  visualizationRef: RefObject<HTMLDivElement>;
}

export function useFairgroundVehicleAnimation({
  mass,
  initialSpeed,
  height,
  distance,
  finalSpeed,
  gravity,
  vehicleRef,
  trackRef,
  heightMarkerRef,
  heightLabelRef,
  velocityVectorRef,
  potentialEnergyRef,
  kineticEnergyRef,
  lostEnergyRef,
  visualizationRef
}: FairgroundVehicleAnimationConfig) {
  const [vehiclePosition, setVehiclePosition] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Animation refs
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);

  // Initialize visualization
  const initVisualization = useCallback(() => {
    if (!visualizationRef.current || !vehicleRef.current || !trackRef.current || 
        !heightMarkerRef.current || !heightLabelRef.current || 
        !velocityVectorRef.current || !potentialEnergyRef.current || 
        !kineticEnergyRef.current || !lostEnergyRef.current) return;
    
    const visHeight = visualizationRef.current.clientHeight;
    const visWidth = visualizationRef.current.clientWidth;
    
    // Create curved track appearance
    const createTrackCurve = () => {
      // Remove any existing track curve
      const oldTrack = visualizationRef.current?.querySelector('.track-curve');
      if (oldTrack) {
        oldTrack.remove();
      }
      
      // Create track element
      const trackCurve = document.createElement('div');
      trackCurve.className = 'track-curve';
      trackCurve.style.position = 'absolute';
      trackCurve.style.left = '0';
      trackCurve.style.right = '0';
      trackCurve.style.bottom = '0';
      trackCurve.style.height = `${visHeight}px`;
      trackCurve.style.background = `
        radial-gradient(
          circle at 50% bottom,
          transparent 0%,
          transparent ${visHeight - height - 5}px,
          #7f8c8d ${visHeight - height - 3}px,
          #7f8c8d ${visHeight - height + 3}px,
          transparent ${visHeight - height + 5}px,
          transparent 100%
        )
      `;
      
      visualizationRef.current?.appendChild(trackCurve);
    };
    
    createTrackCurve();
    
    // Position track
    trackRef.current.style.height = '5px';
    trackRef.current.style.bottom = '0px';
    
    // Initial vehicle position
    vehicleRef.current.style.left = '50px';
    vehicleRef.current.style.bottom = `${height + 5}px`;
    
    // Height marker
    heightMarkerRef.current.style.left = '30px';
    heightMarkerRef.current.style.bottom = '5px';
    heightMarkerRef.current.style.height = `${height}px`;
    
    // Height label
    heightLabelRef.current.style.left = '10px';
    heightLabelRef.current.style.bottom = `${height / 2}px`;
    heightLabelRef.current.textContent = `h = ${height} m`;
    
    // Velocity vector
    velocityVectorRef.current.style.opacity = '1';
    velocityVectorRef.current.style.width = '20px';
    velocityVectorRef.current.style.left = '70px';
    velocityVectorRef.current.style.bottom = `${height + 10}px`;
    velocityVectorRef.current.style.transform = 'rotate(0deg)';
    
    // Calculate energy values
    const initialKineticEnergy = 0.5 * mass * initialSpeed * initialSpeed;
    const potentialEnergyLoss = mass * gravity * height;
    const finalKineticEnergy = 0.5 * mass * finalSpeed * finalSpeed;
    const workAgainstFriction = initialKineticEnergy + potentialEnergyLoss - finalKineticEnergy;
    
    // Update energy bars
    const totalInitialEnergy = initialKineticEnergy + potentialEnergyLoss;
    potentialEnergyRef.current.style.width = `${potentialEnergyLoss / totalInitialEnergy * 100}%`;
    kineticEnergyRef.current.style.width = `${initialKineticEnergy / totalInitialEnergy * 100}%`;
    lostEnergyRef.current.style.width = '0%';
    
    // Reset animation state
    positionRef.current = 0;
    setVehiclePosition(0);
  }, [mass, initialSpeed, height, distance, finalSpeed, gravity, 
      vehicleRef, trackRef, heightMarkerRef, heightLabelRef, 
      velocityVectorRef, potentialEnergyRef, kineticEnergyRef, lostEnergyRef, visualizationRef]);

  // Animate vehicle with timestamp-based animation
  const animateVehicle = useCallback((timestamp: number) => {
    if (!vehicleRef.current || !velocityVectorRef.current || !potentialEnergyRef.current || 
        !kineticEnergyRef.current || !lostEnergyRef.current || !visualizationRef.current || 
        !heightMarkerRef.current || !heightLabelRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateVehicle);
      return;
    }
    
    // Initialize timestamp on first frame
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animateVehicle);
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
    const visWidth = visualizationRef.current.clientWidth;
    const startX = 50;
    const endX = visWidth - 50;
    const currentX = startX + newPos * (endX - startX);
    
    // Use a smooth curve for height transition - sine wave for smooth descent
    const heightProgress = 0.5 - 0.5 * Math.cos(Math.PI * newPos);
    const currentHeight = height * (1 - heightProgress);
    
    // Update vehicle position
    vehicleRef.current.style.left = `${currentX}px`;
    vehicleRef.current.style.bottom = `${currentHeight + 5}px`;
    
    // Calculate current energy values
    const initialKineticEnergy = 0.5 * mass * initialSpeed * initialSpeed;
    const potentialEnergyLoss = mass * gravity * height;
    const totalInitialEnergy = initialKineticEnergy + potentialEnergyLoss;
    
    // Calculate current energy distribution
    const potentialEnergyUsed = mass * gravity * height * heightProgress;
    const remainingPotentialEnergy = mass * gravity * height - potentialEnergyUsed;
    
    // Calculate friction work - assuming linear energy loss
    const totalFrictionWork = initialKineticEnergy + potentialEnergyLoss - 0.5 * mass * finalSpeed * finalSpeed;
    const currentFrictionWork = totalFrictionWork * newPos;
    
    // Available energy = Initial KE + Used PE - Friction work
    const availableEnergy = initialKineticEnergy + potentialEnergyUsed - currentFrictionWork;
    
    // Current speed based on energy
    const currentSpeed = Math.sqrt(2 * availableEnergy / mass);
    
    // Update energy bars
    potentialEnergyRef.current.style.width = `${remainingPotentialEnergy / totalInitialEnergy * 100}%`;
    kineticEnergyRef.current.style.width = `${availableEnergy / totalInitialEnergy * 100}%`;
    lostEnergyRef.current.style.width = `${currentFrictionWork / totalInitialEnergy * 100}%`;
    
    // Update velocity vector
    const maxSpeed = Math.max(initialSpeed, finalSpeed);
    const vectorLength = (currentSpeed / maxSpeed) * 50;
    velocityVectorRef.current.style.width = `${vectorLength}px`;
    velocityVectorRef.current.style.left = `${currentX + 20}px`;
    velocityVectorRef.current.style.bottom = `${currentHeight + 10}px`;
    
    // Update height marker and label
    heightMarkerRef.current.style.height = `${currentHeight}px`;
    heightLabelRef.current.style.bottom = `${currentHeight / 2}px`;
    heightLabelRef.current.textContent = `h = ${currentHeight.toFixed(1)} m`;
    
    // Update ref for next frame
    positionRef.current = newPos;
    
    // Update React state less frequently to reduce renders
    if (Math.abs(newPos - vehiclePosition) > 0.01) {
      setVehiclePosition(newPos);
    }
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateVehicle);
  }, [mass, initialSpeed, height, finalSpeed, gravity, 
      vehicleRef, velocityVectorRef, heightMarkerRef, heightLabelRef, 
      potentialEnergyRef, kineticEnergyRef, lostEnergyRef, visualizationRef,
      vehiclePosition]);

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
      animationFrameRef.current = requestAnimationFrame(animateVehicle);
    }
  }, [isAnimating, animateVehicle]);

  // Reset simulation
  const resetAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    lastTimestampRef.current = null;
    setIsAnimating(false);
    positionRef.current = 0;
    setVehiclePosition(0);
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

  // Initialize on mount and when parameters change
  useEffect(() => {
    initVisualization();
  }, [initVisualization]);

  return {
    vehiclePosition,
    isAnimating,
    toggleAnimation,
    resetAnimation,
    initVisualization,
    cleanup
  };
}
