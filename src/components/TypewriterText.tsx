
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text?: string; // Making this optional
  speed?: number;
  highlightTerms?: boolean;
  visualMode?: boolean;
  animate?: boolean;
  markdown?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 30,
  highlightTerms = false,
  visualMode = false,
  animate = false,
  markdown
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentToDisplay = markdown || text || '';

  useEffect(() => {
    // If animation is disabled, display all text immediately
    if (!animate) {
      setDisplayedText(contentToDisplay);
      return;
    }

    if (currentIndex < contentToDisplay.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + contentToDisplay[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, contentToDisplay, speed, animate]);

  const formatText = (content: string) => {
    if (!content) return '';
    
    // Process markdown headings
    let processedText = content.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>');
    processedText = processedText.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold my-3">$1</h2>');
    processedText = processedText.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold my-2">$1</h3>');
    
    // Process bold text
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Process italics
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Process bullet points
    processedText = processedText.replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>');
    
    // Process numbered lists (simplified)
    processedText = processedText.replace(/^\d+\. (.*?)$/gm, '<li class="ml-4">$1</li>');
    
    // Convert line breaks to paragraphs for better readability
    const paragraphs = processedText.split('\n\n');
    return paragraphs.map(p => {
      if (p.trim() === '') return '';
      if (p.startsWith('<h1') || p.startsWith('<h2') || p.startsWith('<h3')) return p;
      if (p.includes('<li>')) return `<ul class="my-2">${p}</ul>`;
      return `<p class="my-2">${p}</p>`;
    }).join('');
  };

  const formattedText = formatText(displayedText);
  
  return (
    <div 
      className="whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};

export default TypewriterText;
