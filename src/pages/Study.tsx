
import React from 'react';
import { useParams } from 'react-router-dom';
import { StudyLayout } from '../components/study/StudyLayout';
import { subjectsData } from '../data/subjects';

const Study = () => {
  const { subjectId, topicId } = useParams();
  
  return (
    <StudyLayout 
      subjects={subjectsData}
      currentSubjectId={subjectId}
      currentTopicId={topicId}
    />
  );
};

export default Study;
