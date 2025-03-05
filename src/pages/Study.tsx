import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationSidebar from '../components/NavigationSidebar';
import StudyContent from '../components/StudyContent';
import AIAssistant from '../components/AIAssistant';
import PeriodicTableContent from '../components/science/PeriodicTableContent';

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
  
  // Sample subject data
  const subjects = {
    mathematics: {
      id: 'mathematics',
      title: 'Mathematics',
      topics: [
        {
          id: 'algebra',
          title: 'Algebra',
          subtopics: [
            { id: 'equations', title: 'Linear Equations' },
            { id: 'quadratic-functions', title: 'Quadratic Functions' },
            { id: 'polynomials', title: 'Polynomials' },
          ]
        },
        {
          id: 'geometry',
          title: 'Geometry',
          subtopics: [
            { id: 'triangles', title: 'Triangles' },
            { id: 'circles', title: 'Circles' },
            { id: 'coordinate-geometry', title: 'Coordinate Geometry' },
          ]
        },
        {
          id: 'calculus',
          title: 'Calculus',
          subtopics: [
            { id: 'limits', title: 'Limits' },
            { id: 'derivatives', title: 'Derivatives' },
            { id: 'integrals', title: 'Integrals' },
          ]
        },
        {
          id: 'statistics',
          title: 'Statistics',
          subtopics: [
            { id: 'probability', title: 'Probability' },
            { id: 'distributions', title: 'Distributions' },
            { id: 'hypothesis-testing', title: 'Hypothesis Testing' },
          ]
        },
      ]
    },
    science: {
      id: 'science',
      title: 'Science',
      topics: [
        {
          id: 'periodic-table',
          title: 'The Periodic Table',
          subtopics: [
            { id: 'elements', title: 'Elements and Properties' },
            { id: 'groups-periods', title: 'Groups and Periods' },
            { id: 'electron-config', title: 'Electron Configuration' },
          ]
        },
        {
          id: 'chemistry',
          title: 'Chemistry',
          subtopics: [
            { id: 'atoms', title: 'Atoms and Molecules' },
            { id: 'reactions', title: 'Chemical Reactions' },
            { id: 'bonding', title: 'Chemical Bonding' },
          ]
        },
        {
          id: 'biology',
          title: 'Biology',
          subtopics: [
            { id: 'cells', title: 'Cell Structure' },
            { id: 'genetics', title: 'Genetics and DNA' },
            { id: 'ecology', title: 'Ecology' },
          ]
        },
        {
          id: 'physics',
          title: 'Physics',
          subtopics: [
            { id: 'mechanics', title: 'Mechanics' },
            { id: 'electricity', title: 'Electricity and Magnetism' },
            { id: 'waves', title: 'Waves and Optics' },
          ]
        }
      ]
    }
  };
  
  const subject = subjects[subjectId as keyof typeof subjects] || subjects.mathematics;
  
  // Generate breadcrumbs based on topic
  const getTopicTitle = (id: string): string => {
    for (const topic of subject.topics) {
      if (topic.id === id) return topic.title;
      
      if (topic.subtopics) {
        for (const subtopic of topic.subtopics) {
          if (subtopic.id === id) return subtopic.title;
        }
      }
    }
    return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
  };
  
  const breadcrumbs = [
    { id: 'home', title: 'Subjects', path: '/dashboard' },
    { id: subjectId, title: subject.title, path: `/study/${subjectId}` },
    { id: topicId, title: getTopicTitle(topicId), path: `/study/${subjectId}/${topicId}` },
  ];
  
  // For simplicity, let's get the previous and next lessons
  const getAdjacentLessons = () => {
    // This is a simple implementation and can be enhanced
    let prevLesson = null;
    let nextLesson = null;
    
    for (const topic of subject.topics) {
      if (topic.subtopics) {
        for (let i = 0; i < topic.subtopics.length; i++) {
          if (topic.subtopics[i].id === topicId) {
            if (i > 0) {
              prevLesson = {
                id: topic.subtopics[i-1].id,
                title: topic.subtopics[i-1].title,
                path: `/study/${subjectId}/${topic.subtopics[i-1].id}`
              };
            }
            
            if (i < topic.subtopics.length - 1) {
              nextLesson = {
                id: topic.subtopics[i+1].id,
                title: topic.subtopics[i+1].title,
                path: `/study/${subjectId}/${topic.subtopics[i+1].id}`
              };
            }
            return { prevLesson, nextLesson };
          }
        }
      }
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

  return (
    <div className="min-h-screen pt-16 flex flex-col md:flex-row">
      {/* Sidebar - hidden on mobile, fixed on desktop */}
      <div className="hidden md:block w-64 h-[calc(100vh-64px)] sticky top-16">
        <NavigationSidebar subject={subject} activeTopic={topicId} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:h-[calc(100vh-64px)] md:overflow-hidden">
        <StudyContent 
          title={getTopicTitle(topicId)}
          content={renderContent()}
          breadcrumbs={breadcrumbs}
          prevLesson={prevLesson}
          nextLesson={nextLesson}
        />
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default Study;
