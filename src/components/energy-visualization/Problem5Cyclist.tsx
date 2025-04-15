
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useCyclistAnimation } from './hooks/useCyclistAnimation';
import { Bike } from 'lucide-react';

// Define the gravity constant
const GRAVITY = 9.81; // m/s²

interface Problem5CyclistProps {
  mass: number;
  height: number;
  distance: number;
  finalSpeed: number;
  setMass: (mass: number) => void;
  setHeight: (height: number) => void;
  setDistance: (distance: number) => void;
  setFinalSpeed: (speed: number) => void;
  cyclistPosition: number;
  setCyclistPosition: (position: number) => void;
  animationId: number | null;
  setAnimationId: (id: number | null) => void;
}

const Problem5Cyclist: React.FC<Problem5CyclistProps> = ({
  mass,
  height,
  distance,
  finalSpeed,
  setMass,
  setHeight,
  setDistance,
  setFinalSpeed,
  cyclistPosition,
  setCyclistPosition,
  animationId,
  setAnimationId
}) => {
  const {
    isAnimating,
    potentialEnergyLoss,
    finalKineticEnergy,
    workAgainstFriction,
    avgResistiveForce,
    toggleAnimation,
    resetAnimation
  } = useCyclistAnimation({
    mass,
    height,
    distance,
    finalSpeed,
    cyclistPosition,
    setCyclistPosition
  });

  const visualizationRef = useRef<HTMLDivElement>(null);
  const cyclistRef = useRef<HTMLDivElement>(null);
  const heightMarkerRef = useRef<HTMLDivElement>(null);
  const heightLabelRef = useRef<HTMLDivElement>(null);
  const velocityVectorRef = useRef<HTMLDivElement>(null);

  // Update the visualization based on cyclist position
  useEffect(() => {
    if (!visualizationRef.current || !cyclistRef.current || 
        !heightMarkerRef.current || !heightLabelRef.current ||
        !velocityVectorRef.current) return;

    const visHeight = visualizationRef.current.clientHeight;
    const visWidth = visualizationRef.current.clientWidth;
    
    // Calculate current position
    const startX = 50;
    const endX = visWidth - 50;
    const currentX = startX + cyclistPosition * (endX - startX);
    
    // Calculate current height (linear descent)
    const currentHeight = height * (1 - cyclistPosition);

    // Update cyclist position
    cyclistRef.current.style.left = `${currentX}px`;
    cyclistRef.current.style.bottom = `${currentHeight + 10}px`;

    // Update height marker
    heightMarkerRef.current.style.height = `${currentHeight}px`;
    heightLabelRef.current.style.bottom = `${currentHeight / 2}px`;
    heightLabelRef.current.textContent = `h = ${currentHeight.toFixed(1)} m`;

    // Calculate current velocity for velocity vector
    const totalEnergy = mass * GRAVITY * height;
    const workAgainstFriction = (mass * GRAVITY * height - 0.5 * mass * finalSpeed * finalSpeed) * cyclistPosition;
    const potentialEnergyLoss = mass * GRAVITY * height * cyclistPosition;
    const availableEnergy = potentialEnergyLoss - workAgainstFriction;
    const currentKineticEnergy = availableEnergy;
    const currentVelocity = Math.sqrt(2 * currentKineticEnergy / mass);

    // Update velocity vector
    velocityVectorRef.current.style.opacity = '1';
    const vectorLength = (currentVelocity / finalSpeed) * 50;
    velocityVectorRef.current.style.width = `${vectorLength}px`;
    velocityVectorRef.current.style.left = `${currentX + 15}px`;
    velocityVectorRef.current.style.bottom = `${currentHeight + 15}px`;
    
  }, [cyclistPosition, height, mass, finalSpeed]);

  return (
    <div>
      <div className="problem-description bg-gray-100 p-4 rounded-md mb-4">
        <p>A cyclist of mass <strong>{mass} kg</strong> (including the bicycle) freewheels from rest 
           <strong> {distance} m</strong> down a hill. The foot of the hill is <strong>{height} m</strong> lower 
           than the cyclist's starting point, and the cyclist reaches a speed of <strong>{finalSpeed} m/s</strong> 
           at the foot of the hill. Calculate:</p>
        <p>a) i) The loss of potential energy</p>
        <p>&nbsp;&nbsp;&nbsp;ii) The gain of kinetic energy of the cyclist and cycle</p>
        <p>b) i) The work done against friction and air resistance during the descent</p>
        <p>&nbsp;&nbsp;&nbsp;ii) The average resistive force during the descent</p>
      </div>

      <div 
        ref={visualizationRef} 
        className="visualization-container relative h-[400px] border border-gray-200 rounded-md mb-4 overflow-hidden bg-gray-50"
      >
        <div className="ground absolute left-0 right-0 bottom-0 h-[10px] bg-gray-400"></div>
        <div className="hill absolute h-full w-full" 
             style={{ 
               clipPath: `polygon(0 100%, 0 ${100 - (height / 4)}%, 100% 100%)`, 
               background: 'linear-gradient(135deg, #8e44ad33, #9b59b633)'
             }}></div>
        <div ref={cyclistRef} className="absolute bottom-0 left-[50px] transition-all duration-300">
          <Bike className="h-8 w-8 text-blue-600" />
        </div>
        <div ref={heightMarkerRef} className="height-marker absolute left-[30px] bottom-[10px] border-l border-dashed border-gray-400 h-0"></div>
        <div ref={heightLabelRef} className="height-label absolute left-[10px] bottom-0 text-xs text-gray-600 whitespace-nowrap">h = {height.toFixed(1)} m</div>
        <div ref={velocityVectorRef} className="velocity-vector absolute h-[2px] bg-red-500 transform-origin-left"></div>
        
        <div className="energy-bar-container absolute top-4 right-4 w-[150px] h-[300px] border border-gray-200 bg-white bg-opacity-90 p-2 rounded-md">
          <div className="mb-1">
            <div className="text-xs mb-1">Potential Energy</div>
            <div className="h-6 bg-gray-200 rounded-sm overflow-hidden">
              <div className="h-full bg-green-500 transition-width" 
                   style={{ width: `${(1 - cyclistPosition) * 100}%` }}></div>
            </div>
          </div>
          <div className="mb-1">
            <div className="text-xs mb-1">Kinetic Energy</div>
            <div className="h-6 bg-gray-200 rounded-sm overflow-hidden">
              <div className="h-full bg-red-500 transition-width" 
                   style={{ width: `${(finalKineticEnergy / potentialEnergyLoss) * 100 * cyclistPosition}%` }}></div>
            </div>
          </div>
          <div className="mb-1">
            <div className="text-xs mb-1">Energy Lost to Friction</div>
            <div className="h-6 bg-gray-200 rounded-sm overflow-hidden">
              <div className="h-full bg-yellow-500 transition-width" 
                   style={{ width: `${(workAgainstFriction / potentialEnergyLoss) * 100 * cyclistPosition}%` }}></div>
            </div>
          </div>
          <div className="mb-1">
            <div className="text-xs mb-1">Total Energy</div>
            <div className="h-6 bg-gray-200 rounded-sm overflow-hidden">
              <div className="h-full bg-purple-500 transition-width" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="controls grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="control-group">
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium">Mass (kg): {mass}</label>
            <Slider
              value={[mass]}
              min={50}
              max={100}
              step={5}
              onValueChange={(value) => setMass(value[0])}
              className="mb-2"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium">Height Drop (m): {height}</label>
            <Slider
              value={[height]}
              min={10}
              max={30}
              step={1}
              onValueChange={(value) => setHeight(value[0])}
              className="mb-2"
            />
          </div>
        </div>
        <div className="control-group">
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium">Distance (m): {distance}</label>
            <Slider
              value={[distance]}
              min={200}
              max={800}
              step={50}
              onValueChange={(value) => setDistance(value[0])}
              className="mb-2"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium">Final Speed (m/s): {finalSpeed}</label>
            <Slider
              value={[finalSpeed]}
              min={8}
              max={16}
              step={0.5}
              onValueChange={(value) => setFinalSpeed(value[0])}
              className="mb-2"
            />
          </div>
        </div>
      </div>

      <div className="button-group flex gap-2 mb-4">
        <Button variant="default" onClick={toggleAnimation}>
          {isAnimating ? 'Pause Simulation' : 'Start Simulation'}
        </Button>
        <Button variant="outline" onClick={resetAnimation}>
          Reset
        </Button>
      </div>

      <div className="results bg-gray-100 p-4 rounded-md">
        <div className="formula font-mono bg-white p-3 rounded mb-3 text-sm">
          Potential Energy Loss (PE) = mgh<br />
          Kinetic Energy Gain (KE) = ½mv²<br />
          Work against friction = PE - KE<br />
          Average resistive force = Work/distance
        </div>
        <div className="result-item">
          <p>a) i) Loss of potential energy: <span className="font-bold text-red-600">{potentialEnergyLoss.toFixed(0)}</span> J</p>
          <p>&nbsp;&nbsp;&nbsp;ii) Gain of kinetic energy: <span className="font-bold text-red-600">{finalKineticEnergy.toFixed(0)}</span> J</p>
          <p>b) i) Work done against friction: <span className="font-bold text-red-600">{workAgainstFriction.toFixed(0)}</span> J</p>
          <p>&nbsp;&nbsp;&nbsp;ii) Average resistive force: <span className="font-bold text-red-600">{avgResistiveForce.toFixed(1)}</span> N</p>
        </div>
      </div>
    </div>
  );
};

export default Problem5Cyclist;
