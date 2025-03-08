
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, Lightbulb, Server, Database, Container, 
  Truck, FileText, MonitorSmartphone, Bot,
  User, BookOpen, Network, Home, Settings
} from 'lucide-react';

const Architecture = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 overflow-hidden">
      {/* Custom Header for Architecture Page */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white py-3 px-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">A+</span>
          </div>
          <span className="text-xl font-bold">AI+ Education</span>
        </div>
        <Link to="/" className="flex items-center gap-1 text-white hover:text-blue-100 transition-colors">
          <Home size={16} />
          <span>Home</span>
        </Link>
      </div>

      {/* Main Content - Blueprint Style Background */}
      <div className="relative w-full" style={{ 
        backgroundImage: 'linear-gradient(#6b98d6 1px, transparent 1px), linear-gradient(90deg, #6b98d6 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundColor: '#f0f4ff',
      }}>
        {/* Main Title */}
        <div className="text-center py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-300">
            Application Architecture
          </h1>
          <div className="mt-1 inline-flex items-center justify-center bg-blue-800 dark:bg-blue-900 text-white font-bold text-2xl px-6 py-2 rounded-lg">
            AIDUCATION
          </div>
          <p className="text-blue-600 mt-1">Applying architecture</p>
        </div>
      
        {/* Main Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 px-6 py-8">
          
          {/* Column 1: Training Pipeline */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Training Pipeline</h2>
            </div>
            
            {/* Student User */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800 relative">
              <div className="flex justify-center mb-4">
                <img src="/lovable-uploads/5c188163-a81f-47e6-a2cf-767936b79c57.png" alt="Student" className="w-24 h-24 object-contain" />
              </div>
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300">AI Tutor</h3>
            </div>
            
            {/* Text Collection */}
            <div className="flex gap-2 items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                <div className="w-0.5 h-20 bg-orange-400"></div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800 flex-1">
                <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-2">Text Tutor</h3>
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-6 h-16 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300 dark:border-blue-700 flex items-center justify-center">
                        <span className="text-[8px] rotate-90 text-blue-700 dark:text-blue-300">FILE</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Exam Solver */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-2">Exam Solver</h3>
              <div className="flex justify-center mt-2">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
              <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex justify-between mb-1">
                  <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                </div>
                <div className="h-0.5 bg-gray-300 dark:bg-gray-600 my-1"></div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 2: A-Level Testing */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">on A-Level Testing</h2>
            </div>
            
            {/* A-Level Tutor Screen */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-2">A-VEL TUTOR</h3>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                <div className="grid grid-cols-2 gap-2">
                  {['MATHS', 'EXAM', 'QUIZ', 'TUTOR', 'ASSIGN', 'REVIEW'].map((item, i) => (
                    <div key={i} className={`p-2 rounded-lg text-center text-xs font-medium border ${i % 2 === 0 ? 'bg-blue-200 dark:bg-blue-800 border-blue-300 dark:border-blue-700' : 'bg-orange-200 dark:bg-orange-800/40 border-orange-300 dark:border-orange-700'}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Distribution */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <Truck className="w-8 h-8 text-blue-600" />
                <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-bold">SOTTOR</div>
              </div>
              <div className="w-0.5 h-10 bg-blue-400"></div>
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-600 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                </div>
              </div>
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300">Distribute<br />BaaS/TPUs</h3>
            </div>
            
            {/* A-Tutor */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800 flex flex-col items-center">
              <img src="/lovable-uploads/5c188163-a81f-47e6-a2cf-767936b79c57.png" alt="A-Tutor" className="w-24 h-24 object-contain" />
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mt-1">A-Tutor</h3>
            </div>
          </div>
          
          {/* Column 3: Fine-tuning & Exam Solver */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="text-center relative">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                </div>
              </div>
              <div className="pt-20">
                <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto" />
                <h3 className="font-bold text-center text-blue-700 dark:text-blue-300">AI<br />Pre-processing</h3>
              </div>
            </div>
            
            {/* Fine-tuning + Exam-Based */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-1">fine-Tuning<br />+ Exam-Based<br />Visual Solvers</h3>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 border border-blue-200 dark:border-blue-700 mt-2 text-center">
                <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">ROHUND</span>
              </div>
            </div>
            
            {/* AI Tutor (Exam Solver) */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border-2 border-blue-400">
                <Bot className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mt-2">AI TUTOR<br />(Exam Solver)</h3>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">Exam Solver</h3>
            </div>
          </div>
          
          {/* Column 4: Fine-tuning */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="text-center">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">AI Tutor</h3>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800 inline-block">
                <div className="w-16 h-16 mx-auto rounded-xl bg-white flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">A</span>
                </div>
              </div>
            </div>
            
            {/* Exam Solvers */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-2">EXAM<br />SOLVERS</h3>
            </div>
            
            {/* Continue fine-tuning */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-2">Continue<br />fine-tuning</h3>
            </div>
            
            {/* Continue fine-tuning with */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-2">Continuous<br />fine-tuning with</h3>
              <div className="flex justify-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-400">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center border border-orange-400">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">Visual Solvers</h3>
            </div>
          </div>
          
          {/* Column 5: Infrastructure */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                <div className="flex items-center justify-center gap-1">
                  <Container className="w-6 h-6" />
                  <span>Kubernetes</span>
                </div>
              </h2>
            </div>
            
            {/* AI Tutor */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-center text-blue-700 dark:text-blue-300 mb-2">AI TUTOR</h3>
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-blue-400">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                </div>
              </div>
            </div>
            
            {/* Model Scanning */}
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Model Scanning</h3>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800 w-full">
                <div className="w-full aspect-square bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-700">
                  <div className="w-3/4 h-3/4 rounded-full bg-white dark:bg-blue-800 flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-1 w-full bg-blue-400"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rotate-90">
                      <div className="h-1 w-full bg-blue-400"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rotate-45">
                      <div className="h-1 w-full bg-blue-400"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rotate-[135deg]">
                      <div className="h-1 w-full bg-blue-400"></div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-500 z-10"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Model Solvers */}
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Model Solvers</h3>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-blue-200 dark:border-blue-800 w-full">
                <div className="w-full aspect-video bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-700">
                  <div className="w-4/5 h-4/5">
                    <div className="h-full flex flex-col">
                      <div className="h-1/4 bg-blue-200 dark:bg-blue-800 mb-1 rounded"></div>
                      <div className="h-1/4 bg-blue-200 dark:bg-blue-800 mb-1 rounded"></div>
                      <div className="h-1/4 bg-blue-200 dark:bg-blue-800 mb-1 rounded"></div>
                      <div className="h-1/4 bg-blue-200 dark:bg-blue-800 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Delivery */}
            <div className="flex items-center gap-2 justify-center">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AIU</span>
              </div>
              <Truck className="w-10 h-10 text-blue-600" />
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">Visual Solvers</h3>
            </div>
          </div>
          
        </div>
        
        {/* Connection Lines - Rendered with absolute positioning */}
        <div className="absolute inset-0 pointer-events-none">
          {/* This would be better with SVG, but for simplicity using div borders */}
          <div className="absolute top-1/2 left-[20%] w-[60%] h-0.5 bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
