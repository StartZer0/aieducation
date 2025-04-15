
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MarkdownRenderer } from "@/components/study/MarkdownRenderer";

interface TypewriterTextProps {
  text: string;
  speed?: number; // Words per second
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 12 // Updated default speed to 12 words per second
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef<number>(0);
  const isInitialRenderRef = useRef<boolean>(true);
  
  // Using useCallback to prevent recreation of this function on each render
  const typeNextWord = useCallback(() => {
    if (currentWordIndexRef.current < wordsRef.current.length) {
      const nextWord = wordsRef.current[currentWordIndexRef.current];
      setDisplayedText(prev => prev + (currentWordIndexRef.current > 0 ? ' ' : '') + nextWord);
      currentWordIndexRef.current++;
      
      // Schedule the next word
      typingTimerRef.current = setTimeout(typeNextWord, 1000 / speed);
    } else {
      setIsComplete(true);
    }
  }, [speed]);
  
  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsComplete(false);
    currentWordIndexRef.current = 0;
    
    if (!text) return;

    // Split text into words
    wordsRef.current = text.split(' ');
    
    // Initial render check to prevent double initialization
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      
      // Start typing animation
      typeNextWord();
    } else {
      // Start typing animation after text change
      typeNextWord();
    }
    
    // Cleanup function
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
