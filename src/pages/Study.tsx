
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationSidebar from '../components/NavigationSidebar';
import StudyContent from '../components/StudyContent';
import AIAssistant from '../components/AIAssistant';
import PeriodicTableContent from '../components/science/PeriodicTableContent';
import { Button } from '../components/ui/button';
import { Menu, FileText, StickyNote, HelpCircle, Sparkles } from 'lucide-react';
import StudyTips, { commonStudyTips } from '../components/scheduler/StudyTips';
import StudyStreak from '../components/scheduler/StudyStreak';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';

interface TopicData {
  id: string;
  title: string;
  subtopics?: TopicData[];
}

interface SubjectData {
  id: string;
  title: string;
  topics: TopicData[];
}

const Study = () => {
  const { subjectId = 'mathematics', topicId = 'quadratic-functions' } = useParams();
  const [showLearningTools, setShowLearningTools] = useState(false);
  
  // Enhanced subject data with more detailed structure for A-Level subjects
  const subjects = {
    mathematics: {
      id: 'mathematics',
      title: 'Mathematics',
      topics: [
        {
          id: 'pure-mathematics',
          title: 'Pure Mathematics',
          subtopics: [
            { id: 'proof', title: 'Proof' },
            { 
              id: 'algebra-and-functions', 
              title: 'Algebra and Functions',
              subtopics: [
                { id: 'indices-and-surds', title: 'Indices and Surds' },
                { id: 'quadratic-functions', title: 'Quadratic Functions' },
                { id: 'simultaneous-equations', title: 'Simultaneous Equations' },
                { id: 'inequalities', title: 'Inequalities' },
                { id: 'polynomials', title: 'Polynomials' },
              ]
            },
            { 
              id: 'coordinate-geometry', 
              title: 'Coordinate Geometry',
              subtopics: [
                { id: 'straight-lines', title: 'Straight Lines' },
                { id: 'circles', title: 'Circles' },
              ]
            },
            { 
              id: 'sequences-and-series', 
              title: 'Sequences and Series',
              subtopics: [
                { id: 'arithmetic-sequences', title: 'Arithmetic Sequences' },
                { id: 'geometric-sequences', title: 'Geometric Sequences' },
                { id: 'binomial-expansion', title: 'Binomial Expansion' },
              ]
            },
            { 
              id: 'trigonometry', 
              title: 'Trigonometry',
              subtopics: [
                { id: 'trigonometric-ratios', title: 'Trigonometric Ratios' },
                { id: 'trigonometric-identities', title: 'Trigonometric Identities' },
                { id: 'trigonometric-equations', title: 'Trigonometric Equations' },
              ]
            },
            { 
              id: 'exponentials-and-logarithms', 
              title: 'Exponentials and Logarithms',
              subtopics: [
                { id: 'exponential-functions', title: 'Exponential Functions' },
                { id: 'logarithmic-functions', title: 'Logarithmic Functions' },
                { id: 'exponential-models', title: 'Exponential Models' },
              ]
            },
            { 
              id: 'differentiation', 
              title: 'Differentiation',
              subtopics: [
                { id: 'differentiation-basics', title: 'Differentiation Basics' },
                { id: 'applications-of-differentiation', title: 'Applications of Differentiation' },
              ]
            },
            { 
              id: 'integration', 
              title: 'Integration',
              subtopics: [
                { id: 'integration-basics', title: 'Integration Basics' },
                { id: 'applications-of-integration', title: 'Applications of Integration' },
              ]
            },
            { id: 'numerical-methods', title: 'Numerical Methods' },
            { id: 'vectors', title: 'Vectors' },
          ]
        },
        {
          id: 'statistics',
          title: 'Statistics',
          subtopics: [
            { id: 'statistical-sampling', title: 'Statistical Sampling' },
            { id: 'data-presentation', title: 'Data Presentation and Interpretation' },
            { id: 'probability', title: 'Probability' },
            { id: 'statistical-distributions', title: 'Statistical Distributions' },
            { id: 'hypothesis-testing', title: 'Statistical Hypothesis Testing' },
          ]
        },
        {
          id: 'mechanics',
          title: 'Mechanics',
          subtopics: [
            { id: 'quantities-and-units', title: 'Quantities and Units in Mechanics' },
            { id: 'kinematics', title: 'Kinematics' },
            { id: 'forces-and-newtons-laws', title: 'Forces and Newton\'s Laws' },
            { id: 'moments', title: 'Moments' },
          ]
        },
      ]
    },
    science: {
      id: 'science',
      title: 'Science',
      topics: [
        {
          id: 'chemistry',
          title: 'Chemistry',
          subtopics: [
            { 
              id: 'physical-chemistry', 
              title: 'Physical Chemistry',
              subtopics: [
                { id: 'atomic-structure', title: 'Atomic Structure' },
                { id: 'amount-of-substance', title: 'Amount of Substance' },
                { id: 'bonding', title: 'Bonding' },
                { id: 'energetics', title: 'Energetics' },
                { id: 'kinetics', title: 'Kinetics' },
                { id: 'equilibria', title: 'Chemical Equilibria' },
                { id: 'redox', title: 'Oxidation, Reduction and Redox Equations' },
              ]
            },
            { 
              id: 'inorganic-chemistry', 
              title: 'Inorganic Chemistry',
              subtopics: [
                { id: 'periodic-table', title: 'The Periodic Table' },
                { id: 'group-2', title: 'Group 2 Elements' },
                { id: 'group-7', title: 'Group 7 Elements' },
                { id: 'transition-metals', title: 'Transition Metals' },
              ]
            },
            { 
              id: 'organic-chemistry', 
              title: 'Organic Chemistry',
              subtopics: [
                { id: 'alkanes', title: 'Alkanes' },
                { id: 'alkenes', title: 'Alkenes' },
                { id: 'alcohols', title: 'Alcohols' },
                { id: 'organic-analysis', title: 'Organic Analysis' },
              ]
            },
          ]
        },
        {
          id: 'biology',
          title: 'Biology',
          subtopics: [
            { id: 'biological-molecules', title: 'Biological Molecules' },
            { id: 'cells', title: 'Cells' },
            { id: 'organisms-exchange-substances', title: 'Organisms Exchange Substances' },
            { id: 'genetic-information', title: 'Genetic Information' },
            { id: 'energy-transfers', title: 'Energy Transfers' },
            { id: 'organisms-respond-to-changes', title: 'Organisms Respond to Changes' },
            { id: 'genetics-and-evolution', title: 'Genetics, Populations, Evolution' },
            { id: 'control-of-gene-expression', title: 'Control of Gene Expression' },
          ]
        },
        {
          id: 'physics',
          title: 'Physics',
          subtopics: [
            { id: 'measurements', title: 'Measurements and Errors' },
            { id: 'particles-and-radiation', title: 'Particles and Radiation' },
            { id: 'waves', title: 'Waves' },
            { id: 'mechanics-and-materials', title: 'Mechanics and Materials' },
            { id: 'electricity', title: 'Electricity' },
            { id: 'further-mechanics', title: 'Further Mechanics' },
            { id: 'thermal-physics', title: 'Thermal Physics' },
            { id: 'fields', title: 'Fields and Their Consequences' },
            { id: 'nuclear-physics', title: 'Nuclear Physics' },
          ]
        }
      ]
    }
  };
  
  const subject = subjects[subjectId as keyof typeof subjects] || subjects.mathematics;
  
  // Generate breadcrumbs based on topic
  const getTopicTitle = (id: string): string => {
    // Helper function to search for a topic/subtopic across the entire subject
    const findTopicById = (topics: TopicData[]): TopicData | undefined => {
      for (const topic of topics) {
        if (topic.id === id) {
          return topic;
        }
        
        if (topic.subtopics) {
          // Check direct subtopics
          const directSubtopic = topic.subtopics.find(st => st.id === id);
          if (directSubtopic) {
            return directSubtopic;
          }
          
          // Check nested subtopics (if any)
          for (const subtopic of topic.subtopics) {
            if (subtopic.subtopics) {
              const nestedSubtopic = subtopic.subtopics.find(nst => nst.id === id);
              if (nestedSubtopic) {
                return nestedSubtopic;
              }
            }
          }
        }
      }
      return undefined;
    };
    
    const topic = findTopicById(subject.topics);
    return topic ? topic.title : id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const breadcrumbs = [
    { id: 'home', title: 'Subjects', path: '/dashboard' },
    { id: subjectId, title: subject.title, path: `/study/${subjectId}` },
    { id: topicId, title: getTopicTitle(topicId), path: `/study/${subjectId}/${topicId}` },
  ];
  
  // For simplicity, let's get the previous and next lessons
  const getAdjacentLessons = () => {
    // This is a simplified implementation
    let prevLesson = null;
    let nextLesson = null;
    
    const getAllTopicsFlattened = (topics: TopicData[]): TopicData[] => {
      let result: TopicData[] = [];
      
      for (const topic of topics) {
        result.push(topic);
        
        if (topic.subtopics) {
          for (const subtopic of topic.subtopics) {
            result.push(subtopic);
            
            if (subtopic.subtopics) {
              result.push(...subtopic.subtopics);
            }
          }
        }
      }
      
      return result;
    };
    
    const allTopics = getAllTopicsFlattened(subject.topics);
    
    // Find the index of the current topic
    const currentIndex = allTopics.findIndex(t => t.id === topicId);
    
    if (currentIndex > 0) {
      const prev = allTopics[currentIndex - 1];
      prevLesson = {
        id: prev.id,
        title: prev.title,
        path: `/study/${subjectId}/${prev.id}`
      };
    }
    
    if (currentIndex >= 0 && currentIndex < allTopics.length - 1) {
      const next = allTopics[currentIndex + 1];
      nextLesson = {
        id: next.id,
        title: next.title,
        path: `/study/${subjectId}/${next.id}`
      };
    }
    
    return { prevLesson, nextLesson };
  };
  
  const { prevLesson, nextLesson } = getAdjacentLessons();

  // Render specific content based on subject and topic
  const renderContent = () => {
    if (subjectId === 'science' && topicId === 'periodic-table') {
      return <PeriodicTableContent />;
    }
    
    return null;
  };
  
  const renderLearningTools = () => {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Learning Tools</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowLearningTools(false)}
            className="h-8 w-8 p-0"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Button variant="outline" className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Generate Summary
          </Button>
          
          <Button variant="outline" className="justify-start">
            <StickyNote className="mr-2 h-4 w-4" />
            Create Flashcards
          </Button>
          
          <Button variant="outline" className="justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Practice Questions
          </Button>
          
          <Button variant="outline" className="justify-start">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Learning Path
          </Button>
        </div>
        
        <div className="border-t border-border pt-6">
          <h4 className="font-semibold mb-4">Study Tips</h4>
          <StudyTips tips={commonStudyTips.slice(0, 3)} />
        </div>
        
        <div className="border-t border-border pt-6">
          <h4 className="font-semibold mb-4">Your Progress</h4>
          <StudyStreak streak={7} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col md:flex-row">
      {/* Mobile Navigation Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed z-10 top-20 left-4 h-10 w-10 rounded-full md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <NavigationSidebar subject={subject} activeTopic={topicId} />
        </SheetContent>
      </Sheet>
      
      {/* Sidebar - hidden on mobile, visible on desktop */}
      <div className="hidden md:block w-64 h-[calc(100vh-64px)] sticky top-16">
        <NavigationSidebar subject={subject} activeTopic={topicId} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:h-[calc(100vh-64px)] md:overflow-hidden flex">
        <div className="flex-1">
          <StudyContent 
            title={getTopicTitle(topicId)}
            content={renderContent()}
            breadcrumbs={breadcrumbs}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
          />
        </div>
        
        {/* Learning Tools Sidebar - Only visible when toggled */}
        {showLearningTools && (
          <div className="hidden lg:block w-80 h-[calc(100vh-64px)] overflow-y-auto border-l border-border bg-card/50">
            {renderLearningTools()}
          </div>
        )}
      </div>
      
      {/* Floating button to toggle learning tools */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowLearningTools(!showLearningTools)}
        className="fixed z-10 top-20 right-4 h-10 w-10 rounded-full lg:flex hidden"
      >
        {showLearningTools ? 
          <HelpCircle className="h-5 w-5" /> : 
          <Sparkles className="h-5 w-5" />
        }
      </Button>
      
      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Study;
