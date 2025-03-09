
import React, { useEffect, useState, useRef } from 'react';
import { User, AlertTriangle, Info, BrainCircuit } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isComplete: boolean;
}

// Highlight sections that need special treatment
interface HighlightSection {
  id: string;
  text: string;
  type: 'hallucination' | 'irrelevant' | 'mismatch';
  label: string;
  icon: React.ReactNode;
  position: number;
  textStart: number;
  textEnd: number;
}

const highlightSections: HighlightSection[] = [
  {
    id: 'hallucination-1',
    text: "Mathematically, vectors can be expressed in component form, such as (x, y) in two dimensions or (x, y, z) in three dimensions.",
    type: "hallucination",
    label: "AI Hallucination",
    icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    position: 380,
    textStart: 380,
    textEnd: 510
  },
  {
    id: 'irrelevant-1',
    text: "Unlike scalars, which only have magnitude (such as temperature or mass), vectors provide additional information about direction, making them essential in various scientific and engineering applications.",
    type: "irrelevant",
    label: "Irrelevant Information",
    icon: <Info className="w-4 h-4 text-blue-500" />,
    position: 180,
    textStart: 180,
    textEnd: 380
  },
  {
    id: 'mismatch-1',
    text: "physics (to describe forces, velocity, and acceleration), computer graphics (for transformations and rendering), and machine learning (as multi-dimensional feature representations)",
    type: "mismatch",
    label: "Mismatch of Student's Skill Level",
    icon: <BrainCircuit className="w-4 h-4 text-purple-500" />,
    position: 650,
    textStart: 650,
    textEnd: 850
  }
];

// Format the bot response with bold headers
const botResponse = `**Understanding Vectors**
In mathematics and physics, vectors are fundamental entities used to represent quantities that have both magnitude and direction. Unlike scalars, which only have magnitude (such as temperature or mass), vectors provide additional information about direction, making them essential in various scientific and engineering applications.

A vector is typically represented as an arrow in a coordinate system. The length of the arrow indicates the vector's magnitude, while the direction of the arrow determines its orientation. Mathematically, vectors can be expressed in component form, such as (x, y) in two dimensions or (x, y, z) in three dimensions.

**Operations with Vectors**
Vectors can be added, subtracted, and scaled using basic arithmetic operations. The vector sum follows the parallelogram rule or the tip-to-tail method, where placing the tail of one vector at the tip of another results in a new vector. Additionally, multiplying a vector by a scalar changes its magnitude but not its direction.

**Applications of Vectors**
Vectors are widely used in physics (to describe forces, velocity, and acceleration), computer graphics (for transformations and rendering), and machine learning (as multi-dimensional feature representations). Their ability to encode direction and magnitude makes them an essential tool in modern science and technology.`;

