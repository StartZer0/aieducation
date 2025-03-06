
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CircularPeriodicTable from './CircularPeriodicTable';
import AtomicStructureVisualization from './AtomicStructureVisualization';

interface InteractiveElementVisualizerProps {
  currentStage: number;
  progress: number;
  currentTime: number;
  isVisible: boolean;
}

const InteractiveElementVisualizer: React.FC<InteractiveElementVisualizerProps> = ({ 
  currentStage,
  progress,
  currentTime,
  isVisible
}) => {
  const [activeView, setActiveView] = useState<'table' | 'atom'>('table');
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Element data for oxygen
  const oxygenData = {
    atomicNumber: 8,
    symbol: 'O',
    name: 'Oxygen',
    atomicMass: 15.999,
    category: 'nonmetal',
    group: 16,
    period: 2,
    block: 'p',
    electronConfiguration: '1s² 2s² 2p⁴',
    valenceElectrons: 6,
    electronegativity: 3.44,
    description: 'Colorless gas essential for respiration and combustion. Makes up about 21% of Earth\'s atmosphere.'
  };
  
  // Auto switch between table and atom view based on the current stage
  useEffect(() => {
    if (currentStage <= 1) {
      setActiveView('table');
    } else if (currentStage >= 2) {
      setActiveView('atom');
    }
  }, [currentStage]);

  // Animation phase based on visibility and stage
  useEffect(() => {
    if (!isVisible) {
      setAnimationPhase(0);
      return;
    }
    
    // Start animation sequence
    const timeout1 = setTimeout(() => {
      setAnimationPhase(1); // Initial appearance
    }, 300);
    
    const timeout2 = setTimeout(() => {
      setAnimationPhase(2); // Content appearance
    }, 1000);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isVisible]);
  
  // Generate information items based on the current stage
  const getStageInfo = () => {
    switch(currentStage) {
      case 0:
        return [
          { label: "Exploring", value: "Electron Configuration", highlight: true },
          { label: "Element", value: "Oxygen (O)", highlight: true },
          { label: "Status", value: "Waiting for response..." }
        ];
      case 1:
        return [
          { label: "Element", value: "Oxygen (O)", highlight: true },
          { label: "Atomic Number", value: "8" },
          { label: "Group", value: "16", highlight: true },
          { label: "Period", value: "2", highlight: true }
        ];
      case 2:
        return [
          { label: "Electron Configuration", value: "1s² 2s² 2p⁴", highlight: true },
          { label: "K Shell", value: "2 electrons" },
          { label: "L Shell", value: "6 electrons", highlight: true }
        ];
      case 3:
        return [
          { label: "Valence Electrons", value: "6", highlight: true },
          { label: "Electronegativity", value: "3.44", highlight: true },
          { label: "Reactivity", value: "High with metals", highlight: true },
          { label: "Common Compounds", value: "H₂O, CO₂, Metal Oxides" }
        ];
      default:
        return [];
    }
  };

  return (
    <div className={cn(
      "h-full transition-all duration-1000 transform",
      !isVisible && "opacity-0 scale-95",
      isVisible && animationPhase >= 1 && "opacity-100 scale-100"
    )}>
      <div className="h-full flex flex-col">
        {/* Main visualization area */}
        <div className="flex-1 overflow-hidden">
          {/* Periodic Table */}
          <div className={cn(
            "h-full w-full transition-all duration-1000",
            activeView === 'table' ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
          )}>
            <div className="h-full w-full bg-[#121212]">
              <CircularPeriodicTable 
                highlightedElement={currentStage >= 1 ? 'O' : null}
                isActive={activeView === 'table' && isVisible && animationPhase >= 2}
              />
            </div>
          </div>
          
          {/* Atomic Structure */}
          <div className={cn(
            "h-full w-full transition-all duration-1000",
            activeView === 'atom' ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
          )}>
            <AtomicStructureVisualization 
              currentStage={currentStage} 
              progress={progress}
              elementData={oxygenData}
            />
          </div>
        </div>
        
        {/* Information panel */}
        <div className={cn(
          "p-4 border-t border-gray-200 bg-white transition-all duration-500",
          animationPhase >= 2 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
        )}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {getStageInfo().map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-500 text-sm">{item.label}:</span>
                <span className={cn(
                  "text-sm font-medium",
                  item.highlight ? "text-blue-600" : "text-gray-700",
                  item.highlight && currentStage > 0 && "animate-pulse"
                )}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveElementVisualizer;
