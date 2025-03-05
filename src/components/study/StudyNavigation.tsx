
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  subtopics?: Topic[];
}

interface Subject {
  id: string;
  title: string;
  topics: Topic[];
}

interface StudyNavigationProps {
  subject: Subject;
  activeTopic?: string;
  onNavigate: (path: string) => void;
}

export function StudyNavigation({ subject, activeTopic, onNavigate }: StudyNavigationProps) {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  
  // Auto-expand parents of the active topic
  useEffect(() => {
    if (activeTopic) {
      // Function to find all parent topics of a given topic ID
      const findParentTopics = (topics: Topic[], targetId: string, path: string[] = []): string[] | null => {
        for (const topic of topics) {
          if (topic.id === targetId) {
            return path;
          }
          
          if (topic.subtopics) {
            const result = findParentTopics(topic.subtopics, targetId, [...path, topic.id]);
            if (result) {
              return result;
            }
          }
        }
        
        return null;
      };
      
      const parentTopics = findParentTopics(subject.topics, activeTopic);
      
      if (parentTopics) {
        const newExpandedTopics = { ...expandedTopics };
        parentTopics.forEach(topicId => {
          newExpandedTopics[topicId] = true;
        });
        setExpandedTopics(newExpandedTopics);
      }
    }
  }, [activeTopic, subject.topics]);
  
  const toggleTopic = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };
  
  const isActive = (id: string) => {
    return id === activeTopic;
  };
  
  const renderTopics = (topics: Topic[], level = 0) => {
    return topics.map(topic => (
      <div key={topic.id} className="animate-fade-in" style={{ animationDuration: '0.2s' }}>
        <div 
          className={`flex items-center py-1.5 px-2 rounded-md ${
            isActive(topic.id) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
          }`}
          onClick={() => onNavigate(`/study/${subject.id}/${topic.id}`)}
        >
          {topic.subtopics && topic.subtopics.length > 0 ? (
            <button
              className="p-1 mr-1 rounded hover:bg-muted"
              onClick={(e) => toggleTopic(topic.id, e)}
            >
              {expandedTopics[topic.id] ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          ) : (
            <span className="w-6"></span>
          )}
          
          <span 
            className={`text-sm ${isActive(topic.id) ? 'font-medium' : ''}`}
            style={{ marginLeft: `${level * 4}px` }}
          >
            {topic.title}
          </span>
        </div>
        
        {topic.subtopics && expandedTopics[topic.id] && (
          <div className="ml-6 pl-2 border-l border-border/50 mt-1 mb-1">
            {renderTopics(topic.subtopics, level + 1)}
          </div>
        )}
      </div>
    ));
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="font-medium">{subject.title}</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {renderTopics(subject.topics)}
      </div>
    </div>
  );
}
