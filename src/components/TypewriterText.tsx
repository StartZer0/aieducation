
import React, { useState, useEffect } from 'react';
import { MarkdownRenderer } from "@/components/study/MarkdownRenderer";

interface TypewriterTextProps {
  text: string;
  speed?: number; // Words per second
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 1
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (text) {
      setIsComplete(false);
      setDisplayedText('');
      
      // Split text into words
      const words = text.split(' ');
      let currentIndex = 0;
      
      // Start typing animation
      const typeWords = () => {
        if (currentIndex < words.length) {
          const nextWord = words[currentIndex];
          setDisplayedText(prev => prev + (currentIndex > 0 ? ' ' : '') + nextWord);
          currentIndex++;
          
          // Calculate delay based on speed (words per second)
          const delay = 1000 / speed;
          setTimeout(typeWords, delay);
        } else {
          setIsComplete(true);
        }
      };
      
      typeWords();
      
      return () => {
        // Cleanup any pending timeouts when component unmounts
        setIsComplete(true);
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
