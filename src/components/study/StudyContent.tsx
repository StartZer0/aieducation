
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Book, HelpCircle, FileText, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { highlightedTerms, definitions } from '@/data/learningContent';
import { ContentRenderer } from './ContentRenderer';
import { HighlightedTerm } from './HighlightedTerm';

interface StudyContentProps {
  title: string;
  breadcrumbs: {
    id: string;
    title: string;
    path: string;
  }[];
  prevTopic?: {
    id: string;
    title: string;
    path: string;
  } | null;
  nextTopic?: {
    id: string;
    title: string;
    path: string;
  } | null;
  subjectId: string;
  topicId: string;
}

export function StudyContent({ title, breadcrumbs, prevTopic, nextTopic, subjectId, topicId }: StudyContentProps) {
  const [explanationLevel, setExplanationLevel] = useState('medium');
  const [activeTab, setActiveTab] = useState('content');
  
  // Get content for this topic
  const getContent = () => {
    // For now we'll return default content, but in a real app
    // this would load the appropriate content for the topic
    if (subjectId === 'mathematics' && topicId === 'quadratic-functions') {
      return (
        <div className="space-y-6">
          <p>
            In this lesson, we'll explore quadratic functions and how they form the foundation of many mathematical concepts. A <HighlightedTerm id="function">function</HighlightedTerm> is a mathematical relationship that assigns exactly one output value to each input value.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Quadratic Functions</h2>
          
          <div className="p-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">The General Form</h3>
            <p className="mb-3">
              A quadratic function can be written in the form f(x) = ax² + bx + c, where a, b, and c are constants, and a ≠ 0. This is known as the standard form, and it is the most commonly used representation in A-level mathematics. The value of a determines the opening direction and steepness of the <HighlightedTerm id="parabola" color="green">parabola</HighlightedTerm>, while b and c influence its position on the coordinate plane.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-5">Key Features of Quadratic Graphs</h3>
            <p className="mb-3">
              The graph of a quadratic function always forms a parabola. When a is positive, the parabola opens upward, creating a U-shape. The function has a <HighlightedTerm id="minimum-value" color="orange">minimum value</HighlightedTerm> at its lowest point. Conversely, when a is negative, the parabola opens downward in an inverted U-shape, and the function reaches a <HighlightedTerm id="maximum-value" color="orange">maximum value</HighlightedTerm> at its highest point. The magnitude of a influences the width of the parabola - a larger absolute value of a results in a narrower parabola, while a smaller absolute value creates a wider curve.
            </p>
            
            <p className="mb-3">
              Every parabola has an <HighlightedTerm id="axis-of-symmetry">axis of symmetry</HighlightedTerm>, which is a vertical line that passes through the <HighlightedTerm id="vertex">vertex</HighlightedTerm>. The axis of symmetry divides the parabola into two mirror-image halves. For a quadratic function in standard form, the axis of symmetry occurs at x = -b/(2a). This is a crucial feature when analyzing the behavior of quadratic functions.
            </p>
            
            <p>
              The vertex of the parabola represents either the minimum or maximum point of the function. Its coordinates can be calculated as (-b/(2a), f(-b/(2a))). Alternatively, the y-coordinate can be found using the formula c - b²/(4a). The vertex is an essential point to identify when sketching quadratic graphs or solving optimization problems involving quadratic functions.
            </p>
          </div>
          
          <div className="my-6 w-full h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="mb-2 text-lg font-medium">Interactive Graph</div>
              <div className="text-muted-foreground text-sm">Visualization of y = x² + 2x - 3</div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-4">Key Features of Quadratic Functions</h3>
          
          <ul className="space-y-3">
            <li>
              <strong>Shape and Direction:</strong> When a &gt; 0, the parabola opens upward (U-shaped) and has a <HighlightedTerm id="minimum-value" color="orange">minimum value</HighlightedTerm>. When a &lt; 0, the parabola opens downward (inverted U-shaped) and has a <HighlightedTerm id="maximum-value" color="orange">maximum value</HighlightedTerm>.
            </li>
            <li>
              <strong>Vertex:</strong> The <HighlightedTerm id="vertex">vertex</HighlightedTerm> is the point where the parabola changes direction. For a quadratic function in the form f(x) = ax² + bx + c, the x-coordinate of the vertex is x = -b/(2a).
            </li>
            <li>
              <strong>Axis of Symmetry:</strong> The parabola is symmetric about a vertical line passing through the vertex, called the <HighlightedTerm id="axis-of-symmetry">axis of symmetry</HighlightedTerm>.
            </li>
            <li>
              <strong>y-intercept:</strong> The y-intercept is the point where the parabola crosses the y-axis, which is at (0, c).
            </li>
            <li>
              <strong>x-intercepts:</strong> The x-intercepts (if they exist) are the points where the parabola crosses the x-axis. These can be found by solving the equation ax² + bx + c = 0.
            </li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-4">Solving Quadratic Equations</h3>
          
          <p>
            To find the roots of a quadratic equation (where the function equals zero), we can use the <HighlightedTerm id="quadratic-formula" color="orange">quadratic formula</HighlightedTerm>:
          </p>
          
          <div className="my-4 p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
            <div className="text-xl text-primary font-medium">
              x = (-b ± √(b² - 4ac)) / 2a
            </div>
          </div>
          
          <p>
            This formula gives us the x-values where the parabola crosses the x-axis, which are the solutions to the equation ax² + bx + c = 0.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-4">The Discriminant</h3>
          
          <p>
            The expression b² - 4ac is called the discriminant. It tells us about the nature of the roots:
          </p>
          
          <ul className="space-y-2">
            <li>If b² - 4ac &gt; 0, the equation has two distinct real roots.</li>
            <li>If b² - 4ac = 0, the equation has exactly one real root (a repeated root).</li>
            <li>If b² - 4ac &lt; 0, the equation has no real roots (but two complex conjugate roots).</li>
          </ul>
          
          <Card className="mt-8 p-5">
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">Reflection Question</h4>
            </div>
            <p className="mb-3">
              How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5? Think about the shape, direction, and key points.
            </p>
            <Button variant="outline" className="text-sm">
              Show Answer
            </Button>
          </Card>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        Content for {title} is being developed.
      </div>
    );
  };
  
  const renderSummary = () => (
    <Card className="p-4">
      <h3 className="text-xl font-medium mb-3">Summary: {title}</h3>
      <ul className="space-y-2">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>A quadratic function has the form f(x) = ax² + bx + c where a ≠ 0.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>The graph of a quadratic function is a parabola, opening upward when a &gt; 0 and downward when a &lt; 0.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>The vertex is at (-b/2a, f(-b/2a)) and represents either a minimum or maximum.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>The axis of symmetry is the vertical line x = -b/2a.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>The discriminant b² - 4ac determines the number of roots: two distinct real roots if positive, one real root if zero, or no real roots if negative.</span>
        </li>
      </ul>
    </Card>
  );
  
  const renderFlashcards = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-muted-foreground">TERM</div>
          <Button variant="ghost" size="sm" className="text-xs">Flip</Button>
        </div>
        <div className="text-xl font-medium">What is a quadratic function?</div>
        <div className="mt-4 pt-4 border-t border-border text-muted-foreground text-sm">
          Click to reveal answer
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-muted-foreground">FORMULA</div>
          <Button variant="ghost" size="sm" className="text-xs">Flip</Button>
        </div>
        <div className="text-xl font-medium">What is the quadratic formula?</div>
        <div className="mt-4 pt-4 border-t border-border text-muted-foreground text-sm">
          Click to reveal answer
        </div>
      </Card>
    </div>
  );
  
  const renderQuestions = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <h4 className="text-lg font-semibold">Question 1</h4>
        </div>
        <p className="mb-3">
          How would the graph of f(x) = 2x² - 4x + 5 differ from the graph of g(x) = -2x² - 4x + 5? 
          Think about the shape, direction, and key points.
        </p>
        <Button variant="outline" className="text-sm">
          Show Answer
        </Button>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-start mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <h4 className="text-lg font-semibold">Question 2</h4>
        </div>
        <p className="mb-3">
          The quadratic equation 3x² - kx + 3 = 0 has two distinct real roots. What are the possible values of k?
        </p>
        <Button variant="outline" className="text-sm">
          Show Answer
        </Button>
      </Card>
    </div>
  );
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1 p-4 border-b border-border text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.id}>
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
            <a 
              href={crumb.path} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {crumb.title}
            </a>
          </React.Fragment>
        ))}
      </nav>
      
      {/* Content Header with Level Selector */}
      <div className="border-b border-border p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        
        <div className="flex items-center space-x-2">
          <Select value={explanationLevel} onValueChange={setExplanationLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Explanation Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="interactive">Interactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="pl-4">
            <TabsTrigger value="content" className="flex items-center">
              <Book className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center">
              <StickyNote className="w-4 h-4 mr-2" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              Questions
            </TabsTrigger>
          </TabsList>
        
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <TabsContent value="content">
                {getContent()}
              </TabsContent>
              
              <TabsContent value="summary">
                {renderSummary()}
              </TabsContent>
              
              <TabsContent value="flashcards">
                {renderFlashcards()}
              </TabsContent>
              
              <TabsContent value="questions">
                {renderQuestions()}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
      
      {/* Navigation Buttons */}
      <div className="mt-auto p-4 border-t border-border flex items-center justify-between">
        {prevTopic ? (
          <Button 
            variant="ghost" 
            className="flex items-center text-sm"
            onClick={() => window.location.href = prevTopic.path}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Previous: {prevTopic.title}</span>
          </Button>
        ) : (
          <div></div>
        )}
        
        {nextTopic && (
          <Button 
            variant="ghost" 
            className="flex items-center text-sm"
            onClick={() => window.location.href = nextTopic.path}
          >
            <span>Next: {nextTopic.title}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
