
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import InteractiveQuadraticFunctions from '@/components/study/InteractiveQuadraticFunctions';
import TypewriterText from '@/components/TypewriterText';

const ConceptExplorer = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({
    q1: '',
    q2: '',
    q3: ''
  });
  const [showAnswers, setShowAnswers] = useState({
    q1: false,
    q2: false,
    q3: false
  });

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

  // Sample questions
  const questions = [
    {
      id: 'q1',
      question: 'How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5?',
      correctAnswer: 'orientation',
      explanation: `These two functions differ primarily in their orientation and key points:

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
- The range is (-∞, 7], meaning the function never exceeds y = 7`
    },
    {
      id: 'q2',
      question: 'If you change the value of c in a quadratic function, how does it affect the graph?',
      correctAnswer: 'vertical shift',
      explanation: `When you change the value of c in a quadratic function f(x) = ax² + bx + c:
The value of c serves as a vertical shift for the entire parabola. Increasing c shifts the parabola upward, while decreasing c shifts it downward.

Importantly, changing c does not affect:
- The x-coordinate of the vertex, which remains at x = -b/(2a)
- The axis of symmetry, which also remains at x = -b/(2a)
- The overall shape or width of the parabola, which is determined by a

However, changing c does affect:
- The y-coordinate of the vertex, which becomes c - b²/(4a)
- The y-intercept, which is directly at (0, c)
- The x-intercepts (roots), because solving ax² + bx + c = 0 depends on c`
    },
    {
      id: 'q3',
      question: 'For the function h(x) = 3x² + 12x + 7, find the coordinates of the vertex.',
      correctAnswer: '(-2, -5)',
      explanation: `For h(x) = 3x² + 12x + 7, where a = 3, b = 12, and c = 7:

a) Vertex coordinates:
- x-coordinate: x = -b/(2a) = -12/(2×3) = -12/6 = -2
- y-coordinate: h(-2) = 3(-2)² + 12(-2) + 7 = 3(4) - 24 + 7 = 12 - 24 + 7 = -5
- Therefore, the vertex is at (-2, -5)`
    }
  ];

  const checkAnswer = (questionId: string, userAnswer: string, correctAnswer: string) => {
    // Very simple check - could be made more sophisticated
    return userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());
  };

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
    <div className="container max-w-6xl mx-auto pt-24 pb-12 px-4 min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {showPrompt ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <h1 className="text-3xl font-bold text-center mb-8 text-[#1A1A2E]">
              Concept Explorer
            </h1>
            
            <Card className="shadow-sm rounded-lg overflow-hidden border-0">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block text-lg font-medium text-[#333333]">
                    Enter a topic or concept you'd like to explore:
                  </label>
                  
                  <Textarea
                    placeholder="E.g., 'I want to understand quadratic functions' or 'Explain the principles of quantum mechanics'"
                    className="min-h-[120px] border-gray-200"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? 'Processing...' : 'Explore Concept'}
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
            <h1 className="text-3xl font-bold text-center mb-8 text-[#1A1A2E]">
              Quadratic Functions in A-Level Mathematics
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContentCard 
                title="Overview of Quadratic Functions" 
                content={overviewContent} 
                delay={0.2}
                bgColor="#E8ECF7"
                titleColor="#2563EB"
              />
              
              <ContentCard 
                title="Learning Outcomes and Relevance in A-Levels" 
                content={learningOutcomesContent} 
                delay={0.4}
                bgColor="#F2FCE2"
                titleColor="#16A34A"
              />
              
              <QuestionsCard 
                questions={questions}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                showAnswers={showAnswers}
                setShowAnswers={setShowAnswers}
                checkAnswer={checkAnswer}
                delay={0.6}
              />
              
              <VisualizationCard delay={0.8} />
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
  bgColor: string;
  titleColor: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, content, delay, bgColor, titleColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card 
        className={cn(
          "overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col rounded-lg border-0",
          !isExpanded && `bg-[${bgColor}]`
        )}
        style={{ backgroundColor: !isExpanded ? bgColor : undefined }}
      >
        <CardContent className="p-0 flex flex-col h-full">
          {isExpanded ? (
            <div className="p-6 overflow-auto flex-grow">
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E]">{title}</h2>
              <TypewriterText markdown={content} speed={20} />
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
              <h2 
                className="text-2xl font-bold mb-4" 
                style={{ color: titleColor }}
              >
                {title}
              </h2>
              <p className="text-[#333333]">Click to expand</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface QuestionsCardProps {
  questions: Array<{
    id: string;
    question: string;
    correctAnswer: string;
    explanation: string;
  }>;
  userAnswers: Record<string, string>;
  setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  showAnswers: Record<string, boolean>;
  setShowAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  checkAnswer: (questionId: string, userAnswer: string, correctAnswer: string) => boolean;
  delay: number;
}

const QuestionsCard: React.FC<QuestionsCardProps> = ({ 
  questions, 
  userAnswers, 
  setUserAnswers,
  showAnswers,
  setShowAnswers,
  checkAnswer,
  delay 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const toggleShowAnswer = (questionId: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card 
        className="overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col rounded-lg border-0"
        style={{ backgroundColor: !isExpanded ? "#FEF9E7" : undefined }}
      >
        <CardContent className="p-0 flex flex-col h-full">
          {isExpanded ? (
            <div className="p-6 overflow-auto flex-grow">
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E]">Practice Exam Questions</h2>
              <div className="space-y-6">
                {questions.map((q) => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h3 className="text-lg font-medium mb-3 text-[#1A1A2E]">{q.question}</h3>
                    <div className="flex flex-col gap-3">
                      <Input
                        placeholder="Enter your answer here"
                        value={userAnswers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="border-gray-200"
                      />
                      
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleShowAnswer(q.id)}
                        >
                          {showAnswers[q.id] ? "Hide Solution" : "Check Answer"}
                        </Button>
                        
                        {userAnswers[q.id] && (
                          <div className="flex items-center">
                            {checkAnswer(q.id, userAnswers[q.id], q.correctAnswer) ? (
                              <div className="flex items-center text-green-500">
                                <Check className="w-5 h-5 mr-1" />
                                <span>Correct!</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-red-500">
                                <X className="w-5 h-5 mr-1" />
                                <span>Try again</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {showAnswers[q.id] && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <TypewriterText markdown={q.explanation} speed={20} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
              <h2 className="text-2xl font-bold mb-4 text-[#F59E0B]">
                Practice Exam Questions
              </h2>
              <p className="text-[#333333]">Click to expand</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const VisualizationCard: React.FC<{ delay: number }> = ({ delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card 
        className="overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col rounded-lg border-0"
        style={{ backgroundColor: !isExpanded ? "#E5DEFF" : undefined }}
      >
        <CardContent className="p-0 flex flex-col h-full">
          {isExpanded ? (
            <div className="p-6 overflow-auto flex-grow">
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E]">Interactive Visualisation</h2>
              <p className="mb-4 text-[#333333]">
                Explore how quadratic functions work by adjusting the parameters below. 
                See how changing the values affects the shape and position of the parabola.
              </p>
              <InteractiveQuadraticFunctions />
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
              <h2 className="text-2xl font-bold mb-4 text-[#9333EA]">
                Interactive Visualisation
              </h2>
              <p className="text-[#333333]">Click to explore the interactive elements</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConceptExplorer;
