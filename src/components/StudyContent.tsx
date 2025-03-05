
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Book, HelpCircle } from 'lucide-react';

interface StudyContentProps {
  title: string;
  content: React.ReactNode;
  breadcrumbs: {
    id: string;
    title: string;
    path: string;
  }[];
  prevLesson?: {
    id: string;
    title: string;
    path: string;
  };
  nextLesson?: {
    id: string;
    title: string;
    path: string;
  };
}

const StudyContent = ({ title, content, breadcrumbs, prevLesson, nextLesson }: StudyContentProps) => {
  const [showTermDefinition, setShowTermDefinition] = useState<Record<string, boolean>>({});
  
  const toggleTermDefinition = (termId: string) => {
    setShowTermDefinition(prev => ({
      ...prev,
      [termId]: !prev[termId]
    }));
  };
  
  const HighlightTerm = ({ id, children, color = 'blue' }: { id: string; children: React.ReactNode; color?: 'blue' | 'green' | 'orange' }) => {
    const colorClasses = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50',
      green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
      orange: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50',
    };
    
    return (
      <span className="relative inline-block">
        <button
          onClick={() => toggleTermDefinition(id)}
          className={`highlight-term ${colorClasses[color]}`}
        >
          {children}
        </button>
        
        {showTermDefinition[id] && (
          <div className="absolute z-10 left-0 top-full mt-1 w-64 p-3 bg-card border border-border rounded-lg shadow-lg animate-fade-in">
            <div className="text-sm">
              <div className="font-medium mb-1 pb-1 border-b border-border text-blue">{id}</div>
              <p className="text-foreground/80">
                {id === 'quadratic-formula' && (
                  <>The quadratic formula is used to solve equations in the form ax² + bx + c = 0, giving us x = (-b ± √(b² - 4ac)) / 2a.</>
                )}
                {id === 'function' && (
                  <>A mathematical relationship that assigns exactly one output to each input value. Usually written as f(x).</>
                )}
                {id === 'parabola' && (
                  <>A U-shaped curve that represents the graph of a quadratic function, such as y = x².</>
                )}
              </p>
            </div>
          </div>
        )}
      </span>
    );
  };
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1 p-4 border-b border-border text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.id}>
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
            <a 
              href={crumb.path} 
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {crumb.title}
            </a>
          </React.Fragment>
        ))}
      </nav>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
          
          <div className="prose prose-lg max-w-none">
            {content || (
              <>
                <p>
                  In this lesson, we'll explore quadratic functions and how they form the foundation of many mathematical concepts. A <HighlightTerm id="function">function</HighlightTerm> is a mathematical relationship that assigns exactly one output value to each input value.
                </p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">Quadratic Functions</h2>
                
                <p>
                  A quadratic function has the form f(x) = ax² + bx + c, where a, b, and c are constants and a ≠ 0. The graph of a quadratic function is called a <HighlightTerm id="parabola" color="green">parabola</HighlightTerm>.
                </p>
                
                <div className="my-6 w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-lg font-medium">Interactive Graph</div>
                    <div className="text-muted-foreground text-sm">Visualization of y = x² + 2x - 3</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-6 mb-4">Solving Quadratic Equations</h3>
                
                <p>
                  To find the roots of a quadratic equation (where the function equals zero), we can use the <HighlightTerm id="quadratic-formula" color="orange">quadratic formula</HighlightTerm>:
                </p>
                
                <div className="my-4 p-4 bg-blue/5 border border-blue/10 rounded-lg text-center">
                  <div className="text-xl text-blue-600 dark:text-blue-400 font-medium">
                    x = (-b ± √(b² - 4ac)) / 2a
                  </div>
                </div>
                
                <p>
                  This formula gives us the x-values where the parabola crosses the x-axis, which are the solutions to the equation ax² + bx + c = 0.
                </p>
                
                <div className="mt-8 bg-card border border-border rounded-lg p-5">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <HelpCircle className="w-5 h-5 text-blue" />
                    </div>
                    <h4 className="text-lg font-semibold">Reflection Question</h4>
                  </div>
                  <p className="mb-3">
                    How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5? Think about the shape, direction, and key points.
                  </p>
                  <button className="button-primary text-sm">
                    Show Answer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        {prevLesson ? (
          <a 
            href={prevLesson.path} 
            className="flex items-center text-sm font-medium text-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Previous: {prevLesson.title}</span>
          </a>
        ) : (
          <div></div>
        )}
        
        {nextLesson && (
          <a 
            href={nextLesson.path} 
            className="flex items-center text-sm font-medium text-blue hover:underline"
          >
            <span>Next: {nextLesson.title}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default StudyContent;
