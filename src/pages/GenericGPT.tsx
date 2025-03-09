import React, { useEffect, useState, useRef } from 'react';
import { Bot, User, AlertTriangle, Info, BrainCircuit } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isComplete: boolean;
}

// Define special sections to highlight/label
interface TextHighlight {
  text: string;
  type: 'hallucination' | 'irrelevant' | 'mismatch';
  label: string;
  icon: React.ReactNode;
}

const textHighlights: TextHighlight[] = [
  {
    text: "Mathematically, vectors can be expressed in component form, such as (x, y) in two dimensions or (x, y, z) in three dimensions.",
    type: "hallucination",
    label: "AI Hallucination",
    icon: <AlertTriangle className="w-4 h-4 text-amber-500" />
  },
  {
    text: "Unlike scalars, which only have magnitude (such as temperature or mass), vectors provide additional information about direction, making them essential in various scientific and engineering applications.",
    type: "irrelevant",
    label: "Irrelevent Information",
    icon: <Info className="w-4 h-4 text-blue-500" />
  },
  {
    text: "physics (to describe forces, velocity, and acceleration), computer graphics (for transformations and rendering), and machine learning (as multi-dimensional feature representations).",
    type: "mismatch",
    label: "Mismatch of Student's Skill Level",
    icon: <BrainCircuit className="w-4 h-4 text-purple-500" />
  }
];

const initialMessages: Message[] = [
  {
    id: "initial-user-message",
    content: "Teach me Linear Algebra",
    isUser: true,
    isComplete: true
  },
  {
    id: "initial-bot-response",
    content: "Understanding Vectors\nIn mathematics and physics, vectors are fundamental entities used to represent quantities that have both magnitude and direction. Unlike scalars, which only have magnitude (such as temperature or mass), vectors provide additional information about direction, making them essential in various scientific and engineering applications.\n\nA vector is typically represented as an arrow in a coordinate system. The length of the arrow indicates the vector's magnitude, while the direction of the arrow determines its orientation. Mathematically, vectors can be expressed in component form, such as (x, y) in two dimensions or (x, y, z) in three dimensions.\n\nOperations with Vectors\nVectors can be added, subtracted, and scaled using basic arithmetic operations. The vector sum follows the parallelogram rule or the tip-to-tail method, where placing the tail of one vector at the tip of another results in a new vector. Additionally, multiplying a vector by a scalar changes its magnitude but not its direction.\n\nApplications of Vectors\nVectors are widely used in physics (to describe forces, velocity, and acceleration), computer graphics (for transformations and rendering), and machine learning (as multi-dimensional feature representations). Their ability to encode direction and magnitude makes them an essential tool in modern science and technology.",
    isUser: false,
    isComplete: false
  }
];

export default function GenericGPT() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set the document title
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
    const typingSpeed = 25; // faster typing speed (milliseconds per character)
    
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
    simulateBotTyping(initialMessages[1].content, initialMessages[1].id);
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
    
    const totalChars = text.length;
    const maxTypingTime = 2000; // 2 seconds maximum for the entire text
    const charsPerBatch = Math.ceil(totalChars / 10); // Divide text into batches
    
    let currentText = "";
    let startTime = Date.now();
    
    // Type the text in batches to complete within 2 seconds
    for (let i = 0; i < totalChars; i += charsPerBatch) {
      const endIdx = Math.min(i + charsPerBatch, totalChars);
      currentText += text.substring(i, endIdx);
      
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          id: messageId,
          content: currentText,
          isUser: false,
          isComplete: false
        }
      ]);
      
      const elapsedTime = Date.now() - startTime;
      const remainingBatches = Math.ceil((totalChars - endIdx) / charsPerBatch);
      if (remainingBatches > 0) {
        const timePerBatch = (maxTypingTime - elapsedTime) / remainingBatches;
        await new Promise(resolve => setTimeout(resolve, Math.max(50, timePerBatch)));
      }
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
    
    // Show annotations after typing is complete
    setTimeout(() => {
      setShowAnnotations(true);
    }, 500);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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

  // Function to highlight and annotate specific parts of the text
  const renderAnnotatedText = (text: string) => {
    if (!showAnnotations) {
      return <p className="whitespace-pre-wrap">{text}</p>;
    }

    let remainingText = text;
    const elements: JSX.Element[] = [];
    let key = 0;

    // Process each highlight
    textHighlights.forEach((highlight) => {
      const parts = remainingText.split(highlight.text);
      
      if (parts.length > 1) {
        // Add text before the highlight
        if (parts[0]) {
          elements.push(<span key={key++}>{parts[0]}</span>);
        }
        
        // Add the highlighted text with annotation
        const bgColors = {
          hallucination: "bg-amber-100 dark:bg-amber-900/40",
          irrelevant: "bg-blue-100 dark:bg-blue-900/40",
          mismatch: "bg-purple-100 dark:bg-purple-900/40"
        };
        
        const borderColors = {
          hallucination: "border-amber-300 dark:border-amber-700",
          irrelevant: "border-blue-300 dark:border-blue-700",
          mismatch: "border-purple-300 dark:border-purple-700"
        };
        
        elements.push(
          <div key={key++} className={`relative group my-1 ${bgColors[highlight.type]} p-1 rounded border ${borderColors[highlight.type]}`}>
            <div className="flex items-start gap-1">
              {highlight.icon}
              <div>
                <div className="text-xs font-semibold mb-1 flex items-center">
                  {highlight.label}
                </div>
                <span>{highlight.text}</span>
              </div>
            </div>
          </div>
        );
        
        // Update remaining text to continue processing
        remainingText = parts.slice(1).join(highlight.text);
      }
    });
    
    // Add any remaining text
    if (remainingText) {
      elements.push(<span key={key++}>{remainingText}</span>);
    }
    
    return <div className="whitespace-pre-wrap space-y-1">{elements}</div>;
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">GenericGPT</h1>
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
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
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
                  renderAnnotatedText(message.content)
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
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
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
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:px-6 md:px-8">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-3xl mx-auto flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 dark:bg-blue-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
