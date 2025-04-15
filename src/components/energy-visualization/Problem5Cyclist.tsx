
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProblemDescription } from './cyclist/ProblemDescription';
import { CyclistVisualization } from './cyclist/CyclistVisualization';
import { EnergyControls } from './cyclist/EnergyControls';
import { ResultsDisplay } from './cyclist/ResultsDisplay';
import { useCyclistAnimation } from './hooks/useCyclistAnimation';

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
    getCurrentValues,
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

  return (
    <div>
      <ProblemDescription 
        mass={mass} 
        height={height} 
        distance={distance} 
        finalSpeed={finalSpeed} 
      />

      <CyclistVisualization
        mass={mass}
        height={height}
        distance={distance}
        finalSpeed={finalSpeed}
        cyclistPosition={cyclistPosition}
        getCurrentValues={getCurrentValues}
        potentialEnergyLoss={potentialEnergyLoss}
      />

      <EnergyControls
        mass={mass}
        height={height}
        distance={distance}
        finalSpeed={finalSpeed}
        setMass={setMass}
        setHeight={setHeight}
        setDistance={setDistance}
        setFinalSpeed={setFinalSpeed}
      />

      <div className="button-group flex gap-2 mb-4">
        <Button variant="default" onClick={toggleAnimation}>
          {isAnimating ? 'Pause Simulation' : 'Start Simulation'}
        </Button>
        <Button variant="outline" onClick={resetAnimation}>
          Reset
        </Button>
      </div>

      <ResultsDisplay
        potentialEnergyLoss={potentialEnergyLoss}
        finalKineticEnergy={finalKineticEnergy}
        workAgainstFriction={workAgainstFriction}
        avgResistiveForce={avgResistiveForce}
      />
    </div>
  );
};

export default Problem5Cyclist;
