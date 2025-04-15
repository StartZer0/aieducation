
import React from 'react';

interface ProblemDescriptionProps {
  mass: number;
  height: number;
  distance: number;
  finalSpeed: number;
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  mass,
  height,
  distance,
  finalSpeed
}) => {
  return (
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
  );
};
