
import React, { useState, useEffect, useRef } from 'react';
import { MarkdownRenderer } from "@/components/study/MarkdownRenderer";

interface TypewriterTextProps {
  text: string;
  speed?: number; // Words per second
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 6 // Default speed of 6 words per second
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef<number>(0);
  
  useEffect(() => {
    if (!text) return;
    
    // Reset state when text changes
    setIsComplete(false);
    setDisplayedText('');
    currentWordIndexRef.current = 0;
    
    // Split text into words
    wordsRef.current = text.split(' ');
    
    // Calculate delay based on speed (words per second)
    const delay = 1000 / speed;
    
    // Function to add the next word
    const typeNextWord = () => {
      if (currentWordIndexRef.current < wordsRef.current.length) {
        const nextWord = wordsRef.current[currentWordIndexRef.current];
        setDisplayedText(prev => prev + (currentWordIndexRef.current > 0 ? ' ' : '') + nextWord);
        currentWordIndexRef.current++;
        
        // Schedule the next word
        typingTimerRef.current = setTimeout(typeNextWord, delay);
      } else {
        setIsComplete(true);
      }
    };
    
    // Start typing animation
    typeNextWord();
    
    // Cleanup function
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [text, speed]);
  
  return (
    <div className="relative">
      <MarkdownRenderer markdown={displayedText} />
      {!isComplete && (
        <div className="inline-block w-2 h-4 ml-1 bg-blue-500 animate-pulse" />
      )}
    </div>
  );
};

export default TypewriterText;
