
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PeriodicTableVisualizationProps {
  currentStage: number;
  highlightedElement: string | null;
}

// Define element categories for coloring
const categories = {
  "noble gas": "bg-purple-100 border-purple-200 text-purple-800",
  "alkali metal": "bg-red-100 border-red-200 text-red-800",
  "alkaline earth metal": "bg-orange-100 border-orange-200 text-orange-800",
  "transition metal": "bg-yellow-100 border-yellow-200 text-yellow-800",
  "post-transition metal": "bg-green-100 border-green-200 text-green-800",
  "metalloid": "bg-teal-100 border-teal-200 text-teal-800",
  "nonmetal": "bg-blue-100 border-blue-200 text-blue-800",
  "halogen": "bg-indigo-100 border-indigo-200 text-indigo-800",
  "lanthanide": "bg-pink-100 border-pink-200 text-pink-800",
  "actinide": "bg-rose-100 border-rose-200 text-rose-800"
};

const PeriodicTableVisualization: React.FC<PeriodicTableVisualizationProps> = ({ 
  currentStage,
  highlightedElement
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [focusPosition, setFocusPosition] = useState({ x: 50, y: 50 });
  
  // Sample elements data for a simplified periodic table
  const elements = [
    { symbol: 'H', name: 'Hydrogen', number: 1, category: 'nonmetal', group: 1, period: 1 },
    { symbol: 'He', name: 'Helium', number: 2, category: 'noble gas', group: 18, period: 1 },
    
    { symbol: 'Li', name: 'Lithium', number: 3, category: 'alkali metal', group: 1, period: 2 },
    { symbol: 'Be', name: 'Beryllium', number: 4, category: 'alkaline earth metal', group: 2, period: 2 },
    { symbol: 'B', name: 'Boron', number: 5, category: 'metalloid', group: 13, period: 2 },
    { symbol: 'C', name: 'Carbon', number: 6, category: 'nonmetal', group: 14, period: 2 },
    { symbol: 'N', name: 'Nitrogen', number: 7, category: 'nonmetal', group: 15, period: 2 },
    { symbol: 'O', name: 'Oxygen', number: 8, category: 'nonmetal', group: 16, period: 2 },
    { symbol: 'F', name: 'Fluorine', number: 9, category: 'halogen', group: 17, period: 2 },
    { symbol: 'Ne', name: 'Neon', number: 10, category: 'noble gas', group: 18, period: 2 },
    
    { symbol: 'Na', name: 'Sodium', number: 11, category: 'alkali metal', group: 1, period: 3 },
    { symbol: 'Mg', name: 'Magnesium', number: 12, category: 'alkaline earth metal', group: 2, period: 3 },
    { symbol: 'Al', name: 'Aluminum', number: 13, category: 'post-transition metal', group: 13, period: 3 },
    { symbol: 'Si', name: 'Silicon', number: 14, category: 'metalloid', group: 14, period: 3 },
    { symbol: 'P', name: 'Phosphorus', number: 15, category: 'nonmetal', group: 15, period: 3 },
    { symbol: 'S', name: 'Sulfur', number: 16, category: 'nonmetal', group: 16, period: 3 },
    { symbol: 'Cl', name: 'Chlorine', number: 17, category: 'halogen', group: 17, period: 3 },
    { symbol: 'Ar', name: 'Argon', number: 18, category: 'noble gas', group: 18, period: 3 },
  ];

  // Effect to zoom into oxygen when it's highlighted
  useEffect(() => {
    if (highlightedElement === 'O') {
      // Zoom in on oxygen
      setZoomLevel(2.5);
      // Focus on oxygen's position (group 16, period 2)
      setFocusPosition({ x: 80, y: 30 });
    } else {
      // Reset zoom
      setZoomLevel(1);
      setFocusPosition({ x: 50, y: 50 });
    }
  }, [highlightedElement]);

  return (
    <div className="h-full w-full bg-gray-50 overflow-hidden flex items-center justify-center">
      <div 
        className="transition-all duration-1000 ease-in-out"
        style={{ 
          transform: `scale(${zoomLevel})`,
          transformOrigin: `${focusPosition.x}% ${focusPosition.y}%` 
        }}
      >
        <div className="grid grid-cols-18 gap-1 p-4 max-w-3xl mx-auto">
          {/* Column headers (groups) */}
          {Array.from({ length: 18 }, (_, i) => (
            <div key={`header-${i+1}`} className="h-6 flex items-center justify-center">
              <span className="text-xs text-gray-500">{i+1}</span>
            </div>
          ))}
          
          {/* Placeholder cells to create the periodic table structure */}
          {Array.from({ length: 18 * 7 }).map((_, index) => {
            const group = (index % 18) + 1;
            const period = Math.floor(index / 18) + 1;
            
            // Find if there's an element at this position
            const element = elements.find(e => e.group === group && e.period === period);
            
            if (!element) {
              return <div key={`cell-${index}`} className="h-12 w-12"></div>;
            }
            
            // Determine if this element should be highlighted
            const isHighlighted = highlightedElement === element.symbol;
            
            return (
              <div 
                key={`element-${element.symbol}`}
                className={cn(
                  "h-12 w-12 rounded border flex flex-col items-center justify-center relative transition-all",
                  categories[element.category as keyof typeof categories],
                  isHighlighted && "ring-4 ring-blue-500 shadow-lg transform scale-110 z-10"
                )}
              >
                <div className="absolute top-1 left-1 text-[0.6rem]">{element.number}</div>
                <div className="text-sm font-bold">{element.symbol}</div>
                <div className="text-[0.5rem]">{element.name}</div>
                
                {/* Pulse effect for highlighted element */}
                {isHighlighted && (
                  <div className="absolute inset-0 rounded bg-blue-400 opacity-20 animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Element information card that appears when an element is highlighted */}
        {highlightedElement === 'O' && (
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg border border-blue-200 w-64 opacity-90">
            <h3 className="font-bold text-lg flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mr-2">8</span>
              Oxygen (O)
            </h3>
            <hr className="my-2"/>
            <div className="space-y-1 text-sm">
              <div className="grid grid-cols-2">
                <span className="text-gray-500">Group:</span>
                <span className="font-medium">16 (Chalcogens)</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-gray-500">Period:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium">Nonmetal</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-gray-500">State at STP:</span>
                <span className="font-medium">Gas</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-gray-500">Atomic Mass:</span>
                <span className="font-medium">15.999 u</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodicTableVisualization;
