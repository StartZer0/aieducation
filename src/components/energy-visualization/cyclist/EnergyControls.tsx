
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface EnergyControlsProps {
  mass: number;
  height: number;
  distance: number;
  finalSpeed: number;
  setMass: (mass: number) => void;
  setHeight: (height: number) => void;
  setDistance: (distance: number) => void;
  setFinalSpeed: (speed: number) => void;
}

export const EnergyControls: React.FC<EnergyControlsProps> = ({
  mass,
  height,
  distance,
  finalSpeed,
  setMass,
  setHeight,
  setDistance,
  setFinalSpeed
}) => {
  return (
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
  );
};
