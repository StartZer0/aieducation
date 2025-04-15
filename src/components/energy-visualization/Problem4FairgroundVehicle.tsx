
import React, { useRef } from 'react';
import { useFairgroundVehicleAnimation } from './hooks/useFairgroundVehicleAnimation';

interface Problem4Props {
  mass: number;
  initialSpeed: number;
  height: number;
  distance: number;
  finalSpeed: number;
  setMass: React.Dispatch<React.SetStateAction<number>>;
  setInitialSpeed: React.Dispatch<React.SetStateAction<number>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  setFinalSpeed: React.Dispatch<React.SetStateAction<number>>;
  vehiclePosition: number;
  setVehiclePosition: React.Dispatch<React.SetStateAction<number>>;
  animationId: number | null;
  setAnimationId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Problem4FairgroundVehicle: React.FC<Problem4Props> = ({
  mass,
  initialSpeed,
  height,
  distance,
  finalSpeed,
  setMass,
  setInitialSpeed,
  setHeight,
  setDistance,
  setFinalSpeed,
  vehiclePosition,
  setVehiclePosition,
  animationId,
  setAnimationId
}) => {
  // Constants
  const GRAVITY = 9.81; // m/s²

  // Element Refs
  const visualizationRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const heightMarkerRef = useRef<HTMLDivElement>(null);
  const heightLabelRef = useRef<HTMLDivElement>(null);
  const velocityVectorRef = useRef<HTMLDivElement>(null);
  const potentialEnergyRef = useRef<HTMLDivElement>(null);
  const kineticEnergyRef = useRef<HTMLDivElement>(null);
  const lostEnergyRef = useRef<HTMLDivElement>(null);
  
  // Results Refs
  const peLossRef = useRef<HTMLSpanElement>(null);
  const initialKERef = useRef<HTMLSpanElement>(null);
  const finalKERef = useRef<HTMLSpanElement>(null);
  const frictionWorkRef = useRef<HTMLSpanElement>(null);
  const frictionForceRef = useRef<HTMLSpanElement>(null);

  // Use the animation hook
  const { isAnimating, toggleAnimation, resetAnimation } = useFairgroundVehicleAnimation({
    mass,
    initialSpeed,
    height,
    distance,
    finalSpeed,
    gravity: GRAVITY,
    vehicleRef,
    trackRef,
    heightMarkerRef,
    heightLabelRef,
    velocityVectorRef,
    potentialEnergyRef,
    kineticEnergyRef,
    lostEnergyRef,
    visualizationRef
  });

  // Calculate results
  const initialKineticEnergy = 0.5 * mass * initialSpeed * initialSpeed;
  const potentialEnergyLoss = mass * GRAVITY * height;
  const finalKineticEnergy = 0.5 * mass * finalSpeed * finalSpeed;
  const workAgainstFriction = initialKineticEnergy + potentialEnergyLoss - finalKineticEnergy;
  const avgFrictionForce = workAgainstFriction / distance;

  // Update result elements
  React.useEffect(() => {
    if (peLossRef.current) peLossRef.current.textContent = potentialEnergyLoss.toFixed(0);
    if (initialKERef.current) initialKERef.current.textContent = initialKineticEnergy.toFixed(0);
    if (finalKERef.current) finalKERef.current.textContent = finalKineticEnergy.toFixed(0);
    if (frictionWorkRef.current) frictionWorkRef.current.textContent = workAgainstFriction.toFixed(0);
    if (frictionForceRef.current) frictionForceRef.current.textContent = avgFrictionForce.toFixed(0);
  }, [potentialEnergyLoss, initialKineticEnergy, finalKineticEnergy, workAgainstFriction, avgFrictionForce]);

  // Handle slider changes
  const handleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMass(parseFloat(e.target.value));
  };

  const handleInitialSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialSpeed(parseFloat(e.target.value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseFloat(e.target.value));
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(parseFloat(e.target.value));
  };

