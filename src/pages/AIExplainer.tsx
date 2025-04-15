import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, X, BookOpen, GraduationCap, PenTool, LineChart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import InteractiveQuadraticFunctions from '@/components/study/InteractiveQuadraticFunctions';
import TypewriterText from '@/components/TypewriterText';
import { AnimatedContent } from '@/components/study/AnimatedContent';
import { MarkdownRenderer } from '@/components/study/MarkdownRenderer';

interface QuestionsSectionProps {
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
}

const AIExplainer = () => {
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
  
  const [loadingStates, setLoadingStates] = useState({
    overview: false,
    learningOutcomes: false,
    visualization: false,
    practiceQuestions: false
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
<h1>Overview of Quadratic Functions</h1>
    
<div class="concept-box">
    <h2>Understanding Quadratic Functions</h2>
    
    <p>A <span class="highlight">quadratic function</span> is a polynomial function of degree 2, expressed in the standard form <span class="formula">f(x) = ax² + bx + c</span>, where a, b, and c are constants, and a must not equal zero. The graph of every quadratic function forms a distinctive curve called a <span class="highlight">parabola</span>. This mathematical relationship is fundamental to many advanced concepts and has numerous real-world applications.</p>
    
    <p>The behavior and shape of a quadratic function are determined by its coefficients. When the coefficient <span class="highlight">a is positive</span>, the parabola opens upward creating a U-shape, and the function has a minimum value. Conversely, when <span class="highlight">a is negative</span>, the parabola opens downward in an inverted U-shape, and the function reaches a maximum value at its highest point.</p>
    
    <div class="visual-container">
        <div class="quadratic-graph">
            <svg width="500" height="300" viewBox="0 0 500 300">
                <!-- Coordinate system -->
                <line x1="50" y1="150" x2="450" y2="150" stroke="#333" stroke-width="1.5"/>
                <line x1="250" y1="20" x2="250" y2="280" stroke="#333" stroke-width="1.5"/>
                
                <!-- X-axis labels -->
                <text x="450" y="170" fill="#333">x</text>
                <text x="240" y="170" fill="#333">O</text>
                
                <!-- Y-axis label -->
                <text x="235" y="25" fill="#333">y</text>
                
                <!-- Positive parabola -->
                <path d="M 100,250 Q 250,50 400,250" stroke="#4169E1" stroke-width="3" fill="none"/>
                <text x="350" y="230" fill="#4169E1">a > 0</text>
                <text x="350" y="250" fill="#4169E1">(opens upward)</text>
                
                <!-- Vertex marker -->
                <circle cx="250" cy="50" r="5" fill="#E74C3C"/>
                <text x="260" y="45" fill="#E74C3C">Vertex (minimum)</text>
                
                <!-- Axis of symmetry -->
                <line x1="250" y1="50" x2="250" y2="250" stroke="#4169E1" stroke-width="1.5" stroke-dasharray="5,5"/>
                <text x="255" y="200" fill="#4169E1">Axis of Symmetry</text>
                
                <!-- Y-intercept -->
                <circle cx="250" cy="150" r="5" fill="#FFA500"/>
                <text x="260" y="145" fill="#FFA500">y-intercept (0, c)</text>
            </svg>
        </div>
    </div>
    
    <p>The steepness of the parabola is determined by the <span class="highlight">absolute value of a</span>. A larger value of |a| creates a narrower, more tightly curved parabola, while a smaller value produces a wider, more gently curved shape. This relationship is important when analyzing how quickly a quadratic function increases or decreases as x values change.</p>
    
    <div class="key-point">
        <p>Every parabola has a turning point called the <span class="highlight">vertex</span>, which represents either the minimum value (when a > 0) or maximum value (when a < 0) of the function. For a quadratic in standard form, the vertex occurs at the point <span class="formula">(-b/2a, f(-b/2a))</span>. This can also be calculated using the formula <span class="formula">(-b/2a, c-b²/4a)</span>.</p>
    </div>
    
    <p>Through the vertex runs a vertical line called the <span class="highlight">axis of symmetry</span>, located at <span class="formula">x = -b/2a</span>. This line divides the parabola into two mirror-image halves, highlighting the perfect symmetry of quadratic functions. When we identify the axis of symmetry, we can use it to find corresponding points on either side of the parabola, which can simplify graphing and analysis.</p>
</div>

<div class="concept-box">
    <h2>Key Features and Analysis</h2>
    
    <p>The <span class="highlight">y-intercept</span> of a quadratic function occurs at the point <span class="formula">(0, c)</span>, where the parabola crosses the y-axis. This intercept is directly determined by the constant term c in the standard form equation and represents the function value when x = 0.</p>
    
    <p>The <span class="highlight">x-intercepts</span>, if they exist, are the points where the parabola crosses the x-axis. These can be found by solving the equation <span class="formula">ax² + bx + c = 0</span> using the quadratic formula: <span class="formula">x = (-b ± √(b² - 4ac))/2a</span>. These intercepts represent the roots or zeros of the quadratic function and are crucial for understanding the function's behavior.</p>
    
    <p>The expression <span class="highlight">b² - 4ac</span>, known as the <span class="highlight">discriminant</span>, reveals important information about the nature of these x-intercepts:</p>
    
    <ul>
        <li>When the discriminant is <span class="highlight">positive</span>, the quadratic equation has <span class="highlight">two distinct real roots</span>, meaning the parabola crosses the x-axis at two different points.</li>
        <li>When the discriminant <span class="highlight">equals zero</span>, there is <span class="highlight">exactly one real root</span> (a repeated root), indicating that the parabola touches the x-axis at precisely one point.</li>
        <li>When the discriminant is <span class="highlight">negative</span>, there are <span class="highlight">no real roots</span>, signifying that the parabola never intersects the x-axis.</li>
    </ul>
    
    <div class="visual-container">
        <div class="quadratic-graph">
            <svg width="500" height="280" viewBox="0 0 500 280">
                <!-- Coordinate system -->
                <line x1="50" y1="140" x2="450" y2="140" stroke="#333" stroke-width="1.5"/>
                <line x1="250" y1="20" x2="250" y2="260" stroke="#333" stroke-width="1.5"/>
                
                <!-- Discriminant illustrations -->
                <!-- Positive discriminant (two roots) -->
                <path d="M 100,60 Q 250,220 400,60" stroke="#4CAF50" stroke-width="3" fill="none"/>
                <circle cx="150" cy="140" r="5" fill="#4CAF50"/>
                <circle cx="350" cy="140" r="5" fill="#4CAF50"/>
                <text x="100" y="40" fill="#4CAF50">b² - 4ac > 0 (two roots)</text>
                
                <!-- Zero discriminant (one root) -->
                <path d="M 130,200 Q 250,140 370,200" stroke="#FFA500" stroke-width="3" fill="none" stroke-dasharray="5,3"/>
                <circle cx="250" cy="140" r="5" fill="#FFA500"/>
                <text x="150" y="120" fill="#FFA500">b² - 4ac = 0 (one root)</text>
                
                <!-- Negative discriminant (no roots) -->
                <path d="M 150,230 Q 250,180 350,230" stroke="#E74C3C" stroke-width="3" fill="none" stroke-dasharray="10,3"/>
                <text x="150" y="250" fill="#E74C3C">b² - 4ac < 0 (no roots)</text>
            </svg>
        </div>
    </div>
</div>

<div class="concept-box">
    <h2>The Impact of Coefficients</h2>
    
    <p>Each coefficient in the standard form <span class="formula">f(x) = ax² + bx + c</span> plays a specific role in determining the shape and position of the parabola:</p>
    
    <div class="parameter-box">
        <div class="parameter">a</div>
        <div class="effect">
            <p>Controls how steep or wide the parabola is. The <span class="highlight">sign of a</span> determines whether the parabola opens upward or downward, while the <span class="highlight">magnitude of a</span> affects the steepness. A larger |a| creates a narrower curve, while a smaller |a| creates a wider one.</p>
        </div>
    </div>
    
    <div class="parameter-box">
        <div class="parameter">b</div>
        <div class="effect">
            <p>Influences the left-right position of the vertex. The coefficient b affects the horizontal shift of the parabola through its relationship with the x-coordinate of the vertex <span class="formula">(-b/2a)</span>. Changing b shifts the axis of symmetry and consequently the entire parabola horizontally.</p>
        </div>
    </div>
    
    <div class="parameter-box">
        <div class="parameter">c</div>
        <div class="effect">
            <p>Determines the y-intercept (where the parabola crosses the y-axis at the point (0, c)). Changing c shifts the entire parabola up or down without affecting its shape or the x-coordinate of the vertex. This vertical shift changes where the parabola intersects the y-axis and may affect whether or where it crosses the x-axis.</p>
        </div>
    </div>
    
    <p>Understanding how these coefficients interact provides powerful insights into the behavior of quadratic functions. By analyzing these values, we can predict the shape, orientation, and key points of the parabola without having to plot multiple points.</p>
    
    <div class="key-point">
        <p>When working with quadratic functions in different forms (standard, vertex, or factored), we can extract important information about the function's behavior. The vertex form <span class="formula">f(x) = a(x-h)² + k</span> directly reveals the vertex coordinates (h, k), while the factored form <span class="formula">f(x) = a(x-r₁)(x-r₂)</span> immediately shows the x-intercepts r₁ and r₂.</p>
    </div>
</div>

<div class="concept-box">
    <h2>Applications and Significance</h2>
    
    <p>Quadratic functions appear throughout mathematics and are essential for modeling many real-world phenomena. Their distinctive parabolic shape makes them ideal for describing situations involving:</p>
    
    <div class="grid-2">
        <div>
            <p><span class="highlight">📈 Projectile Motion:</span> Objects thrown or launched follow parabolic paths due to constant gravitational acceleration. The height of an object at time t can be modeled as <span class="formula">h(t) = h₀ + v₀t - ½gt²</span>.</p>
        </div>
        <div>
            <p><span class="highlight">📡 Reflection Properties:</span> Parabolic shapes are used in satellite dishes, telescopes, and flashlights because they can focus parallel rays to a single point (or vice versa).</p>
        </div>
    </div>
    
    <div class="grid-2">
        <div>
            <p><span class="highlight">💰 Optimization Problems:</span> Quadratics help determine maximum profit, minimum cost, or optimal dimensions by finding the vertex of the relevant quadratic model.</p>
        </div>
        <div>
            <p><span class="highlight">🏗️ Architecture and Engineering:</span> Arches, suspension bridges, and certain structural designs incorporate parabolic shapes for their strength and aesthetic properties.</p>
        </div>
    </div>
    
    <p>The ability to analyze and manipulate quadratic functions provides a foundation for understanding more complex mathematical relationships. As students progress in their mathematical education, the concepts and techniques used with quadratics extend to higher-degree polynomials, rational functions, and calculus applications.</p>
</div>
`;

  const simpleLearningOutcomesContent = `
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

  const detailedOutcomesContent = `
<h1>Learning Outcomes and Relevance in A-Levels</h1>
    
<div class="concept-box">
    <h2>Why Quadratic Functions Matter in A-Level Mathematics</h2>
    
    <p>Understanding quadratic functions is crucial for A-Level Mathematics success because they form the foundation for many advanced mathematical concepts. These functions appear consistently throughout the curriculum and in examination scenarios, making mastery of their properties essential for achieving high grades.</p>
    
    <div class="key-point">
        <p>Quadratic functions serve as building blocks for more complex mathematical ideas, providing students with fundamental skills in algebraic manipulation, graphical interpretation, and problem-solving that transfer to numerous other areas of the A-Level syllabus.</p>
    </div>
    
    <p>In the A-Level curriculum, students are expected to develop a comprehensive understanding of quadratic functions, including their different forms, properties, and applications. This knowledge is assessed through various examination questions that test both theoretical understanding and practical problem-solving skills.</p>
    
    <p>The study of quadratics also builds essential algebraic manipulation skills that transfer to other areas of mathematics. When students master techniques such as completing the square or working with the discriminant, they develop analytical thinking that proves valuable across the entire A-Level curriculum. Understanding transformations of quadratic functions also prepares students for more complex function transformations in advanced topics.</p>
</div>
    
<div class="concept-box">
    <h2>Core Learning Outcomes</h2>
    
    <p>By the end of the A-Level quadratic functions unit, students should be able to:</p>
    
    <div class="grid-2">
        <div class="application-card">
            <div class="application-title">🔍 Analyze Quadratic Structure</div>
            <p>Identify and interpret the standard form <span class="highlight">f(x) = ax² + bx + c</span>, vertex form <span class="highlight">f(x) = a(x-h)² + k</span>, and factored form <span class="highlight">f(x) = a(x-r₁)(x-r₂)</span>, converting between them as needed.</p>
        </div>
        
        <div class="application-card">
            <div class="application-title">📊 Graph Interpretation</div>
            <p>Sketch quadratic graphs accurately, identifying key features such as the vertex, axis of symmetry, y-intercept, and x-intercepts (roots). Interpret what these features represent in context.</p>
        </div>
    </div>
    
    <div class="grid-2">
        <div class="application-card">
            <div class="application-title">🧮 Solving Techniques</div>
            <p>Solve quadratic equations using various methods including factoring, completing the square, and the quadratic formula. Apply the discriminant <span class="highlight">Δ = b² - 4ac</span> to analyze the nature of roots.</p>
        </div>
        
        <div class="application-card">
            <div class="application-title">📈 Modeling Applications</div>
            <p>Apply quadratic functions to model real-world situations, particularly in physics (projectile motion), optimization problems, and data analysis. Interpret solutions in context.</p>
        </div>
    </div>
    
    <div class="grid-2">
        <div class="application-card">
            <div class="application-title">🔄 Transformations</div>
            <p>Understand and apply transformations to quadratic functions, including translations, stretches, and reflections. This skill extends to all function types in later units.</p>
        </div>
        
        <div class="application-card">
            <div class="application-title">🧩 Completing the Square</div>
            <p>Master the technique of completing the square to rewrite quadratics in vertex form, enabling easier identification of key features and supporting integration with calculus topics.</p>
        </div>
    </div>
</div>
    
<div class="concept-box">
    <h2>Cross-Topic Applications in A-Level Mathematics</h2>
    
    <p>Quadratic functions integrate with multiple areas of the A-Level mathematics curriculum, making them a cornerstone concept that resurfaces throughout the course. Their applications extend beyond pure mathematics into applied contexts:</p>
    
    <div class="visual-container">
        <svg width="700" height="400" viewBox="0 0 700 400">
            <!-- Central node -->
            <circle cx="350" cy="200" r="60" fill="#4169E1" opacity="0.8"/>
            <text x="350" y="205" text-anchor="middle" fill="white" font-weight="bold">Quadratic Functions</text>
            
            <!-- Connected topics -->
            <!-- Calculus -->
            <circle cx="200" cy="100" r="50" fill="#4CAF50" opacity="0.8"/>
            <text x="200" y="105" text-anchor="middle" fill="white" font-weight="bold">Calculus</text>
            <line x1="290" y1="160" x2="250" y2="130" stroke="#333" stroke-width="2" stroke-dasharray="5,3"/>
            
            <!-- Mechanics -->
            <circle cx="500" cy="100" r="50" fill="#E74C3C" opacity="0.8"/>
            <text x="500" y="105" text-anchor="middle" fill="white" font-weight="bold">Mechanics</text>
            <line x1="410" y1="160" x2="450" y2="130" stroke="#333" stroke-width="2" stroke-dasharray="5,3"/>
            
            <!-- Statistics -->
            <circle cx="200" cy="300" r="50" fill="#FFA500" opacity="0.8"/>
            <text x="200" y="305" text-anchor="middle" fill="white" font-weight="bold">Statistics</text>
            <line x1="290" y1="240" x2="250" y2="270" stroke="#333" stroke-width="2" stroke-dasharray="5,3"/>
            
            <!-- Further Pure -->
            <circle cx="500" cy="300" r="50" fill="#9C27B0" opacity="0.8"/>
            <text x="500" y="295" text-anchor="middle" fill="white" font-weight="bold">Functions &</text>
            <text x="500" y="315" text-anchor="middle" fill="white" font-weight="bold">Transformations</text>
            <line x1="410" y1="240" x2="450" y2="270" stroke="#333" stroke-width="2" stroke-dasharray="5,3"/>
        </svg>
    </div>
    
    <div class="grid-2">
        <div>
            <h3>In Pure Mathematics</h3>
            <p><span class="highlight">Calculus:</span> Quadratic functions provide excellent examples for introducing differentiation and integration. Finding the derivative of a quadratic function helps locate maximum and minimum points, while integration of quadratics appears in area problems.</p>
            
            <p><span class="highlight">Functions and Transformations:</span> Quadratics serve as a foundation for understanding how function transformations work. The effects of vertical and horizontal shifts, stretches, and reflections are clearly visualized with quadratic graphs.</p>
            
            <p><span class="highlight">Algebraic Methods:</span> Techniques developed for quadratics, such as completing the square and using the discriminant, extend to solving more complex problems including inequalities and function analysis.</p>
        </div>
        
        <div>
            <h3>In Applied Mathematics</h3>
            <p><span class="highlight">Mechanics:</span> Projectile motion is modeled using quadratic functions, where the position of an object at time t follows the equation <span class="formula">s(t) = ut + ½at²</span> for constant acceleration. This allows calculation of maximum height, flight time, and range.</p>
            
            <p><span class="highlight">Statistics:</span> Quadratic regression models help analyze data with curved relationships. The method of least squares may involve quadratic functions to find best-fit curves.</p>
            
            <p><span class="highlight">Decision Mathematics:</span> In optimization problems, the objective function often takes a quadratic form, especially when modeling diminishing returns or increasing costs.</p>
        </div>
    </div>
</div>
    
<div class="activity-box">
    <h2>Examination-Style Questions</h2>
    
    <p>To succeed in A-Level examinations, students must be able to apply their understanding of quadratic functions to solve various types of problems. Here are some representative questions that demonstrate the kinds of challenges students might encounter:</p>
    
    <div class="question-box">
        <div class="question-title">Question 1: Analysis and Graphing</div>
        <p>For the function h(x) = 3x² + 12x + 7:</p>
        <ol type="a">
            <li>Find the coordinates of the vertex</li>
            <li>Determine the axis of symmetry</li>
            <li>Calculate any x-intercepts</li>
            <li>State the range of the function</li>
            <li>Sketch the graph, clearly showing all key points</li>
        </ol>
    </div>
    
    <div class="question-box">
        <div class="question-title">Question 2: Applied Context</div>
        <p>A projectile is launched with a path modeled by the function h(t) = -4.9t² + 20t + 1.5, where h is the height in meters and t is the time in seconds.</p>
        <ol type="a">
            <li>What is the initial height of the projectile?</li>
            <li>What is the initial velocity of the projectile?</li>
            <li>Calculate the maximum height reached by the projectile</li>
            <li>At what time does the projectile reach its maximum height?</li>
            <li>When does the projectile hit the ground?</li>
            <li>How does the discriminant of this function relate to the physical situation?</li>
        </ol>
    </div>
    
    <div class="question-box">
        <div class="question-title">Question 3: Transformations and Forms</div>
        <p>The function f(x) = 2x² - 8x + 7 can be written in the form f(x) = 2(x - p)² + q.</p>
        <ol type="a">
            <li>Find the values of p and q</li>
            <li>Hence, state the coordinates of the vertex of the curve</li>
            <li>Show that the minimum value of f(x) is 1</li>
            <li>Determine the range of the function</li>
            <li>If g(x) = f(x - 3), describe the transformation that maps f onto g</li>
        </ol>
    </div>
</div>
    
<div class="concept-box">
    <h2>Real-World Applications and Career Relevance</h2>
    
    <p>The study of quadratic functions in A-Level Mathematics prepares students for numerous applications in higher education and professional careers:</p>
    
    <div class="grid-2">
        <div class="application-card">
            <div class="application-title">🏗️ Engineering</div>
            <p>Engineers use quadratic functions to model arches, cables in suspension bridges, and trajectories. Structural engineers analyze parabolic shapes for their strength and load-bearing properties.</p>
        </div>
        
        <div class="application-card">
            <div class="application-title">📊 Economics</div>
            <p>Certain supply and demand models follow quadratic patterns, particularly when examining diminishing returns. Revenue and profit functions often take quadratic forms, with the vertex representing maximum profit.</p>
        </div>
    </div>
    
    <div class="grid-2">
        <div class="application-card">
            <div class="application-title">🔭 Physics</div>
            <p>Beyond projectile motion, quadratic relationships appear in optics (parabolic mirrors), electrical circuits (energy storage), and quantum mechanics (wave functions).</p>
        </div>
        
        <div class="application-card">
            <div class="application-title">💻 Computer Science</div>
            <p>Algorithms employ quadratic functions in computational complexity analysis. Certain sorting algorithms have quadratic time complexity, represented as O(n²).</p>
        </div>
    </div>
    
    <div class="key-point">
        <p>The analytical thinking developed through studying quadratic functions—breaking complex problems into manageable components, recognizing patterns, and applying mathematical models to real situations—provides valuable transferable skills for any career path.</p>
    </div>
    
    <p>By mastering quadratic functions in A-Level Mathematics, students develop not only the technical knowledge required for examination success but also a foundation for understanding the mathematical principles that describe countless phenomena in our world.</p>
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

  const handleCardClick = (cardType: 'overview' | 'learningOutcomes' | 'visualization' | 'practiceQuestions') => {
    setLoadingStates({
      ...loadingStates,
      [cardType]: true
    });

    setTimeout(() => {
      setLoadingStates({
        ...loadingStates,
        [cardType]: false
      });
    }, 2000);
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
            <Card className="shadow-md rounded-xl overflow-hidden border-0 bg-white">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-semibold mb-4 text-[#1A1A2E]">
                    Hi, I'm AI-education.
                  </h1>
                  <p className="text-lg text-gray-600">
                    What can I help you with today?
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Textarea
                    placeholder="Ask about any mathematics topic or concept you want to understand..."
                    className="min-h-[120px] border-gray-200 rounded-lg"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-white text-lg font-medium"
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
                {prompt ? prompt : 'AI Explainer'}
              </h1>
              
              <div className="text-center mb-2">
                <span className="bg-white px-3 py-1 rounded-full text-blue-800 text-sm font-medium">
                  Source: Pearson A-Level Pure Mathematics 2, Summer 2022/23 Pure Mathematics 2 Exam
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <PlaceholderCard
                title="Overview of Quadratic Functions"
                onClick={() => handleCardClick('overview')}
                isLoading={loadingStates.overview}
                content={formattedOverviewContent}
                icon={<BookOpen className="w-6 h-6" />}
                delay={0.2}
                bgColor="#E5DEFF"
                titleColor="#2563EB"
                visualMode={true}
                useAnimatedContent={false}
                isFormatted={true}
              />
              
              <PlaceholderCard
                title="Learning Outcomes and Relevance in A-Levels"
                onClick={() => handleCardClick('learningOutcomes')}
                isLoading={loadingStates.learningOutcomes}
                content={detailedOutcomesContent}
                icon={<GraduationCap className="w-6 h-6" />} 
                delay={0.4}
                bgColor="#F2FCE2"
                titleColor="#16A34A"
                isFormatted={true}
                isHtml={true}
                useAnimatedContent={true}
              />
              
              <PlaceholderCard
                title="Interactive Quadratic Function Visualisation"
                onClick={() => handleCardClick('visualization')}
                isLoading={loadingStates.visualization}
                content=""
                contentComponent={<InteractiveQuadraticFunctions />}
                icon={<LineChart className="w-6 h-6" />}
                delay={0.6}
                bgColor="#E5DEFF"
                titleColor="#9333EA"
                hasCustomContent={true}
              />
              
              <PlaceholderCard
                title="Practice Exam Questions"
                onClick={() => handleCardClick('practiceQuestions')}
                isLoading={loadingStates.practiceQuestions}
                contentComponent={
                  <QuestionsSection 
                    questions={questions}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                    showAnswers={showAnswers}
                    setShowAnswers={setShowAnswers}
                  />
                }
                icon={<PenTool className="w-6 h-6" />}
                delay={0.8}
                bgColor="#FEF9E7"
                titleColor="#F59E0B"
                hasCustomContent={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PlaceholderCardProps {
  title: string;
  onClick: () => void;
  isLoading: boolean;
  content?: string;
  contentComponent?: React.ReactNode;
  icon?: React.ReactNode;
  delay: number;
  bgColor: string;
  titleColor: string;
  visualMode?: boolean;
  isFormatted?: boolean;
  isHtml?: boolean;
  useAnimatedContent?: boolean;
  hasCustomContent?: boolean;
}

const PlaceholderCard: React.FC<PlaceholderCardProps> = ({ 
  title, 
  onClick, 
  isLoading,
  content, 
  contentComponent,
  icon, 
  delay, 
  bgColor, 
  titleColor, 
  visualMode = false,
  isFormatted = false,
  isHtml = false,
  useAnimatedContent = false,
  hasCustomContent = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (!isExpanded && !isLoading) {
      onClick();
    }
  };

  useEffect(() => {
    if (!isLoading && loadingStates[title.toLowerCase().split(' ')[0]] === true) {
      setIsExpanded(true);
    }
  }, [isLoading, title]);

  const handleClose = () => {
    setIsExpanded(false);
  };

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
          {isLoading ? (
            <div className="p-6 flex flex-col items-center justify-center h-full text-center">
              <Loader2 className="h-10 w-10 animate-spin mb-4" style={{ color: titleColor }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: titleColor }}>
                Generating...
              </h2>
              <p className="text-[#333333]">Please wait</p>
            </div>
          ) : isExpanded ? (
            <div className="p-6 overflow-auto flex-grow">
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A2E] flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {title}
              </h2>
              
              {hasCustomContent && contentComponent ? (
                contentComponent
              ) : isFormatted ? (
                isHtml ? (
                  <div className="prose max-w-none">
                    <AnimatedContent
                      content={content || ""}
                      speed={5}
                      animate={true}
                      isHtml={true}
                    />
                  </div>
                ) : (
                  <div 
                    className="prose max-w-none overview-content"
                    dangerouslySetInnerHTML={{ __html: content || "" }}
                  />
                )
              ) : useAnimatedContent ? (
                <div className="prose max-w-none">
                  <AnimatedContent
                    content={content || ""}
                    speed={10}
                    highlightTerms={true}
                    visualMode={visualMode}
                    isHtml={isHtml}
                  />
                </div>
              ) : (
                <div className="prose max-w-none">
                  <TypewriterText
                    text={content || ""}
                    speed={20}
                    highlightTerms={true}
                    visualMode={visualMode}
                    animate={true}
                  />
                </div>
              )}
              
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              className="p-6 flex flex-col items-center justify-center h-full text-center cursor-pointer"
              onClick={handleClick}
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

const QuestionsSection: React.FC<QuestionsSectionProps> = ({
  questions,
  userAnswers,
  setUserAnswers,
  showAnswers,
  setShowAnswers
}) => {
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

  const checkAnswer = (questionId: string, userAnswer: string, correctAnswer: string) => {
    return userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());
  };

  return (
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
  );
};

export default AIExplainer;
