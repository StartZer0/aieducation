
import React from 'react';
import { 
  Brain, MessageCircle, BookOpen, Database, Server, 
  Globe, Users, Cpu, Network, GraduationCap, Bot, Lightbulb
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Architecture = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-50 dark:bg-blue-950/30 p-2">
      <div className="max-w-7xl mx-auto bg-white dark:bg-card shadow-xl rounded-xl border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3">
          <h1 className="text-xl font-bold text-white">AI+ Education Platform Architecture</h1>
          <p className="text-xs text-white/80">One-minute overview of our educational AI system</p>
        </div>
        
        {/* Main Architecture Diagram - Simplified 3-Column Layout */}
        <div className="grid grid-cols-3 gap-3 p-3">
          {/* Left Column - Data & Users */}
          <div className="flex flex-col gap-3">
            <Card className="border-blue-200 dark:border-blue-900 shadow hover:shadow-md transition-shadow">
              <CardContent className="p-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">A-Level Students</h3>
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1.5">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs mt-1 text-muted-foreground">Personalized learning for all ability levels</p>
              </CardContent>
            </Card>
            
            <Card className="border-indigo-200 dark:border-indigo-900 shadow hover:shadow-md transition-shadow">
              <CardContent className="p-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">Educational Content</h3>
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-1.5">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge className="text-[8px] h-3 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30">250+ Textbooks</Badge>
                  <Badge className="text-[8px] h-3 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30">50K+ Q&A Pairs</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 dark:border-purple-900 shadow hover:shadow-md transition-shadow">
              <CardContent className="p-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">Knowledge Graph</h3>
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1.5">
                    <Network className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs mt-1 text-muted-foreground">Interconnected educational concepts</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Middle Column - Core AI */}
          <div className="flex flex-col gap-3">
            <Card className="border-fuchsia-200 dark:border-fuchsia-900 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-2">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full h-12 w-12 flex items-center justify-center shadow-md mb-2">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base">Core LLM</h3>
                  <div className="flex gap-1 mt-1">
                    <Badge className="text-[8px] h-3 bg-purple-100 text-purple-700 dark:bg-purple-900/30">70B Parameters</Badge>
                    <Badge className="text-[8px] h-3 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30">RLHF Tuned</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-2">
              <Card className="border-pink-200 dark:border-pink-900 shadow hover:shadow-md transition-shadow">
                <CardContent className="p-1.5">
                  <div className="flex flex-col items-center">
                    <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-1 mb-1">
                      <MessageCircle className="h-3 w-3 text-pink-600" />
                    </div>
                    <h3 className="font-bold text-xs">AI Tutor</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 dark:border-amber-900 shadow hover:shadow-md transition-shadow">
                <CardContent className="p-1.5">
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-1 mb-1">
                      <GraduationCap className="h-3 w-3 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-xs">Exam Prep</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-emerald-200 dark:border-emerald-900 shadow hover:shadow-md transition-shadow">
                <CardContent className="p-1.5">
                  <div className="flex flex-col items-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1 mb-1">
                      <Lightbulb className="h-3 w-3 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-xs">Concepts</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-cyan-200 dark:border-cyan-900 shadow hover:shadow-md transition-shadow">
                <CardContent className="p-1.5">
                  <div className="flex flex-col items-center">
                    <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-full p-1 mb-1">
                      <Bot className="h-3 w-3 text-cyan-600" />
                    </div>
                    <h3 className="font-bold text-xs">Feedback</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-1">
              <Card className="border-0 shadow">
                <div className="h-full bg-gradient-to-br from-blue-500 to-blue-700">
                  <CardContent className="p-1 text-center text-white">
                    <h3 className="text-base font-extrabold">42%</h3>
                    <p className="text-[7px] font-medium">Better Scores</p>
                  </CardContent>
                </div>
              </Card>
              
              <Card className="border-0 shadow">
                <div className="h-full bg-gradient-to-br from-purple-500 to-purple-700">
                  <CardContent className="p-1 text-center text-white">
                    <h3 className="text-base font-extrabold">3.5x</h3>
                    <p className="text-[7px] font-medium">Engagement</p>
                  </CardContent>
                </div>
              </Card>
              
              <Card className="border-0 shadow">
                <div className="h-full bg-gradient-to-br from-teal-500 to-teal-700">
                  <CardContent className="p-1 text-center text-white">
                    <h3 className="text-base font-extrabold">68%</h3>
                    <p className="text-[7px] font-medium">Learning Speed</p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Right Column - Infrastructure */}
          <div className="flex flex-col gap-3">
            <Card className="border-cyan-200 dark:border-cyan-900 shadow hover:shadow-md transition-shadow">
              <CardContent className="p-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">Infrastructure</h3>
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-full p-1.5">
                    <Server className="h-4 w-4 text-cyan-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 rounded-md p-1 flex items-center justify-center gap-1">
                    <Cpu className="h-3 w-3 text-cyan-600" />
                    <div className="text-[7px] font-medium">GPU Clusters</div>
                  </div>
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 rounded-md p-1 flex items-center justify-center gap-1">
                    <Globe className="h-3 w-3 text-cyan-600" />
                    <div className="text-[7px] font-medium">Global CDN</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-indigo-200 dark:border-indigo-900 shadow hover:shadow-md transition-shadow">
              <CardContent className="p-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">Data Stores</h3>
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-1.5">
                    <Database className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <div className="grid grid-cols-2 gap-1">
                    <Badge className="text-[8px] h-3 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 justify-start">Vector DB (12TB)</Badge>
                    <Badge className="text-[8px] h-3 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 justify-start">User Data (3TB)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 dark:border-green-900 shadow hover:shadow-md transition-shadow">
              <CardContent className="p-2">
                <div className="flex flex-col">
                  <h3 className="font-bold text-sm text-center mb-1">Key Benefits</h3>
                  <div className="grid grid-cols-1 gap-1">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md p-1 text-center">
                      <div className="text-[8px] font-medium">Personalized learning paths for each student</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md p-1 text-center">
                      <div className="text-[8px] font-medium">Immediate feedback on academic work</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md p-1 text-center">
                      <div className="text-[8px] font-medium">Deep understanding of curriculum concepts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
