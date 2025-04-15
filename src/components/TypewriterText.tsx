
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MarkdownRenderer } from "@/components/study/MarkdownRenderer";

interface TypewriterTextProps {
  text?: string;
  markdown?: string;
  speed?: number; // Words per second
  highlightTerms?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  markdown,
  speed = 15, // Default speed
  highlightTerms = false
}) => {
  const content = markdown || text || '';
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef<number>(0);
  
  // Highlighted mathematical terms
  const mathTerms = [
    "function", "functions", "quadratic", "parabola", "vertex", "roots", 
    "equation", "equations", "coefficient", "coefficients", "axis of symmetry",
    "discriminant", "f\\(x\\)", "a", "b", "c", "x-intercepts", "y-intercept",
    "minimum", "maximum", "domain", "range", "degree", "polynomial",
    "vector", "vectors", "matrix", "matrices", "linear", "algebra",
    "dimensions", "perpendicular", "midpoint", "origin", "plane"
  ];
  
  const typeNextWord = useCallback(() => {
    if (currentWordIndexRef.current < wordsRef.current.length) {
      const nextWord = wordsRef.current[currentWordIndexRef.current];
      setDisplayedText(prev => prev + (currentWordIndexRef.current > 0 ? ' ' : '') + nextWord);
      currentWordIndexRef.current++;
      
      typingTimerRef.current = setTimeout(typeNextWord, 1000 / speed);
    } else {
      setIsComplete(true);
    }
  }, [speed]);
  
  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    currentWordIndexRef.current = 0;
    
    if (!content) return;

    wordsRef.current = content.split(' ');
    
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    
    typeNextWord();
    
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [content, typeNextWord]);
  
  // Function to highlight mathematical terms without creating span elements
  const highlightContent = (text: string) => {
    if (!highlightTerms) return text;
    
    // For markdown, we'll use markdown syntax for highlighting
    const highlightedText = text.replace(/\b(function|functions|quadratic|parabola|vertex|roots|equation|equations|coefficient|coefficients|axis of symmetry|discriminant|f\(x\)|a|b|c|x-intercepts|y-intercept|minimum|maximum|domain|range|degree|polynomial|vector|vectors|matrix|matrices|linear|algebra|dimensions|perpendicular|midpoint|origin|plane)\b/gi, 
      (match) => `**${match}**`
    );
    
    return highlightedText;
  };
  
  return (
    <div className="relative">
      {markdown ? (
        <MarkdownRenderer markdown={highlightTerms ? highlightContent(displayedText) : displayedText} />
      ) : (
        <div className="prose">
          {displayedText.split(' ').map((word, index) => {
            const isHighlighted = highlightTerms && 
              mathTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(word));
            
            return (
              <React.Fragment key={index}>
                {index > 0 && ' '}
                <span 
                  className={isHighlighted ? "animate-pulse bg-blue-100 text-blue-800 px-1 py-0.5 rounded" : ""}
                >
                  {word}
                </span>
              </React.Fragment>
            );
          })}
        </div>
      )}
      {!isComplete && (
        <div className="inline-block w-2 h-4 ml-1 bg-blue-500 animate-pulse" />
      )}
    </div>
  );
};

export default React.memo(TypewriterText);