export default function GenericGPT() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const botMessageRef = useRef<HTMLDivElement>(null);
  const highlightPositionsRef = useRef<Map<string, {top: number, left: number}>>(new Map());
  
  useEffect(() => {
    // Set document title
    document.title = "GenericGPT";
    
    // Start with first user message being typed
    simulateUserTyping("Teach me Linear Algebra", "initial-user-message");
  }, []);
  
  const simulateUserTyping = async (text: string, messageId: string) => {
    setIsTyping(true);
    setMessages([{
      id: messageId,
      content: "",
      isUser: true,
      isComplete: false
    }]);
    
    let currentText = "";
    const typingSpeed = 1; // Even faster typing speed (milliseconds per character)
    
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setMessages([{
        id: messageId,
        content: currentText,
        isUser: true,
        isComplete: false
      }]);
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
    
    setMessages([{
      id: messageId,
      content: text,
      isUser: true,
      isComplete: true
    }]);
    setIsTyping(false);
    
    // After typing is complete, start the bot response
    simulateBotTyping(botResponse, "bot-response-1");
  };
  
  const simulateBotTyping = async (text: string, messageId: string) => {
    setIsTyping(true);
    setShowAnnotations(false);
    
    setMessages(prev => [...prev, {
      id: messageId,
      content: "",
      isUser: false,
      isComplete: false
    }]);
    
    // Even faster typing with minimal pauses
    const totalChars = text.length;
    const minTypingSpeed = 0.5; // milliseconds per character (much faster)
    const maxTypingSpeed = 1.5; // milliseconds per character (still variable but faster)
    
    let currentText = "";
    let lastPausePosition = 0;
    
    for (let i = 0; i < totalChars; i++) {
      // Add minimal pauses at periods, commas and line breaks
      const shouldPause = 
        text[i] === '.' || 
        text[i] === ',' || 
        text[i] === '\n' || 
        (i - lastPausePosition > 80 && Math.random() > 0.95); // Even fewer random pauses
      
      currentText += text[i];
      
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          id: messageId,
          content: currentText,
          isUser: false,
          isComplete: false
        }
      ]);
      
      // Variable typing speed but faster overall
      const charSpeed = Math.floor(Math.random() * (maxTypingSpeed - minTypingSpeed) + minTypingSpeed);
      
      // Much shorter additional pause at punctuation or paragraph breaks
      let pauseTime = charSpeed;
      if (shouldPause) {
        lastPausePosition = i;
        if (text[i] === '.') pauseTime += 15; // Much shorter pause
        else if (text[i] === ',') pauseTime += 8; // Much shorter pause
        else if (text[i] === '\n') pauseTime += 20; // Much shorter pause
        else pauseTime += 5; // Much shorter random pause
      }
      
      await new Promise(resolve => setTimeout(resolve, pauseTime));
    }
    
    setMessages(prev => [
      ...prev.slice(0, -1),
      {
        id: messageId,
        content: text,
        isUser: false,
        isComplete: true
      }
    ]);
    
    setIsTyping(false);
    
    // Show annotations immediately after typing is complete
    setShowAnnotations(true);
    
    // Force recalculation of text positions after a slight delay to ensure DOM is updated
    setTimeout(findTextPositionsInDOM, 100);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Add a separate effect for recalculating positions whenever annotations are toggled
  useEffect(() => {
    if (showAnnotations) {
      // Use a short delay to ensure the DOM is fully rendered
      const timer = setTimeout(findTextPositionsInDOM, 100);
      return () => clearTimeout(timer);
    }
  }, [showAnnotations]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      isComplete: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
  };

  // Improved method to find text positions with more reliable positioning
  const findTextPositionsInDOM = () => {
    if (!botMessageRef.current || !showAnnotations) return;
    
    const container = botMessageRef.current;
    
    // Clear previous positions
    highlightPositionsRef.current = new Map();
    
    highlightSections.forEach(section => {
      // Find text in the DOM using Range and window.find to get better precision
      const fullText = container.innerText || '';
      const exactText = section.text;
      
      // Check if the text exists in the content
      if (fullText.includes(exactText)) {
        // Create a range to search for the text
        const range = document.createRange();
        const treeWalker = document.createTreeWalker(
          container,
          NodeFilter.SHOW_TEXT,
          null
        );
        
        let node;
        let foundRange = null;
        
        // Iterate through all text nodes to find our text
        while (node = treeWalker.nextNode()) {
          const nodeText = node.textContent || '';
          const index = nodeText.indexOf(exactText);
          
          if (index > -1) {
            // Found the text in this node
            range.setStart(node, index);
            range.setEnd(node, index + exactText.length);
            foundRange = range;
            break;
          }
        }
        
        // If we found the text, get its position
        if (foundRange) {
          const rect = foundRange.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Store the position relative to the container
          highlightPositionsRef.current.set(section.id, {
            top: rect.top - containerRect.top,
            left: rect.left - containerRect.left
          });
        }
      }
    });
    
    // Force a re-render to update the UI with the new positions
    setShowAnnotations(false);
    setTimeout(() => setShowAnnotations(true), 0);
  };
  
  // Effect to update positions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (showAnnotations) {
        findTextPositionsInDOM();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showAnnotations]);

  // Process the text with formatting and annotations
  const renderBotMessage = (content: string) => {
    // Bold headers
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Create the base content with formatting
    const contentElement = (
      <div 
        ref={botMessageRef}
        className="whitespace-pre-wrap relative" 
        dangerouslySetInnerHTML={{ __html: formattedContent }} 
      />
    );
    
    // If annotations aren't showing yet, just return the formatted content
    if (!showAnnotations) {
      return contentElement;
    }
    
    return (
      <div className="relative">
        {contentElement}
        
        {/* Left side annotation bubbles with direct pointers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* AI Hallucination Bubble */}
          {highlightPositionsRef.current.has('hallucination-1') && (
            <div 
              className="absolute bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800 shadow-lg animate-fade-in pointer-events-auto"
              style={{ 
                top: `${highlightPositionsRef.current.get('hallucination-1')?.top || 0}px`,
                right: '100%',
                marginRight: '10px',
                width: '280px',
                zIndex: 10
              }}
            >
              <div className="flex items-center gap-1.5 mb-2 text-amber-600 dark:text-amber-300 font-medium">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm">AI Hallucination</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This is mathematically correct but could be misleading without further context.
              </p>
              {/* Triangle pointer to content - right side of bubble */}
              <div className="absolute right-0 top-4 transform translate-x-[100%] rotate-45 w-3 h-3 bg-amber-100 dark:bg-amber-900/30 border-r border-t border-amber-200 dark:border-amber-800"></div>
            </div>
          )}

          {/* Irrelevant Information Bubble */}
          {highlightPositionsRef.current.has('irrelevant-1') && (
            <div 
              className="absolute bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800 shadow-lg animate-fade-in pointer-events-auto" 
              style={{ 
                top: `${highlightPositionsRef.current.get('irrelevant-1')?.top || 0}px`,
                right: '100%',
                marginRight: '10px',
                width: '280px',
                zIndex: 20,
                animationDelay: '150ms'
              }}
            >
              <div className="flex items-center gap-1.5 mb-2 text-blue-600 dark:text-blue-300 font-medium">
                <Info className="w-5 h-5" />
                <h3 className="text-sm">Irrelevant Information</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This comparison to scalars, while accurate, doesn't address the student's specific question about Linear Algebra.
              </p>
              {/* Triangle pointer to content - right side of bubble */}
              <div className="absolute right-0 top-4 transform translate-x-[100%] rotate-45 w-3 h-3 bg-blue-100 dark:bg-blue-900/30 border-r border-t border-blue-200 dark:border-blue-800"></div>
            </div>
          )}

          {/* Mismatch of Student's Skill Level Bubble */}
          {highlightPositionsRef.current.has('mismatch-1') && (
            <div 
              className="absolute bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800 shadow-lg animate-fade-in pointer-events-auto" 
              style={{ 
                top: `${highlightPositionsRef.current.get('mismatch-1')?.top || 0}px`,
                right: '100%',
                marginRight: '10px',
                width: '280px',
                zIndex: 30,
                animationDelay: '300ms'
              }}
            >
              <div className="flex items-center gap-1.5 mb-2 text-purple-600 dark:text-purple-300 font-medium">
                <BrainCircuit className="w-5 h-5" />
                <h3 className="text-sm">Mismatch of Student's Skill Level</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                These examples are too advanced for someone just starting to learn Linear Algebra.
              </p>
              {/* Triangle pointer to content - right side of bubble */}
              <div className="absolute right-0 top-4 transform translate-x-[100%] rotate-45 w-3 h-3 bg-purple-100 dark:bg-purple-900/30 border-r border-t border-purple-200 dark:border-purple-800"></div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header - styled to look more like ChatGPT */}
      <header className="border-b border-gray-200 dark:border-gray-800 py-3 px-6 flex items-center justify-center bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-sm bg-green-600 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">GenericGPT</h1>
        </div>
      </header>
      
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start gap-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 rounded-sm bg-green-600 flex items-center justify-center flex-shrink-0">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`rounded-lg px-4 py-3 max-w-[85%] ${
                message.isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}>
                {message.isUser ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  renderBotMessage(message.content)
                )}
              </div>
              
              {message.isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && !messages.some(message => !message.isComplete) && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-sm bg-green-600 flex items-center justify-center flex-shrink-0">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div className="rounded-lg px-4 py-3 bg-gray-100 dark:bg-gray-800">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:px-6 md:px-8 bg-white dark:bg-gray-800">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-3xl mx-auto flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 text-gray-900 dark:text-gray-100"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-green-600 dark:bg-green-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-green-700 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
