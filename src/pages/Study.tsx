
import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationSidebar from '../components/NavigationSidebar';
import StudyContent from '../components/StudyContent';
import AIAssistant from '../components/AIAssistant';

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
  const subject: SubjectData = {
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
  };
  
  // Generate breadcrumbs based on topic
  const breadcrumbs = [
    { id: 'home', title: 'Subjects', path: '/dashboard' },
    { id: subjectId, title: subject.title, path: `/study/${subjectId}` },
    { id: topicId, title: 'Quadratic Functions', path: `/study/${subjectId}/${topicId}` },
  ];
  
  // Navigation examples
  const prevLesson = {
    id: 'equations',
    title: 'Linear Equations',
    path: `/study/${subjectId}/equations`
  };
  
  const nextLesson = {
    id: 'polynomials',
    title: 'Polynomials',
    path: `/study/${subjectId}/polynomials`
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
          title="Quadratic Functions and Equations"
          content={null}
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
