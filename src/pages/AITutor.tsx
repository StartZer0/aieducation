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
  const [hoveredElement, setHoveredElement] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
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

  // Add Bromine to our elements database
  const elementsDatabase = {
    "H": {
      name: "Hydrogen",
      symbol: "H",
      atomicNumber: 1,
      atomicMass: "1.008 u",
      category: "Nonmetal",
      electronConfig: "1s¹",
      valenceElectrons: 1,
      electronegativity: 2.20,
      reactivity: "High",
      compounds: ["H₂O", "H₂", "HCl"]
    },
    "O": {
      name: "Oxygen",
      symbol: "O",
      atomicNumber: 8,
      atomicMass: "15.999 u",
      category: "Nonmetal",
      electronConfig: "1s² 2s² 2p⁴",
      valenceElectrons: 6,
      electronegativity: 3.44,
      reactivity: "High with metals",
      compounds: ["H₂O", "CO₂", "Metal Oxides"]
    },
    "F": {
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
    },
    "Na": {
      name: "Sodium",
      symbol: "Na",
      atomicNumber: 11,
      atomicMass: "22.990 u",
      category: "Alkali Metal",
      electronConfig: "1s² 2s² 2p⁶ 3s¹",
      valenceElectrons: 1,
      electronegativity: 0.93,
      reactivity: "High with nonmetals",
      compounds: ["NaCl", "Na₂O", "NaOH"]
    },
    "Br": {
      name: "Bromine",
      symbol: "Br",
      atomicNumber: 35,
      atomicMass: "79.904 u",
      category: "Halogen",
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵",
      valenceElectrons: 7,
      electronegativity: 2.96,
      reactivity: "High with metals",
      compounds: ["HBr", "KBr", "Metal Bromides"]
    },
    // Add more elements as needed
  };
  
  // Function to get element data based on symbol or current stage
  const getElementInfo = (symbol) => {
    if (symbol && elementsDatabase[symbol]) {
      return elementsDatabase[symbol];
    }
    
    // Default to Oxygen during the demo, Fluorine otherwise
    return currentStage > 0 ? elementsDatabase["O"] : elementsDatabase["F"];
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
                <Atom className="h-5 w-5 mr-2 text-blue-500" />
                <h2 className="font-medium">Interactive Visualization</h2>
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
            
            {/* Full-height visualization container */}
            <div className="h-[500px] relative bg-gray-900">
              <div 
                className={`absolute inset-0 transition-opacity duration-500 ${isVisualizerVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* Hoverable element information tooltip */}
                {hoveredElement && (
                  <div 
                    className="absolute z-50 bg-white rounded-lg shadow-lg border border-blue-100 p-3 w-64 transform transition-all duration-200 ease-in-out animate-fadeIn"
                    style={{
                      top: `${hoverPosition.y + 10}px`,
                      left: `${hoverPosition.x + 10}px`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-blue-700">{hoveredElement.name}</h4>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{hoveredElement.symbol}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Atomic Number</p>
                        <p className="font-medium">{hoveredElement.atomicNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Atomic Mass</p>
                        <p className="font-medium">{hoveredElement.atomicMass}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Electron Config</p>
                        <p className="font-medium">{hoveredElement.electronConfig}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valence Electrons</p>
                        <p className="font-medium text-blue-600">{hoveredElement.valenceElectrons}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Common Compounds</p>
                        <p className="font-medium truncate">{hoveredElement.compounds.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                )}
              
                <InteractiveElementVisualizer 
                  currentStage={currentStage} 
                  progress={progressPercentage}
                  currentTime={currentTime}
                  isVisible={isVisualizerVisible}
                  activeView={visualizerTab}
                  elementSize="md" // Increased size now that we have more space
                  spacing="normal" // Normal spacing for better readability
                  onElementHover={(element, event) => {
                    setHoveredElement(element);
                    if (event) {
                      // Calculate position for the tooltip based on mouse position
                      // Offset to not cover the element with the cursor
                      setHoverPosition({
                        x: event.clientX,
                        y: event.clientY
                      });
                    }
                  }}
                  onElementLeave={() => {
                    setHoveredElement(null);
                  }}
                />
              </div>
              
              {!isVisualizerVisible && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center max-w-md p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl text-white">
                    <Atom className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                    <p className="text-lg font-medium mb-2">Interactive Chemistry Learning</p>
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
          
          {/* No static element info panel here - will be shown on hover */}
        </div>
      </div>
    </div>
  );
}