// Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);import React, { useState, useEffect, useRef } from 'react';
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

  // Initialize with default element data for demo
  useEffect(() => {
    if (isPlaying && currentStage >= 1) {
      // Set Oxygen data for demo
      const oxygenData = {
        name: "Oxygen",
        symbol: "O",
        atomicNumber: 8,
        electronConfig: "1s² 2s² 2p⁴",
        valenceElectrons: 6,
        reactivity: "High with metals"
      };
      setSelectedElement(oxygenData);
    }
  }, [isPlaying, currentStage]);

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
  // Handle element selection with expanded properties
  const handleElementSelect = (element) => {
    console.log("Element selected:", element);
    
    // If we don't receive proper element data, create default data based on the element symbol
    if (!element || !element.name) {
      // Default data for common elements with expanded properties
      const defaultData = {
        Li: {
          name: "Lithium",
          symbol: "Li",
          atomicNumber: 3,
          atomicMass: "6.94",
          electronConfig: "1s² 2s¹",
          valenceElectrons: 1,
          reactivity: "High with water",
          category: "Alkali Metal",
          compounds: ["LiOH", "Li₂O", "LiCl"]
        },
        O: {
          name: "Oxygen",
          symbol: "O",
          atomicNumber: 8,
          atomicMass: "16.0",
          electronConfig: "1s² 2s² 2p⁴",
          valenceElectrons: 6,
          reactivity: "High with metals",
          category: "Nonmetal",
          compounds: ["H₂O", "CO₂", "Metal Oxides"]
        },
        F: {
          name: "Fluorine",
          symbol: "F",
          atomicNumber: 9,
          atomicMass: "19.0",
          electronConfig: "1s² 2s² 2p⁵",
          valenceElectrons: 7,
          reactivity: "Very high",
          category: "Halogen",
          compounds: ["HF", "F₂", "Metal Fluorides"]
        },
        Na: {
          name: "Sodium",
          symbol: "Na",
          atomicNumber: 11,
          atomicMass: "23.0",
          electronConfig: "1s² 2s² 2p⁶ 3s¹",
          valenceElectrons: 1,
          reactivity: "High with water",
          category: "Alkali Metal",
          compounds: ["NaCl", "Na₂O", "NaOH"]
        },
        Mg: {
          name: "Magnesium",
          symbol: "Mg",
          atomicNumber: 12,
          atomicMass: "24.3",
          electronConfig: "1s² 2s² 2p⁶ 3s²",
          valenceElectrons: 2,
          reactivity: "Moderate",
          category: "Alkaline Earth Metal",
          compounds: ["MgO", "MgCl₂", "MgSO₄"]
        }
      };
      
      // If element is just a string (symbol), convert to full data
      const symbol = typeof element === 'string' ? element : 'O';
      
      // Use default data or generate basic info
      setSelectedElement(defaultData[symbol] || {
        name: symbol,
        symbol: symbol,
        atomicNumber: "?",
        atomicMass: "?",
        electronConfig: "?",
        valenceElectrons: "?",
        reactivity: "?",
        category: "Element",
        compounds: []
      });
    } else {
      // If we have proper element data, use it
      setSelectedElement(element);
    }
  };

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
                <Atom className="h-5 w-5 mr-2 text-blue-500" />
                {/* Removed "Interactive Visualization" text as requested */}
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
            
            {/* Taller visualization container with better space utilization */}
            <div className="h-[600px] relative bg-gray-900 flex flex-col">
              {/* Main visualizer area with improved spacing */}
              <div className="h-2/3 relative">
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${isVisualizerVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  <InteractiveElementVisualizer 
                    currentStage={currentStage} 
                    progress={progressPercentage}
                    currentTime={currentTime}
                    isVisible={isVisualizerVisible}
                    activeView={visualizerTab}
                    elementSize="md" 
                    spacing="wide"
                    gridLayout={true}
                    showPeriodLabels={true}
                    showGroupLabels={true}
                    onElementSelect={handleElementSelect}
                  />
                </div>
              </div>
              
              {/* Expanded explanation area at bottom - larger and more informative */}
              <div className="h-1/3 bg-gray-800 p-6 overflow-auto">
                {selectedElement ? (
                  <div className="text-white grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="col-span-2">
                      <h3 className="text-2xl font-bold mb-1">{selectedElement.name || "?"} ({selectedElement.symbol || "?"})</h3>
                      <p className="text-blue-300 mb-2">{selectedElement.category || "Element"}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Atomic Number</p>
                      <p className="font-medium text-lg">{selectedElement.atomicNumber || "?"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Atomic Mass</p>
                      <p className="font-medium text-lg">{selectedElement.atomicMass || "?"} u</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Electron Configuration</p>
                      <p className="font-medium text-lg">{selectedElement.electronConfig || "?"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Valence Electrons</p>
                      <p className="font-medium text-lg">{selectedElement.valenceElectrons || "?"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Reactivity</p>
                      <p className="font-medium text-lg">{selectedElement.reactivity || "?"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Common Compounds</p>
                      <p className="font-medium">{selectedElement.compounds ? selectedElement.compounds.join(", ") : "?"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center h-full flex flex-col items-center justify-center">
                    <p className="text-xl mb-3">Click on an element to view its details</p>
                    <p className="text-sm max-w-md">Elements are arranged according to their position in the periodic table, showing their relationships and properties</p>
                  </div>
                )}
              </div>
              
              {!isVisualizerVisible && (
                <div className="absolute inset-0 flex items-center justify-center">
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
          
          {/* Element info panel has been completely removed as requested */}
        </div>
      </div>
    </div>
  );
}