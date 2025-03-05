
import React from 'react';
import { cn } from '@/lib/utils';

interface WeeklyScheduleTableProps {
  taskData: Record<string, Record<string, number>>;
  subjectColors: Record<string, string>;
}

const WeeklyScheduleTable: React.FC<WeeklyScheduleTableProps> = ({ 
  taskData, 
  subjectColors 
}) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Calculate daily totals
  const dailyTotals = days.map(day => 
    Object.values(taskData).reduce((total, subject) => total + subject[day], 0)
  );
  
  // Calculate subject totals
  const subjectTotals = Object.entries(taskData).reduce((totals, [subject, schedule]) => {
    totals[subject] = Object.values(schedule).reduce((total, hours) => total + hours, 0);
    return totals;
  }, {} as Record<string, number>);
  
  // Calculate grand total
  const grandTotal = Object.values(subjectTotals).reduce((total, hours) => total + hours, 0);
  
  // Helper function to determine workload level based on hours
  const getWorkloadLevel = (hours: number) => {
    if (hours === 0) return "none";
    if (hours <= 1) return "minimal";
    if (hours <= 2) return "normal";
    return "heavy";
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-card border-b border-border">
            <th className="p-2 text-left font-medium">Subject</th>
            {days.map(day => (
              <th 
                key={day} 
                className={cn(
                  "p-2 text-center font-medium",
                  day === today && "bg-blue/10 text-blue"
                )}
              >
                {day.slice(0, 3)}
              </th>
            ))}
            <th className="p-2 text-center font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(taskData).map(([subject, schedule]) => (
            <tr key={subject} className="border-b border-border hover:bg-muted/40">
              <td className="p-2 font-medium">
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full bg-${subjectColors[subject]} mr-2`} 
                    aria-hidden="true"
                  ></div>
                  {subject}
                </div>
              </td>
              {days.map(day => {
                const hours = schedule[day];
                const workload = getWorkloadLevel(hours);
                
                return (
                  <td 
                    key={day} 
                    className={cn(
                      "p-2 text-center",
                      day === today && "bg-blue/5",
                      workload === "heavy" && "bg-red-500/10",
                      workload === "normal" && "bg-amber-500/10",
                      workload === "minimal" && "bg-emerald-500/10"
                    )}
                  >
                    {hours > 0 ? `${hours}h` : "-"}
                  </td>
                );
              })}
              <td className="p-2 text-center font-medium">
                {subjectTotals[subject]}h
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-muted/30">
            <td className="p-2 font-medium">Daily Total</td>
            {dailyTotals.map((total, i) => (
              <td 
                key={days[i]} 
                className={cn(
                  "p-2 text-center font-medium",
                  days[i] === today && "bg-blue/10 text-blue"
                )}
              >
                {total}h
              </td>
            ))}
            <td className="p-2 text-center font-semibold bg-blue/10 text-blue">
              {grandTotal}h
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WeeklyScheduleTable;
