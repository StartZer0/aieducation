
import React from 'react';
import { 
  Brain, BookOpen, Database, Server, Network, GraduationCap, 
  Bot, Lightbulb, FileText, Code, MessagesSquare, Globe, 
  PenTool, IterationCcw, UserCheck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Architecture = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-50 dark:bg-blue-950/30 p-0 overflow-hidden">
      <div className="w-full h-full bg-white dark:bg-card shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3">
          <h1 className="text-xl font-bold text-white">AI+ Education Platform Architecture</h1>
          <p className="text-xs text-white/80">Our specialized approach to training and deploying Large Language Models for educational excellence</p>
        </div>
        
        {/* Main Architecture Diagram - Simplified 3-Column Layout */}
        <div className="grid grid-cols-3 gap-2 p-2 flex-grow">
          {/* Left Column - Training Pipeline */}
          <div className="flex flex-col gap-2">
            <Card className="border-blue-200 dark:border-blue-900 shadow bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300">Training Pipeline</h3>
                  <div className="bg-blue-600 rounded-full p-1.5">
                    <IterationCcw className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {/* Data Collection */}
                  <Card className="border-blue-200 dark:border-blue-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-1.5">
                            <BookOpen className="h-3 w-3 text-blue-600" />
                          </div>
                          <h4 className="text-xs font-semibold">Data Collection</h4>
                        </div>
                        <Badge className="text-[7px] bg-blue-100 text-blue-700 dark:bg-blue-900/30">Primary</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge className="text-[7px] h-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20">250+ Textbooks</Badge>
                        <Badge className="text-[7px] h-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20">50K+ Q&A Pairs</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Knowledge Mapping */}
                  <Card className="border-indigo-200 dark:border-indigo-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-1 mr-1.5">
                            <Network className="h-3 w-3 text-indigo-600" />
                          </div>
                          <h4 className="text-xs font-semibold">Knowledge Mapping</h4>
                        </div>
                        <Badge className="text-[7px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30">Stage 2</Badge>
                      </div>
                      <p className="text-[8px] mt-1 text-muted-foreground">Curriculum concept extraction & graphing</p>
                    </CardContent>
                  </Card>
                  
                  {/* Fine-tuning */}
                  <Card className="border-purple-200 dark:border-purple-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1 mr-1.5">
                            <PenTool className="h-3 w-3 text-purple-600" />
                          </div>
                          <h4 className="text-xs font-semibold">Fine-tuning</h4>
                        </div>
                        <Badge className="text-[7px] bg-purple-100 text-purple-700 dark:bg-purple-900/30">Stage 3</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge className="text-[7px] h-3 bg-purple-50 text-purple-600 dark:bg-purple-900/20">RLHF</Badge>
                        <Badge className="text-[7px] h-3 bg-purple-50 text-purple-600 dark:bg-purple-900/20">Expert Feedback</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Evaluation */}
                  <Card className="border-pink-200 dark:border-pink-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-1 mr-1.5">
                            <FileText className="h-3 w-3 text-pink-600" />
                          </div>
                          <h4 className="text-xs font-semibold">Evaluation</h4>
                        </div>
                        <Badge className="text-[7px] bg-pink-100 text-pink-700 dark:bg-pink-900/30">Stage 4</Badge>
                      </div>
                      <p className="text-[8px] mt-1 text-muted-foreground">Benchmarks against A-level exams</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Middle Column - Core AI */}
          <div className="flex flex-col gap-2">
            <Card className="border-fuchsia-200 dark:border-fuchsia-900 shadow-md bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/40">
              <CardContent className="p-2">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full h-10 w-10 flex items-center justify-center shadow-md mb-1">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">Core LLM</h3>
                  <div className="flex gap-1 mb-1">
                    <Badge className="text-[7px] h-3 bg-purple-100 text-purple-700 dark:bg-purple-900/30">70B Parameters</Badge>
                    <Badge className="text-[7px] h-3 bg-purple-100 text-purple-700 dark:bg-purple-900/30">Education-Optimized</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 w-full mt-1">
                    <Card className="border-pink-200 dark:border-pink-900 shadow-sm">
                      <CardContent className="p-1.5">
                        <div className="flex flex-col items-center">
                          <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-1 mb-0.5">
                            <MessagesSquare className="h-2.5 w-2.5 text-pink-600" />
                          </div>
                          <h4 className="text-[9px] font-bold">AI Tutor</h4>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-amber-200 dark:border-amber-900 shadow-sm">
                      <CardContent className="p-1.5">
                        <div className="flex flex-col items-center">
                          <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-1 mb-0.5">
                            <GraduationCap className="h-2.5 w-2.5 text-amber-600" />
                          </div>
                          <h4 className="text-[9px] font-bold">Exam Prep</h4>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-emerald-200 dark:border-emerald-900 shadow-sm">
                      <CardContent className="p-1.5">
                        <div className="flex flex-col items-center">
                          <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-1 mb-0.5">
                            <Lightbulb className="h-2.5 w-2.5 text-emerald-600" />
                          </div>
                          <h4 className="text-[9px] font-bold">Concepts</h4>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-cyan-200 dark:border-cyan-900 shadow-sm">
                      <CardContent className="p-1.5">
                        <div className="flex flex-col items-center">
                          <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-full p-1 mb-0.5">
                            <Bot className="h-2.5 w-2.5 text-cyan-600" />
                          </div>
                          <h4 className="text-[9px] font-bold">Feedback</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
          
          {/* Right Column - Infrastructure & Deployment */}
          <div className="flex flex-col gap-2">
            <Card className="border-cyan-200 dark:border-cyan-900 shadow bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/40">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-cyan-700 dark:text-cyan-300">Deployment Pipeline</h3>
                  <div className="bg-cyan-600 rounded-full p-1.5">
                    <Globe className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {/* Infrastructure */}
                  <Card className="border-cyan-200 dark:border-cyan-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-full p-1 mr-1.5">
                            <Server className="h-3 w-3 text-cyan-600" />
                          </div>
                          <h4 className="text-xs font-semibold">Infrastructure</h4>
                        </div>
                        <Badge className="text-[7px] bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30">Cloud-Native</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        <Badge className="text-[7px] h-3 bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 justify-start">GPU Clusters</Badge>
                        <Badge className="text-[7px] h-3 bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 justify-start">Global CDN</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* API Layer */}
                  <Card className="border-teal-200 dark:border-teal-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-1 mr-1.5">
                            <Code className="h-3 w-3 text-teal-600" />
                          </div>
                          <h4 className="text-xs font-semibold">API Layer</h4>
                        </div>
                        <Badge className="text-[7px] bg-teal-100 text-teal-700 dark:bg-teal-900/30">Distributed</Badge>
                      </div>
                      <p className="text-[8px] mt-1 text-muted-foreground">Secure, low-latency access points</p>
                    </CardContent>
                  </Card>
                  
                  {/* Data Stores */}
                  <Card className="border-indigo-200 dark:border-indigo-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-1 mr-1.5">
                            <Database className="h-3 w-3 text-indigo-600" />
                          </div>
                          <h4 className="text-xs font-semibold">Data Stores</h4>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge className="text-[7px] h-3 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">Vector DB (12TB)</Badge>
                        <Badge className="text-[7px] h-3 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">User Data (3TB)</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* User Experience */}
                  <Card className="border-blue-200 dark:border-blue-900 shadow-sm">
                    <CardContent className="p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-1.5">
                            <UserCheck className="h-3 w-3 text-blue-600" />
                          </div>
                          <h4 className="text-xs font-semibold">User Experience</h4>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-1 mt-1">
                        <Badge className="text-[7px] h-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20 justify-start">Personalized learning</Badge>
                        <Badge className="text-[7px] h-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20 justify-start">Immediate feedback</Badge>
                      </div>
                    </CardContent>
                  </Card>
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

