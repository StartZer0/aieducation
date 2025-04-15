
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Problem2Props {
  initialVelocity: number;
  mass: number;
  maxHeight: number;
  resistance: number;
  setInitialVelocity: (velocity: number) => void;
  setMass: (mass: number) => void;
  setMaxHeight: (height: number) => void;
  setResistance: (resistance: number) => void;
  objectPosition: number;
  setObjectPosition: (position: number) => void;
  objectDirection: number;
  setObjectDirection: (direction: number) => void;
  animationId: number | null;
  setAnimationId: (id: number | null) => void;
}

const Problem2UpwardProjection: React.FC<Problem2Props> = ({
  initialVelocity,
  mass,
  maxHeight,
  resistance,
  setInitialVelocity,
  setMass,
  setMaxHeight,
  setResistance,
  objectPosition,
  setObjectPosition,
  objectDirection,
  setObjectDirection,
  animationId,
  setAnimationId
}) => {
  // Constants
  const GRAVITY = 9.81;
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Refs
  const visualization2Ref = useRef<HTMLDivElement>(null);
  const object2Ref = useRef<HTMLDivElement>(null);
  const ground2Ref = useRef<HTMLDivElement>(null);
  const trajectory2Ref = useRef<HTMLDivElement>(null);
  const heightMarker2Ref = useRef<HTMLDivElement>(null);
  const heightLabel2Ref = useRef<HTMLDivElement>(null);
  const velocityVector2Ref = useRef<HTMLDivElement>(null);
  const potentialEnergy2Ref = useRef<HTMLDivElement>(null);
  const kineticEnergy2Ref = useRef<HTMLDivElement>(null);
  const lostEnergy2Ref = useRef<HTMLDivElement>(null);
  const totalEnergy2Ref = useRef<HTMLDivElement>(null);
  const initialEnergy2Ref = useRef<HTMLSpanElement>(null);
  const theoreticalHeight2Ref = useRef<HTMLSpanElement>(null);
  const actualHeight2Ref = useRef<HTMLSpanElement>(null);
  const energyLoss2Ref = useRef<HTMLSpanElement>(null);

  // Initialize visualization
  const initVisualization = useCallback(() => {
    if (!visualization2Ref.current || !object2Ref.current || !ground2Ref.current || 
        !trajectory2Ref.current || !heightMarker2Ref.current || !heightLabel2Ref.current || 
        !velocityVector2Ref.current || !potentialEnergy2Ref.current || 
        !kineticEnergy2Ref.current || !lostEnergy2Ref.current || !totalEnergy2Ref.current) return;
    
    const visHeight = visualization2Ref.current.clientHeight;
    const visWidth = visualization2Ref.current.clientWidth;
    
    // Position elements
    ground2Ref.current.style.bottom = '0px';
    
    // Initial object position
    object2Ref.current.style.bottom = '10px';
    object2Ref.current.style.left = (visWidth / 2 - 10) + 'px';
    
    // Theoretical max height without resistance
    const theoreticalMaxHeight = initialVelocity * initialVelocity / (2 * GRAVITY);
    
    // Determine scale based on max height
    const pixelsPerMeter = (visHeight - 50) / Math.max(theoreticalMaxHeight, maxHeight);
    
    // Trajectory
    trajectory2Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    trajectory2Ref.current.style.width = '100px';
    trajectory2Ref.current.style.bottom = '10px';
    trajectory2Ref.current.style.height = (maxHeight * pixelsPerMeter) + 'px';
    
    // Height marker
    heightMarker2Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    heightMarker2Ref.current.style.bottom = '10px';
    heightMarker2Ref.current.style.height = '0px';
    
    // Height label
    heightLabel2Ref.current.style.left = (visWidth / 2 - 90) + 'px';
    heightLabel2Ref.current.style.bottom = '15px';
    heightLabel2Ref.current.textContent = 'h = 0 m';
    
    // Velocity vector - initially pointing up
    velocityVector2Ref.current.style.opacity = '1';
    velocityVector2Ref.current.style.width = '30px';
    velocityVector2Ref.current.style.left = (visWidth / 2 + 15) + 'px';
    velocityVector2Ref.current.style.bottom = '20px';
    velocityVector2Ref.current.style.transform = 'rotate(-90deg)';
    
    // Energy values
    const initialKE = 0.5 * mass * initialVelocity * initialVelocity;
    const maxPE = mass * GRAVITY * maxHeight;
    const energyLoss = initialKE - maxPE;
    
    // Update energy bars
    totalEnergy2Ref.current.style.width = '100%';
    kineticEnergy2Ref.current.style.width = '100%';
    potentialEnergy2Ref.current.style.width = '0%';
    lostEnergy2Ref.current.style.width = '0%';
    
    // Update results
    if (initialEnergy2Ref.current) initialEnergy2Ref.current.textContent = initialKE.toFixed(2);
    if (theoreticalHeight2Ref.current) theoreticalHeight2Ref.current.textContent = theoreticalMaxHeight.toFixed(2);
    if (actualHeight2Ref.current) actualHeight2Ref.current.textContent = maxHeight.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
    
    setObjectPosition(0);
    setObjectDirection(1);
  }, [initialVelocity, mass, maxHeight, setObjectPosition, setObjectDirection, GRAVITY]);

  // Animate object
  const animateObject = useCallback(() => {
    if (!object2Ref.current || !velocityVector2Ref.current || !potentialEnergy2Ref.current || 
        !kineticEnergy2Ref.current || !lostEnergy2Ref.current || !visualization2Ref.current || 
        !heightMarker2Ref.current || !heightLabel2Ref.current) {
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
    const visHeight = visualization2Ref.current.clientHeight;
    const pixelsPerMeter = (visHeight - 50) / maxHeight;
    const objectY = 10 + currentHeight * pixelsPerMeter;
    
    // Update object position
    object2Ref.current.style.bottom = objectY + 'px';
    
    // Update height marker
    heightMarker2Ref.current.style.height = objectY + 'px';
    heightLabel2Ref.current.style.bottom = (objectY / 2) + 'px';
    heightLabel2Ref.current.textContent = `h = ${currentHeight.toFixed(1)} m`;
    
    // Calculate current energy values
    const initialKE = 0.5 * mass * initialVelocity * initialVelocity;
    const potential = mass * GRAVITY * currentHeight;
    
    // Calculate how much energy has been lost so far
    // More loss as we get closer to the peak
    const peakRatio = newPos <= 1 ? newPos : 2 - newPos;
    const lossRatio = Math.pow(peakRatio, resistance); // More loss with higher resistance
    
    const totalLoss = initialKE - mass * GRAVITY * maxHeight;
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
    potentialEnergy2Ref.current.style.width = (potential / total * 100) + '%';
    kineticEnergy2Ref.current.style.width = (kinetic / total * 100) + '%';
    lostEnergy2Ref.current.style.width = (currentLoss / total * 100) + '%';
    
    // Update velocity vector
    const absVelocity = Math.abs(currentVelocity);
    const maxVelocity = initialVelocity;
    const vectorLength = (absVelocity / maxVelocity) * 40;
    
    velocityVector2Ref.current.style.opacity = absVelocity > 0.5 ? '1' : '0';
    velocityVector2Ref.current.style.width = vectorLength + 'px';
    velocityVector2Ref.current.style.left = object2Ref.current.offsetLeft + (newDirection === 1 ? 15 : -vectorLength) + 'px';
    velocityVector2Ref.current.style.bottom = objectY + 'px';
    velocityVector2Ref.current.style.transform = `rotate(${newDirection === 1 ? -90 : 90}deg)`;
    
    // Update state for next frame
    setObjectPosition(newPos);
    setObjectDirection(newDirection);
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateObject);
  }, [objectPosition, objectDirection, initialVelocity, mass, maxHeight, resistance, setObjectPosition, setObjectDirection, GRAVITY]);

  // Start/pause simulation
  const toggleAnimation = () => {
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
  };

  // Reset simulation
  const resetSimulation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setIsAnimating(false);
    initVisualization();
  };

  // Event handlers for inputs
  const handleInitialVelocityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVelocity = parseFloat(e.target.value);
    setInitialVelocity(newVelocity);
    
    // Update results
    const initialKE = 0.5 * mass * newVelocity * newVelocity;
    const theoreticalMaxHeight = newVelocity * newVelocity / (2 * GRAVITY);
    const maxPE = mass * GRAVITY * maxHeight;
    const energyLoss = initialKE - maxPE;
    
    if (initialEnergy2Ref.current) initialEnergy2Ref.current.textContent = initialKE.toFixed(2);
    if (theoreticalHeight2Ref.current) theoreticalHeight2Ref.current.textContent = theoreticalMaxHeight.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
    
    // Cap actual max height based on theoretical
    if (maxHeight > theoreticalMaxHeight) {
      setMaxHeight(theoreticalMaxHeight);
      if (actualHeight2Ref.current) actualHeight2Ref.current.textContent = theoreticalMaxHeight.toFixed(2);
    }
    
    // Update visualization if not animating
    if (!isAnimating) {
      initVisualization();
    }
  };

  const handleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMass = parseFloat(e.target.value);
    setMass(newMass);
    
    // Update results
    const initialKE = 0.5 * newMass * initialVelocity * initialVelocity;
    const maxPE = newMass * GRAVITY * maxHeight;
    const energyLoss = initialKE - maxPE;
    
    if (initialEnergy2Ref.current) initialEnergy2Ref.current.textContent = initialKE.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
  };

  const handleMaxHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxHeight = parseFloat(e.target.value);
    
    // Theoretical max height without resistance
    const theoreticalMaxHeight = initialVelocity * initialVelocity / (2 * GRAVITY);
    
    // Ensure max height doesn't exceed theoretical max
    const cappedHeight = Math.min(newMaxHeight, theoreticalMaxHeight);
    setMaxHeight(cappedHeight);
    
    // Update results
    const initialKE = 0.5 * mass * initialVelocity * initialVelocity;
    const maxPE = mass * GRAVITY * cappedHeight;
    const energyLoss = initialKE - maxPE;
    
    if (actualHeight2Ref.current) actualHeight2Ref.current.textContent = cappedHeight.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
    
    // Update visualization if not animating
    if (!isAnimating) {
      initVisualization();
    }
  };

  const handleResistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResistance = parseInt(e.target.value);
    setResistance(newResistance);
  };

  // Initialize visualization on mount
  useEffect(() => {
    initVisualization();
    
    // Cleanup animation on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initVisualization]);

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
        <p>An object of mass <strong>0.75 kg</strong> is projected vertically upwards with a velocity of <strong>12 m s<sup>-1</sup></strong>. If it reaches a height of <strong>6.75 m</strong>, calculate the energy loss caused by air resistance (Take g = 9.81 m s<sup>-2</sup>).</p>
      </div>
      
      <div 
        ref={visualization2Ref}
        className="relative h-[400px] border border-gray-300 mb-4 overflow-hidden bg-gray-50"
      >
        <div ref={ground2Ref} className="ground absolute left-0 right-0 bottom-0 h-[10px] bg-gray-500"></div>
        <div ref={object2Ref} className="object absolute w-[20px] h-[20px] rounded-full bg-red-500"></div>
        <div ref={trajectory2Ref} className="trajectory absolute border-t border-dashed border-gray-400"></div>
        <div ref={heightMarker2Ref} className="height-marker absolute border-l border-dashed border-gray-400"></div>
        <div ref={heightLabel2Ref} className="height-label absolute text-xs text-gray-500"></div>
        <div ref={velocityVector2Ref} className="velocity-vector absolute h-[2px] bg-red-500 transform-origin-left-center"></div>
        
        <div className="energy-bar-container absolute top-[20px] right-[20px] w-[150px] h-[300px] border border-gray-300 bg-white p-[10px]">
          <div className="energy-label text-xs mb-[2px]">Potential Energy</div>
          <div ref={potentialEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-green-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Kinetic Energy</div>
          <div ref={kineticEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-red-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Lost Energy</div>
          <div ref={lostEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-orange-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Total Energy</div>
          <div ref={totalEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-purple-500 transition-width duration-300"></div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <div className="mb-3">
            <label htmlFor="initialVelocity2" className="block mb-1">Initial Velocity (m/s): <span>{initialVelocity.toFixed(1)}</span></label>
            <input 
              type="range" 
              id="initialVelocity2" 
              min="5" 
              max="20" 
              step="0.5" 
              value={initialVelocity}
              onChange={handleInitialVelocityChange}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mass2" className="block mb-1">Mass (kg): <span>{mass.toFixed(2)}</span></label>
            <input 
              type="range" 
              id="mass2" 
              min="0.1" 
              max="2" 
              step="0.05" 
              value={mass}
              onChange={handleMassChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="mb-3">
            <label htmlFor="maxHeight2" className="block mb-1">Actual Max Height (m): <span>{maxHeight.toFixed(2)}</span></label>
            <input 
              type="range" 
              id="maxHeight2" 
              min="1" 
              max="10" 
              step="0.25" 
              value={maxHeight}
              onChange={handleMaxHeightChange}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resistance2" className="block mb-1">Air Resistance: <span>
              {resistance === 1 ? 'Low' : resistance === 2 ? 'Medium' : 'High'}
            </span></label>
            <input 
              type="range" 
              id="resistance2" 
              min="1" 
              max="3" 
              step="1" 
              value={resistance}
              onChange={handleResistanceChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <button 
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={toggleAnimation}
        >
          {isAnimating ? "Pause Simulation" : "Start Simulation"}
        </button>
        <button 
          className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          onClick={resetSimulation}
        >
          Reset
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded">
        <div className="mb-4">
          <div className="bg-gray-200 p-2 rounded mb-2 font-mono text-sm">
            Initial Kinetic Energy = ½mv²<br />
            Maximum Potential Energy without losses = mgh<br />
            Energy loss = Initial Energy - Maximum Potential Energy
          </div>
          <div>
            <p>Initial kinetic energy: <span ref={initialEnergy2Ref}>0.00</span> J</p>
            <p>Maximum height without resistance: <span ref={theoreticalHeight2Ref}>0.00</span> m</p>
            <p>Actual maximum height: <span ref={actualHeight2Ref}>0.00</span> m</p>
            <p>Energy loss due to air resistance: <span ref={energyLoss2Ref} className="text-red-600 font-bold">0.00</span> J</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem2UpwardProjection;
