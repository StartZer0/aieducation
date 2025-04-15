
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
  
  useEffect(() => {
    if (text) {
      setIsComplete(false);
      setDisplayedText('');
      
      // Split text into words
      const words = text.split(' ');
      let currentWordIndex = 0;
      
      // Calculate delay based on speed (words per second)
      const delay = 1000 / speed;
      
      // Function to add the next word
      const typeNextWord = () => {
        if (currentWordIndex < words.length) {
          const nextWord = words[currentWordIndex];
          setDisplayedText(prev => prev + (currentWordIndex > 0 ? ' ' : '') + nextWord);
          currentWordIndex++;
          
          // Schedule the next word
          typingTimerRef.current = setTimeout(typeNextWord, delay);
        } else {
          setIsComplete(true);
        }
      };
      
      // Start typing animation
      typeNextWord();
      
      // Cleanup function to clear any pending timeouts
      return () => {
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
        }
      };
    }
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
