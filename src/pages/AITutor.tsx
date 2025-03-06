
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, MicOff, Info, Table, Atom } from 'lucide-react';
import AITutorAvatar from '@/components/ai-tutor/AITutorAvatar';
import ChemistryVisualizer from '@/components/ai-tutor/ChemistryVisualizer';
import CircularPeriodicTable from '@/components/ai-tutor/CircularPeriodicTable';
import { useToast } from '@/hooks/use-toast';

export default function AITutor() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'table' | 'atom'>('table');
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

  const startExplanation = () => {
    setIsPlaying(true);
    setCurrentTime(0);
    setCurrentStage(0);
    startTimeRef.current = Date.now();
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animateSequence();
    
    toast({
      title: "Analysis Started",
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

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Chemistry Tutor</h1>
        <p className="text-gray-600">Interactive learning with personalized explanations</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Visualization area - 65% */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-[500px]">
          <div className="h-full flex flex-col">
            <Tabs 
              defaultValue="table" 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'table' | 'atom')}
              className="h-full flex flex-col"
            >
              <div className="border-b">
                <TabsList className="w-auto px-4 h-12">
                  <TabsTrigger value="table" className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    Periodic Table
                  </TabsTrigger>
                  <TabsTrigger value="atom" className="flex items-center gap-2">
                    <Atom className="h-4 w-4" />
                    Atomic Structure
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="table" className="flex-1 h-full m-0 overflow-hidden">
                <div className="w-full h-full">
                  <ChemistryVisualizer 
                    currentStage={currentStage} 
                    progress={progressPercentage}
                    currentTime={currentTime}
                  />
                </div>
              </TabsContent>
              <TabsContent value="atom" className="flex-1 h-full m-0">
                <div className="w-full h-full bg-[#121212]">
                  <CircularPeriodicTable />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Avatar area - 25% */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-[500px]">
          <AITutorAvatar 
            currentStage={currentStage}
            avatarText={stages[currentStage]?.avatarText || ""}
            isUserMessage={stages[currentStage]?.isUser || false}
            progress={progressPercentage}
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <Button 
          onClick={startExplanation}
          disabled={isPlaying}
          className="py-2 px-6"
        >
          {isPlaying ? "Playing..." : "Start Explanation"}
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center gap-2"
          disabled={isPlaying}
        >
          <Mic className="h-4 w-4" />
          Ask Question
        </Button>
      </div>
      
      {/* Progress bar */}
      {isPlaying && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-100" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}
      
      {/* Footer info area */}
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Exploring:</span>
            <span className="text-blue-600 font-medium">Electron Configuration</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Element:</span>
            <span className="text-blue-600 font-medium">Oxygen (O)</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Status:</span>
            <span className="text-gray-700">Waiting for response...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
