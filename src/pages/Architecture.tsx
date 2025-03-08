
import React from 'react';
import { 
  Brain, MessageCircle, BookOpen, GraduationCap, Database, Server, 
  Globe, Users, Monitor, Cpu, Network, ArrowRight, School, AirVent,
  BookMarked, Bot, FileText, PanelLeft, PanelRight, Webhook, Lightbulb,
  Beaker, Truck, Container, LayoutGrid, Workflow, AppWindow, 
  AlertCircle, HardDrive
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Architecture = () => {
  return (
    <div className="container max-w-7xl mx-auto h-screen flex flex-col p-4">
      {/* Header with significant top padding to prevent overlap with site header */}
      <div className="pt-20 pb-2">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-xl shadow-xl p-4 mb-4 transform hover:scale-[1.01] transition-transform">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            AI+ Education LLM Architecture
          </h1>
          <p className="text-sm text-white/90 max-w-2xl">
            Our specialized approach to training and deploying Large Language Models for educational excellence
          </p>
        </div>
      </div>

      {/* Main Architecture Diagram - Visual Application Architecture Pattern */}
      <div className="flex-1 grid grid-cols-3 gap-3 overflow-hidden">
        {/* Left Column - Training Pipeline */}
        <div className="flex flex-col gap-3">
          {/* Training Pipeline Title */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3 text-white font-bold text-center shadow-lg border-2 border-blue-400">
            <div className="flex items-center justify-center gap-2">
              <Workflow className="h-5 w-5" />
              <span>Training Pipeline</span>
            </div>
          </div>
          
          {/* Student User */}
          <Card className="overflow-hidden shadow-xl border-2 border-blue-200 dark:border-blue-900 hover:shadow-blue-200/20 dark:hover:shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3 flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 mb-2">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-lg">A-Level Students</h3>
              <p className="text-xs text-center mt-1 text-muted-foreground">Personalized learning assistants</p>
            </CardContent>
          </Card>
          
          {/* Text Collection */}
          <Card className="overflow-hidden shadow-xl border-2 border-indigo-200 dark:border-indigo-900 hover:shadow-indigo-200/20 dark:hover:shadow-indigo-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold">Data Collection</h3>
                <ul className="text-xs space-y-1 mt-2">
                  <li className="flex items-center gap-1">
                    <BookMarked className="h-3 w-3 text-indigo-600" />
                    <span>250+ A-Level textbooks</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <FileText className="h-3 w-3 text-indigo-600" />
                    <span>50,000+ Q&A pairs</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <School className="h-3 w-3 text-indigo-600" />
                    <span>Expert teacher input</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full h-12 w-12 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
          
          {/* Preprocessing */}
          <Card className="overflow-hidden shadow-xl border-2 border-purple-200 dark:border-purple-900 hover:shadow-purple-200/20 dark:hover:shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold">Pre-processing</h3>
                <ul className="text-xs space-y-1 mt-2">
                  <li className="flex items-center gap-1">
                    <Lightbulb className="h-3 w-3 text-purple-600" />
                    <span>Concept extraction</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Network className="h-3 w-3 text-purple-600" />
                    <span>Knowledge graphs</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-purple-600" />
                    <span>Error identification</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                <Beaker className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
          
          {/* Distribution */}
          <Card className="overflow-hidden shadow-xl border-2 border-cyan-200 dark:border-cyan-900 hover:shadow-cyan-200/20 dark:hover:shadow-cyan-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold">Distribution</h3>
                <div className="flex gap-1 mt-2">
                  <Truck className="h-6 w-6 text-cyan-600 animate-pulse" />
                  <Container className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="text-xs mt-1">Global CDN deployment</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full h-12 w-12 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle Column - AI Models */}
        <div className="flex flex-col gap-3">
          {/* AI Models Title */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-3 text-white font-bold text-center shadow-lg border-2 border-purple-400">
            <div className="flex items-center justify-center gap-2">
              <Brain className="h-5 w-5" />
              <span>AI Education Models</span>
            </div>
          </div>
          
          {/* Central Brain */}
          <div className="relative">
            <Card className="overflow-hidden shadow-xl border-2 border-fuchsia-200 dark:border-fuchsia-900 hover:shadow-fuchsia-200/20 dark:hover:shadow-fuchsia-900/20 transition-all duration-300 hover:scale-[1.02] mb-3 z-10">
              <CardContent className="p-3 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full h-20 w-20 flex items-center justify-center shadow-lg animate-pulse">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mt-2">Core LLM</h3>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200">70B Parameters</Badge>
                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">RLHF Tuned</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 w-full flex justify-between z-0">
              <div className="h-0.5 w-10 bg-gradient-to-r from-blue-500 to-transparent"></div>
              <div className="h-0.5 w-10 bg-gradient-to-l from-blue-500 to-transparent"></div>
            </div>
          </div>
          
          {/* Specialized Models Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Tutor Model */}
            <Card className="overflow-hidden shadow-xl border-2 border-pink-200 dark:border-pink-900 hover:shadow-pink-200/20 dark:hover:shadow-pink-900/20 transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-full p-2 mb-1">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-sm">AI Tutor</h3>
                  <p className="text-[10px] text-center mt-1 text-muted-foreground">Interactive learning</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Exam Model */}
            <Card className="overflow-hidden shadow-xl border-2 border-amber-200 dark:border-amber-900 hover:shadow-amber-200/20 dark:hover:shadow-amber-900/20 transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-full p-2 mb-1">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-sm">Exam Solver</h3>
                  <p className="text-[10px] text-center mt-1 text-muted-foreground">Test preparation</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Concept Model */}
            <Card className="overflow-hidden shadow-xl border-2 border-emerald-200 dark:border-emerald-900 hover:shadow-emerald-200/20 dark:hover:shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-2 mb-1">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-sm">Concept Explainer</h3>
                  <p className="text-[10px] text-center mt-1 text-muted-foreground">Clear explanations</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Visual Model */}
            <Card className="overflow-hidden shadow-xl border-2 border-sky-200 dark:border-sky-900 hover:shadow-sky-200/20 dark:hover:shadow-sky-900/20 transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-3">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-full p-2 mb-1">
                    <LayoutGrid className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-sm">Visual Solver</h3>
                  <p className="text-[10px] text-center mt-1 text-muted-foreground">Diagrams & charts</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Fine-tuning */}
          <Card className="overflow-hidden shadow-xl border-2 border-violet-200 dark:border-violet-900 hover:shadow-violet-200/20 dark:hover:shadow-violet-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold">Continuous Fine-tuning</h3>
                <div className="text-xs mt-1">Based on student interactions</div>
              </div>
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-full h-12 w-12 flex items-center justify-center">
                <AirVent className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Infrastructure */}
        <div className="flex flex-col gap-3">
          {/* Infrastructure Title */}
          <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl p-3 text-white font-bold text-center shadow-lg border-2 border-cyan-400">
            <div className="flex items-center justify-center gap-2">
              <Server className="h-5 w-5" />
              <span>Infrastructure</span>
            </div>
          </div>
          
          {/* Kubernetes */}
          <Card className="overflow-hidden shadow-xl border-2 border-blue-200 dark:border-blue-900 hover:shadow-blue-200/20 dark:hover:shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Kubernetes Cluster</h3>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full p-2">
                  <Container className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {/* Mini Pod Grid */}
              <div className="grid grid-cols-3 gap-1 mt-2">
                {[
                  { name: "LLM Inference", icon: <Brain className="h-3 w-3" />, count: 12 },
                  { name: "API Gateway", icon: <Webhook className="h-3 w-3" />, count: 4 },
                  { name: "Data Processing", icon: <Cpu className="h-3 w-3" />, count: 8 },
                  { name: "Content Cache", icon: <HardDrive className="h-3 w-3" />, count: 6 },
                  { name: "Monitoring", icon: <Monitor className="h-3 w-3" />, count: 3 },
                  { name: "Autoscaler", icon: <ArrowRight className="h-3 w-3" />, count: "∞" }
                ].map((pod, i) => (
                  <div key={i} className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-1 flex flex-col items-center">
                    <div className="text-cyan-600">{pod.icon}</div>
                    <div className="text-[8px] font-medium text-center">{pod.name}</div>
                    <Badge variant="outline" className="text-[7px] mt-0.5 h-3 px-1 bg-cyan-100/50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">{pod.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Applications */}
          <Card className="overflow-hidden shadow-xl border-2 border-emerald-200 dark:border-emerald-900 hover:shadow-emerald-200/20 dark:hover:shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">User Applications</h3>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-2">
                  <AppWindow className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-1 mt-2">
                {[
                  "Web Dashboard", "Mobile App", "Browser Extension", "LMS Integration"
                ].map((app, i) => (
                  <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-md p-1.5 text-center">
                    <div className="text-[9px] font-medium">{app}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Data Stores */}
          <Card className="overflow-hidden shadow-xl border-2 border-indigo-200 dark:border-indigo-900 hover:shadow-indigo-200/20 dark:hover:shadow-indigo-900/20 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Data Stores</h3>
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full p-2">
                  <Database className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="flex gap-1 justify-between mt-2">
                {[
                  { name: "Vector DB", size: "12TB" },
                  { name: "Knowledge Base", size: "8TB" },
                  { name: "User Data", size: "3TB" }
                ].map((store, i) => (
                  <div key={i} className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-md flex-1 p-1.5 text-center">
                    <div className="text-[9px] font-medium">{store.name}</div>
                    <div className="text-[8px] text-indigo-600 dark:text-indigo-400">{store.size}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-0">
              <div className="h-full bg-gradient-to-br from-blue-500 to-blue-700">
                <CardContent className="p-2 text-center text-white">
                  <h3 className="text-xl font-extrabold">42%</h3>
                  <p className="text-[8px] font-medium">Higher Scores</p>
                </CardContent>
              </div>
            </Card>
            
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-0">
              <div className="h-full bg-gradient-to-br from-purple-500 to-purple-700">
                <CardContent className="p-2 text-center text-white">
                  <h3 className="text-xl font-extrabold">3.5x</h3>
                  <p className="text-[8px] font-medium">Engagement</p>
                </CardContent>
              </div>
            </Card>
            
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-0">
              <div className="h-full bg-gradient-to-br from-teal-500 to-teal-700">
                <CardContent className="p-2 text-center text-white">
                  <h3 className="text-xl font-extrabold">68%</h3>
                  <p className="text-[8px] font-medium">Less Study Time</p>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
