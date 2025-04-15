
import React, { useState } from 'react';
import { LLMContent } from "@/components/content-comparison/LLMContent";
import { RAGContent } from "@/components/content-comparison/RAGContent";
import { llmContent, easyModeContent, mediumModeContent, advancedModeContent } from "@/data/energy-content";

export default function ContentComparison() {
  const [activeTab, setActiveTab] = useState<string>("medium");

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Educational Content Comparison</h1>
      <h2 className="text-xl text-center text-muted-foreground mb-10">
        "What is Kinetic energy and potential energy?"
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LLMContent content={llmContent} />
        <RAGContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          easyModeContent={easyModeContent}
          mediumModeContent={mediumModeContent}
          advancedModeContent={advancedModeContent}
        />
      </div>
    </div>
  );
}
