
import React from 'react';
import { 
  BookOpen, Database, Brain, Cpu, Layers, Code, Users, BarChart3,
  ChevronRight, Zap, ArrowRight, GraduationCap, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Architecture = () => {
  return (
    <div className="container max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-4">
          AI+ Education LLM Architecture
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our specialized approach to training Large Language Models on A-level educational content
        </p>
      </div>

      {/* Main Flowchart */}
      <div className="bg-white dark:bg-card rounded-xl p-8 border shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">LLM Training & Deployment Pipeline</h2>
        
        <div className="flex flex-col space-y-8">
          {/* Data Collection & Preprocessing Stage */}
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Stage 1: Data Collection & Preprocessing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 text-blue-500">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">A-Level Textbooks</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Curated collection from UK exam boards (AQA, OCR, Edexcel)</p>
                  <div className="flex items-center mt-2 text-blue-600 text-xs">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>250+ textbooks processed</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 text-purple-500">
                    <Code className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Past Exam Papers</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Question-answer pairs from 15+ years of A-level examinations</p>
                  <div className="flex items-center mt-2 text-purple-600 text-xs">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>50,000+ QA pairs</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 text-teal-500">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Expert Knowledge</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Input from A-level teachers and educational experts</p>
                  <div className="flex items-center mt-2 text-teal-600 text-xs">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>100+ subject specialists</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center my-6">
              <ArrowRight className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          {/* Data Structuring Stage */}
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Layers className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400">Stage 2: Knowledge Structuring</h3>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    Curriculum Mapping
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Content is organized according to the A-level syllabus structure, creating a comprehensive knowledge graph.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Subject taxonomies built for Physics, Chemistry, Biology, Mathematics, and more</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Concept prerequisites and dependencies mapped</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-purple-600" />
                    Content Augmentation
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enhancing the raw curriculum content with additional context and simplified explanations.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Multiple explanation levels for different learning styles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Real-world applications and examples added</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center my-6">
              <ArrowRight className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          {/* LLM Training Stage */}
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400">Stage 3: A-Level Specialized LLM Training</h3>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-t-4 border-t-teal-500">
                <CardHeader>
                  <CardTitle className="text-lg">Base Model Fine-tuning</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <p>Starting with a foundation LLM and specializing for educational contexts</p>
                  
                  <div className="border rounded-lg p-3 bg-muted/20">
                    <div className="font-semibold mb-1 text-teal-700 dark:text-teal-400">Technical Details:</div>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>Foundation model: 70B parameter transformer architecture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>Selective parameter fine-tuning with LoRA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>8,000 GPU hours on specialized hardware</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-teal-500">
                <CardHeader>
                  <CardTitle className="text-lg">Subject-Specific Training</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <p>Creating specialized subject experts through targeted training</p>
                  
                  <div className="border rounded-lg p-3 bg-muted/20">
                    <div className="font-semibold mb-1 text-teal-700 dark:text-teal-400">Approach:</div>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>Separate training paths for STEM vs humanities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>Subject-specific datasets with 50M+ tokens each</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>Reinforcement learning from subject expert feedback</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-teal-500">
                <CardHeader>
                  <CardTitle className="text-lg">Pedagogical Alignment</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <p>Training the model to be an effective teacher, not just knowledgeable</p>
                  
                  <div className="border rounded-lg p-3 bg-muted/20">
                    <div className="font-semibold mb-1 text-teal-700 dark:text-teal-400">Techniques:</div>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>RLHF with A-level teachers rating responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>Socratic method training through dialogue pairs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 text-teal-600 mt-1 flex-shrink-0" />
                        <span>Scaffolded explanation generation at multiple levels</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center my-6">
              <ArrowRight className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          {/* Evaluation & Deployment */}
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Stage 4: Evaluation & Deployment</h3>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Performance Metrics
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>A-Level Exam Answer Accuracy</span>
                      <span className="text-green-600 font-medium">94%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Pedagogical Effectiveness</span>
                      <span className="text-blue-600 font-medium">89%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Student Comprehension Improvement</span>
                      <span className="text-purple-600 font-medium">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-blue-600" />
                  Deployment Architecture
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium">Optimized Inference</span>
                      <p className="text-xs text-muted-foreground">Quantized models for low-latency responses (<200ms)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium">Global Edge Network</span>
                      <p className="text-xs text-muted-foreground">Distributed inference across regional data centers</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium">Continuous Learning</span>
                      <p className="text-xs text-muted-foreground">Models updated monthly with new exam content and feedback</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Results */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Key Results</h2>
        <p className="text-muted-foreground">Measurable improvements in A-level student performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-lg p-6 text-center text-white bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2">42%</h3>
          <p className="text-sm text-white/80">Average Improvement in Test Scores</p>
        </div>
        
        <div className="rounded-lg p-6 text-center text-white bg-gradient-to-br from-purple-500 to-purple-700">
          <div className="mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2">3.5x</h3>
          <p className="text-sm text-white/80">Increase in Student Engagement</p>
        </div>
        
        <div className="rounded-lg p-6 text-center text-white bg-gradient-to-br from-teal-500 to-teal-700">
          <div className="mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-2">68%</h3>
          <p className="text-sm text-white/80">Reduction in Study Time Required</p>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
