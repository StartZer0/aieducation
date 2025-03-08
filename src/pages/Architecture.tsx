
import React from 'react';
import { 
  BookOpen, Database, Brain, Cpu, Layers, Code, Users, BarChart3,
  ChevronRight, Zap, ArrowRight, GraduationCap, CheckCircle,
  Server, Cloud, Network, HardDrive, Terminal, Globe, Settings,
  Package, Router
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Architecture = () => {
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 mt-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-1">
          AI+ Education LLM Architecture
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Our specialized approach to training and deploying Large Language Models on educational content
        </p>
      </div>

      {/* Main Flowchart - Training Pipeline */}
      <div className="relative bg-white dark:bg-card rounded-xl p-4 sm:p-6 border shadow-sm overflow-hidden mb-8">
        <h2 className="text-lg font-bold mb-4 text-center">LLM Training Pipeline</h2>
        
        {/* Pipeline Stages in horizontal flow */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 min-w-max pb-2 px-2 overflow-x-auto">
          {/* Stage 1: Data Collection */}
          <div className="relative bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex-1 min-w-[200px] max-w-[280px] mx-auto md:mx-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400">1. Data Collection</h3>
            </div>
            
            <ul className="text-xs space-y-2.5">
              <li className="flex items-start gap-2">
                <BookOpen className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>250+ A-Level textbooks</span>
              </li>
              <li className="flex items-start gap-2">
                <Code className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>50,000+ Q&A pairs</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>100+ subject specialists</span>
              </li>
            </ul>
            
            {/* Flow arrow */}
            <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
              <ArrowRight className="h-5 w-5 text-blue-400" />
            </div>
            
            {/* Mobile flow arrow (vertical) */}
            <div className="md:hidden flex justify-center mt-3">
              <ArrowRight className="h-5 w-5 text-blue-400 transform rotate-90" />
            </div>
          </div>

          {/* Stage 2: Knowledge Structuring */}
          <div className="relative bg-purple-50/50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30 flex-1 min-w-[200px] max-w-[280px] mx-auto md:mx-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-400">2. Knowledge Structuring</h3>
            </div>
            
            <ul className="text-xs space-y-2.5">
              <li className="flex items-start gap-2">
                <Zap className="h-3.5 w-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Curriculum taxonomies</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Concept prerequisites</span>
              </li>
              <li className="flex items-start gap-2">
                <Cpu className="h-3.5 w-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Multiple explanation levels</span>
              </li>
            </ul>
            
            {/* Flow arrow */}
            <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
              <ArrowRight className="h-5 w-5 text-purple-400" />
            </div>
            
            {/* Mobile flow arrow (vertical) */}
            <div className="md:hidden flex justify-center mt-3">
              <ArrowRight className="h-5 w-5 text-purple-400 transform rotate-90" />
            </div>
          </div>

          {/* Stage 3: LLM Training */}
          <div className="relative bg-teal-50/50 dark:bg-teal-950/20 p-4 rounded-lg border border-teal-100 dark:border-teal-900/30 flex-1 min-w-[200px] max-w-[280px] mx-auto md:mx-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <Brain className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-sm font-semibold text-teal-700 dark:text-teal-400">3. LLM Training</h3>
            </div>
            
            <ul className="text-xs space-y-2.5">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>70B parameter model</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Subject-specific datasets</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>RLHF with teacher ratings</span>
              </li>
            </ul>
            
            {/* Flow arrow */}
            <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
              <ArrowRight className="h-5 w-5 text-teal-400" />
            </div>
            
            {/* Mobile flow arrow (vertical) */}
            <div className="md:hidden flex justify-center mt-3">
              <ArrowRight className="h-5 w-5 text-teal-400 transform rotate-90" />
            </div>
          </div>

          {/* Stage 4: Deployment */}
          <div className="relative bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex-1 min-w-[200px] max-w-[280px] mx-auto md:mx-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400">4. Deployment</h3>
            </div>
            
            <ul className="text-xs space-y-2.5">
              <li className="flex items-start gap-2">
                <BarChart3 className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>94% exam accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <Cpu className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>&lt;200ms response time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Monthly updates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Distributed Backend Infrastructure Diagram */}
      <div className="bg-white dark:bg-card rounded-xl p-4 sm:p-6 border shadow-sm overflow-hidden mb-8">
        <h2 className="text-lg font-bold mb-6 text-center">Distributed Backend Infrastructure</h2>
        
        {/* Cloud Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Kubernetes Cluster */}
          <div className="col-span-1 lg:col-span-2">
            <div className="border border-blue-200 dark:border-blue-900/30 rounded-xl p-4 bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-blue-950/20 dark:to-teal-950/20 relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-semibold text-blue-700 dark:text-blue-400">Kubernetes Orchestration</h3>
              </div>
              
              {/* Pod Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {/* LLM Inference Pods */}
                <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-3 rounded-lg shadow-sm flex flex-col items-center">
                  <Brain className="h-6 w-6 text-teal-500 mb-2" />
                  <span className="text-xs font-medium text-center">LLM Inference</span>
                  <span className="text-[10px] text-muted-foreground">12 pods</span>
                </div>
                
                {/* API Gateway Pods */}
                <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-3 rounded-lg shadow-sm flex flex-col items-center">
                  <Router className="h-6 w-6 text-teal-500 mb-2" />
                  <span className="text-xs font-medium text-center">API Gateway</span>
                  <span className="text-[10px] text-muted-foreground">4 pods</span>
                </div>
                
                {/* Data Processing Pods */}
                <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-3 rounded-lg shadow-sm flex flex-col items-center">
                  <Cpu className="h-6 w-6 text-teal-500 mb-2" />
                  <span className="text-xs font-medium text-center">Data Processing</span>
                  <span className="text-[10px] text-muted-foreground">8 pods</span>
                </div>
                
                {/* Content Cache Pods */}
                <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-3 rounded-lg shadow-sm flex flex-col items-center">
                  <HardDrive className="h-6 w-6 text-teal-500 mb-2" />
                  <span className="text-xs font-medium text-center">Content Cache</span>
                  <span className="text-[10px] text-muted-foreground">6 pods</span>
                </div>
                
                {/* Monitoring Pods */}
                <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-3 rounded-lg shadow-sm flex flex-col items-center">
                  <BarChart3 className="h-6 w-6 text-teal-500 mb-2" />
                  <span className="text-xs font-medium text-center">Monitoring</span>
                  <span className="text-[10px] text-muted-foreground">3 pods</span>
                </div>
                
                {/* Autoscaler */}
                <div className="border border-teal-200 dark:border-teal-900/30 bg-white dark:bg-slate-900/60 p-3 rounded-lg shadow-sm flex flex-col items-center">
                  <Settings className="h-6 w-6 text-teal-500 mb-2 animate-pulse-soft" />
                  <span className="text-xs font-medium text-center">Autoscaler</span>
                  <span className="text-[10px] text-muted-foreground">Dynamic</span>
                </div>
              </div>
              
              {/* Cloud Provider Label */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Cloud className="h-3.5 w-3.5" />
                <span>Multi-cloud deployment</span>
              </div>
            </div>
          </div>
          
          {/* Stats & Features */}
          <div className="col-span-1">
            <div className="border border-blue-200 dark:border-blue-900/30 rounded-xl p-4 h-full flex flex-col">
              <h3 className="text-base font-semibold mb-4">Infrastructure Metrics</h3>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-blue-500" />
                  <span>99.99% uptime SLA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>Global CDN distribution</span>
                </li>
                <li className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-blue-500" />
                  <span>CI/CD automated deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-blue-500" />
                  <span>Auto-scaling based on traffic</span>
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-500" />
                  <span>Distributed data storage</span>
                </li>
              </ul>
              
              <div className="mt-auto pt-4">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg p-3 text-center text-xs font-medium">
                  <p>Designed to handle</p>
                  <p className="text-lg font-bold">1M+ concurrent users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Flow Diagram */}
        <div className="border border-blue-200 dark:border-blue-900/30 rounded-xl p-4 bg-gradient-to-br from-blue-50/30 to-teal-50/30 dark:from-blue-950/10 dark:to-teal-950/10">
          <h3 className="text-base font-semibold mb-4 text-center">Data Flow Architecture</h3>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium">Users</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-gray-400 transform md:rotate-0 rotate-90" />
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60 flex items-center justify-center mb-2">
                <Router className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-medium">API Gateway</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-gray-400 transform md:rotate-0 rotate-90" />
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/60 dark:to-teal-800/60 flex items-center justify-center mb-2">
                <Brain className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <span className="text-xs font-medium">LLM Inference</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-gray-400 transform md:rotate-0 rotate-90" />
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 flex items-center justify-center mb-2">
                <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium">Knowledge Base</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Results - Compact display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <div className="rounded-lg p-3 text-center text-white bg-gradient-to-br from-blue-500 to-blue-700">
          <h3 className="text-2xl font-bold">42%</h3>
          <p className="text-xs">Improved Test Scores</p>
        </div>
        
        <div className="rounded-lg p-3 text-center text-white bg-gradient-to-br from-purple-500 to-purple-700">
          <h3 className="text-2xl font-bold">3.5x</h3>
          <p className="text-xs">Student Engagement</p>
        </div>
        
        <div className="rounded-lg p-3 text-center text-white bg-gradient-to-br from-teal-500 to-teal-700">
          <h3 className="text-2xl font-bold">68%</h3>
          <p className="text-xs">Less Study Time</p>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
