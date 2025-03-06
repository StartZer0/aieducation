
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);
  
  // Convert line breaks to JSX line breaks
  const formattedText = displayedText.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < displayedText.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
  
  return <div className="whitespace-pre-line">{formattedText}</div>;
};

export default TypewriterText;
