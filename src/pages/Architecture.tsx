
import React from 'react';
import { 
  BookOpen, Database, Brain, Cpu, Layers, Code, Users, BarChart3,
  ChevronRight, Zap, ArrowRight, GraduationCap, CheckCircle,
  Server, Cloud, Network, HardDrive, Terminal, Globe, Settings,
  Package, Router
} from 'lucide-react';

const Architecture = () => {
  return (
    <div className="container max-w-7xl mx-auto h-screen flex flex-col p-4 pt-20">
      {/* Title bar with improved spacing and visibility */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg shadow-md p-3 mb-3">
        <h1 className="text-xl font-bold text-white">
          AI+ Education LLM Architecture
        </h1>
        <p className="text-xs text-white/90 max-w-2xl mx-auto">
          Our specialized approach to training and deploying Large Language Models on educational content
        </p>
      </div>

      {/* Main Architecture View - No Scrolling */}
      <div className="relative bg-white dark:bg-slate-900 rounded-lg border shadow-md overflow-hidden flex-1 flex flex-col p-3">
        {/* Top Section: LLM Training Pipeline */}
        <div className="mb-2">
          <h3 className="text-xs font-semibold text-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md py-1 mb-2">LLM Training Pipeline</h3>
          
          {/* Pipeline Stages in horizontal flow */}
          <div className="flex flex-row gap-2 min-w-max px-1">
            {/* Stage 1: Data Collection */}
            <div className="relative bg-blue-50/50 dark:bg-blue-950/20 p-2 rounded-lg border border-blue-100 dark:border-blue-900/30 flex-1 min-w-[120px]">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-5 w-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Database className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xs font-semibold text-blue-700 dark:text-blue-400">1. Data Collection</h3>
              </div>
              
              <ul className="text-[8px] space-y-1">
                <li className="flex items-start gap-1">
                  <BookOpen className="h-2 w-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>250+ A-Level textbooks</span>
                </li>
                <li className="flex items-start gap-1">
                  <Code className="h-2 w-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>50,000+ Q&A pairs</span>
                </li>
                <li className="flex items-start gap-1">
                  <Users className="h-2 w-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>100+ subject specialists</span>
                </li>
              </ul>
              
              {/* Flow arrow */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="h-3 w-3 text-blue-400" />
              </div>
            </div>

            {/* Stage 2: Knowledge Structuring */}
            <div className="relative bg-purple-50/50 dark:bg-purple-950/20 p-2 rounded-lg border border-purple-100 dark:border-purple-900/30 flex-1 min-w-[120px]">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-5 w-5 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Layers className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xs font-semibold text-purple-700 dark:text-purple-400">2. Knowledge Structuring</h3>
              </div>
              
              <ul className="text-[8px] space-y-1">
                <li className="flex items-start gap-1">
                  <Zap className="h-2 w-2 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Curriculum taxonomies</span>
                </li>
                <li className="flex items-start gap-1">
                  <ChevronRight className="h-2 w-2 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Concept prerequisites</span>
                </li>
                <li className="flex items-start gap-1">
                  <Cpu className="h-2 w-2 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Multiple explanation levels</span>
                </li>
              </ul>
              
              {/* Flow arrow */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="h-3 w-3 text-purple-400" />
              </div>
            </div>

            {/* Stage 3: LLM Training */}
            <div className="relative bg-teal-50/50 dark:bg-teal-950/20 p-2 rounded-lg border border-teal-100 dark:border-teal-900/30 flex-1 min-w-[120px]">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-5 w-5 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                  <Brain className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xs font-semibold text-teal-700 dark:text-teal-400">3. LLM Training</h3>
              </div>
              
              <ul className="text-[8px] space-y-1">
                <li className="flex items-start gap-1">
                  <ChevronRight className="h-2 w-2 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>70B parameter model</span>
                </li>
                <li className="flex items-start gap-1">
                  <ChevronRight className="h-2 w-2 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>Subject-specific datasets</span>
                </li>
                <li className="flex items-start gap-1">
                  <ChevronRight className="h-2 w-2 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>RLHF with teacher ratings</span>
                </li>
              </ul>
              
              {/* Flow arrow */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="h-3 w-3 text-teal-400" />
              </div>
            </div>

            {/* Stage 4: Deployment */}
            <div className="relative bg-blue-50/50 dark:bg-blue-950/20 p-2 rounded-lg border border-blue-100 dark:border-blue-900/30 flex-1 min-w-[120px]">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-5 w-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xs font-semibold text-blue-700 dark:text-blue-400">4. Deployment</h3>
              </div>
              
              <ul className="text-[8px] space-y-1">
                <li className="flex items-start gap-1">
                  <BarChart3 className="h-2 w-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>94% exam accuracy</span>
                </li>
                <li className="flex items-start gap-1">
                  <Cpu className="h-2 w-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>&lt;200ms response time</span>
                </li>
                <li className="flex items-start gap-1">
                  <CheckCircle className="h-2 w-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Monthly updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Middle Section: Distributed Backend Infrastructure */}
        <div className="relative mb-2">
          <h3 className="text-xs font-semibold mb-1 text-center bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-md py-1">Distributed Backend Infrastructure</h3>
          
          <div className="flex justify-center mb-1">
            <div className="h-5 w-5 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/60 dark:to-teal-900/60 rounded-full flex items-center justify-center">
              <Cloud className="h-3 w-3 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          
          {/* Kubernetes Cluster */}
          <div className="border border-dashed border-teal-200 dark:border-teal-800 rounded-lg p-2 bg-gradient-to-br from-blue-50/30 to-teal-50/30 dark:from-blue-950/10 dark:to-teal-950/10 relative mb-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="h-5 w-5 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <Package className="h-3 w-3 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xs font-semibold text-teal-700 dark:text-teal-400">Kubernetes Orchestration</h3>
            </div>
            
            {/* Pod Grid */}
            <div className="grid grid-cols-3 gap-1 mb-1">
              {/* LLM Inference Pods */}
              <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-1 rounded-lg shadow-sm flex flex-col items-center">
                <Brain className="h-3 w-3 text-teal-500" />
                <span className="text-[8px] font-medium text-center">LLM Inference</span>
                <span className="text-[6px] text-muted-foreground">12 pods</span>
              </div>
              
              {/* API Gateway Pods */}
              <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-1 rounded-lg shadow-sm flex flex-col items-center">
                <Router className="h-3 w-3 text-teal-500" />
                <span className="text-[8px] font-medium text-center">API Gateway</span>
                <span className="text-[6px] text-muted-foreground">4 pods</span>
              </div>
              
              {/* Data Processing Pods */}
              <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-1 rounded-lg shadow-sm flex flex-col items-center">
                <Cpu className="h-3 w-3 text-teal-500" />
                <span className="text-[8px] font-medium text-center">Data Processing</span>
                <span className="text-[6px] text-muted-foreground">8 pods</span>
              </div>
              
              {/* Content Cache Pods */}
              <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-1 rounded-lg shadow-sm flex flex-col items-center">
                <HardDrive className="h-3 w-3 text-teal-500" />
                <span className="text-[8px] font-medium text-center">Content Cache</span>
                <span className="text-[6px] text-muted-foreground">6 pods</span>
              </div>
              
              {/* Monitoring Pods */}
              <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-1 rounded-lg shadow-sm flex flex-col items-center">
                <BarChart3 className="h-3 w-3 text-teal-500" />
                <span className="text-[8px] font-medium text-center">Monitoring</span>
                <span className="text-[6px] text-muted-foreground">3 pods</span>
              </div>
              
              {/* Autoscaler */}
              <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-1 rounded-lg shadow-sm flex flex-col items-center">
                <Settings className="h-3 w-3 text-teal-500 animate-pulse-soft" />
                <span className="text-[8px] font-medium text-center">Autoscaler</span>
                <span className="text-[6px] text-muted-foreground">Dynamic</span>
              </div>
            </div>
            
            {/* Infrastructure Metrics - Made more compact */}
            <div className="flex flex-wrap gap-1 justify-center">
              <div className="flex items-center gap-0.5 text-[7px] rounded-full bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5">
                <Server className="h-2 w-2 text-blue-600" />
                <span>99.99% uptime</span>
              </div>
              <div className="flex items-center gap-0.5 text-[7px] rounded-full bg-teal-100 dark:bg-teal-900/30 px-1 py-0.5">
                <Globe className="h-2 w-2 text-teal-600" />
                <span>Global CDN</span>
              </div>
              <div className="flex items-center gap-0.5 text-[7px] rounded-full bg-purple-100 dark:bg-purple-900/30 px-1 py-0.5">
                <Network className="h-2 w-2 text-purple-600" />
                <span>Auto-scaling</span>
              </div>
              <div className="flex items-center gap-0.5 text-[7px] rounded-full bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5">
                <Database className="h-2 w-2 text-blue-600" />
                <span>Distributed storage</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section: Data Flow Architecture */}
        <div className="relative">
          <h3 className="text-xs font-semibold mb-1 text-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md py-1">Data Flow Architecture</h3>
          
          <div className="flex flex-row justify-between items-center gap-1 px-4">
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 flex items-center justify-center">
                <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[8px] font-medium">Users</span>
            </div>
            
            <ArrowRight className="h-3 w-3 text-gray-400" />
            
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60 flex items-center justify-center">
                <Router className="h-3 w-3 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-[8px] font-medium">API Gateway</span>
            </div>
            
            <ArrowRight className="h-3 w-3 text-gray-400" />
            
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/60 dark:to-teal-800/60 flex items-center justify-center">
                <Brain className="h-3 w-3 text-teal-600 dark:text-teal-400" />
              </div>
              <span className="text-[8px] font-medium">LLM Inference</span>
            </div>
            
            <ArrowRight className="h-3 w-3 text-gray-400" />
            
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 flex items-center justify-center">
                <Database className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[8px] font-medium">Knowledge Base</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Results - Compact display */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="rounded-lg p-1 text-center text-white bg-gradient-to-br from-blue-500 to-blue-700">
          <h3 className="text-sm font-bold">42%</h3>
          <p className="text-[8px]">Improved Test Scores</p>
        </div>
        
        <div className="rounded-lg p-1 text-center text-white bg-gradient-to-br from-purple-500 to-purple-700">
          <h3 className="text-sm font-bold">3.5x</h3>
          <p className="text-[8px]">Student Engagement</p>
        </div>
        
        <div className="rounded-lg p-1 text-center text-white bg-gradient-to-br from-teal-500 to-teal-700">
          <h3 className="text-sm font-bold">68%</h3>
          <p className="text-[8px]">Less Study Time</p>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
