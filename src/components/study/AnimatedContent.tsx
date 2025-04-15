
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedContentProps {
  content: string;
  speed?: number;
  highlightTerms?: boolean;
  visualMode?: boolean;
  animate?: boolean;
  isHtml?: boolean;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  content,
  speed = 5, // Default speed setting
  highlightTerms = false,
  visualMode = false,
  animate = true,
  isHtml = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(!animate);
  const location = useLocation();

  // Determine if we're on the AI Explainer page
  const isAIExplainerPage = location.pathname.includes('/ai-explainer');
  
  // Set faster speed for AI Explainer page
  const effectiveSpeed = isAIExplainerPage ? 1 : speed; // 1ms is very fast

  useEffect(() => {
    // If animation is disabled, display all content immediately
    if (!animate) {
      setDisplayedText(content);
      setIsComplete(true);
      return;
    }

    // For AI Explainer page, we can further optimize by using a chunk-based approach
    if (isAIExplainerPage && content.length > 100) {
      // Display content in larger chunks for faster rendering
      const chunkSize = 25; // Process 25 characters at a time for AI Explainer
      
      if (currentIndex < content.length) {
        const timer = setTimeout(() => {
          const end = Math.min(currentIndex + chunkSize, content.length);
          const nextChunk = content.substring(currentIndex, end);
          setDisplayedText(prev => prev + nextChunk);
          setCurrentIndex(end);
        }, effectiveSpeed);
        
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    } else {
      // Standard character-by-character animation for other pages
      if (currentIndex < content.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + content[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, effectiveSpeed);
        
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }
  }, [currentIndex, content, effectiveSpeed, animate, isAIExplainerPage]);

  const formatText = (text: string) => {
    if (!text || isHtml) return text; // Return as-is if empty or already HTML
    
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

  const contentToRender = isHtml ? displayedText : formatText(displayedText);
  
  return (
    <div 
      className={`whitespace-pre-wrap ${isComplete ? 'content-complete' : 'content-animating'}`}
      dangerouslySetInnerHTML={{ __html: contentToRender }}
    />
  );
};
