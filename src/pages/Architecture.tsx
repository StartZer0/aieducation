
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Database, Brain, Cpu, Layers, Code, BookOpen, Users, BarChart3,
  Lightbulb, ChevronRight, Zap, ArrowRight, Globe, Star, GitBranch, 
  GraduationCap, Atom
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Architecture = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="container max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-4">
          AI+ Education Platform Architecture
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover how our revolutionary AI-powered education system is built to deliver personalized, adaptive learning
        </p>
      </motion.div>

      {/* Section Navigation */}
      <div className="flex overflow-x-auto gap-2 md:gap-4 pb-4 mb-8 justify-center">
        {['overview', 'data', 'training', 'deployment', 'results'].map((section) => (
          <Button
            key={section}
            variant={activeSection === section ? "default" : "outline"}
            onClick={() => setActiveSection(section)}
            className="whitespace-nowrap"
          >
            {section === 'overview' && <Layers className="mr-2 h-4 w-4" />}
            {section === 'data' && <Database className="mr-2 h-4 w-4" />}
            {section === 'training' && <Brain className="mr-2 h-4 w-4" />}
            {section === 'deployment' && <Server className="mr-2 h-4 w-4" />}
            {section === 'results' && <BarChart3 className="mr-2 h-4 w-4" />}
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Hero Section */}
          <motion.div variants={fadeIn} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 border shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                  An Intelligent Education Ecosystem
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our AI+ Education platform combines state-of-the-art machine learning with pedagogical expertise to create an adaptive learning system that understands each student's needs.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Personalized Learning Paths</h3>
                      <p className="text-sm text-muted-foreground">Adapts content and difficulty based on individual student performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                      <Brain size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Domain-Specific Knowledge</h3>
                      <p className="text-sm text-muted-foreground">Optimized for mathematics, science, and other core subjects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">24/7 Learning Support</h3>
                      <p className="text-sm text-muted-foreground">Continuous assistance and feedback without human limitations</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  {/* Central Brain */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 3
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg z-20"
                  >
                    <Brain className="w-16 h-16 text-white" />
                  </motion.div>
                  
                  {/* Orbiting Elements */}
                  {[
                    { icon: <BookOpen className="w-8 h-8" />, color: "from-purple-500 to-indigo-400", delay: 0 },
                    { icon: <Users className="w-8 h-8" />, color: "from-teal-500 to-cyan-400", delay: 2 },
                    { icon: <BarChart3 className="w-8 h-8" />, color: "from-amber-500 to-orange-400", delay: 4 },
                    { icon: <GraduationCap className="w-8 h-8" />, color: "from-red-500 to-pink-400", delay: 6 },
                    { icon: <Cpu className="w-8 h-8" />, color: "from-lime-500 to-green-400", delay: 8 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ rotate: index * 72 }}
                      animate={{ rotate: index * 72 + 360 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 15,
                        ease: "linear",
                        delay: item.delay
                      }}
                      className="absolute top-1/2 left-1/2 w-full h-full"
                    >
                      <motion.div
                        className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-md text-white`}
                      >
                        {item.icon}
                      </motion.div>
                    </motion.div>
                  ))}
                  
                  {/* Connecting Lines */}
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-200 dark:border-gray-700 animate-spin-slow"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Architecture Overview */}
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6">System Architecture Overview</h2>
            <div className="relative bg-white dark:bg-card rounded-xl shadow-sm border p-4 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Database className="h-8 w-8 text-indigo-500" />,
                    title: "Data Layer",
                    desc: "Diverse knowledge sources, student interactions, and assessment data",
                    color: "bg-indigo-50 dark:bg-indigo-950/20",
                    borderColor: "border-indigo-200 dark:border-indigo-800",
                  },
                  {
                    icon: <Brain className="h-8 w-8 text-purple-500" />,
                    title: "AI Core",
                    desc: "Neural networks for content understanding and generation",
                    color: "bg-purple-50 dark:bg-purple-950/20",
                    borderColor: "border-purple-200 dark:border-purple-800",
                  },
                  {
                    icon: <Users className="h-8 w-8 text-blue-500" />,
                    title: "Delivery Layer",
                    desc: "Interactive UI and real-time personalized content delivery",
                    color: "bg-blue-50 dark:bg-blue-950/20",
                    borderColor: "border-blue-200 dark:border-blue-800",
                  }
                ].map((box, i) => (
                  <div 
                    key={i}
                    className={`${box.color} border ${box.borderColor} rounded-lg p-4 flex flex-col items-center text-center h-full`}
                  >
                    <div className="mb-4">
                      {box.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{box.title}</h3>
                    <p className="text-sm text-muted-foreground">{box.desc}</p>
                  </div>
                ))}
              </div>
              
              {/* Flow Arrows */}
              <div className="hidden md:flex justify-center items-center absolute top-1/2 left-[30%] transform -translate-y-1/2 -translate-x-1/2">
                <ArrowRight className="h-8 w-8 text-gray-400" />
              </div>
              <div className="hidden md:flex justify-center items-center absolute top-1/2 left-[70%] transform -translate-y-1/2 -translate-x-1/2">
                <ArrowRight className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </motion.div>

          {/* Key Features Cards */}
          <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Zap size={24} className="text-yellow-500" />,
                title: "Real-time Adaptation",
                description: "Instantly adjusts content difficulty based on learner responses"
              },
              {
                icon: <GitBranch size={24} className="text-blue-500" />,
                title: "Multi-path Learning",
                description: "Creates custom learning journeys for different learning styles"
              },
              {
                icon: <Globe size={24} className="text-green-500" />,
                title: "Knowledge Graph",
                description: "Maps relationships between concepts for deeper understanding"
              },
              {
                icon: <Lightbulb size={24} className="text-purple-500" />,
                title: "Content Generation",
                description: "Creates personalized examples and practice problems on-demand"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-t-4" style={{ borderTopColor: feature.icon.props.className.split(' ')[1].replace('text-', 'var(--') + ')'}} >
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Data Section */}
      {activeSection === 'data' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Database className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold mb-4">Data Architecture</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our platform is powered by diverse, high-quality datasets that enable rich, accurate, and contextual learning experiences
            </p>
          </motion.div>

          {/* Data Flow Diagram */}
          <motion.div 
            variants={fadeIn}
            className="bg-white dark:bg-card rounded-xl p-6 border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Data Flow & Processing</h3>
            <div className="relative mx-auto max-w-3xl">
              {/* Flow diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Input Sources */}
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Input Sources</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span>Academic Textbooks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-blue-600" />
                      <span>Scientific Papers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>Expert Knowledge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span>Learning Analytics</span>
                    </li>
                  </ul>
                </div>

                {/* Processing */}
                <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">Data Processing</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-purple-600" />
                      <span>Semantic Analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-purple-600" />
                      <span>Knowledge Structuring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-purple-600" />
                      <span>Concept Mapping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-600" />
                      <span>Quality Filtering</span>
                    </li>
                  </ul>
                </div>

                {/* Output Format */}
                <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-3">Knowledge Base</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-teal-600" />
                      <span>Knowledge Graphs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Atom className="h-4 w-4 text-teal-600" />
                      <span>Conceptual Models</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-teal-600" />
                      <span>Example Libraries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-teal-600" />
                      <span>Assessment Banks</span>
                    </li>
                  </ul>
                </div>

                {/* Flow arrows */}
                <div className="hidden md:flex absolute left-[33%] top-1/2 transform -translate-y-1/2">
                  <ChevronRight className="h-8 w-8 text-gray-400" />
                </div>
                <div className="hidden md:flex absolute left-[66%] top-1/2 transform -translate-y-1/2">
                  <ChevronRight className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Stats */}
          <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "1.2M+",
                description: "Academic Resources Processed",
                icon: <BookOpen className="h-8 w-8 text-blue-500" />,
              },
              {
                title: "250K+",
                description: "Learning Interactions",
                icon: <Users className="h-8 w-8 text-indigo-500" />,
              },
              {
                title: "35K+",
                description: "Structured Concepts",
                icon: <GitBranch className="h-8 w-8 text-purple-500" />,
              },
              {
                title: "15TB",
                description: "Knowledge Database",
                icon: <Database className="h-8 w-8 text-teal-500" />,
              }
            ].map((stat, i) => (
              <Card key={i} className="text-center">
                <CardHeader className="pb-2">
                  <div className="mx-auto mb-2">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-3xl font-bold mb-1">{stat.title}</CardTitle>
                  <CardDescription>{stat.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Training Section */}
      {activeSection === 'training' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h2 className="text-3xl font-bold mb-4">AI Training & Learning</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our sophisticated training pipeline creates AI tutors that understand concepts and teach effectively
            </p>
          </motion.div>

          {/* Training Pipeline Visualization */}
          <motion.div 
            variants={fadeIn}
            className="bg-white dark:bg-card rounded-xl p-6 border shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Model Training Pipeline</h3>
            
            <div className="relative">
              {/* Training Steps */}
              <div className="grid grid-cols-1 gap-6 relative max-w-4xl mx-auto">
                {[
                  {
                    number: "01",
                    title: "Pre-training",
                    description: "Training on broad academic knowledge and general learning concepts",
                    color: "bg-blue-50 dark:bg-blue-950/20",
                    border: "border-blue-200 dark:border-blue-800",
                    textColor: "text-blue-700 dark:text-blue-400"
                  },
                  {
                    number: "02",
                    title: "Domain Specialization",
                    description: "Fine-tuning on specific subjects like mathematics, physics, and literature",
                    color: "bg-indigo-50 dark:bg-indigo-950/20",
                    border: "border-indigo-200 dark:border-indigo-800",
                    textColor: "text-indigo-700 dark:text-indigo-400"
                  },
                  {
                    number: "03",
                    title: "Pedagogical Tuning",
                    description: "Teaching the models how to explain, ask questions, and provide feedback effectively",
                    color: "bg-purple-50 dark:bg-purple-950/20",
                    border: "border-purple-200 dark:border-purple-800",
                    textColor: "text-purple-700 dark:text-purple-400"
                  },
                  {
                    number: "04",
                    title: "Human Feedback",
                    description: "Refining model responses based on teacher and student feedback",
                    color: "bg-pink-50 dark:bg-pink-950/20",
                    border: "border-pink-200 dark:border-pink-800",
                    textColor: "text-pink-700 dark:text-pink-400"
                  },
                  {
                    number: "05",
                    title: "Evaluation & Deployment",
                    description: "Rigorously testing and continuously improving model performance",
                    color: "bg-teal-50 dark:bg-teal-950/20",
                    border: "border-teal-200 dark:border-teal-800",
                    textColor: "text-teal-700 dark:text-teal-400"
                  }
                ].map((step, i) => (
                  <div key={i} className={`flex rounded-lg ${step.color} border ${step.border} p-4 relative`}>
                    <div className="mr-4 flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full bg-white dark:bg-background ${step.border} flex items-center justify-center ${step.textColor} font-bold`}>
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${step.textColor} text-lg mb-1`}>{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {i < 4 && (
                      <div className="absolute -bottom-6 left-6 h-6 border-l-2 border-dashed border-gray-300 dark:border-gray-600 z-10"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Training Tech Stack */}
          <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Cpu className="h-6 w-6 text-indigo-500" />
                </div>
                <CardTitle>Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Server className="h-4 w-4 text-indigo-500" />
                    <span>Cloud TPU/GPU Clusters</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Database className="h-4 w-4 text-indigo-500" />
                    <span>Distributed Training Systems</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <GitBranch className="h-4 w-4 text-indigo-500" />
                    <span>Version Control & Experiment Tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Code className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Algorithms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Brain className="h-4 w-4 text-purple-500" />
                    <span>Transformer-based Neural Networks</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Layers className="h-4 w-4 text-purple-500" />
                    <span>Transfer Learning Techniques</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Lightbulb className="h-4 w-4 text-purple-500" />
                    <span>Reinforcement Learning from Feedback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-blue-500" />
                    <span>Education Specialists</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span>Subject Matter Experts</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span>Machine Learning Engineers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Deployment Section */}
      {activeSection === 'deployment' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Server className="h-12 w-12 mx-auto mb-4 text-teal-600" />
            <h2 className="text-3xl font-bold mb-4">Deployment Architecture</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our scalable cloud infrastructure delivers personalized learning experiences to thousands of students simultaneously
            </p>
          </motion.div>

          {/* System Architecture Diagram */}
          <motion.div variants={fadeIn} className="bg-white dark:bg-card rounded-xl p-6 border shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">System Architecture</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* User Layer */}
              <div className="md:col-span-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 text-center">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">User Interface Layer</h4>
                <div className="flex justify-center gap-4 flex-wrap">
                  <div className="px-3 py-1 bg-white dark:bg-card rounded border border-blue-200 dark:border-blue-800 text-sm">
                    Web Interface
                  </div>
                  <div className="px-3 py-1 bg-white dark:bg-card rounded border border-blue-200 dark:border-blue-800 text-sm">
                    Mobile Apps
                  </div>
                  <div className="px-3 py-1 bg-white dark:bg-card rounded border border-blue-200 dark:border-blue-800 text-sm">
                    LMS Integration
                  </div>
                </div>
              </div>
              
              {/* Middle Layers */}
              <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2 text-center">API Gateway</h4>
                <div className="text-sm text-center">Authentication, Rate Limiting, Load Balancing</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2 text-center">Application Services</h4>
                <div className="text-sm text-center">User Management, Content Delivery, Analytics</div>
              </div>
              
              <div className="bg-fuchsia-50 dark:bg-fuchsia-950/20 rounded-lg p-4 border border-fuchsia-200 dark:border-fuchsia-800">
                <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-400 mb-2 text-center">AI Inference Layer</h4>
                <div className="text-sm text-center">Model Serving, Caching, Optimization</div>
              </div>
              
              {/* Bottom Layer */}
              <div className="md:col-span-3 bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800 text-center">
                <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-2">Data Storage Layer</h4>
                <div className="flex justify-center gap-4 flex-wrap">
                  <div className="px-3 py-1 bg-white dark:bg-card rounded border border-teal-200 dark:border-teal-800 text-sm">
                    User Profiles
                  </div>
                  <div className="px-3 py-1 bg-white dark:bg-card rounded border border-teal-200 dark:border-teal-800 text-sm">
                    Learning History
                  </div>
                  <div className="px-3 py-1 bg-white dark:bg-card rounded border border-teal-200 dark:border-teal-800 text-sm">
                    Content Database
                  </div>
                  <div className="px-3 py-1 bg-white dark:bg-card rounded border border-teal-200 dark:border-teal-800 text-sm">
                    Analytics Storage
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Scaling & Performance */}
          <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Response Time</span>
                    <span className="text-green-600 font-medium">{"<"}200ms</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Concurrent Users</span>
                    <span className="text-blue-600 font-medium">50k+</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>System Uptime</span>
                    <span className="text-purple-600 font-medium">99.99%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-teal-500" />
                  Scaling Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 pb-2 border-b">
                    <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <Globe className="h-3 w-3 text-teal-600" />
                    </div>
                    <div>
                      <span className="font-medium">Global Deployment</span>
                      <p className="text-xs text-muted-foreground">Multi-region servers for low latency worldwide</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 pb-2 border-b">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Server className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium">Auto Scaling</span>
                      <p className="text-xs text-muted-foreground">Dynamic resource allocation based on demand</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Cpu className="h-3 w-3 text-indigo-600" />
                    </div>
                    <div>
                      <span className="font-medium">Model Parallelism</span>
                      <p className="text-xs text-muted-foreground">Optimized distribution of AI computation</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Results Section */}
      {activeSection === 'results' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h2 className="text-3xl font-bold mb-4">Impact & Results</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered education platform delivers measurable improvements in student outcomes
            </p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                metric: "42%",
                description: "Average Improvement in Test Scores",
                color: "from-blue-500 to-blue-700",
                icon: <GraduationCap className="h-8 w-8 text-white" />
              },
              {
                metric: "3.5x",
                description: "Increase in Student Engagement",
                color: "from-purple-500 to-purple-700",
                icon: <Users className="h-8 w-8 text-white" />
              },
              {
                metric: "68%",
                description: "Reduction in Study Time Required",
                color: "from-teal-500 to-teal-700",
                icon: <Clock className="h-8 w-8 text-white" />
              },
              {
                metric: "94%",
                description: "Teacher Satisfaction Rate",
                color: "from-amber-500 to-amber-700",
                icon: <Star className="h-8 w-8 text-white" />
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="rounded-lg p-6 text-center text-white"
                style={{ background: `linear-gradient(to bottom right, var(--${item.color.split(' ')[0].replace('from-', '')}), var(--${item.color.split(' ')[2].replace('to-', '')}))` }}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{item.metric}</h3>
                <p className="text-sm text-white/80">{item.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={fadeIn} className="bg-white dark:bg-card rounded-xl p-6 border shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-center">Partner Testimonials</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "The AI tutoring platform has revolutionized how we deliver personalized education at scale.",
                  author: "Dr. Sarah Johnson",
                  title: "Education Director, Global Learning Institute",
                  avatar: "SJ"
                },
                {
                  quote: "Our students show remarkable improvement in critical thinking and problem-solving after using this platform.",
                  author: "Prof. Michael Chen",
                  title: "Department Chair, Technical University",
                  avatar: "MC"
                },
                {
                  quote: "The platform's ability to adapt to each student's needs has transformed our approach to learning support.",
                  author: "Emma Rodriguez",
                  title: "Chief Innovation Officer, EdTech Partners",
                  avatar: "ER"
                }
              ].map((testimonial, i) => (
                <div key={i} className="rounded-lg border p-4 bg-muted/20">
                  <div className="mb-4">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-medium">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Future Roadmap */}
          <motion.div variants={fadeIn} className="rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Future Development Roadmap</h3>
              <p className="text-white/80">Our continued innovation plan to revolutionize education</p>
            </div>
            <div className="p-6 bg-white dark:bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Expanding Subject Coverage
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <CheckIcon className="h-2.5 w-2.5 text-blue-600" />
                      </div>
                      <span>Advanced humanities and social sciences tutoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <CheckIcon className="h-2.5 w-2.5 text-blue-600" />
                      </div>
                      <span>Creative arts and music composition guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <CheckIcon className="h-2.5 w-2.5 text-blue-600" />
                      </div>
                      <span>Professional skills and career development</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-teal-500" />
                    Technology Enhancements
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                        <CheckIcon className="h-2.5 w-2.5 text-teal-600" />
                      </div>
                      <span>Multimodal learning with AR/VR integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                        <CheckIcon className="h-2.5 w-2.5 text-teal-600" />
                      </div>
                      <span>Adaptive assessment with precision analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                        <CheckIcon className="h-2.5 w-2.5 text-teal-600" />
                      </div>
                      <span>Collaborative learning environments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium">
          Schedule a Demo
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          See how our AI+ Education platform can transform your learning environment
        </p>
      </motion.div>
    </div>
  );
};

export default Architecture;

import { CheckIcon, Clock } from 'lucide-react';
