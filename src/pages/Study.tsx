
import React from 'react';
import { useParams } from 'react-router-dom';
import { StudyLayout } from '../components/study/StudyLayout';
import { subjects } from '../data/subjects';

const Study = () => {
  const { subjectId, topicId } = useParams();
  
  return (
    <StudyLayout 
      subjects={subjects}
    />
  );
};

export default Study;
