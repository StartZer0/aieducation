
import React, { useRef, useEffect, useCallback } from 'react';

interface KineticEnergyCanvasProps {
  values: {
    acceleration: number;
    velocity: number;
    distance: number;
    workDone: number;
    kineticEnergy: number;
  };
  force: number;
  onResize?: () => void;
}

export const KineticEnergyCanvas: React.FC<KineticEnergyCanvasProps> = ({ 
  values, 
  force, 
  onResize 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Draw the scene on canvas
  const drawScene = useCallback(() => {
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
  }, [values, force]);
  
  // Effect to draw scene when values change
  useEffect(() => {
    drawScene();
  }, [values, drawScene]);
  
  // Set up canvas on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    
    // Set canvas size based on container
    canvas.width = containerRef.current.clientWidth - 30; // Adjust for padding
    canvas.height = 500;
    
    // Initialize drawing
    drawScene();
  }, [drawScene]);
  
  // Update canvas size on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      
      canvasRef.current.width = containerRef.current.clientWidth - 30;
      drawScene();
      if (onResize) onResize();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawScene, onResize]);
  
  return (
    <div ref={containerRef} className="w-full">
      <canvas 
        ref={canvasRef}
        className="border border-solid border-gray-300 mb-4"
      />
    </div>
  );
};
