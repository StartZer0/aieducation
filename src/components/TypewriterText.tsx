import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MarkdownRenderer } from "@/components/study/MarkdownRenderer";

interface TypewriterTextProps {
  text: string;
  speed?: number; // Words per second
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 15 // Default speed to 15 words per second (increased from 12)
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef<number>(0);
  const isInitialRenderRef = useRef<boolean>(true);
  
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
    
    if (!text) return;

    wordsRef.current = text.split(' ');
    
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
  }, [text, typeNextWord]);
  
  return (
    <div className="relative">
      <MarkdownRenderer markdown={displayedText} />
      {!isComplete && (
        <div className="inline-block w-2 h-4 ml-1 bg-blue-500 animate-pulse" />
      )}
    </div>
  );
};

export default React.memo(TypewriterText);
