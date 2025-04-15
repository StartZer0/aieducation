
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { KineticEnergyCanvas } from './kinetic-energy/KineticEnergyCanvas';
import { KineticEnergyControls } from './kinetic-energy/KineticEnergyControls';
import { ResultsDisplay } from './kinetic-energy/ResultsDisplay';
import { useKineticEnergyCalculation } from './kinetic-energy/useKineticEnergyCalculation';
import { useAnimationControl } from './kinetic-energy/useAnimationControl';

export const KineticEnergyVisualization: React.FC = () => {
  // State for input values
  const [mass, setMass] = useState(1.0);
  const [force, setForce] = useState(10.0);
  const [time, setTime] = useState(0.0);
  
  // Custom hooks for calculations and animation
  const { values, kineticEnergyPercent, workDonePercent } = useKineticEnergyCalculation(mass, force, time);
  const { isPlaying, toggleAnimation, resetVisualization } = useAnimationControl(setTime);
  
  return (
    <Card className="w-full shadow-sm">
      <div className="w-full border-0 p-4">
        {/* Canvas for visualization */}
        <KineticEnergyCanvas 
          values={values}
          force={force}
        />
        
        {/* Controls */}
        <KineticEnergyControls
          mass={mass}
          setMass={setMass}
          force={force}
          setForce={setForce}
          time={time}
          setTime={setTime}
          isPlaying={isPlaying}
          toggleAnimation={toggleAnimation}
          resetVisualization={resetVisualization}
        />
        
        {/* Results display */}
        <ResultsDisplay
          values={values}
          kineticEnergyPercent={kineticEnergyPercent}
          workDonePercent={workDonePercent}
        />
      </div>
    </Card>
  );
};
