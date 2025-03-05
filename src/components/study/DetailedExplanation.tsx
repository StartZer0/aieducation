
import React, { useState, useEffect } from 'react';
import { X, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DetailedExplanationProps {
  term: string;
  onClose: () => void;
  content: React.ReactNode;
}

export function DetailedExplanation({ term, onClose, content }: DetailedExplanationProps) {
  const [likeStatus, setLikeStatus] = useState<'none' | 'liked' | 'disliked'>('none');
  
  const handleFeedback = (type: 'like' | 'dislike') => {
    // In a real app, this would send feedback to the server
    console.log(`User ${type}d the explanation for ${term}`);
    setLikeStatus(type === 'like' ? 'liked' : 'disliked');
  };
  
  useEffect(() => {
    // Add event listener to handle escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-hidden">
      <div className="container max-w-4xl mx-auto h-full flex flex-col p-4 md:p-6 pt-16">
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
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
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
                  
                  <div className="function-machine flex items-center justify-center gap-4 my-6 flex-wrap">
                    <div className="input-box border-2 border-gray-600 rounded-md text-center p-2 min-w-[80px]" id="input-value">x</div>
                    <div className="arrow relative w-[80px] h-[20px] bg-gray-700">
                      <div className="absolute right-[-15px] top-[-10px] border-l-[20px] border-l-gray-700 border-y-[20px] border-y-transparent"></div>
                    </div>
                    <div className="function-box min-w-[150px] h-[100px] bg-blue-500 text-white flex items-center justify-center rounded-lg font-bold text-lg">
                      f(x) = 2x + 3
                    </div>
                    <div className="arrow relative w-[80px] h-[20px] bg-gray-700">
                      <div className="absolute right-[-15px] top-[-10px] border-l-[20px] border-l-gray-700 border-y-[20px] border-y-transparent"></div>
                    </div>
                    <div className="output-box border-2 border-gray-600 rounded-md text-center p-2 min-w-[80px]" id="output-value">?</div>
                  </div>
                  
                  <div className="interactive-section bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-4">
                    <h3 className="font-semibold mb-2">Try it yourself!</h3>
                    <p className="mb-2">Enter a value for x and see what output the function produces:</p>
                    <div className="function-controls flex flex-wrap gap-4 items-center justify-center">
                      <div>
                        <label htmlFor="input-number" className="mr-2">Input (x):</label>
                        <input 
                          type="number" 
                          id="input-number" 
                          defaultValue="0" 
                          className="w-[60px] text-center border rounded p-1"
                          onChange={(e) => {
                            const x = parseFloat(e.target.value || "0");
                            const result = 2 * x + 3;
                            document.getElementById('result-value')!.textContent = result.toString();
                            document.getElementById('input-value')!.textContent = x.toString();
                            document.getElementById('output-value')!.textContent = result.toString();
                          }}
                        />
                      </div>
                      <div>
                        <p>Output f(x): <span id="result-value" className="font-bold">3</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <p>In mathematics, a function is defined as a relation between a set of inputs (domain) and a set of permissible outputs (range) with the property that each input is related to exactly one output.</p>
                </div>
                
                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Interactive Function Graph</h2>
                  <div className="aspect-video border rounded-lg mb-4 bg-gray-50 dark:bg-gray-900">
                    <iframe 
                      src="https://www.desmos.com/calculator/1obkpkkpn4?embed" 
                      className="w-full h-full border-0 rounded-lg"
                      title="Interactive Function Graph"
                      loading="lazy"
                    ></iframe>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Interactive graph showing different function types. You can modify the functions by adjusting the parameters in the Desmos calculator.
                  </p>
                </div>

                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Exploring Different Functions</h2>
                  
                  <div className="function-selector mb-4">
                    <label htmlFor="function-select" className="block mb-2">Select a function type:</label>
                    <select 
                      id="function-select" 
                      className="w-full p-2 border rounded-md"
                      onChange={() => {
                        // Would implement function type switching in a real application
                      }}
                    >
                      <option value="linear">Linear: f(x) = mx + b</option>
                      <option value="quadratic">Quadratic: f(x) = ax² + bx + c</option>
                      <option value="cubic">Cubic: f(x) = ax³ + bx² + cx + d</option>
                      <option value="exponential">Exponential: f(x) = aˣ</option>
                    </select>
                  </div>
                  
                  <div className="linear-controls flex flex-wrap gap-4 justify-center mb-4">
                    <div className="function-control bg-gray-100 dark:bg-gray-800 p-4 rounded-md min-w-[150px]">
                      <label htmlFor="linear-m" className="block mb-1">m (slope):</label>
                      <input 
                        type="range" 
                        id="linear-m" 
                        min="-5" 
                        max="5" 
                        step="0.5" 
                        defaultValue="1" 
                        className="w-full"
                      />
                      <span id="linear-m-value" className="block text-center">1</span>
                    </div>
                    <div className="function-control bg-gray-100 dark:bg-gray-800 p-4 rounded-md min-w-[150px]">
                      <label htmlFor="linear-b" className="block mb-1">b (y-intercept):</label>
                      <input 
                        type="range" 
                        id="linear-b" 
                        min="-5" 
                        max="5" 
                        step="0.5" 
                        defaultValue="0" 
                        className="w-full"
                      />
                      <span id="linear-b-value" className="block text-center">0</span>
                    </div>
                  </div>
                  
                  <div className="aspect-video border rounded-lg bg-gray-50 dark:bg-gray-900 mb-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-muted-foreground text-center">Interactive function graph would appear here</p>
                    </div>
                  </div>
                  
                  <p id="current-function-equation" className="text-center font-medium mb-4">f(x) = 1x + 0</p>
                  
                  <div className="interactive-section bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Function Tester</h3>
                    <p className="mb-2">Enter a value for x to test the current function:</p>
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                      <div>
                        <label htmlFor="test-input" className="mr-2">Input (x):</label>
                        <input 
                          type="number" 
                          id="test-input" 
                          defaultValue="0" 
                          className="w-[60px] text-center border rounded p-1"
                        />
                      </div>
                      <Button variant="secondary" size="sm">Calculate</Button>
                      <div>
                        <p>Output f(x): <span id="test-result" className="font-bold">0</span></p>
                      </div>
                    </div>
                  </div>
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
                  <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Temperature Conversion</h3>
                      <p className="mb-2">The function F(C) = (9/5)C + 32 converts temperature from Celsius to Fahrenheit.</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <label htmlFor="celsius-input">Celsius:</label>
                        <input 
                          type="number" 
                          id="celsius-input" 
                          defaultValue="0" 
                          className="w-[60px] text-center border rounded p-1"
                        />
                        <Button variant="secondary" size="sm">Convert</Button>
                        <span>= <span id="fahrenheit-result" className="font-bold">32</span>°F</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Distance-Time Relationship</h3>
                      <p className="mb-2">If you travel at a constant speed of 60 km/h, the function d(t) = 60t gives the distance traveled in t hours.</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <label htmlFor="time-input">Time (hours):</label>
                        <input 
                          type="number" 
                          id="time-input" 
                          defaultValue="1" 
                          min="0" 
                          step="0.5" 
                          className="w-[60px] text-center border rounded p-1"
                        />
                        <Button variant="secondary" size="sm">Calculate</Button>
                        <span>= <span id="distance-result" className="font-bold">60</span> km</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="section p-6 bg-card rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Educational Video Resources</h2>
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
                  
                  <div className="p-4 border rounded-md mb-4">
                    <h3 className="font-medium mb-2">Question 2:</h3>
                    <p className="mb-3">Which of the following is NOT a function?</p>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">a) y = x²</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">b) y = |x|</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">c) x = y²</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">d) y = 2ˣ</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md mb-4">
                    <h3 className="font-medium mb-2">Question 3:</h3>
                    <p className="mb-3">For the function f(x) = x² - 3x + 2, what is f(-1)?</p>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">a) -2</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">b) 0</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">c) 6</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">d) 8</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md mb-4">
                    <h3 className="font-medium mb-2">Question 4:</h3>
                    <p className="mb-3">Which of the following statements is true about a linear function of the form f(x) = mx + b?</p>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">a) The graph is always a parabola</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">b) The parameter m represents the y-intercept</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">c) The parameter m represents the slope of the line</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">d) The domain of the function is always restricted</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md mb-4">
                    <h3 className="font-medium mb-2">Question 5:</h3>
                    <p className="mb-3">If f(3) = 7 and f(5) = 11, what is the slope of this linear function?</p>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">a) 1</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">b) 2</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">c) 3</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">d) 4</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Question 6:</h3>
                    <p className="mb-3">Consider f(x) = 2x - 3 and g(x) = x² + 1. What is (f ∘ g)(2)?</p>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">a) 3</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">b) 5</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">c) 7</div>
                      <div className="p-2 border rounded-md hover:bg-accent/50 cursor-pointer">d) 9</div>
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
        </ScrollArea>
        
        <div className="mt-8 flex justify-between items-center border-t pt-4">
          {likeStatus === 'none' ? (
            <>
              <div className="text-sm text-muted-foreground">
                Was this explanation helpful?
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20"
                  onClick={() => handleFeedback('like')}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Yes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                  onClick={() => handleFeedback('dislike')}
                >
                  <ThumbsDown className="w-4 h-4" />
                  No
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full text-center text-sm font-medium text-green-600 dark:text-green-400">
              Thanks for your feedback!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
