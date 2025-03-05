
import React, { useState } from 'react';
import { SendHorizontal, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface StudyAIChatProps {
  subjectId: string;
  topicId: string;
  topicTitle: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function StudyAIChat({ subjectId, topicId, topicTitle }: StudyAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi there! I'm your learning assistant for ${topicTitle}. How can I help you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responseOptions = [
        `That's a great question about ${topicTitle}! The key concept here is...`,
        `When studying ${topicTitle}, it's important to remember that...`,
        `Let me explain this aspect of ${topicTitle} in more detail...`,
        `I'd recommend trying these practice problems to better understand ${topicTitle}...`
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseOptions[Math.floor(Math.random() * responseOptions.length)]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <Card 
              key={message.id}
              className={`p-3 max-w-[85%] ${
                message.role === 'user' 
                  ? 'ml-auto bg-primary text-primary-foreground' 
                  : 'mr-auto bg-muted'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center mb-1">
                  <Bot className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Learning Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </Card>
          ))}
          
          {isLoading && (
            <Card className="p-3 max-w-[85%] mr-auto bg-muted">
              <div className="flex items-center mb-1">
                <Bot className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Learning Assistant</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </Card>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${topicTitle}...`}
            className="min-h-12 resize-none"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Ask questions, request examples, or get help with problems.
        </p>
      </div>
    </div>
  );
}
