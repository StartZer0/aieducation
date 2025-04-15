
import React, { useState, useEffect } from 'react';

interface AnimatedContentProps {
  content: string;
  speed?: number;
  highlightTerms?: boolean;
  visualMode?: boolean;
  animate?: boolean;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  content,
  speed = 30,
  highlightTerms = false,
  visualMode = false,
  animate = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If animation is disabled, display all text immediately
    if (!animate) {
      setDisplayedText(content);
      return;
    }

    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, content, speed, animate]);

  const formatText = (text: string) => {
    if (!text) return '';
    
    // Process markdown headings
    let processedText = text.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>');
    processedText = processedText.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold my-3">$1</h2>');
    processedText = processedText.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold my-2">$1</h3>');
    
    // Process bold text
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Process italics
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Process bullet points
    processedText = processedText.replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>');
    
    // Process numbered lists
    processedText = processedText.replace(/^\d+\. (.*?)$/gm, '<li class="ml-4">$1</li>');
    
    // Convert line breaks to paragraphs
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
