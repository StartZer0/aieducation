
import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Loader2, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DynamicTermDefinition } from "./DynamicTermDefinition";

interface AIGeneratedContentProps {
  content: string | null;
  isGenerating: boolean;
  topicTitle: string;
  generateQuestionsContent?: () => Promise<void>;
}

export function AIGeneratedContent({
  content,
  isGenerating,
  topicTitle,
  generateQuestionsContent
}: AIGeneratedContentProps) {
  if (isGenerating) {
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin mb-4 text-blue-500" />
        <p className="text-center text-muted-foreground">
          Generating content with AI...
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          This may take a few moments
        </p>
      </div>
    );
  }

  // Process the content to wrap specific terms in DynamicTermDefinition component
  const processContent = (text: string) => {
    if (!text) return null;
    
    // Sample mathematical terms that might need definitions
    const terms = ["function", "polynomial", "inequality", "equation", "variable", "coefficient"];
    
    let processedContent = text;
    
    // This is a simple way to identify terms - in a real-world scenario,
    // a more sophisticated approach might be needed
    terms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      processedContent = processedContent.replace(regex, `<term>${term}</term>`);
    });
    
    // Split by <term> tags
    const parts = processedContent.split(/<term>|<\/term>/);
    
    return parts.map((part, index) => {
      // Every odd part is a term
      if (index % 2 === 1) {
        return (
          <DynamicTermDefinition 
            key={`term-${index}`} 
            term={part} 
            context={topicTitle}
          >
            {part}
          </DynamicTermDefinition>
        );
      }
      return part;
    });
  };

  if (!content) {
    return (
      <Card className="p-8 text-center">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
        <p className="text-muted-foreground mb-4">
          Let the AI generate personalized content for this topic
        </p>
        <Button 
          onClick={generateQuestionsContent}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Generate Practice Questions
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4 text-blue-600 border-b pb-2">
        <Bot className="h-5 w-5" />
        <span className="font-medium">AI-Generated Content</span>
      </div>
      
      <MarkdownRenderer markdown={content} />
      
      {generateQuestionsContent && (
        <div className="mt-8 text-center">
          <Button 
            onClick={generateQuestionsContent}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Generate Practice Questions
          </Button>
        </div>
      )}
    </div>
  );
}
