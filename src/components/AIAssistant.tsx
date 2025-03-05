
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Maximize2, Minimize2, Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      // Add welcome message when opening for the first time if no messages
      if (messages.length === 0) {
        setTimeout(() => {
          addBotMessage("Hi there! I'm your AI tutor. How can I help you with your studies today?");
        }, 600);
      }
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  const addBotMessage = (content: string) => {
    setIsTyping(true);
    
    // Simulate typing delay based on message length
    const typingDelay = Math.min(1000, Math.max(600, content.length * 10));
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: generateId(),
          content,
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, typingDelay);
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const newMessage: Message = {
        id: generateId(),
        content: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "I can help you understand that concept. Let's break it down step by step...",
          "Great question! The key to solving this problem is to understand that...",
          "That's an interesting topic. Here's what you need to know...",
          "Let me explain this in a simpler way. Think of it like...",
          "I'd recommend focusing on the fundamental principles first. Let's start with...",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addBotMessage(randomResponse);
      }, 800);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className={`fixed bottom-5 right-5 z-30 transition-all duration-500 ease-in-out ${
      isMinimized ? 'w-16 h-16' : 'w-[380px] h-[520px] max-w-[calc(100vw-40px)] max-h-[calc(100vh-160px)]'
    }`}>
      {isMinimized ? (
        <button 
          onClick={toggleMinimized}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue to-teal flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Bot className="w-8 h-8 text-white" />
        </button>
      ) : (
        <div className="glass-card h-full flex flex-col rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue to-teal p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-medium">AI Tutor</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMinimized}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-xl p-3 ${
                  message.isUser 
                    ? 'bg-blue text-white rounded-tr-none' 
                    : 'bg-card border border-border rounded-tl-none'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card rounded-xl rounded-tl-none p-3 border border-border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue/60 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI tutor..."
                className="flex-1 max-h-24 min-h-[42px] rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 resize-none"
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                  inputValue.trim() 
                    ? 'bg-blue text-white hover:bg-blue-600' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
