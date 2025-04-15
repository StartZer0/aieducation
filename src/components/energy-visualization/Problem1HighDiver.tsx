
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Problem1Props {
  height: number;
  mass: number;
  setHeight: (height: number) => void;
  setMass: (mass: number) => void;
  animationId: number | null;
  setAnimationId: (id: number | null) => void;
  diverPosition: number;
  setDiverPosition: (position: number) => void;
}

const Problem1HighDiver: React.FC<Problem1Props> = ({
  height,
  mass,
  setHeight,
  setMass,
  animationId,
  setAnimationId,
  diverPosition,
  setDiverPosition
}) => {
  // Constants
  const GRAVITY = 9.81;
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Refs
  const visualization1Ref = useRef<HTMLDivElement>(null);
  const diver1Ref = useRef<HTMLDivElement>(null);
  const platform1Ref = useRef<HTMLDivElement>(null);
  const water1Ref = useRef<HTMLDivElement>(null);
  const heightMarker1Ref = useRef<HTMLDivElement>(null);
  const heightLabel1Ref = useRef<HTMLDivElement>(null);
  const velocityVector1Ref = useRef<HTMLDivElement>(null);
  const potentialEnergy1Ref = useRef<HTMLDivElement>(null);
  const kineticEnergy1Ref = useRef<HTMLDivElement>(null);
  const totalEnergy1Ref = useRef<HTMLDivElement>(null);
  const velocity1Ref = useRef<HTMLSpanElement>(null);
  const initialEnergy1Ref = useRef<HTMLSpanElement>(null);
  const finalEnergy1Ref = useRef<HTMLSpanElement>(null);

  // Initialize visualization
  const initVisualization = useCallback(() => {
    if (!visualization1Ref.current || !diver1Ref.current || !platform1Ref.current || 
        !water1Ref.current || !heightMarker1Ref.current || !heightLabel1Ref.current || 
        !velocityVector1Ref.current || !potentialEnergy1Ref.current || 
        !kineticEnergy1Ref.current || !totalEnergy1Ref.current) return;
    
    const visHeight = visualization1Ref.current.clientHeight;
    const visWidth = visualization1Ref.current.clientWidth;
    
    // Position elements
    water1Ref.current.style.height = '80px';
    
    // Platform position
    const platformTop = 50;
    platform1Ref.current.style.top = platformTop + 'px';
    platform1Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    
    // Initial diver position
    diver1Ref.current.style.top = platformTop + 'px';
    diver1Ref.current.style.left = (visWidth / 2 - 10) + 'px';
    
    // Height marker
    const waterTop = visHeight - 80;
    const pixelsPerMeter = (waterTop - platformTop) / height;
    
    heightMarker1Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    heightMarker1Ref.current.style.top = platformTop + 'px';
    heightMarker1Ref.current.style.height = (waterTop - platformTop) + 'px';
    
    heightLabel1Ref.current.style.left = (visWidth / 2 - 90) + 'px';
    heightLabel1Ref.current.style.top = (platformTop + (waterTop - platformTop) / 2) + 'px';
    heightLabel1Ref.current.textContent = `h = ${height.toFixed(1)} m`;
    
    // Velocity vector - initially hidden
    velocityVector1Ref.current.style.opacity = '0';
    
    // Calculate energy values
    const potential = mass * GRAVITY * height;
    
    // Update energy bars
    totalEnergy1Ref.current.style.width = '100%';
    potentialEnergy1Ref.current.style.width = '100%';
    kineticEnergy1Ref.current.style.width = '0%';
    
    // Update results
    const impactVelocity = Math.sqrt(2 * GRAVITY * height);
    if (velocity1Ref.current) velocity1Ref.current.textContent = impactVelocity.toFixed(2);
    if (initialEnergy1Ref.current) initialEnergy1Ref.current.textContent = potential.toFixed(2);
    if (finalEnergy1Ref.current) finalEnergy1Ref.current.textContent = potential.toFixed(2);
    
    setDiverPosition(0);
  }, [height, mass, setDiverPosition, GRAVITY]);

  // Animate diver
  const animateDiver = useCallback(() => {
    if (!diver1Ref.current || !velocityVector1Ref.current || !potentialEnergy1Ref.current || 
        !kineticEnergy1Ref.current || !visualization1Ref.current) {
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
    const visHeight = visualization1Ref.current.clientHeight;
    const platformTop = 50;
    const waterTop = visHeight - 80;
    const diverTop = platformTop + newPos * (waterTop - platformTop);
    
    // Update diver position
    diver1Ref.current.style.top = diverTop + 'px';
    
    // Calculate current energy values
    const currentHeight = height * (1 - newPos);
    const potential = mass * GRAVITY * currentHeight;
    const total = mass * GRAVITY * height;
    const kinetic = total - potential;
    
    // Calculate current velocity
    const currentVelocity = Math.sqrt(2 * GRAVITY * (height - currentHeight));
    
    // Update energy bars
    potentialEnergy1Ref.current.style.width = (potential / total * 100) + '%';
    kineticEnergy1Ref.current.style.width = (kinetic / total * 100) + '%';
    
    // Update velocity vector
    if (newPos > 0.1) {
      const maxVelocity = Math.sqrt(2 * GRAVITY * height);
      const vectorLength = (currentVelocity / maxVelocity) * 50;
      
      velocityVector1Ref.current.style.opacity = '1';
      velocityVector1Ref.current.style.width = vectorLength + 'px';
      velocityVector1Ref.current.style.left = (diver1Ref.current.offsetLeft + 20) + 'px';
      velocityVector1Ref.current.style.top = (diverTop + 20) + 'px';
      velocityVector1Ref.current.style.transform = 'rotate(90deg)';
    }
    
    // Update position state for next frame
    setDiverPosition(newPos);
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateDiver);
  }, [diverPosition, height, mass, setDiverPosition, GRAVITY]);

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
      animationFrameRef.current = requestAnimationFrame(animateDiver);
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
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseFloat(e.target.value);
    setHeight(newHeight);
    
    // Update results
    const potential = mass * GRAVITY * newHeight;
    const impactVelocity = Math.sqrt(2 * GRAVITY * newHeight);
    
    if (velocity1Ref.current) velocity1Ref.current.textContent = impactVelocity.toFixed(2);
    if (initialEnergy1Ref.current) initialEnergy1Ref.current.textContent = potential.toFixed(2);
    if (finalEnergy1Ref.current) finalEnergy1Ref.current.textContent = potential.toFixed(2);
    
    // Update visualization if not animating
    if (!isAnimating) {
      initVisualization();
    }
  };

  const handleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMass = parseFloat(e.target.value);
    setMass(newMass);
    
    // Update results
    const potential = newMass * GRAVITY * height;
    
    if (initialEnergy1Ref.current) initialEnergy1Ref.current.textContent = potential.toFixed(2);
    if (finalEnergy1Ref.current) finalEnergy1Ref.current.textContent = potential.toFixed(2);
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
        <p>A high diver reaches the highest point in his jump at which his centre of gravity is <strong>11.4 m</strong> above the water surface. Assuming that all the diver's gravitational potential energy is transformed into kinetic energy during the dive, calculate the <strong>velocity</strong> with which he enters the water (Take g = 9.81 m s<sup>-2</sup>).</p>
      </div>
      
      <div 
        ref={visualization1Ref}
        className="relative h-[400px] border border-gray-300 mb-4 overflow-hidden bg-gray-50"
      >
        <div ref={platform1Ref} className="platform absolute w-[100px] h-[10px] bg-gray-500"></div>
        <div ref={diver1Ref} className="diver absolute w-[20px] h-[40px] bg-blue-500 rounded-t-full"></div>
        <div ref={water1Ref} className="water absolute left-0 right-0 bottom-0 h-[80px] bg-blue-400/40"></div>
        <div ref={heightMarker1Ref} className="height-marker absolute border-l border-dashed border-gray-400"></div>
        <div ref={heightLabel1Ref} className="height-label absolute text-xs text-gray-500"></div>
        <div ref={velocityVector1Ref} className="velocity-vector absolute h-[2px] bg-red-500 transform-origin-left-center"></div>
        
        <div className="energy-bar-container absolute top-[20px] right-[20px] w-[150px] h-[300px] border border-gray-300 bg-white p-[10px]">
          <div className="energy-label text-xs mb-[2px]">Potential Energy</div>
          <div ref={potentialEnergy1Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-green-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Kinetic Energy</div>
          <div ref={kineticEnergy1Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-red-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Total Energy</div>
          <div ref={totalEnergy1Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-purple-500 transition-width duration-300"></div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <div className="mb-3">
            <label htmlFor="height1" className="block mb-1">Height (m): <span>{height.toFixed(1)}</span></label>
            <input 
              type="range" 
              id="height1" 
              min="5" 
              max="20" 
              step="0.1" 
              value={height}
              onChange={handleHeightChange}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mass1" className="block mb-1">Mass (kg): <span>{mass.toFixed(0)}</span></label>
            <input 
              type="range" 
              id="mass1" 
              min="50" 
              max="100" 
              step="1" 
              value={mass}
              onChange={handleMassChange}
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
            Gravitational Potential Energy (GPE) = mgh<br />
            Kinetic Energy (KE) = ½mv²<br />
            By conservation of energy: mgh = ½mv² → v = √(2gh)
          </div>
          <div>
            <p>Calculated impact velocity: <span ref={velocity1Ref} className="text-red-600 font-bold">0.00</span> m/s</p>
            <p>Initial potential energy: <span ref={initialEnergy1Ref}>0.00</span> J</p>
            <p>Final kinetic energy: <span ref={finalEnergy1Ref}>0.00</span> J</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem1HighDiver;
