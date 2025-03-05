
import React from 'react';
import { ArrowLeft, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { InteractiveFunctionGraph } from './InteractiveFunctionGraph';

interface DetailedExplanationProps {
  title: string;
  onBack: () => void;
  term?: string;
  content?: React.ReactNode;
  onClose?: () => void;
}

export function DetailedExplanation({ title, onBack, term, content, onClose }: DetailedExplanationProps) {
  // Use onClose if provided, otherwise fallback to onBack
  const handleClose = onClose || onBack;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold">{title}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Content with scrolling */}
      <div className="flex-grow overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="prose dark:prose-invert prose-blue max-w-none">
            <h1>Quadratic Functions: Detailed Explanation</h1>
            
            <p>
              A quadratic function is a type of polynomial function where the highest exponent of the variable is 2. The standard form of a quadratic function is:
            </p>
            
            <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
              <div className="text-xl text-primary font-medium">
                f(x) = ax² + bx + c
              </div>
            </div>
            
            <p>
              Where a, b, and c are constants and a ≠ 0. The graph of a quadratic function is a parabola, which is a U-shaped curve that can open upward or downward depending on the sign of the coefficient a.
            </p>
            
            <h2>Interactive Exploration</h2>
            
            <p>
              Use the interactive tool below to explore how changing the parameters a, b, and c affects the quadratic function. Drag the sliders to see the graph update in real-time.
            </p>
            
            <div className="my-6 border rounded-lg bg-card/50 p-4">
              <InteractiveFunctionGraph containerId="detailed-interactive-graph" className="mb-4" />
            </div>
            
            <h2>Key Characteristics of Quadratic Functions</h2>
            
            <h3>The Vertex</h3>
            <p>
              The vertex is the highest or lowest point on the parabola, depending on whether the parabola opens downward or upward. For a quadratic function in the form f(x) = ax² + bx + c:
            </p>
            <ul>
              <li>The x-coordinate of the vertex is x = -b/(2a)</li>
              <li>The y-coordinate of the vertex is f(-b/(2a))</li>
              <li>If a {'>'} 0, the vertex is a minimum point</li>
              <li>If a {'<'} 0, the vertex is a maximum point</li>
            </ul>
            
            <h3>The Axis of Symmetry</h3>
            <p>
              The axis of symmetry is a vertical line that passes through the vertex. For any point on the parabola, there is a corresponding point on the other side of the axis of symmetry. The equation of the axis of symmetry is:
            </p>
            <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
              <div className="text-lg text-primary font-medium">
                x = -b/(2a)
              </div>
            </div>
            
            <h3>Intercepts</h3>
            <p>
              The y-intercept is the point where the parabola crosses the y-axis. This occurs when x = 0, so the y-intercept is at (0, c).
            </p>
            <p>
              The x-intercepts are the points where the parabola crosses the x-axis. These occur when f(x) = 0, so they can be found by solving the quadratic equation ax² + bx + c = 0. Using the quadratic formula:
            </p>
            <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
              <div className="text-lg text-primary font-medium">
                x = (-b ± √(b² - 4ac)) / 2a
              </div>
            </div>
            
            <h3>The Discriminant</h3>
            <p>
              The expression b² - 4ac is called the discriminant, and it determines the number of real roots (x-intercepts) that the quadratic equation has:
            </p>
            <ul>
              <li>If b² - 4ac {'>'} 0, the quadratic equation has two distinct real roots (the parabola crosses the x-axis at two points)</li>
              <li>If b² - 4ac = 0, the quadratic equation has one repeated real root (the parabola is tangent to the x-axis at one point)</li>
              <li>If b² - 4ac {'<'} 0, the quadratic equation has no real roots (the parabola does not cross the x-axis)</li>
            </ul>
            
            <h2>Transformations of Quadratic Functions</h2>
            
            <p>
              Starting with the basic quadratic function f(x) = x², we can apply various transformations:
            </p>
            <ul>
              <li><strong>Vertical stretch or compression:</strong> f(x) = ax² (|a| {'>'} 1 stretches, 0 {'<'} |a| {'<'} 1 compresses)</li>
              <li><strong>Reflection across the x-axis:</strong> f(x) = -x² (flips the parabola upside down)</li>
              <li><strong>Horizontal shift:</strong> f(x) = a(x - h)² shifts the parabola h units to the right (if h {'>'} 0) or left (if h {'<'} 0)</li>
              <li><strong>Vertical shift:</strong> f(x) = ax² + k shifts the parabola k units up (if k {'>'} 0) or down (if k {'<'} 0)</li>
            </ul>
            <p>
              The vertex form of a quadratic function, f(x) = a(x - h)² + k, makes these transformations explicit, where (h, k) is the vertex.
            </p>
            
            <h2>Applications of Quadratic Functions</h2>
            
            <p>
              Quadratic functions appear in many real-world scenarios:
            </p>
            <ul>
              <li><strong>Physics:</strong> Projectile motion (position as a function of time)</li>
              <li><strong>Economics:</strong> Profit, revenue, and cost functions</li>
              <li><strong>Geometry:</strong> Area as a function of length or width</li>
              <li><strong>Engineering:</strong> Design of parabolic structures (e.g., satellite dishes, bridges)</li>
            </ul>
            
            <h2>Check Your Understanding</h2>
            
            <div className="space-y-6 my-6">
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Question 1:</p>
                  <Button variant="outline" size="sm" className="h-7">
                    Show Answer
                  </Button>
                </div>
                <p>
                  A quadratic function has a y-intercept at (0, 3), and its graph passes through the point (2, 7). If the coefficient a = 1, what is the complete function?
                </p>
              </div>
              
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Question 2:</p>
                  <Button variant="outline" size="sm" className="h-7">
                    Show Answer
                  </Button>
                </div>
                <p>
                  The vertex of a parabola is at (-1, 4) and it passes through the point (1, 0). Write the quadratic function in vertex form and standard form.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Question 3:</p>
                  <Button variant="outline" size="sm" className="h-7">
                    Show Answer
                  </Button>
                </div>
                <p>
                  For the function f(x) = 2x² - 8x + 6, find the vertex, axis of symmetry, y-intercept, and x-intercepts.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Question 4:</p>
                  <Button variant="outline" size="sm" className="h-7">
                    Show Answer
                  </Button>
                </div>
                <p>
                  A ball is thrown upward with an initial velocity of 20 m/s from a height of 1.5 m. Its height h in meters after t seconds is given by h(t) = -4.9t² + 20t + 1.5. When does the ball reach its maximum height, and what is that height?
                </p>
              </div>
              
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Question 5:</p>
                  <Button variant="outline" size="sm" className="h-7">
                    Show Answer
                  </Button>
                </div>
                <p>
                  Explain how changing the value of a in a quadratic function affects the width and direction of the parabola. Provide examples to illustrate your explanation.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Question 6:</p>
                  <Button variant="outline" size="sm" className="h-7">
                    Show Answer
                  </Button>
                </div>
                <p>
                  How does the discriminant help us understand the behavior of a quadratic function graphically? Explain with examples.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Question 7:</p>
                  <Button variant="outline" size="sm" className="h-7">
                    Show Answer
                  </Button>
                </div>
                <p>
                  Convert the quadratic function f(x) = 3x² - 12x + 8 to vertex form. Explain what information about the function becomes more apparent in this form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to content
          </Button>
          <Button className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Mark as complete
          </Button>
        </div>
      </div>
    </div>
  );
}
