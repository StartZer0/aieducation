
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface SubjectCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  lessons: number;
  completedLessons: number;
}

const SubjectCard = ({ id, title, icon, color, progress, lessons, completedLessons }: SubjectCardProps) => {
  return (
    <Link 
      to={`/study/${id}`}
      className="glass-card group p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-blue transition-colors duration-300" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      
      <div className="mt-auto">
        <div className="text-sm text-foreground/70 mb-2">
          {completedLessons} of {lessons} lessons completed
        </div>
        
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(to right, var(--color-start), var(--color-end))`,
              '--color-start': color.includes('blue') ? '#4a6cfa' : color.includes('teal') ? '#00c4cc' : color.includes('amber') ? '#fbbf24' : color.includes('emerald') ? '#34d399' : color.includes('rose') ? '#fb7185' : color.includes('violet') ? '#8b5cf6' : '#4a6cfa',
              '--color-end': color.includes('blue') ? '#818cf8' : color.includes('teal') ? '#2dd4bf' : color.includes('amber') ? '#fcd34d' : color.includes('emerald') ? '#6ee7b7' : color.includes('rose') ? '#fda4af' : color.includes('violet') ? '#a78bfa' : '#818cf8',
            } as React.CSSProperties}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
