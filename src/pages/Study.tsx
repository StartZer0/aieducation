
import React from 'react';
import { useParams } from 'react-router-dom';
import { StudyLayout } from '../components/study/StudyLayout';
import { subjectsData } from '../data/subjects';
import { useToast } from '@/hooks/use-toast';

const Study = () => {
  const { subjectId, topicId } = useParams();
  const { toast } = useToast();
  
  // Show welcome toast when loading the study page for the first time
  React.useEffect(() => {
    if (subjectId && topicId) {
      // Access subject directly by key instead of using find
      const subject = subjectsData[subjectId as keyof typeof subjectsData];
      
      if (subject) {
        const findTopicTitle = (topics: any[], id: string): string | null => {
          for (const topic of topics) {
            if (topic.id === id) {
              return topic.title;
            }
            if (topic.subtopics) {
              const found = findTopicTitle(topic.subtopics, id);
              if (found) return found;
            }
          }
          return null;
        };
        
        const topicTitle = findTopicTitle(subject.topics, topicId);
        
        toast({
          title: `${topicTitle || 'Topic'} loaded`,
          description: "Select different explanation levels or use the tabs to explore content in various formats.",
          className: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200",
        });
      }
    }
  }, [subjectId, topicId]);
  
  return (
    <StudyLayout 
      subjects={subjectsData}
      currentSubjectId={subjectId}
      currentTopicId={topicId}
    />
  );
};

export default Study;
