
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export const PendulumMotionVisualization: React.FC = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const pendulumPathRef = useRef<HTMLDivElement>(null);
  const pendulumPivotRef = useRef<HTMLDivElement>(null);
  const pendulumStringRef = useRef<HTMLDivElement>(null);
  const pendulumBobRef = useRef<HTMLDivElement>(null);
  const initialPositionMarkerRef = useRef<HTMLDivElement>(null);
  const initialHeightLineRef = useRef<HTMLDivElement>(null);
  const initialHeightLabelRef = useRef<HTMLDivElement>(null);
  const initialPositionLabelRef = useRef<HTMLDivElement>(null);
  const equilibriumMarkerRef = useRef<HTMLDivElement>(null);
  const equilibriumLabelRef = useRef<HTMLDivElement>(null);
  const currentHeightLineRef = useRef<HTMLDivElement>(null);
  const currentHeightLabelRef = useRef<HTMLDivElement>(null);
  const velocityLabelRef = useRef<HTMLDivElement>(null);
  const velocityVectorRef = useRef<SVGSVGElement>(null);

  // State
  const [mass, setMass] = useState(1.0);
  const [length, setLength] = useState(1.5);
  const [initialAngle, setInitialAngle] = useState(45);
  const [damping, setDamping] = useState(0.00);
  const [isRunning, setIsRunning] = useState(false);
  const [energyValues, setEnergyValues] = useState({
    potential: 0,
    kinetic: 0,
    total: 0
  });

  // Animation refs
  const angleRef = useRef(45 * Math.PI / 180); // Current angle in radians
  const angularVelocityRef = useRef(0); // Angular velocity in rad/s
  const lastTimestampRef = useRef<number | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Constants
  const GRAVITY = 9.8; // m/s²

  // Initialize visualization
  useEffect(() => {
    if (containerRef.current) {
      initVisualization();
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Update visualization on parameter change
  useEffect(() => {
    if (containerRef.current) {
      resetPendulum();
    }
  }, [mass, length, initialAngle, damping]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      initVisualization();
      updatePendulum();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize visualization dimensions and positioning
  const initVisualization = () => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 300; // Fixed height as per the original code
    const pivotX = width / 2;
    const pivotY = height / 5;
    const scale = height / 3; // Scale to fit visualization

    // Set pendulum pivot position
    if (pendulumPivotRef.current) {
      pendulumPivotRef.current.style.left = `${pivotX}px`;
      pendulumPivotRef.current.style.top = `${pivotY}px`;
    }

    // Set pendulum path
    if (pendulumPathRef.current) {
      pendulumPathRef.current.style.left = `${pivotX - scale * 1.2}px`;
      pendulumPathRef.current.style.top = `${pivotY}px`;
      pendulumPathRef.current.style.width = `${scale * 2.4}px`;
      pendulumPathRef.current.style.height = `${scale * 1.2}px`;
    }

    resetPendulum();
  };

  // Reset pendulum to initial state
  const resetPendulum = () => {
    angleRef.current = initialAngle * Math.PI / 180; // Convert to radians
    angularVelocityRef.current = 0;
    updatePendulum();
  };

  // Update pendulum position and energy
  const updatePendulum = () => {
    if (!containerRef.current || 
        !pendulumPivotRef.current || 
        !pendulumStringRef.current || 
        !pendulumBobRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 300;
    const pivotX = width / 2;
    const pivotY = height / 5;
    const scale = height / 3;
    
    const stringLength = length * scale; // Scaled length in pixels
    const bobX = pivotX + stringLength * Math.sin(angleRef.current);
    const bobY = pivotY + stringLength * Math.cos(angleRef.current);
    
    // Position pendulum elements
    pendulumStringRef.current.style.left = `${pivotX}px`;
    pendulumStringRef.current.style.top = `${pivotY}px`;
    pendulumStringRef.current.style.height = `${stringLength}px`;
    pendulumStringRef.current.style.transform = `rotate(${angleRef.current}rad)`;
    
    pendulumBobRef.current.style.left = `${bobX}px`;
    pendulumBobRef.current.style.top = `${bobY}px`;
    
    // Update position markers
    if (initialPositionMarkerRef.current && initialPositionLabelRef.current && initialHeightLineRef.current && initialHeightLabelRef.current) {
      const initialX = pivotX + stringLength * Math.sin(initialAngle * Math.PI / 180);
      const initialY = pivotY + stringLength * Math.cos(initialAngle * Math.PI / 180);
      
      initialPositionMarkerRef.current.style.left = `${initialX}px`;
      initialPositionMarkerRef.current.style.top = `${initialY}px`;
      
      initialPositionLabelRef.current.style.left = `${initialX + 10}px`;
      initialPositionLabelRef.current.style.top = `${initialY - 20}px`;
      
      initialHeightLineRef.current.style.left = `${initialX}px`;
      initialHeightLineRef.current.style.top = `${pivotY + stringLength}px`;
      initialHeightLineRef.current.style.height = `${initialY - (pivotY + stringLength)}px`;
      
      initialHeightLabelRef.current.style.left = `${initialX - 20}px`;
      initialHeightLabelRef.current.style.top = `${pivotY + stringLength + (initialY - (pivotY + stringLength))/2}px`;
    }
    
    // Equilibrium position
    if (equilibriumMarkerRef.current && equilibriumLabelRef.current) {
      equilibriumMarkerRef.current.style.left = `${pivotX}px`;
      equilibriumMarkerRef.current.style.top = `${pivotY + stringLength}px`;
      
      equilibriumLabelRef.current.style.left = `${pivotX + 10}px`;
      equilibriumLabelRef.current.style.top = `${pivotY + stringLength + 10}px`;
    }
    
    // Current height line
    if (currentHeightLineRef.current && currentHeightLabelRef.current) {
      currentHeightLineRef.current.style.left = `${bobX}px`;
      currentHeightLineRef.current.style.top = `${pivotY + stringLength}px`;
      currentHeightLineRef.current.style.height = `${bobY - (pivotY + stringLength)}px`;
      
      currentHeightLabelRef.current.style.left = `${bobX + 10}px`;
      currentHeightLabelRef.current.style.top = `${pivotY + stringLength + (bobY - (pivotY + stringLength))/2}px`;
    }
    
    // Color the bob based on position
    if (pendulumBobRef.current) {
      const normalizedPos = Math.abs(angleRef.current) / (initialAngle * Math.PI / 180);
      let bobColor = '#000'; // Default black
      
      if (angleRef.current > 0) {
        // Right side - mix black to red based on normalized position
        const redComponent = Math.round(normalizedPos * 255);
        bobColor = `rgb(${redComponent}, 0, 0)`;
      } else if (angleRef.current < 0) {
        // Left side - blue when close to max amplitude
        const blueComponent = Math.round(normalizedPos * 255);
        bobColor = `rgb(0, 0, ${blueComponent})`;
      }
      pendulumBobRef.current.style.backgroundColor = bobColor;
    }
    
    // Velocity vector
    if (velocityVectorRef.current && velocityLabelRef.current) {
      velocityVectorRef.current.style.left = `${bobX - 25}px`;
      velocityVectorRef.current.style.top = `${bobY - 15}px`;
      
      velocityLabelRef.current.style.left = `${bobX + 30}px`;
      velocityLabelRef.current.style.top = `${bobY - 20}px`;
    }
    
    // Calculate energy values
    const h0 = length * (1 - Math.cos(initialAngle * Math.PI / 180)); // Initial height
    const h = length * (1 - Math.cos(angleRef.current)); // Current height
    
    // Potential energy (relative to equilibrium)
    const potentialEnergy = mass * GRAVITY * h;
    // Kinetic energy
    const tangentialVelocityValue = length * angularVelocityRef.current;
    const kineticEnergy = 0.5 * mass * tangentialVelocityValue * tangentialVelocityValue;
    // Total energy (should be constant without damping)
    const totalEnergy = potentialEnergy + kineticEnergy;
    // Maximum energy (all potential at initial position)
    const maxEnergy = mass * GRAVITY * h0;
    
    // Update energy values
    setEnergyValues({
      potential: potentialEnergy,
      kinetic: kineticEnergy,
      total: totalEnergy
    });

    // Calculate energy percentages for display bars
    const potentialEnergyPercent = (potentialEnergy / maxEnergy) * 100;
    const kineticEnergyPercent = (kineticEnergy / maxEnergy) * 100;
    const totalEnergyPercent = (totalEnergy / maxEnergy) * 100;
    
    return {
      potentialEnergyPercent,
      kineticEnergyPercent,
      totalEnergyPercent
    };
  };

  // Animation function
  const animate = (timestamp: number) => {
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
      animationIdRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const deltaTime = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05); // Seconds, capped to prevent large jumps
    lastTimestampRef.current = timestamp;
    
    // Calculate angular acceleration
    const angularAcceleration = -GRAVITY / length * Math.sin(angleRef.current) - damping * angularVelocityRef.current;
    
    // Update angular velocity and angle using Euler method
    angularVelocityRef.current += angularAcceleration * deltaTime;
    angleRef.current += angularVelocityRef.current * deltaTime;
    
    // Update pendulum position and energy
    updatePendulum();
    
    // Continue animation if still running
    if (isRunning) {
      animationIdRef.current = requestAnimationFrame(animate);
    }
  };

  // Toggle animation
  const toggleAnimation = () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    
    if (newRunningState) {
      // Start animation
      lastTimestampRef.current = null;
      animationIdRef.current = requestAnimationFrame(animate);
    } else {
      // Stop animation
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    }
  };

  // Handle reset
  const handleReset = () => {
    if (isRunning) {
      // Stop animation if running
      setIsRunning(false);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    }
    resetPendulum();
  };

  // Calculate energy percentages for display bars
  const percentages = updatePendulum();
  const potentialEnergyPercent = percentages?.potentialEnergyPercent || 0;
  const kineticEnergyPercent = percentages?.kineticEnergyPercent || 0;
  const totalEnergyPercent = percentages?.totalEnergyPercent || 0;

  return (
    <Card className="w-full shadow-sm">
      <div className="w-full border-0 p-4">
        <h2 className="text-xl font-semibold mb-4">Pendulum Motion: Energy Transformation Visualization</h2>
        
        {/* Visualization area */}
        <div ref={containerRef} className="visualization relative w-full h-[300px] border border-solid border-gray-300 mb-4 overflow-hidden">
          <div ref={pendulumPathRef} className="pendulum-path absolute border border-dashed border-gray-400 border-b-0 rounded-tl-[50%] rounded-tr-[50%]"></div>
          <div ref={pendulumPivotRef} className="pendulum-pivot absolute w-[6px] h-[6px] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div ref={pendulumStringRef} className="pendulum-string absolute w-[2px] bg-gray-800 origin-top-center"></div>
          <div ref={pendulumBobRef} className="pendulum-bob absolute w-[20px] h-[20px] bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Position markers */}
          <div ref={initialPositionMarkerRef} className="position-marker absolute w-[10px] h-[10px] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div ref={initialHeightLineRef} className="height-line absolute w-[1px] bg-gray-800 border-l border-dashed border-gray-500"></div>
          <div ref={initialHeightLabelRef} className="annotation absolute text-xs text-gray-800">h₀</div>
          <div ref={initialPositionLabelRef} className="annotation absolute text-xs text-gray-800">Object released at rest</div>
          
          <div ref={equilibriumMarkerRef} className="position-marker absolute w-[10px] h-[10px] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div ref={equilibriumLabelRef} className="annotation absolute text-xs text-gray-800">Object passing through equilibrium</div>
          
          <div ref={currentHeightLineRef} className="height-line absolute w-[1px] bg-gray-800 border-l border-dashed border-gray-500"></div>
          <div ref={currentHeightLabelRef} className="annotation absolute text-xs text-gray-800">h</div>
          
          <div ref={velocityLabelRef} className="annotation absolute text-xs text-gray-800">Velocity v</div>
          <svg ref={velocityVectorRef} className="absolute w-[50px] h-[30px] pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#00BCD4"/>
              </marker>
            </defs>
            <line x1="0" y1="15" x2="40" y2="15" stroke="#00BCD4" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          </svg>
        </div>
        
        {/* Energy bars */}
        <div className="energy-bars h-[60px] relative mb-3">
          <div className="energy-bar h-[20px] mb-[3px] bg-green-500 relative transition-all duration-100" style={{ width: `${potentialEnergyPercent}%` }}>
            <span className="energy-label absolute left-2 text-white font-bold text-sm leading-[20px]">Potential Energy</span>
          </div>
          <div className="energy-bar h-[20px] mb-[3px] bg-blue-500 relative transition-all duration-100" style={{ width: `${kineticEnergyPercent}%` }}>
            <span className="energy-label absolute left-2 text-white font-bold text-sm leading-[20px]">Kinetic Energy</span>
          </div>
          <div className="energy-bar h-[20px] mb-[3px] bg-purple-600 relative transition-all duration-100" style={{ width: `${totalEnergyPercent}%` }}>
            <span className="energy-label absolute left-2 text-white font-bold text-sm leading-[20px]">Total Energy</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="controls flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-sm font-medium mb-1">Pendulum Properties</h3>
            <div className="mb-2">
              <label className="block text-sm">
                Length (m): {length.toFixed(1)}
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.5" 
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-[90%] block" 
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="block text-sm">
                Mass (kg): {mass.toFixed(1)}
                <input 
                  type="range" 
                  min="0.5" 
                  max="3" 
                  step="0.1"
                  value={mass}
                  onChange={(e) => setMass(parseFloat(e.target.value))}
                  className="w-[90%] block" 
                />
              </label>
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-sm font-medium mb-1">Initial Conditions</h3>
            <div className="mb-2">
              <label className="block text-sm">
                Initial Angle (°): {initialAngle}
                <input 
                  type="range" 
                  min="5" 
                  max="80" 
                  step="1"
                  value={initialAngle}
                  onChange={(e) => setInitialAngle(parseInt(e.target.value))}
                  className="w-[90%] block" 
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="block text-sm">
                Damping: {damping.toFixed(2)}
                <input 
                  type="range" 
                  min="0" 
                  max="0.05" 
                  step="0.005"
                  value={damping}
                  onChange={(e) => setDamping(parseFloat(e.target.value))}
                  className="w-[90%] block" 
                />
              </label>
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="mb-4">
          <button 
            onClick={toggleAnimation}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          
          <button 
            onClick={handleReset}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Reset
          </button>
        </div>
        
        {/* Results display */}
        <div className="bg-gray-100 p-4 rounded-md flex flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm"><strong>Energy Values:</strong></p>
            <p className="text-sm">Potential Energy: <span>{energyValues.potential.toFixed(2)}</span> J</p>
            <p className="text-sm">Kinetic Energy: <span>{energyValues.kinetic.toFixed(2)}</span> J</p>
            <p className="text-sm">Total Energy: <span>{energyValues.total.toFixed(2)}</span> J</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm"><strong>Key Relationships:</strong></p>
            <div className="font-mono bg-gray-200 p-1 rounded text-xs mb-1">Potential Energy = mgh</div>
            <div className="font-mono bg-gray-200 p-1 rounded text-xs mb-1">Kinetic Energy = ½mv²</div>
            <div className="font-mono bg-gray-200 p-1 rounded text-xs">At any height h: ½mv² = mgh₀ - mgh</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PendulumMotionVisualization;
