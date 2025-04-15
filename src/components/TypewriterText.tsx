
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MarkdownRenderer } from "@/components/study/MarkdownRenderer";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text?: string;
  markdown?: string;
  speed?: number; // Words per second
  highlightTerms?: boolean;
  animate?: boolean;
  visualMode?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  markdown,
  speed = 15, // Default speed
  highlightTerms = false,
  animate = true,
  visualMode = false
}) => {
  const content = markdown || text || '';
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef<number>(0);
  const [showParabola, setShowParabola] = useState(false);
  
  // Highlighted mathematical terms with colors
  const mathTerms = {
    "quadratic function": "#3b82f6",
    "function": "#3b82f6", 
    "functions": "#3b82f6", 
    "quadratic": "#3b82f6", 
    "parabola": "#ef4444", 
    "vertex": "#10b981", 
    "roots": "#8b5cf6", 
    "equation": "#f59e0b", 
    "equations": "#f59e0b", 
    "coefficient": "#6366f1", 
    "coefficients": "#6366f1", 
    "axis of symmetry": "#ec4899",
    "discriminant": "#f97316", 
    "f\\(x\\)": "#3b82f6", 
    "a": "#6366f1", 
    "b": "#6366f1", 
    "c": "#6366f1", 
    "x-intercepts": "#8b5cf6", 
    "y-intercept": "#8b5cf6",
    "minimum": "#10b981", 
    "maximum": "#10b981", 
    "domain": "#f59e0b", 
    "range": "#f59e0b", 
    "degree": "#6366f1", 
    "polynomial": "#3b82f6",
    "standard form": "#f59e0b",
    "ax²": "#6366f1", 
    "bx": "#6366f1", 
    "turning point": "#10b981"
  };
  
  const typeNextWord = useCallback(() => {
    if (currentWordIndexRef.current < wordsRef.current.length) {
      const nextWord = wordsRef.current[currentWordIndexRef.current];
      setDisplayedText(prev => prev + (currentWordIndexRef.current > 0 ? ' ' : '') + nextWord);
      currentWordIndexRef.current++;
      
      // Show parabola visual after 30% of content is displayed
      if (currentWordIndexRef.current > wordsRef.current.length * 0.3 && !showParabola) {
        setShowParabola(true);
      }
      
      typingTimerRef.current = setTimeout(typeNextWord, 1000 / speed);
    } else {
      setIsComplete(true);
    }
  }, [speed, showParabola]);
  
  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    setShowParabola(false);
    currentWordIndexRef.current = 0;
    
    if (!content) return;

    wordsRef.current = content.split(' ');
    
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    
    if (animate) {
      typeNextWord();
    } else {
      setDisplayedText(content);
      setIsComplete(true);
      setTimeout(() => setShowParabola(true), 500);
    }
    
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [content, typeNextWord, animate]);

  const renderPlainText = () => {
    return displayedText.split(' ').map((word, index) => {
      // Check if the word matches any of our math terms (case-insensitive)
      let isHighlighted = false;
      let highlightColor = "";
      
      if (highlightTerms) {
        for (const [term, color] of Object.entries(mathTerms)) {
          if (new RegExp(`\\b${term}\\b`, 'i').test(word.replace(/[.,;!?]$/, ''))) {
            isHighlighted = true;
            highlightColor = color;
            break;
          }
        }
      }
      
      return (
        <React.Fragment key={index}>
          {index > 0 && ' '}
          <motion.span 
            className={isHighlighted ? "px-1 py-0.5 rounded text-white font-medium" : ""}
            style={{ backgroundColor: isHighlighted ? highlightColor : undefined }}
            initial={isHighlighted ? { opacity: 0.7, scale: 0.95 } : undefined}
            animate={isHighlighted ? { 
              opacity: 1, 
              scale: 1,
              backgroundColor: highlightColor 
            } : undefined}
            transition={{ duration: 0.5 }}
          >
            {word}
          </motion.span>
        </React.Fragment>
      );
    });
  };
  
  const ParabolaVisual = () => (
    <motion.div 
      className="my-4 h-64 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white rounded-lg p-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 250 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        {/* Coordinate system */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-300"></div>
        <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-300"></div>
        
        {/* Positive parabola */}
        <motion.div 
          className="absolute w-64 h-32 border-4 border-blue-500 border-t-0 rounded-b-full"
          style={{ 
            left: "calc(50% - 8rem)", 
            bottom: "50%" 
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <motion.div 
            className="absolute bottom-0 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            <motion.span 
              className="absolute -bottom-6 -right-12 text-xs bg-green-100 px-2 py-1 rounded text-green-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Vertex (min)
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Negative parabola */}
        <motion.div 
          className="absolute w-64 h-32 border-4 border-red-500 border-b-0 rounded-t-full"
          style={{ 
            right: "calc(50% - 8rem)", 
            top: "50%" 
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
        >
          <motion.div 
            className="absolute top-0 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, type: "spring" }}
          >
            <motion.span 
              className="absolute top-2 -left-12 text-xs bg-green-100 px-2 py-1 rounded text-green-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              Vertex (max)
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Annotations */}
        <motion.div 
          className="absolute text-sm bottom-2 right-4 text-blue-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          f(x) = ax² + bx + c, a > 0
        </motion.div>

        <motion.div 
          className="absolute text-sm top-2 left-4 text-red-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          f(x) = ax² + bx + c, a < 0
        </motion.div>

        {/* Axis of symmetry */}
        <motion.div 
          className="absolute left-1/2 top-1/4 h-3/4 w-0.5 border-l-2 border-dashed border-purple-400 z-10"
          initial={{ height: 0 }}
          animate={{ height: "75%" }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <motion.span 
            className="absolute top-1/2 -left-20 text-xs bg-purple-100 px-2 py-1 rounded text-purple-800 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            Axis of symmetry: x = -b/2a
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );

  const ParabolaWithIntercepts = () => (
    <motion.div 
      className="my-4 h-64 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white rounded-lg p-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 250 }}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      <div className="relative w-full h-full">
        {/* Coordinate system */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-300"></div>
        <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-300"></div>
        
        {/* Complete parabola with intercepts */}
        <motion.svg
          viewBox="0 0 200 100"
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.8 }}
        >
          <motion.path
            d="M 20,80 Q 100,0 180,80"
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.9, duration: 1.5 }}
          />
          
          {/* x-intercepts */}
          <motion.circle 
            cx="40" 
            cy="50" 
            r="4" 
            fill="#8b5cf6" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 4.5 }}
          />
          <motion.circle 
            cx="160" 
            cy="50" 
            r="4" 
            fill="#8b5cf6" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 4.7 }}
          />
          
          {/* y-intercept */}
          <motion.circle 
            cx="100" 
            cy="65" 
            r="4" 
            fill="#f97316" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 4.9 }}
          />

          {/* Vertex */}
          <motion.circle 
            cx="100" 
            cy="15" 
            r="4" 
            fill="#10b981" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 5.1 }}
          />
        </motion.svg>

        {/* Annotations */}
        <motion.div
          className="absolute text-xs bg-purple-100 px-2 py-1 rounded text-purple-800"
          style={{ left: "20%", top: "52%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.6 }}
        >
          x-intercept 1
        </motion.div>

        <motion.div
          className="absolute text-xs bg-purple-100 px-2 py-1 rounded text-purple-800"
          style={{ right: "20%", top: "52%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8 }}
        >
          x-intercept 2
        </motion.div>

        <motion.div
          className="absolute text-xs bg-orange-100 px-2 py-1 rounded text-orange-800"
          style={{ left: "50%", bottom: "30%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.0 }}
        >
          y-intercept (0,c)
        </motion.div>

        <motion.div
          className="absolute text-xs bg-green-100 px-2 py-1 rounded text-green-800"
          style={{ left: "50%", top: "15%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.2 }}
        >
          Vertex (-b/2a, f(-b/2a))
        </motion.div>

        <motion.div
          className="absolute text-sm font-medium text-indigo-600"
          style={{ left: "10%", bottom: "5%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.3 }}
        >
          f(x) = ax² + bx + c
        </motion.div>
      </div>
    </motion.div>
  );
  
  const ParabolaDiscriminant = () => (
    <motion.div 
      className="my-4 flex flex-col space-y-4 bg-gradient-to-b from-blue-50 to-white rounded-lg p-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.5, delay: 5.5 }}
    >
      <motion.h3 
        className="text-center font-semibold text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.6 }}
      >
        Discriminant (b² - 4ac) Determines Roots
      </motion.h3>
      
      <div className="flex flex-wrap justify-center gap-4">
        {/* Positive discriminant */}
        <motion.div 
          className="flex flex-col items-center max-w-[200px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.8 }}
        >
          <div className="h-24 w-40 relative">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M 10,40 Q 50,0 90,40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              <line x1="30" y1="40" x2="30" y2="0" stroke="#ddd" strokeWidth="1" strokeDasharray="2" />
              <line x1="70" y1="40" x2="70" y2="0" stroke="#ddd" strokeWidth="1" strokeDasharray="2" />
              <circle cx="30" cy="40" r="3" fill="#8b5cf6" />
              <circle cx="70" cy="40" r="3" fill="#8b5cf6" />
            </svg>
          </div>
          <div className="bg-blue-100 rounded p-2 text-xs text-center mt-2">
            <span className="font-semibold">b² - 4ac > 0</span>
            <br />Two distinct real roots
          </div>
        </motion.div>

        {/* Zero discriminant */}
        <motion.div 
          className="flex flex-col items-center max-w-[200px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6.0 }}
        >
          <div className="h-24 w-40 relative">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M 10,50 Q 50,10 90,50"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
              <line x1="50" y1="50" x2="50" y2="0" stroke="#ddd" strokeWidth="1" strokeDasharray="2" />
              <circle cx="50" cy="50" r="3" fill="#8b5cf6" />
            </svg>
          </div>
          <div className="bg-green-100 rounded p-2 text-xs text-center mt-2">
            <span className="font-semibold">b² - 4ac = 0</span>
            <br />One repeated root
          </div>
        </motion.div>

        {/* Negative discriminant */}
        <motion.div 
          className="flex flex-col items-center max-w-[200px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6.2 }}
        >
          <div className="h-24 w-40 relative">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M 10,25 Q 50,0 90,25"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
              />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#ddd" strokeWidth="1" />
            </svg>
          </div>
          <div className="bg-red-100 rounded p-2 text-xs text-center mt-2">
            <span className="font-semibold">b² - 4ac < 0</span>
            <br />No real roots
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="text-center text-sm mt-2 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.4 }}
      >
        The discriminant formula: <span className="font-mono bg-gray-100 px-1">b² - 4ac</span> determines how many times the parabola crosses the x-axis
      </motion.div>
    </motion.div>
  );
  
  return (
    <div className="relative">
      {markdown ? (
        <MarkdownRenderer markdown={highlightTerms ? highlightContent(displayedText) : displayedText} />
      ) : (
        <>
          <div className="prose max-w-none">
            {renderPlainText()}
          </div>
          
          {visualMode && showParabola && (
            <>
              <ParabolaVisual />
              <ParabolaWithIntercepts />
              <ParabolaDiscriminant />
            </>
          )}
        </>
      )}
      {!isComplete && (
        <div className="inline-block w-2 h-4 ml-1 bg-blue-500 animate-pulse" />
      )}
    </div>
  );
};

export default React.memo(TypewriterText);
