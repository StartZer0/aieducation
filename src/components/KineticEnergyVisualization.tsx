
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

export const KineticEnergyVisualization: React.FC = () => {
  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for input values
  const [mass, setMass] = useState(1.0);
  const [force, setForce] = useState(10.0);
  const [time, setTime] = useState(0.0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // State for calculated values
  const [values, setValues] = useState({
    acceleration: 10.0,
    velocity: 0.0,
    distance: 0.0,
    workDone: 0.0,
    kineticEnergy: 0.0,
  });
  
  // Animation frame reference
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Calculate physics values based on inputs
  const calculateValues = () => {
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
  };
  
  // Update all values when inputs change
  useEffect(() => {
    const newValues = calculateValues();
    setValues(newValues);
    
    // Draw the scene whenever values change
    drawScene();
  }, [mass, force, time]);
  
  // Animation function
  const animate = (timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / 5000, 1); // 5 seconds animation
    
    // Update time based on progress
    const newTime = 5 * progress;
    setTime(newTime);
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
      animationRef.current = null;
      startTimeRef.current = null;
    }
  };
  
  // Toggle animation
  const toggleAnimation = () => {
    if (isPlaying) {
      // Stop animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Start animation
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
      setIsPlaying(true);
    }
  };
  
  // Reset visualization
  const resetVisualization = () => {
    // Stop animation if playing
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    setTime(0);
    setIsPlaying(false);
    startTimeRef.current = null;
  };
  
  // Draw the scene on canvas
  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Parameters for drawing
    const width = canvas.width;
    const height = canvas.height;
    const initialX = 60;
    const groundY = height - 35;
    const objectRadius = 15;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw ground
    ctx.fillStyle = '#333';
    ctx.fillRect(0, groundY, width, 3);
    
    // Calculate current position
    const scaleFactor = 20;
    const scaledDistance = Math.min(values.distance, (width - initialX - objectRadius) / scaleFactor);
    const currentX = initialX + scaledDistance * scaleFactor;
    
    // Draw distance line
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(initialX, groundY + 20);
    ctx.lineTo(currentX, groundY + 20);
    ctx.stroke();
    
    // Distance text
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.fillText(`Distance s = ${values.distance.toFixed(1)} m`, 
                initialX + (currentX - initialX) / 2 - 30, groundY + 30);
    
    // Draw object
    ctx.fillStyle = '#64b5f6';
    ctx.strokeStyle = '#1976d2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentX, groundY - objectRadius, objectRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Draw force arrow
    if (force > 0) {
      const arrowLength = Math.min(40, force * 2);
      ctx.strokeStyle = '#f44336';
      ctx.fillStyle = '#f44336';
      ctx.lineWidth = 6;
      
      ctx.beginPath();
      ctx.moveTo(currentX - arrowLength - 20, groundY - objectRadius);
      ctx.lineTo(currentX - 20, groundY - objectRadius);
      ctx.stroke();
      
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(currentX - 20, groundY - objectRadius);
      ctx.lineTo(currentX - 20 - 12, groundY - objectRadius - 8);
      ctx.lineTo(currentX - 20 - 12, groundY - objectRadius + 8);
      ctx.closePath();
      ctx.fill();
      
      // Force label
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.fillText(`F = ${force.toFixed(1)} N`, 
                  currentX - arrowLength - 10, groundY - objectRadius - 15);
    }
    
    // Velocity label
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.fillText(`v = ${values.velocity.toFixed(1)} m/s`, currentX + 20, groundY - 40);
    
    // Initial position marker
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.fillText('Initial position', initialX - 25, groundY - 40);
  };
  
  // Set up canvas on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    
    // Set canvas size based on container
    canvas.width = containerRef.current.clientWidth - 30; // Adjust for padding
    canvas.height = 500;
    
    // Initialize drawing
    drawScene();
    
    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Update canvas size on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      
      canvasRef.current.width = containerRef.current.clientWidth - 30;
      drawScene();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate energy percentages for display bars
  const maxEnergy = 100;
  const kineticEnergyPercent = Math.min((values.kineticEnergy / maxEnergy) * 100, 100);
  const workDonePercent = Math.min((values.workDone / maxEnergy) * 100, 100);
  
  return (
    <Card className="w-full shadow-sm">
      <div 
        ref={containerRef}
        className="w-full border-0 p-4"
      >
        {/* Canvas for visualization */}
        <canvas 
          ref={canvasRef}
          className="border border-solid border-gray-300 mb-4"
        />
        
        {/* Controls */}
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
              />
            </label>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="mb-4">
          <button 
            onClick={toggleAnimation}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
          >
            {isPlaying ? 'Pause Animation' : 'Play Animation'}
          </button>
          
          <button 
            onClick={resetVisualization}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Reset
          </button>
        </div>
        
        {/* Results display */}
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
        
        {/* Energy bars */}
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
      </div>
    </Card>
  );
};
