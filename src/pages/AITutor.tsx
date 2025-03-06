
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, MicOff, Info, Atom } from 'lucide-react';
import AITutorAvatar from '@/components/ai-tutor/AITutorAvatar';
import InteractiveElementVisualizer from '@/components/ai-tutor/InteractiveElementVisualizer';
import { useToast } from '@/hooks/use-toast';

export default function AITutor() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVisualizerVisible, setIsVisualizerVisible] = useState(false);
  const [visualizerTab, setVisualizerTab] = useState<'table' | 'atom'>('table');
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
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
    
    // Show the visualizer with a slight delay
    setTimeout(() => {
      setIsVisualizerVisible(true);
    }, 2000);
    
    animateSequence();
    
    toast({
      title: "Question Asked",
      description: "Listen as the AI Tutor explains oxygen's electron configuration",
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
          { label: "Status", value: "Waiting for response..." }
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
          { label: "L Shell", value: "6 electrons", highlight: true }
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

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Title and tabs container */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center">
            <Atom className="h-5 w-5 mr-2 text-blue-500" />
            <h2 className="text-lg font-medium">Interactive Table with Atom Visualization</h2>
          </div>
          
          <Tabs 
            value={visualizerTab} 
            onValueChange={(value) => setVisualizerTab(value as 'table' | 'atom')}
            className="mr-2"
          >
            <TabsList>
              <TabsTrigger value="table">Periodic Table</TabsTrigger>
              <TabsTrigger value="atom">Atomic Structure</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Main content area with adjusted layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Visualization area - 75% */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-[500px]">
            <div className="h-full relative">
              <div 
                className={`absolute inset-0 transition-opacity duration-1000 ${isVisualizerVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <InteractiveElementVisualizer 
                  currentStage={currentStage} 
                  progress={progressPercentage}
                  currentTime={currentTime}
                  isVisible={isVisualizerVisible}
                  activeView={visualizerTab}
                />
              </div>
              
              {!isVisualizerVisible && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Atom className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Ask a question to see the interactive visualization</p>
                    <p className="text-sm mt-2">Try asking about elements, electron configurations, or atomic structures</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Avatar area - 25% */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-[500px]">
            <AITutorAvatar 
              currentStage={currentStage}
              avatarText={stages[currentStage]?.avatarText || ""}
              isUserMessage={stages[currentStage]?.isUser || false}
              progress={progressPercentage}
            />
          </div>
        </div>
        
        {/* Controls and info section with better spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Controls */}
          <div className="lg:col-span-3 flex justify-center gap-4 pt-2">
            <Button
              onClick={askQuestion}
              className="flex items-center gap-2 py-2 px-6"
              variant="outline"
              disabled={isPlaying}
            >
              <Mic className="h-4 w-4" />
              Ask Question
            </Button>
          </div>
          
          {/* Empty space for alignment */}
          <div className="hidden lg:block lg:col-span-1"></div>
        </div>
        
        {/* Progress bar */}
        {isPlaying && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-100" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}
        
        {/* Footer info area - moved to bottom */}
        <div className="w-full mt-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getStageInfo().map((info, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-500 mr-2">{info.label}:</span>
                <span className={info.highlight ? "text-blue-600 font-medium" : "text-gray-700"}>
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
