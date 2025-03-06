import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Mic, Info, Atom, Zap, HelpCircle } from 'lucide-react';
import AITutorAvatar from '@/components/ai-tutor/AITutorAvatar';
import InteractiveElementVisualizer from '@/components/ai-tutor/InteractiveElementVisualizer';
import { useToast } from '@/hooks/use-toast';
import TutorInfoPanel from '@/components/ai-tutor/TutorInfoPanel';

export default function AITutor() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVisualizerVisible, setIsVisualizerVisible] = useState(false);
  const [visualizerTab, setVisualizerTab] = useState('table');
  const [selectedElement, setSelectedElement] = useState(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const { toast } = useToast();

  const totalDuration = 4000; // 4 seconds in milliseconds
  
  const stages = [
    {
      time: 0,
      avatarText: "What can you tell me about the electron configuration of Oxygen?",
      isUser: true
    },
    {
      time: 1000,
      avatarText: "Oxygen is element 8 in the periodic table, located in group 16, period 2.",
      isUser: false
    },
    {
      time: 2000,
      avatarText: "Oxygen's electron configuration is 1s² 2s² 2p⁴",
      isUser: false
    },
    {
      time: 3000,
      avatarText: "This gives oxygen 6 valence electrons, making it highly reactive with metals.",
      isUser: false
    }
  ];

  const askQuestion = () => {
    setIsPlaying(true);
    setCurrentTime(0);
    setCurrentStage(0);
    startTimeRef.current = Date.now();
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Show the visualizer immediately for better UX
    setIsVisualizerVisible(true);
    
    animateSequence();
    
    toast({
      title: "Question Asked",
      description: "Explaining oxygen's electron configuration",
    });
  };

  const animateSequence = () => {
    if (!startTimeRef.current) return;
    
    const elapsed = Date.now() - startTimeRef.current;
    setCurrentTime(elapsed);
    
    // Update the current stage based on elapsed time
    for (let i = stages.length - 1; i >= 0; i--) {
      if (elapsed >= stages[i].time) {
        if (currentStage !== i) {
          setCurrentStage(i);
          
          // Auto switch to atom view when reaching electron configuration explanation
          if (i >= 2) {
            setVisualizerTab('atom');
          } else {
            setVisualizerTab('table');
          }
        }
        break;
      }
    }
    
    if (elapsed < totalDuration) {
      animationRef.current = requestAnimationFrame(animateSequence);
    } else {
      setIsPlaying(false);
      startTimeRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Calculate progress percentage
  const progressPercentage = Math.min((currentTime / totalDuration) * 100, 100);

  // Get current stage info
  const getStageInfo = () => {
    switch(currentStage) {
      case 0:
        return [
          { label: "Exploring", value: "Electron Configuration", highlight: true },
          { label: "Element", value: "Oxygen (O)", highlight: true },
          { label: "Status", value: "Waiting for response..." },
          { label: "Subject", value: "Chemistry" }
        ];
      case 1:
        return [
          { label: "Element", value: "Oxygen (O)", highlight: true },
          { label: "Atomic Number", value: "8" },
          { label: "Group", value: "16", highlight: true },
          { label: "Period", value: "2", highlight: true }
        ];
      case 2:
        return [
          { label: "Electron Configuration", value: "1s² 2s² 2p⁴", highlight: true },
          { label: "K Shell", value: "2 electrons" },
          { label: "L Shell", value: "6 electrons", highlight: true },
          { label: "Valence", value: "6 electrons" }
        ];
      case 3:
        return [
          { label: "Valence Electrons", value: "6", highlight: true },
          { label: "Electronegativity", value: "3.44", highlight: true },
          { label: "Reactivity", value: "High with metals", highlight: true },
          { label: "Common Compounds", value: "H₂O, CO₂, Metal Oxides" }
        ];
      default:
        return [];
    }
  };

  // Element info for the selected element or current stage element
  const getElementInfo = () => {
    // Default to Oxygen if no element is selected or we're in the demo sequence
    return {
      name: "Fluorine",
      symbol: "F",
      atomicNumber: 9,
      atomicMass: "18.998 u",
      category: "Halogen",
      electronConfig: "1s² 2s² 2p⁵",
      valenceElectrons: 7,
      electronegativity: 3.98,
      reactivity: "Very high",
      compounds: ["HF", "F₂", "Metal Fluorides"]
    };
  };

  const elementInfo = getElementInfo();

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-20">
        {/* Left sidebar: Avatar and controls - 1/4 width on desktop */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 h-auto overflow-hidden">
            <div className="p-3 bg-blue-50 border-b border-blue-100 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-600" />
              <h3 className="text-sm font-medium">Chemistry Tutor</h3>
            </div>
            <div className="p-4 pb-6">
              <AITutorAvatar 
                currentStage={currentStage}
                avatarText={stages[currentStage]?.avatarText || ""}
                isUserMessage={stages[currentStage]?.isUser || false}
                progress={progressPercentage}
              />
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={askQuestion}
              className="w-full flex items-center justify-center gap-2 py-5 bg-blue-500 hover:bg-blue-600 transition-colors"
              disabled={isPlaying}
            >
              <Mic className="h-4 w-4" />
              Ask Question
            </Button>
            
            {isPlaying && (
              <div className="w-full">
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-center mt-1 text-gray-500">
                  {Math.floor(progressPercentage)}% complete
                </p>
              </div>
            )}
          </div>
          
          {/* Add a little space before showing the status info on mobile */}
          <div className="block lg:hidden h-6"></div>
        </div>
        
        {/* Main Content Area - 3/4 width on desktop */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Tabs and visualizer */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b">
              <div className="flex items-center mb-3 sm:mb-0">
                {/* Removed the "Interactive Visualization" text as requested */}
                <Atom className="h-5 w-5 mr-2 text-blue-500" />
              </div>
              
              <Tabs 
                value={visualizerTab} 
                onValueChange={(value) => setVisualizerTab(value)}
                className="mr-0"
              >
                <TabsList>
                  <TabsTrigger value="table" className="flex items-center gap-1 px-3 py-1">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Periodic Table</span>
                  </TabsTrigger>
                  <TabsTrigger value="atom" className="flex items-center gap-1 px-3 py-1">
                    <Atom className="h-3.5 w-3.5" />
                    <span>Atomic Structure</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Further increased height visualization container to fill available space */}
            <div className="h-[700px] relative bg-gray-900">
              <div 
                className={`absolute inset-0 transition-opacity duration-500 ${isVisualizerVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <InteractiveElementVisualizer 
                  currentStage={currentStage} 
                  progress={progressPercentage}
                  currentTime={currentTime}
                  isVisible={isVisualizerVisible}
                  activeView={visualizerTab}
                  elementSize="lg"
                  spacing="wide"
                  showExplanationBelow={true}
                  showInfoOnHover={true}
                  hideAnimationText={true}
                />
              </div>
              
              {!isVisualizerVisible && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center max-w-md p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl text-white">
                    <Atom className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                    <p className="text-lg font-medium mb-2">Chemistry Learning</p>
                    <p className="text-sm text-gray-300 mb-4">
                      Click the "Ask Question" button to learn about the electron configuration of oxygen
                    </p>
                    <Button 
                      onClick={askQuestion} 
                      variant="outline" 
                      className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30"
                    >
                      Start Demo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Element info panel removed as requested - info will be shown on hover instead */}
        </div>
      </div>
    </div>
  );
}