
import React, { useState, useCallback } from 'react';
import { LLMContent } from "@/components/content-comparison/LLMContent";
import { RAGContent } from "@/components/content-comparison/RAGContent";
import { llmContent, easyModeContent, mediumModeContent, advancedModeContent } from "@/data/energy-content";
import { KineticEnergyVisualization } from "@/components/KineticEnergyVisualization";
import PendulumMotionVisualization from "@/components/PendulumMotionVisualization";

export default function ContentComparison() {
  const [activeTab, setActiveTab] = useState<string>("medium");
  
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Educational Content Comparison</h1>
      <h2 className="text-xl text-center text-muted-foreground mb-10">
        "What is Kinetic energy and potential energy?"
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <LLMContent content={llmContent} />
        <RAGContent 
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          easyModeContent={easyModeContent}
          mediumModeContent={mediumModeContent}
          advancedModeContent={advancedModeContent}
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Interactive Visualizations</h2>
      
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Kinetic Energy Visualization</h3>
        <KineticEnergyVisualization />
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Pendulum Motion Visualization</h3>
        <PendulumMotionVisualization />
      </div>
    </div>
  );
}
