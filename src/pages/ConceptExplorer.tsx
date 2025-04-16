import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, X, Send, Bot, User, PenTool, LineChart, BookOpen, GraduationCap, ExternalLink, ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import InteractiveQuadraticFunctions from '@/components/study/InteractiveQuadraticFunctions';
import TypewriterText from '@/components/TypewriterText';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string | React.ReactNode;
  contentType?: 'text' | 'overview' | 'learning-outcomes' | 'practice' | 'visualization';
  isTyping?: boolean;
}

const ConceptExplorer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [showInputArea, setShowInputArea] = useState(true);
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'bot',
      content: 'Hi, I\'m Aiducation! What would you like to learn today? I\'m here to help with any academic concept you\'re curious about.',
      isTyping: true,
    };
    
    setTimeout(() => {
      setMessages([welcomeMessage]);
      setTimeout(() => {
        setMessages(msgs => 
          msgs.map(m => m.id === 'welcome' ? {...m, isTyping: false} : m)
        );
      }, 1000);
    }, 500);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: prompt,
      contentType: 'text'
    };
    
    setMessages(m => [...m, userMessage]);
    setIsLoading(true);
    
    const botTypingMessage: Message = {
      id: `bot-typing-${Date.now()}`,
      type: 'bot',
      content: '',
      isTyping: true
    };
    
    setTimeout(() => {
      setMessages(m => [...m, botTypingMessage]);
      
      setTimeout(() => {
        setMessages(msgs => {
          const newMsgs = msgs.filter(m => m.id !== botTypingMessage.id);
          return [
            ...newMsgs,
            {
              id: `bot-${Date.now()}`,
              type: 'bot',
              content: "I'll help you understand quadratic functions. Let me provide a comprehensive overview, learning outcomes, practice questions, and interactive visualizations.",
              contentType: 'text'
            }
          ];
        });
        
        sendContentSections();
        setIsLoading(false);
        setPrompt('');
      }, 1500);
    }, 500);
  };
  
  const sendContentSections = () => {
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs, 
        {
          id: `bot-overview-${Date.now()}`,
          type: 'bot',
          content: renderOverviewContent(),
          contentType: 'overview'
        }
      ]);
      
      setTimeout(() => {
        setMessages(msgs => [
          ...msgs, 
          {
            id: `bot-learning-${Date.now()}`,
            type: 'bot',
            content: renderLearningOutcomesContent(),
            contentType: 'learning-outcomes'
          }
        ]);
        
        setTimeout(() => {
          setMessages(msgs => [
            ...msgs, 
            {
              id: `bot-practice-${Date.now()}`,
              type: 'bot',
              content: renderPracticeQuestionsContent(),
              contentType: 'practice'
            }
          ]);
          
          setTimeout(() => {
            setMessages(msgs => [
              ...msgs, 
              {
                id: `bot-visual-${Date.now()}`,
                type: 'bot',
                content: renderVisualizationContent(),
                contentType: 'visualization'
              }
            ]);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const renderOverviewContent = () => {
    return (
      <Card className="w-full shadow-sm overflow-hidden border border-blue-100">
        <CardContent className="p-0">
          <div className="bg-blue-50 p-3 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Overview</h3>
            </div>
            <ExternalLink className="h-4 w-4 text-blue-600" />
          </div>
          <div className="p-4 space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">Source:</p>
              <p>KS4 Mathematics Curriculum – Term 2 Algebra Module</p>
            </div>

            <div>
              <p className="font-medium mb-2">Curriculum Topics in Unit 2.3 Quadratic Functions:</p>
              <ol className="list-decimal list-inside pl-2 space-y-1">
                <li>Recognize and interpret quadratic functions in standard form</li>
                <li>Identify and sketch key features such as vertex, axis of symmetry, and intercepts</li>
                <li>Solve quadratic equations using factorization and the quadratic formula</li>
                <li>Analyze the effect of changing coefficients on the shape and position of the graph</li>
              </ol>
            </div>

            <div>
              <p className="font-medium mb-2">Practice Question Derived from Source</p>
              <p className="mb-3">The function is defined as:</p>
              <p className="bg-gray-50 px-4 py-2 rounded text-center font-medium mb-4">f(x) = -2x² + 8x - 5</p>
              
              <div className="space-y-2">
                <div>
                  <p className="mb-1"><span className="font-semibold">📌 (a)</span> Identify the vertex of the function.</p>
                  <p className="text-xs text-indigo-600">(2 marks)</p>
                </div>
                
                <div>
                  <p className="mb-1"><span className="font-semibold">📌 (b)</span> State the axis of symmetry and determine whether the vertex is a maximum or minimum.</p>
                  <p className="text-xs text-indigo-600">(2 marks)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderLearningOutcomesContent = () => {
    return (
      <Card className="w-full shadow-sm overflow-hidden border border-green-100">
        <CardContent className="p-0">
          <div className="bg-green-50 p-3 border-b border-green-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold text-green-800">Learning Outcomes and Relevance</h3>
            </div>
            <ExternalLink className="h-4 w-4 text-green-600" />
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div>
              <p className="font-medium mb-2"><strong>Why Quadratic Functions Matter in A-Level Mathematics</strong></p>
              <p>In the A-Level curriculum, students are expected to develop a comprehensive understanding of quadratic functions, including their different forms, properties, and applications. This knowledge is assessed through various examination questions that test both theoretical understanding and practical problem-solving skills.
              The study of quadratics also builds essential algebraic manipulation skills that transfer to other areas of mathematics. When students master techniques such as completing the square or working with the discriminant, they develop analytical thinking that proves valuable across the entire A-Level curriculum. Understanding transformations of quadratic functions also prepares students for more complex function transformations in advanced topics.</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <p>Quadratic functions serve as building blocks for more complex mathematical ideas, providing students with fundamental skills in algebraic manipulation, graphical interpretation, and problem-solving that transfer to numerous other areas of the A-Level syllabus.</p>
            </div>
            
            <p>By the end of the A-Level quadratic functions unit, students should be able to:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                <div className="font-medium flex items-center gap-1 text-green-800">
                  <span>🔍 Analyze Quadratic Structure</span>
                </div>
                <p className="text-xs mt-1">Identify and interpret the standard form, vertex form, and factored form, converting between them as needed.</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                <div className="font-medium flex items-center gap-1 text-green-800">
                  <span>📊 Graph Interpretation</span>
                </div>
                <p className="text-xs mt-1">Sketch quadratic graphs accurately, identifying key features such as the vertex, axis of symmetry, and intercepts.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderPracticeQuestionsContent = () => {
    return (
      <Card className="w-full shadow-sm overflow-hidden border border-amber-100">
        <CardContent className="p-0">
          <div className="bg-amber-50 p-3 border-b border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PenTool className="h-4 w-4 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Practice Questions</h3>
            </div>
            <ExternalLink className="h-4 w-4 text-amber-600" />
          </div>
          <div className="p-4 text-sm">
            <div className="border border-amber-200 rounded-lg p-3 mb-2 bg-amber-50">
              <div className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-800 font-semibold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5?</h4>
                  
                  <div className="mt-3">
                    <Input
                      placeholder="Enter your answer here"
                      value={userAnswers.q1}
                      onChange={(e) => setUserAnswers(prev => ({...prev, q1: e.target.value}))}
                      className="border-gray-200 text-sm"
                    />
                    
                    <div className="flex justify-between items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowAnswers(prev => ({...prev, q1: !prev.q1}))}
                        className="text-xs flex items-center gap-1"
                      >
                        {showAnswers.q1 ? "Hide Solution" : "Check Answer"}
                        {showAnswers.q1 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </Button>
                      
                      {userAnswers.q1 && (
                        <div className="flex items-center">
                          {checkAnswer('q1', userAnswers.q1, 'orientation') ? (
                            <div className="flex items-center text-green-500 text-xs">
                              <Check className="w-3 h-3 mr-1" />
                              <span>Correct!</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500 text-xs">
                              <X className="w-3 h-3 mr-1" />
                              <span>Try again</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {showAnswers.q1 && (
                      <div className="mt-2 p-3 bg-white border border-amber-200 rounded-md text-xs">
                        <TypewriterText markdown={questions[0].explanation} speed={20} highlightTerms={true} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-amber-200 rounded-lg p-3 bg-amber-50">
              <div className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-800 font-semibold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">If you change the value of c in a quadratic function, how does it affect the graph?</h4>
                  
                  <div className="mt-3">
                    <Input
                      placeholder="Enter your answer here"
                      value={userAnswers.q2}
                      onChange={(e) => setUserAnswers(prev => ({...prev, q2: e.target.value}))}
                      className="border-gray-200 text-sm"
                    />
                    
                    <div className="flex justify-between items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowAnswers(prev => ({...prev, q2: !prev.q2}))}
                        className="text-xs flex items-center gap-1"
                      >
                        {showAnswers.q2 ? "Hide Solution" : "Check Answer"}
                        {showAnswers.q2 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </Button>
                      
                      {userAnswers.q2 && (
                        <div className="flex items-center">
                          {checkAnswer('q2', userAnswers.q2, 'vertical shift') ? (
                            <div className="flex items-center text-green-500 text-xs">
                              <Check className="w-3 h-3 mr-1" />
                              <span>Correct!</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500 text-xs">
                              <X className="w-3 h-3 mr-1" />
                              <span>Try again</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {showAnswers.q2 && (
                      <div className="mt-2 p-3 bg-white border border-amber-200 rounded-md text-xs">
                        <TypewriterText markdown={questions[1].explanation} speed={20} highlightTerms={true} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderVisualizationContent = () => {
    return (
      <Card className="w-full shadow-sm overflow-hidden border border-purple-100">
        <CardContent className="p-0">
          <div className="bg-purple-50 p-3 border-b border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Interactive Visualization</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="mb-3 text-sm">
              Explore how changing parameters affects quadratic functions:
            </p>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100">
              <InteractiveQuadraticFunctions />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

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

  function checkAnswer(questionId: string, userAnswer: string, correctAnswer: string) {
    return userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b p-4 flex justify-center items-center relative">
        <div className="absolute left-4 flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2">
            <Brain className="w-5 h-5" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Aiducation</h1>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <motion.div 
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex", 
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  "flex gap-3 max-w-[85%]",
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.type === 'user' ? 'bg-blue-100' : 'bg-blue-600'
                  )}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Brain className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div>
                    {message.isTyping ? (
                      <div className="px-4 py-3 bg-gray-100 rounded-2xl text-gray-700">
                        <span className="flex gap-1 items-center">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </span>
                      </div>
                    ) : (
                      <div className={cn(
                        "px-4 py-3 rounded-2xl",
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-700 rounded-tl-none'
                      )}>
                        {typeof message.content === 'string' ? (
                          <p>{message.content}</p>
                        ) : (
                          <div className="max-w-full">{message.content}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-white border-t">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything you want to learn..."
                className="min-h-12 resize-none flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="shrink-0 h-[42px]"
                disabled={!prompt.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-center text-gray-500 mt-2">
              Try: "Help me understand quadratic functions" or "Show me practice problems"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptExplorer;
