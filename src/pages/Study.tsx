
import React from 'react';
import { useParams } from 'react-router-dom';
import { StudyLayout } from '../components/study/StudyLayout';

const Study = () => {
  const { subjectId, topicId } = useParams();
  
  return (
    <StudyLayout 
      subjectId={subjectId || 'mathematics'}
      topicId={topicId || 'quadratic-functions'}
    />
  );
};

export default Study;
