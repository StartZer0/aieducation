
import React, { useEffect, useRef } from 'react';
import { useBouncingBallAnimation } from './hooks/useBouncingBallAnimation';

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
  setBallPosition,
  setBallDirection,
}) => {
  // Constants
  const GRAVITY = 9.81;
  
  // Refs for elements
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

  // Use the custom hook for animation
  const {
    ballPosition,
    ballDirection,
    isAnimating,
    toggleAnimation,
    resetAnimation,
    initVisualization,
    cleanup
  } = useBouncingBallAnimation({
    initialHeight,
    reboundHeight,
    mass,
    gravity: GRAVITY,
    ballRef: ball3Ref,
    tableRef: table3Ref,
    heightMarkerRef: heightMarker3Ref,
    heightLabelRef: heightLabel3Ref,
    velocityVectorRef: velocityVector3Ref,
    potentialEnergyRef: potentialEnergy3Ref,
    kineticEnergyRef: kineticEnergy3Ref,
    lostEnergyRef: lostEnergy3Ref,
    visualizationRef: visualization3Ref,
    energyLostRef: energyLost3aRef,
    kineticBeforeImpactRef: kineticBeforeImpact3Ref,
    velocityBeforeImpactRef: velocityBeforeImpact3Ref,
    energyGainedRef: energyGained3cRef,
    reboundVelocityRef: reboundVelocity3Ref
  });

  // Update parent component state
  useEffect(() => {
    setBallPosition(ballPosition);
  }, [ballPosition, setBallPosition]);

  useEffect(() => {
    setBallDirection(ballDirection);
  }, [ballDirection, setBallDirection]);

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
    if (!isAnimating) {
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
    if (!isAnimating) {
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
    
    // Cleanup animation on unmount
    return cleanup;
  }, [initVisualization, cleanup]);

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
          onClick={toggleAnimation}
        >
          {isAnimating ? "Pause Simulation" : "Start Simulation"}
        </button>
        <button 
          className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          onClick={resetAnimation}
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
