
import React from 'react';

interface ResultsDisplayProps {
  potentialEnergyLoss: number;
  finalKineticEnergy: number;
  workAgainstFriction: number;
  avgResistiveForce: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  potentialEnergyLoss,
  finalKineticEnergy,
  workAgainstFriction,
  avgResistiveForce
}) => {
  return (
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
  );
};
