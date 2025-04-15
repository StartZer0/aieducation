
import { useState, useCallback, useEffect } from 'react';

interface KineticEnergyValues {
  acceleration: number;
  velocity: number;
  distance: number;
  workDone: number;
  kineticEnergy: number;
}

export const useKineticEnergyCalculation = (mass: number, force: number, time: number) => {
  const [values, setValues] = useState<KineticEnergyValues>({
    acceleration: 10.0,
    velocity: 0.0,
    distance: 0.0,
    workDone: 0.0,
    kineticEnergy: 0.0,
  });
  
  // Calculate physics values based on inputs
  const calculateValues = useCallback(() => {
    const acceleration = force / mass;
    const velocity = acceleration * time;
    const distance = 0.5 * acceleration * time * time;
    const workDone = force * distance;
    const kineticEnergy = 0.5 * mass * velocity * velocity;
    
    return {
      acceleration,
      velocity,
      distance,
      workDone,
      kineticEnergy
    };
  }, [mass, force, time]);
  
  // Update values when inputs change
  useEffect(() => {
    const newValues = calculateValues();
    setValues(newValues);
  }, [mass, force, time, calculateValues]);
  
  // Calculate energy percentages for display bars
  const maxEnergy = 100;
  const kineticEnergyPercent = Math.min((values.kineticEnergy / maxEnergy) * 100, 100);
  const workDonePercent = Math.min((values.workDone / maxEnergy) * 100, 100);
  
  return {
    values,
    kineticEnergyPercent,
    workDonePercent,
  };
};
