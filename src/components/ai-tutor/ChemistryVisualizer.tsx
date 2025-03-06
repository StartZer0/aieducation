
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PeriodicTableVisualization from './PeriodicTableVisualization';
import AtomicStructureVisualization from './AtomicStructureVisualization';
import { Beaker, Atom, Table } from 'lucide-react';

interface ChemistryVisualizerProps {
  currentStage: number;
  progress: number;
  currentTime: number;
}

const ChemistryVisualizer: React.FC<ChemistryVisualizerProps> = ({ 
  currentStage,
  progress,
  currentTime
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'atom'>('table');
  
  // Auto switch tabs based on the current stage
  useEffect(() => {
    if (currentStage <= 1) {
      setActiveTab('table');
    } else if (currentStage >= 2) {
      setActiveTab('atom');
    }
  }, [currentStage]);

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
    <div className="h-full flex flex-col">
      {/* Header with tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex">
          <button
            className={cn(
              "py-3 px-4 inline-flex items-center gap-2 font-medium border-b-2 text-sm",
              activeTab === 'table'
                ? "text-blue-600 border-blue-600"
                : "text-gray-400 border-transparent hover:text-gray-500"
            )}
            onClick={() => setActiveTab('table')}
          >
            <Table className="h-4 w-4" />
            Periodic Table
          </button>
          <button
            className={cn(
              "py-3 px-4 inline-flex items-center gap-2 font-medium border-b-2 text-sm",
              activeTab === 'atom'
                ? "text-blue-600 border-blue-600"
                : "text-gray-400 border-transparent hover:text-gray-500"
            )}
            onClick={() => setActiveTab('atom')}
          >
            <Atom className="h-4 w-4" />
            Atomic Structure
          </button>
        </div>
      </div>
      
      {/* Visualization area */}
      <div className="flex-1 overflow-hidden">
        <div className={cn(
          "h-full transition-opacity duration-500",
          activeTab === 'table' ? "opacity-100" : "opacity-0 hidden"
        )}>
          <PeriodicTableVisualization 
            currentStage={currentStage} 
            highlightedElement={currentStage >= 1 ? 'O' : null}
          />
        </div>
        
        <div className={cn(
          "h-full transition-opacity duration-500",
          activeTab === 'atom' ? "opacity-100" : "opacity-0 hidden"
        )}>
          <AtomicStructureVisualization 
            currentStage={currentStage} 
            progress={progress}
            elementData={oxygenData}
          />
        </div>
      </div>
      
      {/* Information panel */}
      <div className="p-4 border-t border-gray-200 bg-white">
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
  );
};

export default ChemistryVisualizer;
