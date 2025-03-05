
import React from 'react';
import { Calendar } from 'lucide-react';
import WeeklyScheduleTable from '@/components/scheduler/WeeklyScheduleTable';
import PerformanceRecommendations from '@/components/scheduler/PerformanceRecommendations';
import { useToast } from '@/hooks/use-toast';

// Study hours by subject and day
const initialTaskData = {
  "Mathematics": {
    "Monday": 2,
    "Tuesday": 1.5,
    "Wednesday": 2,
    "Thursday": 1,
    "Friday": 1.5,
    "Saturday": 1.5,
    "Sunday": 0
  },
  "Science": {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 1,
    "Thursday": 1.5,
    "Friday": 1,
    "Saturday": 0.5,
    "Sunday": 0
  },
  "English": {
    "Monday": 1,
    "Tuesday": 0.5,
    "Wednesday": 1,
    "Thursday": 1.5,
    "Friday": 0.5,
    "Saturday": 1,
    "Sunday": 0.5
  },
  "History": {
    "Monday": 0.5,
    "Tuesday": 1.5,
    "Wednesday": 0,
    "Thursday": 1,
    "Friday": 1,
    "Saturday": 0.5,
    "Sunday": 0
  },
  "Computer Science": {
    "Monday": 1.5,
    "Tuesday": 0,
    "Wednesday": 1.5,
    "Thursday": 0,
    "Friday": 1,
    "Saturday": 2,
    "Sunday": 1
  }
};

// Performance data for recommendations
const performanceData = {
  "Mathematics": { 
    score: 78, 
    timeSpent: 9.5, 
    recommendedExtra: 1.5,
    priority: "high" as const
  },
  "Science": { 
    score: 85, 
    timeSpent: 7, 
    recommendedExtra: 0.5,
    priority: "medium" as const
  },
  "English": { 
    score: 92, 
    timeSpent: 6, 
    recommendedExtra: 0,
    priority: "low" as const
  },
  "History": { 
    score: 68, 
    timeSpent: 4.5, 
    recommendedExtra: 2,
    priority: "high" as const
  },
  "Computer Science": { 
    score: 88, 
    timeSpent: 7, 
    recommendedExtra: 1,
    priority: "medium" as const
  }
};

// Map subjects to colors for visual identification
const subjectColors = {
  "Mathematics": "blue",
  "Science": "teal",
  "English": "amber-500",
  "History": "rose-500",
  "Computer Science": "violet-500"
};

const Scheduler = () => {
  const [taskData, setTaskData] = React.useState(initialTaskData);
  const { toast } = useToast();
  
  // Accept recommendation for a subject
  const acceptRecommendation = (subject: string) => {
    const recommendation = performanceData[subject].recommendedExtra;
    
    if (recommendation <= 0) return;
    
    // Create updated task data
    const updatedTaskData = { ...taskData };
    let remainingTime = recommendation;
    
    // Simple algorithm to distribute time across weekdays
    // Prioritize days with existing study time first
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    while (remainingTime > 0) {
      for (const day of weekdays) {
        if (remainingTime <= 0) break;
        
        // Add 0.5 hours to each day until we've distributed all time
        if (updatedTaskData[subject][day] > 0 && remainingTime > 0) {
          updatedTaskData[subject][day] += 0.5;
          remainingTime -= 0.5;
        }
      }
      
      // If we still have time to distribute, add to days with no study time
      if (remainingTime > 0) {
        for (const day of weekdays) {
          if (remainingTime <= 0) break;
          
          if (updatedTaskData[subject][day] === 0) {
            updatedTaskData[subject][day] = 0.5;
            remainingTime -= 0.5;
          }
        }
      }
    }
    
    // Update state and show notification
    setTaskData(updatedTaskData);
    toast({
      title: "Recommendation Accepted",
      description: `Added ${recommendation} hours to ${subject}`,
      variant: "default",
    });
  };
  
  // Save custom schedule for a subject
  const saveCustomSchedule = (subject: string, newSchedule: Record<string, number>) => {
    const updatedTaskData = { ...taskData };
    updatedTaskData[subject] = newSchedule;
    
    setTaskData(updatedTaskData);
    toast({
      title: "Schedule Updated",
      description: `${subject} schedule has been updated`,
      variant: "default",
    });
  };

  // Print the current schedule
  const printSchedule = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue" />
            Weekly Study Scheduler
          </h1>
          <p className="text-foreground/70 text-lg">Optimize your study time with a personalized schedule</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="glass-card p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Weekly Schedule</h2>
                <button 
                  onClick={printSchedule}
                  className="button-secondary text-sm flex items-center"
                >
                  <span>Print Schedule</span>
                </button>
              </div>
              <WeeklyScheduleTable 
                taskData={taskData} 
                subjectColors={subjectColors} 
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <PerformanceRecommendations 
              performanceData={performanceData}
              subjectColors={subjectColors}
              acceptRecommendation={acceptRecommendation}
              saveCustomSchedule={saveCustomSchedule}
              currentSchedule={taskData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
