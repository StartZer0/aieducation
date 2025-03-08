
import React from 'react';
import { 
  BookOpen, Database, Brain, Cpu, Layers, Code, Users, BarChart3,
  ChevronRight, Zap, ArrowRight, GraduationCap, CheckCircle,
  Server, Cloud, Network, HardDrive, Terminal, Globe, Settings,
  Package, Router
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Architecture = () => {
  return (
    <div className="container max-w-7xl mx-auto h-screen flex flex-col p-4 pt-16">
      {/* Enhanced Title Bar with stronger gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 rounded-lg shadow-lg p-4 mb-4 transform hover:scale-[1.01] transition-transform">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          AI+ Education LLM Architecture
        </h1>
        <p className="text-sm text-white/90 max-w-2xl">
          Our specialized approach to training and deploying Large Language Models for educational excellence
        </p>
      </div>

      {/* Main Architecture View - Enhanced with gradients and shadow effects */}
      <div className="relative bg-white dark:bg-slate-900 rounded-lg border-2 border-blue-100 dark:border-blue-900/30 shadow-xl overflow-hidden flex-1 flex flex-col p-3">
        {/* Top Section: LLM Training Pipeline */}
        <div className="mb-3">
          <h3 className="text-sm font-bold text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md py-1.5 mb-3 shadow-sm">LLM Training Pipeline</h3>
          
          {/* Pipeline Stages in horizontal flow with enhanced visuals */}
          <div className="flex flex-row gap-3 min-w-max px-1">
            {/* Stage 1: Data Collection - Enhanced */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20 p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800/30 flex-1 min-w-[130px] shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center shadow-inner">
                  <Database className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400">1. Data Collection</h3>
              </div>
              
              <ul className="text-[10px] space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <BookOpen className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">250+ A-Level textbooks</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Code className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">50,000+ Q&A pairs</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Users className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">100+ subject specialists</span>
                </li>
              </ul>
              
              {/* Flow arrow - Enhanced */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1 shadow-md">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            {/* Stage 2: Knowledge Structuring - Enhanced */}
            <div className="relative bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/20 p-3 rounded-lg border-2 border-purple-200 dark:border-purple-800/30 flex-1 min-w-[130px] shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 bg-purple-600 dark:bg-purple-700 rounded-full flex items-center justify-center shadow-inner">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-purple-700 dark:text-purple-400">2. Knowledge Structuring</h3>
              </div>
              
              <ul className="text-[10px] space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <Zap className="h-3 w-3 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Curriculum taxonomies</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="h-3 w-3 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Concept prerequisites</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Cpu className="h-3 w-3 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Multiple explanation levels</span>
                </li>
              </ul>
              
              {/* Flow arrow - Enhanced */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-full p-1 shadow-md">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            {/* Stage 3: LLM Training - Enhanced */}
            <div className="relative bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/40 dark:to-teal-900/20 p-3 rounded-lg border-2 border-teal-200 dark:border-teal-800/30 flex-1 min-w-[130px] shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 bg-teal-600 dark:bg-teal-700 rounded-full flex items-center justify-center shadow-inner">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-teal-700 dark:text-teal-400">3. LLM Training</h3>
              </div>
              
              <ul className="text-[10px] space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="h-3 w-3 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">70B parameter model</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="h-3 w-3 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Subject-specific datasets</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="h-3 w-3 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">RLHF with teacher ratings</span>
                </li>
              </ul>
              
              {/* Flow arrow - Enhanced */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-full p-1 shadow-md">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            {/* Stage 4: Deployment - Enhanced */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20 p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800/30 flex-1 min-w-[130px] shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center shadow-inner">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400">4. Deployment</h3>
              </div>
              
              <ul className="text-[10px] space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <BarChart3 className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">94% exam accuracy</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Cpu className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">&lt;200ms response time</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Monthly updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Middle Section: Distributed Backend Infrastructure - Enhanced */}
        <div className="relative mb-3">
          <h3 className="text-sm font-bold mb-3 text-center bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-md py-1.5 shadow-sm">Distributed Backend Infrastructure</h3>
          
          <div className="flex justify-center mb-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
              <Cloud className="h-4 w-4 text-white" />
            </div>
          </div>
          
          {/* Kubernetes Cluster - Enhanced with glassmorphism effect */}
          <div className="border-2 border-teal-200 dark:border-teal-800/30 rounded-lg p-3 bg-gradient-to-br from-teal-50/80 to-blue-50/80 dark:from-teal-950/20 dark:to-blue-950/20 backdrop-blur-sm relative mb-2 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-7 w-7 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-sm">
                <Package className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-sm font-bold text-teal-700 dark:text-teal-400">Kubernetes Orchestration</h3>
            </div>
            
            {/* Pod Grid - Enhanced with hover effects */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              {/* LLM Inference Pods */}
              <div className="border-2 border-teal-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform duration-200 flex flex-col items-center">
                <Brain className="h-4 w-4 text-teal-600" />
                <span className="text-[9px] font-bold text-center">LLM Inference</span>
                <Badge variant="outline" className="text-[7px] bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 mt-1">12 pods</Badge>
              </div>
              
              {/* API Gateway Pods */}
              <div className="border-2 border-teal-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform duration-200 flex flex-col items-center">
                <Router className="h-4 w-4 text-teal-600" />
                <span className="text-[9px] font-bold text-center">API Gateway</span>
                <Badge variant="outline" className="text-[7px] bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 mt-1">4 pods</Badge>
              </div>
              
              {/* Data Processing Pods */}
              <div className="border-2 border-teal-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform duration-200 flex flex-col items-center">
                <Cpu className="h-4 w-4 text-teal-600" />
                <span className="text-[9px] font-bold text-center">Data Processing</span>
                <Badge variant="outline" className="text-[7px] bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 mt-1">8 pods</Badge>
              </div>
              
              {/* Content Cache Pods */}
              <div className="border-2 border-teal-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform duration-200 flex flex-col items-center">
                <HardDrive className="h-4 w-4 text-teal-600" />
                <span className="text-[9px] font-bold text-center">Content Cache</span>
                <Badge variant="outline" className="text-[7px] bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 mt-1">6 pods</Badge>
              </div>
              
              {/* Monitoring Pods */}
              <div className="border-2 border-teal-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform duration-200 flex flex-col items-center">
                <BarChart3 className="h-4 w-4 text-teal-600" />
                <span className="text-[9px] font-bold text-center">Monitoring</span>
                <Badge variant="outline" className="text-[7px] bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 mt-1">3 pods</Badge>
              </div>
              
              {/* Autoscaler */}
              <div className="border-2 border-teal-200 dark:border-teal-900/50 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform duration-200 flex flex-col items-center">
                <Settings className="h-4 w-4 text-teal-600 animate-pulse-soft" />
                <span className="text-[9px] font-bold text-center">Autoscaler</span>
                <Badge variant="outline" className="text-[7px] bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 mt-1">Dynamic</Badge>
              </div>
            </div>
            
            {/* Infrastructure Metrics - More visually striking */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              <div className="flex items-center gap-1 text-[8px] font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-2 py-1 text-white shadow-sm">
                <Server className="h-3 w-3 text-white" />
                <span>99.99% uptime</span>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-bold rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-2 py-1 text-white shadow-sm">
                <Globe className="h-3 w-3 text-white" />
                <span>Global CDN</span>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-bold rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-2 py-1 text-white shadow-sm">
                <Network className="h-3 w-3 text-white" />
                <span>Auto-scaling</span>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-2 py-1 text-white shadow-sm">
                <Database className="h-3 w-3 text-white" />
                <span>Distributed storage</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section: Data Flow Architecture - Enhanced */}
        <div className="relative">
          <h3 className="text-sm font-bold mb-3 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md py-1.5 shadow-sm">Data Flow Architecture</h3>
          
          <div className="flex flex-row justify-between items-center gap-1 px-4">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow transform hover:scale-110 duration-200">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-[9px] font-bold mt-1">Users</span>
            </div>
            
            <ArrowRight className="h-5 w-5 text-blue-500" />
            
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow transform hover:scale-110 duration-200">
                <Router className="h-5 w-5 text-white" />
              </div>
              <span className="text-[9px] font-bold mt-1">API Gateway</span>
            </div>
            
            <ArrowRight className="h-5 w-5 text-purple-500" />
            
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow transform hover:scale-110 duration-200">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-[9px] font-bold mt-1">LLM Inference</span>
            </div>
            
            <ArrowRight className="h-5 w-5 text-teal-500" />
            
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow transform hover:scale-110 duration-200">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-[9px] font-bold mt-1">Knowledge Base</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Results - Enhanced with Card components and animations */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-200 border-0">
          <div className="h-full bg-gradient-to-br from-blue-500 to-blue-700">
            <CardContent className="p-2 text-center text-white">
              <h3 className="text-xl font-bold">42%</h3>
              <p className="text-[9px] font-medium">Improved Test Scores</p>
            </CardContent>
          </div>
        </Card>
        
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-200 border-0">
          <div className="h-full bg-gradient-to-br from-purple-500 to-purple-700">
            <CardContent className="p-2 text-center text-white">
              <h3 className="text-xl font-bold">3.5x</h3>
              <p className="text-[9px] font-medium">Student Engagement</p>
            </CardContent>
          </div>
        </Card>
        
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-200 border-0">
          <div className="h-full bg-gradient-to-br from-teal-500 to-teal-700">
            <CardContent className="p-2 text-center text-white">
              <h3 className="text-xl font-bold">68%</h3>
              <p className="text-[9px] font-medium">Less Study Time</p>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Architecture;
