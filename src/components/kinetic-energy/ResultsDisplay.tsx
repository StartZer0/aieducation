
import React from 'react';

interface ResultsDisplayProps {
  values: {
    acceleration: number;
    velocity: number;
    distance: number;
    workDone: number;
    kineticEnergy: number;
  };
  kineticEnergyPercent: number;
  workDonePercent: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  values,
  kineticEnergyPercent,
  workDonePercent
}) => {
  return (
    <>
      <div className="bg-gray-100 p-4 rounded-md flex flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <p><strong>Calculations:</strong></p>
          <p>Acceleration (a = F/m): <span>{values.acceleration.toFixed(1)}</span> m/s²</p>
          <p>Velocity (v = at): <span>{values.velocity.toFixed(1)}</span> m/s</p>
          <p>Distance (s = ½at²): <span>{values.distance.toFixed(1)}</span> m</p>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <p>Work Done (W = Fs): <span>{values.workDone.toFixed(1)}</span> J</p>
          <p>Kinetic Energy (Ek = ½mv²): <span>{values.kineticEnergy.toFixed(1)}</span> J</p>
          <p className="font-mono bg-gray-200 p-1 rounded">W = Fs = ½mv² = Ek</p>
        </div>
      </div>
      
      <div className="mt-4 relative h-[40px]">
        <div className="h-[20px] mb-[3px] relative bg-blue-500 transition-all duration-300" style={{ width: `${kineticEnergyPercent}%` }}>
          <span className="absolute left-2 text-white font-bold leading-[20px] text-sm">
            Kinetic Energy
          </span>
        </div>
        
        <div className="h-[20px] relative bg-orange-500 transition-all duration-300" style={{ width: `${workDonePercent}%` }}>
          <span className="absolute left-2 text-white font-bold leading-[20px] text-sm">
            Work Done
          </span>
        </div>
      </div>
    </>
  );
};
