
import React from 'react';
import { X, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DetailedExplanationProps {
  term: string;
  onClose: () => void;
  content: React.ReactNode;
}

export function DetailedExplanation({ term, onClose, content }: DetailedExplanationProps) {
  const handleFeedback = (type: 'like' | 'dislike') => {
    // In a real app, this would send feedback to the server
    console.log(`User ${type}d the explanation for ${term}`);
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto h-full flex flex-col p-6 pt-16">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 flex items-center"
          onClick={onClose}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to content
        </Button>
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary mb-2">
                {term.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h1>
              <p className="text-muted-foreground">Detailed explanation and interactive examples</p>
            </div>
            
            {term === "function" ? (
              <div className="space-y-6">
                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">What is a Function?</h2>
                  <p className="mb-4">A function is a special relationship between inputs and outputs where each input has exactly one output. Think of a function as a machine that takes an input value, processes it according to a specific rule, and produces an output value.</p>
                  
                  <div className="flex items-center justify-center gap-4 my-6 flex-wrap">
                    <div className="p-3 border rounded-md text-center min-w-[80px]">Input (x)</div>
                    <div className="text-primary">→</div>
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-center min-w-[120px]">
                      Function f(x)
                    </div>
                    <div className="text-primary">→</div>
                    <div className="p-3 border rounded-md text-center min-w-[80px]">Output y</div>
                  </div>
                  
                  <p>In mathematics, a function is defined as a relation between a set of inputs (domain) and a set of permissible outputs (range) with the property that each input is related to exactly one output.</p>
                </div>
                
                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Key Characteristics</h2>
                  <ul className="space-y-2 list-disc pl-5">
                    <li><strong>One output per input:</strong> Each input value can only produce one output value.</li>
                    <li><strong>Domain:</strong> The set of all possible input values.</li>
                    <li><strong>Range:</strong> The set of all possible output values.</li>
                    <li><strong>Function notation:</strong> We write f(x) to denote "the value of the function f at input x".</li>
                  </ul>
                </div>
                
                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Function Representations</h2>
                  <p className="mb-4">Functions can be represented in multiple ways:</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Equation Form</h3>
                      <div className="bg-muted p-3 rounded-md text-center">
                        f(x) = 2x + 3
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Table Form</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border p-2">x (Input)</th>
                              <td className="border p-2">-2</td>
                              <td className="border p-2">-1</td>
                              <td className="border p-2">0</td>
                              <td className="border p-2">1</td>
                              <td className="border p-2">2</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="border p-2">f(x) (Output)</th>
                              <td className="border p-2">-1</td>
                              <td className="border p-2">1</td>
                              <td className="border p-2">3</td>
                              <td className="border p-2">5</td>
                              <td className="border p-2">7</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Educational Video Resources</h2>
                  <p className="mb-4">These educational videos will help enhance your understanding of functions:</p>
                  
                  <div className="space-y-3">
                    <a href="https://www.youtube.com/watch?v=kvGsIo1TmsM" 
                       className="block p-3 border rounded-md hover:bg-accent transition-colors" 
                       target="_blank" rel="noopener noreferrer">
                      <div className="font-medium">What is a Function? - Khan Academy</div>
                      <p className="text-sm text-muted-foreground">A clear introduction to the concept of functions and how they work.</p>
                    </a>
                    
                    <a href="https://www.youtube.com/watch?v=C6F33Ir-sY4" 
                       className="block p-3 border rounded-md hover:bg-accent transition-colors" 
                       target="_blank" rel="noopener noreferrer">
                      <div className="font-medium">Introduction to Function Transformations - Khan Academy</div>
                      <p className="text-sm text-muted-foreground">Learn how to transform functions by shifting, stretching, and reflecting.</p>
                    </a>
                  </div>
                </div>
                
                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Check Your Understanding</h2>
                  <div className="p-4 border rounded-md mb-4">
                    <h3 className="font-medium mb-2">Question 1:</h3>
                    <p className="mb-3">If f(x) = 3x + 4, what is f(2)?</p>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">a) 7</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">b) 8</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer bg-blue-100 dark:bg-blue-900/30">c) 10</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">d) 14</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Detailed content for "{term}" would be displayed here.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between items-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Was this explanation helpful?
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleFeedback('like')}
            >
              <ThumbsUp className="w-4 h-4" />
              Yes
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleFeedback('dislike')}
            >
              <ThumbsDown className="w-4 h-4" />
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
