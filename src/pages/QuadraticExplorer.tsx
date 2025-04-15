
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { InteractiveFunctionGraph } from '@/components/study/InteractiveFunctionGraph';
import { MarkdownRenderer } from '@/components/study/MarkdownRenderer';

const QuadraticExplorer = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Content sections
  const overviewContent = `
# Overview of Quadratic Functions

A quadratic function is a polynomial function of degree 2, expressed in the standard form f(x) = ax² + bx + c, where a, b, and c are constants, and a must not equal zero. The graph of every quadratic function forms a distinctive curve called a parabola. When the coefficient a is positive, the parabola opens upward creating a U-shape, and the function has a minimum value. Conversely, when a is negative, the parabola opens downward in an inverted U-shape, and the function reaches a maximum value at its highest point.

The steepness of the parabola is determined by the absolute value of a. A larger value of |a| creates a narrower, more tightly curved parabola, while a smaller value produces a wider, more gently curved shape. This relationship is important when analyzing how quickly a quadratic function increases or decreases.

Every parabola has a turning point called the vertex, which represents either the minimum or maximum value of the function. For a quadratic in standard form, the vertex occurs at the point (-b/2a, f(-b/2a)). This can also be calculated using the formula (-b/2a, c-b²/4a). The vertex is a crucial feature when sketching graphs or solving optimization problems.

Through the vertex runs a vertical line called the axis of symmetry, located at x = -b/2a. This line divides the parabola into two mirror-image halves, highlighting the perfect symmetry of quadratic functions. When we identify the axis of symmetry, we can use it to find corresponding points on either side of the parabola.

The y-intercept of a quadratic function occurs at the point (0, c), where the parabola crosses the y-axis. The x-intercepts, if they exist, are the points where the parabola crosses the x-axis. These can be found by solving the equation ax² + bx + c = 0 using the quadratic formula: x = (-b ± √(b² - 4ac))/2a.

The expression b² - 4ac, known as the discriminant, reveals important information about the nature of these x-intercepts. When the discriminant is positive, the quadratic equation has two distinct real roots, meaning the parabola crosses the x-axis at two different points. When the discriminant equals zero, there is exactly one real root (a repeated root), indicating that the parabola touches the x-axis at precisely one point. When the discriminant is negative, there are no real roots, signifying that the parabola never intersects the x-axis.
`;

  const learningOutcomesContent = `
# Learning Outcomes and Relevance in A-Levels

Understanding quadratic functions is fundamental to success in A-Level Mathematics as they form the foundation for many advanced mathematical concepts. These functions appear consistently throughout the curriculum and in examination scenarios, making mastery of their properties essential.

In the A-Level syllabus, students are expected to develop proficiency in graphing quadratics and identifying their key features. This includes determining the vertex, axis of symmetry, and intercepts. Students must also become adept at solving quadratic equations using various techniques such as factoring, completing the square, and applying the quadratic formula. The ability to analyze the discriminant to determine the nature of roots is another crucial skill tested in examinations.

Quadratic functions extend beyond pure mathematical interest into practical applications. In mechanics, they model projectile motion, allowing students to calculate maximum heights, flight times, and landing positions. In optimization problems, quadratics help determine maximum profits, minimum costs, or optimal dimensions. Statistics sections may involve quadratic regression models for data analysis.

The study of quadratics also builds essential algebraic manipulation skills that transfer to other areas of mathematics. When students master the techniques of completing the square or working with the discriminant, they develop analytical thinking that proves valuable across the entire A-Level curriculum. Understanding transformations of quadratic functions also prepares students for more complex function transformations in advanced topics.

Real-world applications give context to these abstract concepts. Engineers use quadratics to model arches and cables in suspension bridges. Economists apply them to analyze certain supply and demand relationships. Physicists utilize them to describe motion under constant acceleration. These connections help students appreciate the practical significance of mathematical theory.
`;

  const practiceQuestionsContent = `
# Practice Exam Questions with Answers

## Question 1
How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5?

**Answer:**
These two functions differ primarily in their orientation and key points:

For f(x) = 2x² - 4x + 5:
- Since a = 2 (positive), this parabola opens upward (U-shape)
- The vertex is at (1, 3), calculated from x = -b/(2a) = -(-4)/(2×2) = 1
- The axis of symmetry is the vertical line x = 1
- The y-intercept is at (0, 5)
- This function has no x-intercepts because the discriminant b² - 4ac = (-4)² - 4(2)(5) = 16 - 40 = -24 is negative
- The range is [3, ∞), meaning the function never goes below y = 3

For g(x) = -2x² - 4x + 5:
- Since a = -2 (negative), this parabola opens downward (inverted U-shape)
- The vertex is at (-1, 7), calculated from x = -b/(2a) = -(-4)/(2×(-2)) = -1
- The axis of symmetry is the vertical line x = -1
- The y-intercept is also at (0, 5)
- This function has two x-intercepts because the discriminant is positive
- The range is (-∞, 7], meaning the function never exceeds y = 7

## Question 2
If you change the value of c in a quadratic function, how does it affect the graph?

**Answer:**
When you change the value of c in a quadratic function f(x) = ax² + bx + c:
The value of c serves as a vertical shift for the entire parabola. Increasing c shifts the parabola upward, while decreasing c shifts it downward.

Importantly, changing c does not affect:
- The x-coordinate of the vertex, which remains at x = -b/(2a)
- The axis of symmetry, which also remains at x = -b/(2a)
- The overall shape or width of the parabola, which is determined by a

However, changing c does affect:
- The y-coordinate of the vertex, which becomes c - b²/(4a)
- The y-intercept, which is directly at (0, c)
- The x-intercepts (roots), because solving ax² + bx + c = 0 depends on c

## Question 3
For the function h(x) = 3x² + 12x + 7, find the coordinates of the vertex, determine the axis of symmetry, calculate any x-intercepts, and state the range of the function.

**Answer:**
For h(x) = 3x² + 12x + 7, where a = 3, b = 12, and c = 7:

a) Vertex coordinates:
- x-coordinate: x = -b/(2a) = -12/(2×3) = -12/6 = -2
- y-coordinate: h(-2) = 3(-2)² + 12(-2) + 7 = 3(4) - 24 + 7 = 12 - 24 + 7 = -5
- Therefore, the vertex is at (-2, -5)

b) Axis of symmetry:
- The axis of symmetry passes through the vertex, so it's the vertical line x = -2

c) x-intercepts:
- To find the x-intercepts, solve h(x) = 0, or 3x² + 12x + 7 = 0
- Using the discriminant: b² - 4ac = 12² - 4(3)(7) = 144 - 84 = 60
- Since the discriminant is positive, there are two real x-intercepts
- Using the quadratic formula: x = (-b ± √(b² - 4ac))/(2a) = (-12 ± √60)/(2×3)
- x = (-12 ± √60)/6 = -2 ± √15/3
- x ≈ -3.29 and x ≈ -0.71

d) Range:
- Since a = 3 is positive, the parabola opens upward
- The minimum value occurs at the vertex, which is -5
- Therefore, the range is [-5, ∞)

## Questions 4-5 and additional examples are available in the complete practice set.
`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setShowPrompt(false);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container max-w-6xl mx-auto pt-24 pb-12 px-4 min-h-screen">
      <AnimatePresence mode="wait">
        {showPrompt ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <h1 className="text-3xl font-bold text-center mb-8">
              Quadratic Functions Explorer
            </h1>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block text-lg font-medium">
                    Enter a specific quadratic function topic you'd like to explore:
                  </label>
                  
                  <Textarea
                    placeholder="E.g., 'I want to understand how to find the vertex of a quadratic function' or 'Explain the relationship between the discriminant and the number of roots'"
                    className="min-h-[120px]"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? 'Processing...' : 'Explore Quadratic Functions'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-center mb-8">
              Quadratic Functions in A-Level Mathematics
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContentCard 
                title="Overview of Quadratic Functions" 
                content={overviewContent} 
                delay={0.2}
              />
              
              <ContentCard 
                title="Learning Outcomes and Relevance in A-Levels" 
                content={learningOutcomesContent} 
                delay={0.4}
              />
              
              <ContentCard 
                title="Practice Exam Questions" 
                content={practiceQuestionsContent} 
                delay={0.6}
              />
              
              <InteractiveCard delay={0.8} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ContentCardProps {
  title: string;
  content: string;
  delay: number;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, content, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {isExpanded ? (
            <div className="p-6 overflow-auto flex-grow">
              <MarkdownRenderer markdown={content} />
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => setIsExpanded(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              className="p-6 flex flex-col items-center justify-center h-full text-center cursor-pointer"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <p className="text-muted-foreground">Click to expand</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InteractiveCard: React.FC<{ delay: number }> = ({ delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {isExpanded ? (
            <div className="p-6 overflow-auto flex-grow">
              <h2 className="text-2xl font-bold mb-4">Interactive Quadratic Function Visualisation</h2>
              <p className="mb-4">
                Adjust the parameters below to see how they affect the quadratic function graph.
                Try changing the values of a, b, and c to understand their impact on the shape and position of the parabola.
              </p>
              <InteractiveFunctionGraph />
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => setIsExpanded(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              className="p-6 flex flex-col items-center justify-center h-full text-center cursor-pointer"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h2 className="text-2xl font-bold mb-4">Interactive Quadratic Function Visualisation</h2>
              <p className="text-muted-foreground">Click to explore the interactive graph</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuadraticExplorer;
