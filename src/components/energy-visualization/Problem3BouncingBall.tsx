
import React, { useState, useEffect, useRef } from 'react';

interface Problem3Props {
  initialHeight: number;
  reboundHeight: number;
  mass: number;
  setInitialHeight: (height: number) => void;
  setReboundHeight: (height: number) => void;
  setMass: (mass: number) => void;
  ballPosition: number;
  setBallPosition: (position: number) => void;
  ballDirection: number;
  setBallDirection: (direction: number) => void;
  animationId: number | null;
  setAnimationId: (id: number | null) => void;
}

const Problem3BouncingBall: React.FC<Problem3Props> = ({
  initialHeight,
  reboundHeight,
  mass,
  setInitialHeight,
  setReboundHeight,
  setMass,
  ballPosition,
  setBallPosition,
  ballDirection,
  setBallDirection,
  animationId,
  setAnimationId
}) => {
  // Constants
  const GRAVITY = 9.81;

  // Refs
  const visualization3Ref = useRef<HTMLDivElement>(null);
  const ball3Ref = useRef<HTMLDivElement>(null);
  const table3Ref = useRef<HTMLDivElement>(null);
  const heightMarker3Ref = useRef<HTMLDivElement>(null);
  const heightLabel3Ref = useRef<HTMLDivElement>(null);
  const velocityVector3Ref = useRef<HTMLDivElement>(null);
  const potentialEnergy3Ref = useRef<HTMLDivElement>(null);
  const kineticEnergy3Ref = useRef<HTMLDivElement>(null);
  const lostEnergy3Ref = useRef<HTMLDivElement>(null);
  const totalEnergy3Ref = useRef<HTMLDivElement>(null);
  const energyLost3aRef = useRef<HTMLSpanElement>(null);
  const kineticBeforeImpact3Ref = useRef<HTMLSpanElement>(null);
  const velocityBeforeImpact3Ref = useRef<HTMLSpanElement>(null);
  const energyGained3cRef = useRef<HTMLSpanElement>(null);
  const reboundVelocity3Ref = useRef<HTMLSpanElement>(null);

  // Initialize visualization
  const initVisualization = () => {
    if (!visualization3Ref.current || !ball3Ref.current || !table3Ref.current || 
        !heightMarker3Ref.current || !heightLabel3Ref.current || !velocityVector3Ref.current || 
        !potentialEnergy3Ref.current || !kineticEnergy3Ref.current || 
        !lostEnergy3Ref.current || !totalEnergy3Ref.current) return;
    
    const visHeight = visualization3Ref.current.clientHeight;
    const visWidth = visualization3Ref.current.clientWidth;
    
    // Position elements
    const tableY = visHeight - 50;
    table3Ref.current.style.top = tableY + 'px';
    
    // Initial ball position
    const pixelsPerMeter = (tableY - 50) / Math.max(initialHeight, reboundHeight);
    const initialY = tableY - initialHeight * pixelsPerMeter;
    
    ball3Ref.current.style.top = initialY + 'px';
    ball3Ref.current.style.left = (visWidth / 2 - 10) + 'px';
    
    // Height marker
    heightMarker3Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    heightMarker3Ref.current.style.top = initialY + 'px';
    heightMarker3Ref.current.style.height = (tableY - initialY) + 'px';
    
    // Height label
    heightLabel3Ref.current.style.left = (visWidth / 2 - 90) + 'px';
    heightLabel3Ref.current.style.top = (initialY + (tableY - initialY) / 2) + 'px';
    heightLabel3Ref.current.textContent = `h = ${initialHeight.toFixed(1)} m`;
    
    // Velocity vector - initially hidden
    velocityVector3Ref.current.style.opacity = '0';
    
    // Calculate energy values
    const initialPE = mass * GRAVITY * initialHeight;
    const impactKE = initialPE; // Conservation of energy
    const reboundPE = mass * GRAVITY * reboundHeight;
    const energyLoss = initialPE - reboundPE;
    
    // Calculate velocities
    const impactVelocity = Math.sqrt(2 * GRAVITY * initialHeight);
    const reboundVelocity = Math.sqrt(2 * GRAVITY * reboundHeight);
    
    // Update energy bars
    totalEnergy3Ref.current.style.width = '100%';
    potentialEnergy3Ref.current.style.width = '100%';
    kineticEnergy3Ref.current.style.width = '0%';
    lostEnergy3Ref.current.style.width = '0%';
    
    // Update results
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (kineticBeforeImpact3Ref.current) kineticBeforeImpact3Ref.current.textContent = impactKE.toFixed(4);
    if (velocityBeforeImpact3Ref.current) velocityBeforeImpact3Ref.current.textContent = impactVelocity.toFixed(2);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
    if (reboundVelocity3Ref.current) reboundVelocity3Ref.current.textContent = reboundVelocity.toFixed(2);
    
    setBallPosition(0);
    setBallDirection(1);
  };

  // Animate ball
  const animateBall = () => {
    if (!ball3Ref.current || !velocityVector3Ref.current || !potentialEnergy3Ref.current || 
        !kineticEnergy3Ref.current || !lostEnergy3Ref.current || !visualization3Ref.current || 
        !heightMarker3Ref.current || !heightLabel3Ref.current) {
      return;
    }
    
    if (ballPosition >= 3) {
      // Animation complete
      cancelAnimationFrame(animationId as number);
      setAnimationId(null);
      return;
    }
    
    // Next frame - using a small fixed increment for smooth animation
    const newPos = ballPosition + 0.01;
    
    // Handle direction changes
    let newDirection = ballDirection;
    if (newPos >= 1 && newPos < 1.05 && ballDirection === 1) {
      // Impact
      newDirection = -1; // Change direction to up
    } else if (newPos >= 2 && ballDirection === -1) {
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
    const visHeight = visualization3Ref.current.clientHeight;
    const tableY = visHeight - 50;
    const pixelsPerMeter = (tableY - 50) / Math.max(initialHeight, reboundHeight);
    const ballY = tableY - currentHeight * pixelsPerMeter;
    
    // Update ball position
    ball3Ref.current.style.top = ballY + 'px';
    
    // Update height marker
    heightMarker3Ref.current.style.top = ballY + 'px';
    heightMarker3Ref.current.style.height = (tableY - ballY) + 'px';
    heightLabel3Ref.current.style.top = (ballY + (tableY - ballY) / 2) + 'px';
    heightLabel3Ref.current.textContent = `h = ${currentHeight.toFixed(1)} m`;
    
    // Calculate current energy values
    const initialPE = mass * GRAVITY * initialHeight;
    const currentPE = mass * GRAVITY * currentHeight;
    
    // Energy values depend on which phase we're in
    let energyLoss = 0;
    let availableEnergy = initialPE;
    
    if (newPos >= 1) {
      // After impact, some energy is lost
      energyLoss = initialPE - mass * GRAVITY * reboundHeight;
      availableEnergy = initialPE - energyLoss;
    }
    
    const kinetic = availableEnergy - currentPE;
    
    // Calculate current velocity based on kinetic energy
    const currentVelocity = Math.sqrt(2 * kinetic / mass) * (newDirection === 1 ? 1 : -1);
    
    // Update energy bars
    potentialEnergy3Ref.current.style.width = (currentPE / initialPE * 100) + '%';
    kineticEnergy3Ref.current.style.width = (kinetic / initialPE * 100) + '%';
    lostEnergy3Ref.current.style.width = (energyLoss / initialPE * 100) + '%';
    
    // Update velocity vector
    const absVelocity = Math.abs(currentVelocity);
    const maxVelocity = Math.sqrt(2 * GRAVITY * initialHeight);
    const vectorLength = (absVelocity / maxVelocity) * 40;
    
    if (absVelocity > 0.5) {
      velocityVector3Ref.current.style.opacity = '1';
      velocityVector3Ref.current.style.width = vectorLength + 'px';
      velocityVector3Ref.current.style.left = ball3Ref.current.offsetLeft + 20 + 'px';
      velocityVector3Ref.current.style.top = ballY + 'px';
      velocityVector3Ref.current.style.transform = `rotate(${newDirection === 1 ? 90 : -90}deg)`;
    } else {
      velocityVector3Ref.current.style.opacity = '0';
    }
    
    // Update state for next frame
    setBallPosition(newPos);
    setBallDirection(newDirection);
    
    // Continue animation
    const id = requestAnimationFrame(animateBall);
    setAnimationId(id);
  };

  // Start/pause simulation
  const startSimulation = () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    } else {
      const id = requestAnimationFrame(animateBall);
      setAnimationId(id);
    }
  };

  // Reset simulation
  const resetSimulation = () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }
    
    initVisualization();
  };

  // Event handlers for inputs
  const handleInitialHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseFloat(e.target.value);
    setInitialHeight(newHeight);
    
    // Ensure rebound height is not greater than initial height
    if (reboundHeight > newHeight) {
      setReboundHeight(newHeight);
    }
    
    // Update results
    const initialPE = mass * GRAVITY * newHeight;
    const impactKE = initialPE; // Conservation of energy
    const reboundPE = mass * GRAVITY * Math.min(reboundHeight, newHeight);
    
    // Calculate velocities
    const impactVelocity = Math.sqrt(2 * GRAVITY * newHeight);
    const reboundVelocity = Math.sqrt(2 * GRAVITY * Math.min(reboundHeight, newHeight));
    
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (kineticBeforeImpact3Ref.current) kineticBeforeImpact3Ref.current.textContent = impactKE.toFixed(4);
    if (velocityBeforeImpact3Ref.current) velocityBeforeImpact3Ref.current.textContent = impactVelocity.toFixed(2);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
    if (reboundVelocity3Ref.current) reboundVelocity3Ref.current.textContent = reboundVelocity.toFixed(2);
    
    // Update visualization if not animating
    if (animationId === null) {
      initVisualization();
    }
  };

  const handleReboundHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseFloat(e.target.value);
    
    // Ensure rebound height is not greater than initial height
    const cappedHeight = Math.min(newHeight, initialHeight);
    setReboundHeight(cappedHeight);
    
    // Update results
    const initialPE = mass * GRAVITY * initialHeight;
    const reboundPE = mass * GRAVITY * cappedHeight;
    
    // Calculate rebound velocity
    const reboundVelocity = Math.sqrt(2 * GRAVITY * cappedHeight);
    
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
    if (reboundVelocity3Ref.current) reboundVelocity3Ref.current.textContent = reboundVelocity.toFixed(2);
    
    // Update visualization if not animating
    if (animationId === null) {
      initVisualization();
    }
  };

  const handleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMass = parseFloat(e.target.value);
    setMass(newMass);
    
    // Update results - mass affects energy values but not velocities
    const initialPE = newMass * GRAVITY * initialHeight;
    const impactKE = initialPE;
    const reboundPE = newMass * GRAVITY * reboundHeight;
    
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (kineticBeforeImpact3Ref.current) kineticBeforeImpact3Ref.current.textContent = impactKE.toFixed(4);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
  };

  // Initialize visualization on mount
  useEffect(() => {
    initVisualization();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
        <p>A steel ball bearing of mass <strong>0.05 kg</strong> at a height of <strong>2.0 m</strong> above a steel table is released from rest and it is found to rebound to a height of <strong>1.8 m</strong>. Calculate:</p>
        <p>(a) The gravitational potential energy lost during the fall.</p>
        <p>(b) The kinetic energy and velocity of the ball bearing just before impact.</p>
        <p>(c) The gravitational potential energy gained by the ball bearing when it rebounds to a height of 1.8 m.</p>
        <p>(d) The ball bearing's rebound velocity. (Take g = 9.81 m s<sup>-2</sup>).</p>
      </div>
      
      <div 
        ref={visualization3Ref}
        className="relative h-[400px] border border-gray-300 mb-4 overflow-hidden bg-gray-50"
      >
        <div ref={table3Ref} className="table absolute w-[200px] h-[20px] bg-gray-500 left-1/2 transform -translate-x-1/2"></div>
        <div ref={ball3Ref} className="ball absolute w-[20px] h-[20px] rounded-full bg-gray-400"></div>
        <div ref={heightMarker3Ref} className="height-marker absolute border-l border-dashed border-gray-400"></div>
        <div ref={heightLabel3Ref} className="height-label absolute text-xs text-gray-500"></div>
        <div ref={velocityVector3Ref} className="velocity-vector absolute h-[2px] bg-red-500 transform-origin-left-center"></div>
        
        <div className="energy-bar-container absolute top-[20px] right-[20px] w-[150px] h-[300px] border border-gray-300 bg-white p-[10px]">
          <div className="energy-label text-xs mb-[2px]">Potential Energy</div>
          <div ref={potentialEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-green-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Kinetic Energy</div>
          <div ref={kineticEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-red-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Lost Energy</div>
          <div ref={lostEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-orange-500 transition-width duration-300"></div>
          <div className="energy-label text-xs mb-[2px]">Total Energy</div>
          <div ref={totalEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-purple-500 transition-width duration-300"></div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <div className="mb-3">
            <label htmlFor="initialHeight3" className="block mb-1">Initial Height (m): <span>{initialHeight.toFixed(1)}</span></label>
            <input 
              type="range" 
              id="initialHeight3" 
              min="1" 
              max="3" 
              step="0.1" 
              value={initialHeight}
              onChange={handleInitialHeightChange}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reboundHeight3" className="block mb-1">Rebound Height (m): <span>{reboundHeight.toFixed(1)}</span></label>
            <input 
              type="range" 
              id="reboundHeight3" 
              min="0.5" 
              max="2.5" 
              step="0.1" 
              value={reboundHeight}
              onChange={handleReboundHeightChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="mb-3">
            <label htmlFor="mass3" className="block mb-1">Mass (kg): <span>{mass.toFixed(2)}</span></label>
            <input 
              type="range" 
              id="mass3" 
              min="0.01" 
              max="0.1" 
              step="0.01" 
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
          onClick={startSimulation}
        >
          {animationId !== null ? "Pause Simulation" : "Start Simulation"}
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
            GPE = mgh<br />
            KE = ½mv²<br />
            v = √(2gh)
          </div>
          <div>
            <p>(a) Gravitational potential energy lost during fall: <span ref={energyLost3aRef} className="text-red-600 font-bold">0.00</span> J</p>
            <p>(b) Kinetic energy before impact: <span ref={kineticBeforeImpact3Ref} className="text-red-600 font-bold">0.00</span> J</p>
            <p>(b) Velocity before impact: <span ref={velocityBeforeImpact3Ref} className="text-red-600 font-bold">0.00</span> m/s</p>
            <p>(c) Gravitational potential energy gained on rebound: <span ref={energyGained3cRef} className="text-red-600 font-bold">0.00</span> J</p>
            <p>(d) Rebound velocity: <span ref={reboundVelocity3Ref} className="text-red-600 font-bold">0.00</span> m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem3BouncingBall;
