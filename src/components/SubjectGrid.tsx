
import React from 'react';
import SubjectCard, { SubjectCardProps } from './SubjectCard';
import { BookOpen, FlaskConical, PenTool, GraduationCap, Globe, Laptop } from 'lucide-react';

const SubjectGrid = () => {
  const subjects: SubjectCardProps[] = [
    {
      id: 'mathematics',
      title: 'Mathematics',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      color: 'bg-blue',
      progress: 68,
      lessons: 42,
      completedLessons: 28,
    },
    {
      id: 'science',
      title: 'Science',
      icon: <FlaskConical className="w-6 h-6 text-white" />,
      color: 'bg-teal',
      progress: 45,
      lessons: 38,
      completedLessons: 17,
    },
    {
      id: 'english',
      title: 'English',
      icon: <PenTool className="w-6 h-6 text-white" />,
      color: 'bg-amber-500',
      progress: 92,
      lessons: 26,
      completedLessons: 24,
    },
    {
      id: 'history',
      title: 'History',
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      color: 'bg-rose-500',
      progress: 32,
      lessons: 36,
      completedLessons: 11,
    },
    {
      id: 'geography',
      title: 'Geography',
      icon: <Globe className="w-6 h-6 text-white" />,
      color: 'bg-emerald-500',
      progress: 18,
      lessons: 32,
      completedLessons: 6,
    },
    {
      id: 'computer-science',
      title: 'Computer Science',
      icon: <Laptop className="w-6 h-6 text-white" />,
      color: 'bg-violet-500',
      progress: 75,
      lessons: 40,
      completedLessons: 30,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} {...subject} />
      ))}
    </div>
  );
};

export default SubjectGrid;
