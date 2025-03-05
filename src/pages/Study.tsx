
import React from 'react';
import { useParams } from 'react-router-dom';
import { StudyLayout } from '../components/study/StudyLayout';
import { Subject } from '../data/subjects'; // Import the type instead of the constant

const Study = () => {
  const { subjectId, topicId } = useParams();
  
  // Create the subjects dummy data here until we fix the import
  const subjects: Subject[] = [
    {
      id: "mathematics",
      title: "Mathematics",
      description: "Study of numbers, quantities, and shapes",
      color: "blue",
      icon: "Calculator",
      topics: [
        {
          id: "quadratic-functions",
          title: "Quadratic Functions",
          description: "Exploring polynomial functions of the second degree"
        }
      ]
    }
  ];
  
  return (
    <StudyLayout 
      subjects={subjects}
    />
  );
};

export default Study;