  const handleFinalSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinalSpeed(parseFloat(e.target.value));
  };

  // Start/pause/reset animation
  const handleToggleAnimation = () => {
    toggleAnimation();
  };

  const handleResetAnimation = () => {
    resetAnimation();
  };

  return (
    <div>
      <div className="problem-description mb-4 bg-gray-100 p-4 rounded-md">
        <p>A fairground vehicle of total mass <strong>{mass} kg</strong>, moving at a speed of <strong>{initialSpeed} m/s</strong>, descends through a height of <strong>{height} m</strong> to reach a speed of <strong>{finalSpeed} m/s</strong> after travelling a distance of <strong>{distance} m</strong> along the track. Calculate:</p>
        <p>a) Its loss of potential energy</p>
        <p>b) Its initial kinetic energy</p>
        <p>c) Its kinetic energy after the descent</p>
        <p>d) The work done against friction</p>
        <p>e) The average frictional force on it during the descent</p>
      </div>
      
      {/* Visualization area */}
      <div className="visualization relative mb-4 h-72 border border-gray-300 rounded-md bg-gray-50" ref={visualizationRef}>
        <div className="track absolute" ref={trackRef}></div>
        <div className="fairground-vehicle absolute w-10 h-5 bg-red-500 rounded" ref={vehicleRef}></div>
        <div className="height-marker absolute border-l border-dashed border-gray-400" ref={heightMarkerRef}></div>
        <div className="height-label absolute text-sm text-gray-500" ref={heightLabelRef}></div>
        <div className="velocity-vector absolute h-0.5 bg-red-500 origin-left" ref={velocityVectorRef}></div>
        
        <div className="energy-bar-container absolute top-5 right-5 w-36 h-64 border border-gray-300 bg-white p-2 rounded-md">
          <div className="text-xs mb-1">Potential Energy</div>
          <div className="h-6 mb-2 bg-gray-200 rounded-sm overflow-hidden">
            <div className="h-full bg-green-500" ref={potentialEnergyRef}></div>
          </div>
          
          <div className="text-xs mb-1">Kinetic Energy</div>
          <div className="h-6 mb-2 bg-gray-200 rounded-sm overflow-hidden">
            <div className="h-full bg-red-500" ref={kineticEnergyRef}></div>
          </div>
          
          <div className="text-xs mb-1">Energy Lost to Friction</div>
          <div className="h-6 mb-2 bg-gray-200 rounded-sm overflow-hidden">
            <div className="h-full bg-yellow-500" ref={lostEnergyRef}></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="control-group space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mass (kg): <span className="font-bold">{mass}</span>
            </label>
            <input
              type="range"
              min="800"
              max="1600"
              step="100"
              value={mass}
              onChange={handleMassChange}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Initial Speed (m/s): <span className="font-bold">{initialSpeed}</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={initialSpeed}
              onChange={handleInitialSpeedChange}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Height Drop (m): <span className="font-bold">{height}</span>
            </label>
            <input
              type="range"
              min="20"
              max="80"
              step="5"
              value={height}
              onChange={handleHeightChange}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="control-group space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Distance (m): <span className="font-bold">{distance}</span>
            </label>
            <input
              type="range"
              min="50"
              max="150"
              step="5"
              value={distance}
              onChange={handleDistanceChange}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Final Speed (m/s): <span className="font-bold">{finalSpeed}</span>
            </label>
            <input
              type="range"
              min="10"
              max="40"
              step="1"
              value={finalSpeed}
              onChange={handleFinalSpeedChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons flex space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          onClick={handleToggleAnimation}
        >
          {isAnimating ? "Pause Simulation" : "Start Simulation"}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition-colors"
          onClick={handleResetAnimation}
        >
          Reset
        </button>
      </div>

      {/* Results */}
      <div className="results bg-gray-100 p-4 rounded-md">
        <div className="formula mb-4 bg-white p-3 border-l-4 border-blue-500">
          <p>Potential Energy Loss (PE) = mgh</p>
          <p>Initial Kinetic Energy (KE_i) = ½mv_i²</p>
          <p>Final Kinetic Energy (KE_f) = ½mv_f²</p>
          <p>Work against friction = PE + KE_i - KE_f</p>
          <p>Average frictional force = Work/distance</p>
        </div>
        
        <div className="result-items space-y-2">
          <p>a) Loss of potential energy: <span className="font-bold text-red-600" ref={peLossRef}>{potentialEnergyLoss.toFixed(0)}</span> J</p>
          <p>b) Initial kinetic energy: <span className="font-bold text-red-600" ref={initialKERef}>{initialKineticEnergy.toFixed(0)}</span> J</p>
          <p>c) Kinetic energy after descent: <span className="font-bold text-red-600" ref={finalKERef}>{finalKineticEnergy.toFixed(0)}</span> J</p>
          <p>d) Work done against friction: <span className="font-bold text-red-600" ref={frictionWorkRef}>{workAgainstFriction.toFixed(0)}</span> J</p>
          <p>e) Average frictional force: <span className="font-bold text-red-600" ref={frictionForceRef}>{avgFrictionForce.toFixed(0)}</span> N</p>
        </div>
      </div>
    </div>
  );
};

export default Problem4FairgroundVehicle;
