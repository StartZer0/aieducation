
import React from 'react';
import { Button } from '@/components/ui/button';

interface KineticEnergyControlsProps {
  mass: number;
  setMass: React.Dispatch<React.SetStateAction<number>>;
  force: number;
  setForce: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  toggleAnimation: () => void;
  resetVisualization: () => void;
}

export const KineticEnergyControls: React.FC<KineticEnergyControlsProps> = ({
  mass,
  setMass,
  force,
  setForce,
  time,
  setTime,
  isPlaying,
  toggleAnimation,
  resetVisualization
}) => {
  return (
    <>
      <div className="controls flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label>
            Mass (kg): {mass.toFixed(1)}
            <input 
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-[90%] block"
            />
          </label>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label>
            Force (N): {force.toFixed(1)}
            <input 
              type="range"
              min="1"
              max="30"
              step="1"
              value={force}
              onChange={(e) => setForce(parseFloat(e.target.value))}
              className="w-[90%] block"
            />
          </label>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label>
            Time (s): {time.toFixed(1)}
            <input 
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="w-[90%] block"
              id="timeSlider"
              disabled={isPlaying}
            />
          </label>
        </div>
      </div>
      
      <div className="mb-4">
        <Button 
          onClick={toggleAnimation}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
          id="startStopBtn"
          variant="default"
        >
          {isPlaying ? 'Pause Animation' : 'Play Animation'}
        </Button>
        
        <Button 
          onClick={resetVisualization}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          variant="default"
        >
          Reset
        </Button>
      </div>
    </>
  );
};
