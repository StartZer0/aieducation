
import React, { useState } from 'react';
import { ArrowUp, Sliders } from 'lucide-react';
import ScheduleCustomizer from './ScheduleCustomizer';

interface PerformanceData {
  score: number;
  timeSpent: number;
  recommendedExtra: number;
  priority: 'high' | 'medium' | 'low';
}

interface PerformanceRecommendationsProps {
  performanceData: Record<string, PerformanceData>;
  subjectColors: Record<string, string>;
  acceptRecommendation: (subject: string) => void;
  saveCustomSchedule: (subject: string, schedule: Record<string, number>) => void;
  currentSchedule: Record<string, Record<string, number>>;
}

const PerformanceRecommendations: React.FC<PerformanceRecommendationsProps> = ({
  performanceData,
  subjectColors,
  acceptRecommendation,
  saveCustomSchedule,
  currentSchedule
}) => {
  const [customizingSubject, setCustomizingSubject] = useState<string | null>(null);
  
  // Filter subjects that need extra time
  const subjectsNeedingTime = Object.entries(performanceData)
    .filter(([_, data]) => data.recommendedExtra > 0)
    .sort((a, b) => {
      const priorityRank = { high: 0, medium: 1, low: 2 };
      return priorityRank[a[1].priority] - priorityRank[b[1].priority];
    });
  
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-500', text: 'High Priority' };
      case 'medium':
        return { color: 'text-amber-500', text: 'Medium Priority' };
      case 'low':
        return { color: 'text-emerald-500', text: 'Low Priority' };
      default:
        return { color: 'text-foreground/60', text: 'No Priority' };
    }
  };
  
  const openCustomizer = (subject: string) => {
    setCustomizingSubject(subject);
  };
  
  const closeCustomizer = () => {
    setCustomizingSubject(null);
  };
  
  const handleSaveCustomSchedule = (subject: string, newSchedule: Record<string, number>) => {
    saveCustomSchedule(subject, newSchedule);
    closeCustomizer();
  };
  
  return (
    <>
      <div className="glass-card p-5">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        
        {subjectsNeedingTime.length === 0 ? (
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <p className="text-foreground/70">No recommendations at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subjectsNeedingTime.map(([subject, data]) => {
              const { color, text } = getPriorityIndicator(data.priority);
              
              return (
                <div key={subject} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <div 
                          className={`w-3 h-3 rounded-full bg-${subjectColors[subject]} mr-2`}
                          aria-hidden="true"
                        ></div>
                        {subject}
                      </h3>
                      <p className={`text-xs ${color}`}>{text}</p>
                    </div>
                    <div className="bg-muted py-1 px-2 rounded text-xs font-medium">
                      Score: {data.score}%
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Current weekly time:</span>
                    <span>{data.timeSpent}h</span>
                  </div>
                  
                  <div className="flex justify-between text-sm font-medium mb-3">
                    <span className="flex items-center">
                      <ArrowUp className="w-3 h-3 text-blue mr-1" />
                      Recommended increase:
                    </span>
                    <span className="text-blue">+{data.recommendedExtra}h</span>
                  </div>
                  
                  <div className="w-full h-2 bg-muted rounded-full mb-4">
                    <div 
                      className="h-full bg-blue rounded-full"
                      style={{ width: `${Math.min(data.score, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => acceptRecommendation(subject)}
                      className="button-primary text-sm flex-1"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => openCustomizer(subject)}
                      className="flex items-center justify-center text-sm px-3 rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {customizingSubject && (
        <ScheduleCustomizer
          subject={customizingSubject}
          currentSchedule={currentSchedule[customizingSubject]}
          performanceData={performanceData[customizingSubject]}
          onSave={handleSaveCustomSchedule}
          onCancel={closeCustomizer}
        />
      )}
    </>
  );
};

export default PerformanceRecommendations;
