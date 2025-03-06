
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CircularPeriodicTable from './CircularPeriodicTable';
import AtomicStructureVisualization from './AtomicStructureVisualization';

interface InteractiveElementVisualizerProps {
  currentStage: number;
  progress: number;
  currentTime: number;
  isVisible: boolean;
  activeView: 'table' | 'atom';
}

const InteractiveElementVisualizer: React.FC<InteractiveElementVisualizerProps> = ({ 
  currentStage,
  progress,
  currentTime,
  isVisible,
  activeView
}) => {
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

  return (
    <div className={cn(
      "h-full transition-all duration-1000 transform",
      !isVisible && "opacity-0 scale-95",
      isVisible && animationPhase >= 1 && "opacity-100 scale-100"
    )}>
      <div className="h-full flex flex-col">
        {/* Main visualization area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Periodic Table View */}
          <div className={cn(
            "absolute inset-0 h-full w-full transition-all duration-500",
            activeView === 'table' ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
          )}>
            <div className="h-full w-full bg-[#121212]">
              <CircularPeriodicTable 
                highlightedElement={currentStage >= 1 ? 'O' : null}
                isActive={activeView === 'table' && isVisible && animationPhase >= 2}
              />
            </div>
          </div>
          
          {/* Atomic Structure View */}
          <div className={cn(
            "absolute inset-0 h-full w-full transition-all duration-500",
            activeView === 'atom' ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
          )}>
            <AtomicStructureVisualization 
              currentStage={currentStage} 
              progress={progress}
              elementData={oxygenData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveElementVisualizer;
