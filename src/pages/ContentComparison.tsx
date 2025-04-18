
import React, { useState, useCallback, memo } from 'react';
import { LLMContent } from "@/components/content-comparison/LLMContent";
import { RAGContent } from "@/components/content-comparison/RAGContent";
import { llmContent, easyModeContent, mediumModeContent, advancedModeContent } from "@/data/energy-content";
import { KineticEnergyVisualization } from "@/components/KineticEnergyVisualization";
import PendulumMotionVisualization from "@/components/PendulumMotionVisualization";
import EnergyPracticeProblems from "@/components/energy-visualization/EnergyPracticeProblems";

// Using memo to prevent unnecessary re-renders
const ContentComparison = memo(function ContentComparison() {
  const [activeTab, setActiveTab] = useState<string>("medium");
  
  // Using useCallback to prevent function recreation on each render
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
      
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Energy Practice Problems</h3>
        <EnergyPracticeProblems />
      </div>
    </div>
  );
});

export default ContentComparison;
