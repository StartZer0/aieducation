
import React from 'react';
import { 
  BookOpen, Database, Brain, Cpu, Layers, Code, Users, BarChart3,
  ChevronRight, Zap, ArrowRight, GraduationCap, CheckCircle
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
          Our specialized approach to training Large Language Models on A-level educational content
        </p>
      </div>

      {/* Main Flowchart - Single flowing architectural diagram */}
      <div className="relative bg-white dark:bg-card rounded-xl p-4 border shadow-sm overflow-hidden">
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
