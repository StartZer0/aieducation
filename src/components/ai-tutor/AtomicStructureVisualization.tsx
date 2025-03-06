
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  group: number;
  period: number;
  block: string;
  electronConfiguration: string;
  valenceElectrons: number;
  electronegativity: number;
  description: string;
}

interface AtomicStructureVisualizationProps {
  currentStage: number;
  progress: number;
  elementData: ElementData;
}

const AtomicStructureVisualization: React.FC<AtomicStructureVisualizationProps> = ({ 
  currentStage,
  progress,
  elementData
}) => {
  const [visibleElectrons, setVisibleElectrons] = useState(0);
  const [showValence, setShowValence] = useState(false);
  const [showOrbitalText, setShowOrbitalText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation for electrons appearing
  useEffect(() => {
    if (currentStage === 2) {
      // Start showing electrons one by one
      const totalElectrons = elementData.atomicNumber;
      const timer = setTimeout(() => {
        setVisibleElectrons(Math.min(visibleElectrons + 1, totalElectrons));
      }, 200);
      
      if (visibleElectrons >= 2) { // 1s² complete
        setShowOrbitalText(true);
      }
      
      return () => clearTimeout(timer);
    } else if (currentStage === 3) {
      // Show all electrons immediately
      setVisibleElectrons(elementData.atomicNumber);
      setShowValence(true);
    } else {
      setVisibleElectrons(0);
      setShowValence(false);
      setShowOrbitalText(false);
    }
  }, [currentStage, visibleElectrons, elementData.atomicNumber]);
  
  // Animation loop for electron movement
  useEffect(() => {
    if (!canvasRef.current || visibleElectrons === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up high-resolution canvas
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);
    
    // Configure orbits
    const orbits = [
      { radius: 30, electrons: 2, speed: 0.01, color: '#3b82f6' },  // K shell (1s)
      { radius: 60, electrons: 8, speed: 0.007, color: '#10b981' }, // L shell (2s, 2p)
      // Add more shells as needed for heavier elements
    ];
    
    let animationFrame: number;
    let angle = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw nucleus
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      
      // Draw orbits and electrons
      let electronCount = 0;
      
      orbits.forEach((orbit, orbitIndex) => {
        // Draw orbit path
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, orbit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#d1d5db';
        ctx.stroke();
        
        // Only draw electrons that are "visible" based on current animation state
        const orbitElectrons = Math.min(orbit.electrons, visibleElectrons - electronCount);
        
        if (orbitElectrons > 0) {
          // Draw electrons
          for (let i = 0; i < orbitElectrons; i++) {
            const electronAngle = angle + (Math.PI * 2 * i / orbit.electrons);
            const x = width / 2 + Math.cos(electronAngle * orbit.speed) * orbit.radius;
            const y = height / 2 + Math.sin(electronAngle * orbit.speed) * orbit.radius;
            
            // Determine if this is a valence electron
            const isValence = orbitIndex === orbits.length - 1;
            
            // Draw electron
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            
            // If showing valence and this is a valence electron, highlight it
            if (showValence && isValence) {
              ctx.fillStyle = '#8b5cf6';
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 2;
              ctx.stroke();
            } else {
              ctx.fillStyle = orbit.color;
            }
            
            ctx.fill();
          }
        }
        
        electronCount += orbit.electrons;
      });
      
      // Increment angle for animation
      angle += 0.01;
      
      // Continue animation
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [visibleElectrons, showValence]);
  
  return (
    <div className="h-full relative flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Canvas for atom visualization */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-64"
        style={{ touchAction: 'none' }}
      />
      
      {/* Electron configuration display */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Electron Configuration
        </h3>
        
        <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300">
          <span className={cn(
            "transition-opacity duration-500",
            showOrbitalText ? "opacity-100" : "opacity-0"
          )}>
            <span className="font-mono bg-blue-100 px-2 py-1 rounded mr-2">1s²</span>
            <span className="font-mono bg-green-100 px-2 py-1 rounded mr-2">2s²</span>
            <span className="font-mono bg-green-100 px-2 py-1 rounded">2p⁴</span>
          </span>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cn(
            "bg-white p-3 rounded-lg border transition-all duration-500 transform",
            currentStage === 3 ? "border-purple-300 shadow-md scale-105" : "border-gray-200",
            currentStage < 2 ? "opacity-0" : "opacity-100"
          )}>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Shell Structure</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>K Shell (n=1):</span>
                <span className="font-medium">{Math.min(2, visibleElectrons)} electrons</span>
              </div>
              <div className="flex justify-between">
                <span>L Shell (n=2):</span>
                <span className="font-medium">{Math.min(8, Math.max(0, visibleElectrons - 2))} electrons</span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "bg-white p-3 rounded-lg border transition-all duration-500 transform",
            currentStage === 3 ? "border-blue-300 shadow-md scale-105" : "border-gray-200",
            currentStage < 3 ? "opacity-0" : "opacity-100"
          )}>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Reactivity Profile</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Valence Electrons:</span>
                <span className="font-medium text-purple-600">{elementData.valenceElectrons}</span>
              </div>
              <div className="flex justify-between">
                <span>Electronegativity:</span>
                <span className="font-medium">{elementData.electronegativity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Annotations that appear based on the stage */}
      {currentStage === 2 && (
        <div className="absolute top-16 left-1/4 bg-blue-100 p-2 rounded-lg border border-blue-300 shadow-md transform -rotate-6 text-sm w-40">
          <div className="font-medium text-blue-800">1s² 2s² 2p⁴</div>
          <div className="text-blue-600 text-xs">Oxygen has 8 electrons arranged in 2 shells</div>
        </div>
      )}
      
      {currentStage === 3 && (
        <div className="absolute top-24 right-1/4 bg-purple-100 p-2 rounded-lg border border-purple-300 shadow-md transform rotate-6 text-sm w-48">
          <div className="font-medium text-purple-800">6 Valence Electrons</div>
          <div className="text-purple-600 text-xs">Makes oxygen highly reactive with metals, which tend to lose electrons</div>
        </div>
      )}
    </div>
  );
};

export default AtomicStructureVisualization;
