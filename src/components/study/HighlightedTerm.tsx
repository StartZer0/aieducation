
import React, { useState } from 'react';
import { CircleHelp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DetailedExplanation } from './DetailedExplanation';

interface HighlightedTermProps {
  id: string;
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'orange';
  explanation?: string;
}

export function HighlightedTerm({ id, children, color = 'blue', explanation }: HighlightedTermProps) {
  const [showDefinition, setShowDefinition] = useState(false);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50',
    green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
    orange: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50',
  };
  
  const toggleDefinition = () => {
    setShowDefinition(!showDefinition);
    setIsHighlighted(true);
  };

  const closeDefinition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDefinition(false);
  };
  
  const openDetailedExplanation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDefinition(false);
    setShowDetailedExplanation(true);
  };
  
  const closeDetailedExplanation = () => {
    setShowDetailedExplanation(false);
  };
  
  const getExplanation = () => {
    if (explanation) return explanation;
    
    // Default explanations for common terms
    const explanations: Record<string, string> = {
      'quadratic-formula': 'The formula x = (-b ± √(b² - 4ac)) / 2a used to solve quadratic equations in the form ax² + bx + c = 0.',
      'function': 'A mathematical relationship that assigns exactly one output value to each input value, usually written as f(x).',
      'parabola': 'A U-shaped curve that represents the graph of a quadratic function, such as y = x².',
      'minimum-value': 'The lowest point on a parabola when it opens upward (a > 0).',
      'maximum-value': 'The highest point on a parabola when it opens downward (a < 0).',
      'vertex': 'The point where a parabola changes direction, representing either a minimum or maximum value.',
      'axis-of-symmetry': 'A vertical line passing through the vertex of a parabola about which the parabola is symmetric.'
    };
    
    return explanations[id] || `Definition for ${id.replace(/-/g, ' ')}`;
  };
  
  return (
    <span className="relative inline-block">
      <button
        onClick={toggleDefinition}
        className={`py-0.5 px-1.5 rounded ${colorClasses[color]} ${
          isHighlighted ? 'outline outline-2 outline-offset-1 outline-blue-400' : ''
        }`}
      >
        {children}
      </button>
      
      {showDefinition && (
        <Card className="absolute z-50 left-0 top-full mt-1 w-80 p-4 shadow-lg animate-in fade-in-50 zoom-in-95">
          <div className="flex justify-between items-start mb-2">
            <div className="font-semibold text-primary">
              {id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
            <button 
              onClick={closeDefinition}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          
          <div className="text-sm">
            <p className="text-foreground/80 mb-3">
              {getExplanation()}
            </p>
            
            <div className="flex justify-between items-center">
              <button 
                className="text-xs flex items-center text-primary hover:underline"
                onClick={openDetailedExplanation}
              >
                <CircleHelp className="w-3 h-3 mr-1" />
                Detailed Explanation
              </button>
              
              <div className="text-xs text-muted-foreground">
                Click outside to close
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {showDetailedExplanation && (
        <DetailedExplanation 
          term={id} 
          onClose={closeDetailedExplanation} 
          content={null}
        />
      )}
    </span>
  );
}
