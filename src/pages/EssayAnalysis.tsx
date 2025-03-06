
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Search, RefreshCw } from 'lucide-react';
import EssayWithHighlights from '@/components/essay-analysis/EssayWithHighlights';
import AnalysisDashboard from '@/components/essay-analysis/AnalysisDashboard';

const SAMPLE_ESSAY = `Is Technology a Force for Good or a Source of Risk and Uncertainty?

Technology has become an integral part of modern society, transforming how we communicate, work, and live. While technological advancements have brought unprecedented convenience and solutions to complex problems, they have simultaneously introduced new risks and uncertainties. This essay examines whether technology is primarily a force for good or a source of concern.

The benefits of technology are undeniable. Medical technologies have extended human lifespans and improved quality of life through innovations like MRI machines, artificial limbs, and life-saving medications. Educational access has been democratized through online learning platforms, making knowledge available to anyone with an internet connection. Furthermore, communication technologies have connected people across vast distances, strengthening relationships and fostering global understanding.

However, these advantages come with significant drawbacks. Privacy concerns have escalated as personal data is increasingly harvested and monetized by technology companies. Automation threatens traditional employment, potentially leading to economic displacement for millions of workers. Additionally, technology addiction and digital distraction undermine mental health and interpersonal connections in ways we are only beginning to understand.`;

const HIGHLIGHTS = [
  {
    text: "This essay examines whether technology is primarily a force for good or a source of concern.",
    type: "strong" as const,
    feedback: "Strong thesis statement presents a balanced perspective"
  },
  {
    text: "Medical technologies have extended human lifespans and improved quality of life through innovations like MRI machines, artificial limbs, and life-saving medications.",
    type: "strong" as const,
    feedback: "Good use of specific examples to support argument"
  },
  {
    text: "Privacy concerns have escalated as personal data is increasingly harvested and monetized by technology companies.",
    type: "improvement" as const,
    feedback: "This claim would be stronger with statistical evidence"
  },
  {
    text: "Additionally, technology addiction and digital distraction undermine mental health and interpersonal connections",
    type: "improvement" as const,
    feedback: "Consider including research studies to back this claim"
  },
  {
    text: "these advantages come with significant drawbacks",
    type: "weak" as const,
    feedback: "Transition could be stronger to establish contrast"
  }
];

const METRICS = [
  { name: "Thesis Clarity", score: 8, maxScore: 10 },
  { name: "Argument Coherence", score: 7, maxScore: 10 },
  { name: "Evidence Quality", score: 6, maxScore: 10 },
  { name: "Language Proficiency", score: 8, maxScore: 10 },
  { name: "Structure", score: 6, maxScore: 10 }
];

const FEEDBACK = {
  strengths: [
    { text: "Strong thesis presents balanced perspective", type: "strong" as const },
    { text: "Good use of specific examples in benefits section", type: "strong" as const },
    { text: "Clear topic sentences establish main arguments", type: "strong" as const }
  ],
  improvements: [
    { text: "Claims about privacy concerns need statistical support", type: "improvement" as const },
    { text: "Consider addressing counterarguments to strengthen position", type: "improvement" as const },
    { text: "Transitions between paragraphs could be more fluid", type: "improvement" as const }
  ],
  suggestions: [
    { text: "Essay requires a conclusion to summarize arguments", type: "weak" as const },
    { text: "Consider using more advanced vocabulary (e.g., 'detrimental' instead of 'bad')", type: "weak" as const },
    { text: "Incorporate evidence from academic sources", type: "weak" as const }
  ]
};

const EssayAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(-1);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStage(0);
    setAnalysisComplete(false);
    
    // Schedule the stages of analysis animation
    setTimeout(() => setAnalysisStage(1), 500); // Structure recognition after 0.5s
    setTimeout(() => setAnalysisStage(2), 1000); // Analysis visualization after 1s
    setTimeout(() => setAnalysisStage(3), 2000); // Feedback generation after 2s
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000); // Complete after 3s
  };
  
  const resetAnalysis = () => {
    setAnalysisStage(-1);
    setAnalysisComplete(false);
  };
  
  return (
    <div className="container mx-auto py-24 px-4 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">EssayGrader AI - Instant Essay Analysis</h1>
        <p className="text-gray-600">Watch how your essay is analyzed in seconds</p>
      </div>
      
      {!analysisComplete && analysisStage < 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
          <div className="flex items-center mb-4">
            <FileText className="text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Essay Sample</h2>
          </div>
          <Textarea 
            value={SAMPLE_ESSAY} 
            readOnly 
            className="h-64 mb-4 font-serif"
          />
          <div className="flex justify-center">
            <Button 
              onClick={startAnalysis} 
              className="bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Analyze Essay
            </Button>
          </div>
        </div>
      )}
      
      {(isAnalyzing || analysisComplete) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EssayWithHighlights 
              essay={SAMPLE_ESSAY}
              highlights={HIGHLIGHTS}
              isAnalyzing={isAnalyzing}
              analysisStage={analysisStage}
            />
            
            {analysisComplete && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={resetAnalysis}
                  className="text-blue-600"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Watch Again
                </Button>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <AnalysisDashboard 
              metrics={METRICS}
              overallScore={7.5}
              feedback={FEEDBACK}
              isAnalyzing={isAnalyzing}
              analysisStage={analysisStage}
            />
            
            {analysisComplete && (
              <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-200 animate-fade-in">
                <p className="text-center text-blue-800 font-medium">
                  See how your essay would score
                </p>
                <div className="mt-2 text-center">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Upload Your Essay
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayAnalysis;
