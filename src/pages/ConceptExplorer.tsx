import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, X, BookOpen, GraduationCap, PenTool, LineChart } from 'lucide-react';
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

  const overviewContent = `
# Overview of Quadratic Functions

A **quadratic function** is a polynomial function of degree 2, expressed in the standard form f(x) = ax² + bx + c, where a, b, and c are constants, and a must not equal zero. 

The graph of every quadratic function forms a distinctive curve called a **parabola**. When the coefficient a is positive, the parabola opens upward creating a U-shape, and the function has a minimum value. Conversely, when a is negative, the parabola opens downward in an inverted U-shape, and the function reaches a maximum value at its highest point. 

The steepness of the parabola is determined by the absolute value of a. A larger value of |a| creates a narrower, more tightly curved parabola, while a smaller value produces a wider, more gently curved shape. This relationship is important when analyzing how quickly a quadratic function increases or decreases. 

Every parabola has a turning point called the **vertex**, which represents either the minimum or maximum value of the function. For a quadratic in standard form, the vertex occurs at the point (-b/2a, f(-b/2a)). This can also be calculated using the formula (-b/2a, c-b²/4a). The vertex is a crucial feature when sketching graphs or solving optimization problems. 

Through the vertex runs a vertical line called the **axis of symmetry**, located at x = -b/2a. This line divides the parabola into two mirror-image halves, highlighting the perfect symmetry of quadratic functions. When we identify the axis of symmetry, we can use it to find corresponding points on either side of the parabola. 

The **y-intercept** of a quadratic function occurs at the point (0, c), where the parabola crosses the y-axis. The **x-intercepts**, if they exist, are the points where the parabola crosses the x-axis. These can be found by solving the equation ax² + bx + c = 0 using the quadratic formula: x = (-b ± √(b² - 4ac))/2a. 

The expression b² - 4ac, known as the **discriminant**, reveals important information about the nature of these x-intercepts. When the discriminant is positive, the quadratic equation has two distinct real roots, meaning the parabola crosses the x-axis at two different points. When the discriminant equals zero, there is exactly one real root (a repeated root), indicating that the parabola touches the x-axis at precisely one point. When the discriminant is negative, there are no real roots, signifying that the parabola never intersects the x-axis.
`;

  const formattedOverviewContent = `
<div class="flex flex-col space-y-5">
  <div class="bg-white rounded-lg p-4 shadow-sm">
    <p class="font-medium mb-1">Source:</p>
    <p>KS4 Mathematics Curriculum – Term 2 Algebra Module</p>
  </div>

  <div class="bg-white rounded-lg p-4 shadow-sm">
    <p class="font-medium mb-2">Exam Learning Objective in Unit 2.3 Quadratic Functions:</p>
    <ol class="list-decimal list-inside pl-2 space-y-1">
      <li>Recognize and interpret quadratic functions in standard form</li>
      <li>Identify and sketch key features such as vertex, axis of symmetry, and intercepts</li>
      <li>Solve quadratic equations using factorization and the quadratic formula</li>
      <li>Analyze the effect of changing coefficients on the shape and position of the graph</li>
    </ol>
  </div>

  <div class="bg-white rounded-lg p-4 shadow-sm">
    <p class="font-medium mb-2">Practice Question Derived from Source</p>
    <p class="mb-3">The function is defined as:</p>
    <p class="bg-gray-50 px-4 py-2 rounded text-center font-medium mb-4">f(x) = -2x² + 8x - 5</p>
    
    <div class="space-y-4">
      <div>
        <p class="mb-1"><span class="font-semibold">📌 (a)</span> Identify the vertex of the function.</p>
        <p class="text-sm text-indigo-600">(2 marks)</p>
      </div>
      
      <div>
        <p class="mb-1"><span class="font-semibold">📌 (b)</span> State the axis of symmetry and determine whether the vertex is a maximum or minimum.</p>
        <p class="text-sm text-indigo-600">(2 marks)</p>
      </div>
      
      <div>
        <p class="mb-1"><span class="font-semibold">📌 (c)</span> Find the x-intercepts of the function using the quadratic formula.</p>
        <p class="text-sm text-indigo-600">(3 marks)</p>
      </div>
      
      <div>
        <p class="mb-1"><span class="font-semibold">📌 (d)</span> Sketch the graph, clearly showing the intercepts, axis of symmetry, and vertex.</p>
        <p class="text-sm text-indigo-600">(3 marks)</p>
      </div>
    </div>
    
    <p class="text-xs text-gray-500 mt-4 italic">(Generated from KS4 Mathematics Exam Materials, Algebra Track)</p>
  </div>
</div>
`;

  const learningOutcomesContent = `
<div class="flex flex-col space-y-5">
  <div class="text-center mb-4">
    <h2 class="text-xl font-bold text-gray-800">Learning Outcomes and Relevance in A-Levels</h2>
  </div>

  <div class="bg-white rounded-lg p-4 shadow-sm">
    <p class="font-medium mb-1">Source:</p>
    <p>UK A-Level Mathematics Curriculum — Pure Mathematics Strand</p>
  </div>

  <div class="bg-white rounded-lg p-4 shadow-sm">
    <p class="font-medium mb-2">Exam Learning Objective in Quadratic Functions:</p>
    <ul class="space-y-2 pl-2">
      <li class="flex items-start">
        <span class="text-blue-600 mr-2">•</span>
        <span>Graph quadratic functions and identify their features</span>
      </li>
      <li class="flex items-start">
        <span class="text-blue-600 mr-2">•</span>
        <span>Solve quadratic equations using factoring, completing the square, and the quadratic formula</span>
      </li>
      <li class="flex items-start">
        <span class="text-blue-600 mr-2">•</span>
        <span>Interpret and apply the discriminant to classify roots</span>
      </li>
      <li class="flex items-start">
        <span class="text-blue-600 mr-2">•</span>
        <span>Apply quadratics in real-life modeling: mechanics, economics, and optimization</span>
      </li>
      <li class="flex items-start">
        <span class="text-blue-600 mr-2">•</span>
        <span>Understand transformations of quadratic graphs and connect them to other functions</span>
      </li>
    </ul>
  </div>

  <div class="bg-white rounded-lg p-4 shadow-sm">
    <p class="font-medium mb-2">Why This Matters</p>
    <p class="mb-3">
      Quadratic functions form a core part of A-Level Mathematics and are essential for understanding more advanced topics.
      Students learn to graph, transform, and solve quadratics, which builds algebraic fluency and critical thinking.
    </p>
    
    <p class="font-medium mb-2">Real-world applications reinforce relevance:</p>
    
    <ul class="space-y-2">
      <li class="flex items-start">
        <span class="mr-2">📐</span>
        <span><strong>In mechanics:</strong> projectile motion and flight calculations</span>
      </li>
      <li class="flex items-start">
        <span class="mr-2">💰</span>
        <span><strong>In economics:</strong> modeling profit/cost relationships</span>
      </li>
      <li class="flex items-start">
        <span class="mr-2">⚙️</span>
        <span><strong>In engineering:</strong> structural design of arches and bridges</span>
      </li>
    </ul>
    
    <p class="mt-3">
      These skills prepare students for STEM fields and help them see math as a practical, problem-solving tool.
    </p>
  </div>
</div>
`;

  const questions = [
    {
      id: 'q1',
      question: 'How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5?',
      correctAnswer: 'orientation',
      explanation: `## Comparing the Functions

### For f(x) = 2x² - 4x + 5:
* a = 2 (positive) → parabola opens **upward** (U-shape)
* Vertex at (1, 3)
* Axis of symmetry: x = 1
* y-intercept: (0, 5)
* No x-intercepts (discriminant = -24, negative)
* Range: [3, ∞)

### For g(x) = -2x² - 4x + 5:
* a = -2 (negative) → parabola opens **downward** (inverted U-shape)
* Vertex at (-1, 7)
* Axis of symmetry: x = -1
* y-intercept: (0, 5)
* Two x-intercepts (discriminant positive)
* Range: (-∞, 7]

The key difference is in their **orientation** and overall shape. While f(x) has a minimum value, g(x) has a maximum value.`
    },
    {
      id: 'q2',
      question: 'If you change the value of c in a quadratic function, how does it affect the graph?',
      correctAnswer: 'vertical shift',
      explanation: `## Effect of Changing c

When you change the value of c in a quadratic function f(x) = ax² + bx + c:

* c creates a **vertical shift** of the entire parabola
* Increasing c shifts the parabola **upward**
* Decreasing c shifts the parabola **downward**

### What Remains Unchanged:
* x-coordinate of vertex: x = -b/(2a)
* Axis of symmetry: x = -b/(2a)
* Overall shape/width (determined by a)

### What Changes:
* y-coordinate of vertex: y = c - b²/(4a)
* y-intercept: (0, c)
* x-intercepts (roots)

### Visual Interpretation:
Imagine taking the entire parabola and moving it up or down without changing its shape or horizontal position.`
    },
    {
      id: 'q3',
      question: 'For the function h(x) = 3x² + 12x + 7, find the coordinates of the vertex.',
      correctAnswer: '(-2, -5)',
      explanation: `## Finding the Vertex

For h(x) = 3x² + 12x + 7, where a = 3, b = 12, and c = 7:

### Step 1: Find the x-coordinate
x = -b/(2a) = -12/(2×3) = -12/6 = -2

### Step 2: Calculate the y-coordinate
y = h(-2) = 3(-2)² + 12(-2) + 7
  = 3(4) - 24 + 7
  = 12 - 24 + 7
  = -5

### Therefore, the vertex is at (-2, -5)

This is the minimum point of the parabola since a > 0.`
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setShowPrompt(false);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container max-w-6xl mx-auto pt-16 pb-12 px-4 min-h-screen bg-white">
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
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h1 className="text-3xl font-bold text-center mb-3 text-[#1A1A2E]">
                {prompt ? prompt : 'Concept Explorer'}
              </h1>
              
              <div className="text-center mb-2">
                <span className="bg-white px-3 py-1 rounded-full text-blue-800 text-sm font-medium">
                  Source: Pearson A-Level Pure Mathematics 2, Summer 2022/23 Pure Mathematics 2 Exam
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContentCard 
                title="Overview" 
                content={formattedOverviewContent}
                icon={<BookOpen className="w-6 h-6" />}
                delay={0.2}
                bgColor="#E5DEFF"
                titleColor="#2563EB"
                visualMode={true}
                isFormatted={true}
              />
              
              <ContentCard 
                title="Learning Outcomes and Relevance" 
                content={learningOutcomesContent}
                icon={<GraduationCap className="w-6 h-6" />} 
                delay={0.4}
                bgColor="#F2FCE2"
                titleColor="#16A34A"
                isFormatted={true}
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
  icon?: React.ReactNode;
  delay: number;
  bgColor: string;
  titleColor: string;
  visualMode?: boolean;
  isFormatted?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  title, 
  content, 
  icon, 
  delay, 
  bgColor, 
  titleColor, 
  visualMode = false,
  isFormatted = false
}) => {
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
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E] flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {title}
              </h2>
              
              {isFormatted ? (
                <div 
                  className="prose max-w-none bg-[#E5DEFF] p-5 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="prose max-w-none">
                  <TypewriterText
                    text={content}
                    speed={20}
                    highlightTerms={true}
                    visualMode={visualMode}
                    animate={true}
                  />
                </div>
              )}
              
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
              <div 
                className="flex items-center justify-center w-12 h-12 mb-4 rounded-full"
                style={{ backgroundColor: `${titleColor}20` }} // 20% opacity of title color
              >
                {icon && <span style={{ color: titleColor }}>{icon}</span>}
              </div>
              <h2 
                className="text-2xl font-bold mb-2" 
                style={{ color: titleColor }}
              >
                {title}
              </h2>
              <p className="text-[#333333]">Click to expand</p>
              
              <div className="absolute bottom-4 right-4 animate-pulse">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </div>
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
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E] flex items-center">
                <PenTool className="mr-2 w-6 h-6" />
                Practice Questions
              </h2>
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div key={q.id} className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="bg-amber-100 text-amber-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-medium text-[#1A1A2E]">{q.question}</h3>
                    </div>
                    
                    <div className="flex flex-col gap-3 pl-9">
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
                          className="flex items-center"
                        >
                          {showAnswers[q.id] ? "Hide Solution" : "Check Answer"}
                          {showAnswers[q.id] ? (
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
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
                        <div className="mt-3 p-4 bg-white border border-amber-200 rounded-lg shadow-sm">
                          <TypewriterText markdown={q.explanation} speed={20} highlightTerms={true} />
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
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-amber-100">
                <PenTool className="w-6 h-6 text-amber-700" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#F59E0B]">
                Practice Questions
              </h2>
              <p className="text-[#333333]">Click to explore</p>
              
              <div className="absolute bottom-4 right-4 animate-pulse">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </div>
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
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E] flex items-center">
                <LineChart className="mr-2 w-6 h-6" />
                Interactive Visualization
              </h2>
              <p className="mb-4 text-[#333333]">
                Explore how quadratic functions behave by adjusting the parameters below.
                See how changing values affects the shape and position of the parabola.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                <InteractiveQuadraticFunctions />
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
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100">
                <LineChart className="w-6 h-6 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#9333EA]">
                Interactive Visualization
              </h2>
              <p className="text-[#333333]">Click to explore the interactive elements</p>
              
              <div className="absolute bottom-4 right-4 animate-pulse">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

function checkAnswer(questionId: string, userAnswer: string, correctAnswer: string) {
  return userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());
}

export default ConceptExplorer;
