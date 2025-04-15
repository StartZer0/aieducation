
import React, { useRef, useEffect, useState } from 'react';
import { Bike } from 'lucide-react';

interface CyclistVisualizationProps {
  mass: number;
  height: number;
  distance: number;
  finalSpeed: number;
  cyclistPosition: number;
  getCurrentValues: (position: number) => {
    potentialEnergyLost: number;
    workAgainstFriction: number;
    kineticEnergy: number;
    velocity: number;
  };
  potentialEnergyLoss: number;
}

export const CyclistVisualization: React.FC<CyclistVisualizationProps> = ({
  mass,
  height,
  distance,
  finalSpeed,
  cyclistPosition,
  getCurrentValues,
  potentialEnergyLoss
}) => {
  // State for current dynamic values
  const [currentKineticEnergy, setCurrentKineticEnergy] = useState<number>(0);
  const [currentPotentialEnergyLost, setCurrentPotentialEnergyLost] = useState<number>(0);
  const [currentWorkAgainstFriction, setCurrentWorkAgainstFriction] = useState<number>(0);
  const [currentVelocity, setCurrentVelocity] = useState<number>(0);

  const visualizationRef = useRef<HTMLDivElement>(null);
  const cyclistRef = useRef<HTMLDivElement>(null);
  const heightMarkerRef = useRef<HTMLDivElement>(null);
  const heightLabelRef = useRef<HTMLDivElement>(null);
  const velocityVectorRef = useRef<HTMLDivElement>(null);

  // Update current values when position changes
  useEffect(() => {
    if (cyclistPosition >= 0) {
      const values = getCurrentValues(cyclistPosition);
      setCurrentKineticEnergy(values.kineticEnergy);
      setCurrentPotentialEnergyLost(values.potentialEnergyLost);
      setCurrentWorkAgainstFriction(values.workAgainstFriction);
      setCurrentVelocity(values.velocity);
    }
  }, [cyclistPosition, getCurrentValues]);

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

    // Update velocity vector
    velocityVectorRef.current.style.opacity = '1';
    const vectorLength = (currentVelocity / finalSpeed) * 50;
    velocityVectorRef.current.style.width = `${vectorLength}px`;
    velocityVectorRef.current.style.left = `${currentX + 15}px`;
    velocityVectorRef.current.style.bottom = `${currentHeight + 15}px`;
    
  }, [cyclistPosition, height, finalSpeed, currentVelocity]);

  return (
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
      <div ref={cyclistRef} className="absolute bottom-0 left-[50px]">
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
                 style={{ width: `${((potentialEnergyLoss - currentPotentialEnergyLost) / potentialEnergyLoss) * 100}%` }}></div>
          </div>
        </div>
        <div className="mb-1">
          <div className="text-xs mb-1">Kinetic Energy</div>
          <div className="h-6 bg-gray-200 rounded-sm overflow-hidden">
            <div className="h-full bg-red-500 transition-width" 
                 style={{ width: `${(currentKineticEnergy / potentialEnergyLoss) * 100}%` }}></div>
          </div>
        </div>
        <div className="mb-1">
          <div className="text-xs mb-1">Energy Lost to Friction</div>
          <div className="h-6 bg-gray-200 rounded-sm overflow-hidden">
            <div className="h-full bg-yellow-500 transition-width" 
                 style={{ width: `${(currentWorkAgainstFriction / potentialEnergyLoss) * 100}%` }}></div>
          </div>
        </div>
        <div className="mb-1">
          <div className="text-xs mb-1">Total Energy</div>
          <div className="h-6 bg-gray-200 rounded-sm overflow-hidden">
            <div className="h-full bg-purple-500 transition-width" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="mt-3 text-xs">
          <p>Current velocity: {currentVelocity.toFixed(1)} m/s</p>
        </div>
      </div>
    </div>
  );
};
