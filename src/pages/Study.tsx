
import React from 'react';
import { useParams } from 'react-router-dom';
import { StudyLayout } from '../components/study/StudyLayout';

const Study = () => {
  const { subjectId, topicId } = useParams();
  
  return (
    <StudyLayout 
      subjects={undefined} // Optional prop, using undefined to use default
    />
  );
};

export default Study;
